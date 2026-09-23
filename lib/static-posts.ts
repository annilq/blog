import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { extractExcerpt, parseContent } from "./util";

const FILE_EXT = "md";
const postsDirectory = path.join(process.cwd(), "public", "posts");

export interface StaticPostMeta {
  id: string;
  title: string;
  date: Date;
  tags?: string;
  published: boolean;
  /*
   * 列表页的摘要，同时也是搜索索引的一部分（搜"记得正文里那个词"靠它）。
   * 这里是**空串也是合法值**：只有标题和代码的文章没有被 extractExcerpt 认下的可读首段，
   * 由调用方决定要不要渲染这一行，不要在读取层编一句假的。
   */
  excerpt: string;
}

export interface StaticPost extends StaticPostMeta {
  content: string;
  contentHtml: string;
}

function parseMDContent(dir: string, fileName: string) {
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents, { delimiters: "---" });
  return matterResult;
}

function getPostsFromDir(dir: string) {
  const files: { dir: string, fileName: string }[] = [];
  const fileNames = fs.readdirSync(dir);
  fileNames?.map((fileName) => {
    if (fileName.indexOf(FILE_EXT) > -1) {
      files.push({ dir, fileName });
    } else {
      const subFiles = getPostsFromDir(path.join(dir, fileName)) || [];
      files.push(...subFiles);
    }
  });
  return files;
}

// 生成唯一的ID，基于文件路径和日期
function generatePostId(dir: string, fileName: string, date: Date): string {
  const relativePath = path.relative(postsDirectory, path.join(dir, fileName));
  const pathHash = relativePath.replace(/[^a-zA-Z0-9]/g, '-');
  const dateStr = date.toISOString().split('T')[0];
  return `${pathHash}-${dateStr}`;
}

// 获取所有静态文章元数据（不解析内容，用于列表页面）
export async function getAllStaticPostsMeta(): Promise<StaticPostMeta[]> {
  if (postsMetaCache) {
    return postsMetaCache;
  }
  const fileNames = getPostsFromDir(postsDirectory);
  const posts: StaticPostMeta[] = [];

  for (const { dir, fileName } of fileNames) {
    try {
      const matterResult = parseMDContent(dir, fileName);
      const id = generatePostId(dir, fileName, matterResult.data.date);
      
      const post: StaticPostMeta = {
        id,
        title: String(matterResult.data.title),
        date: matterResult.data.date,
        tags: matterResult.data.tags,
        published: true,
        excerpt: extractExcerpt(matterResult.content),
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`Error processing post ${fileName}:`, error);
    }
  }

  // 按日期排序
  const sorted = posts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  postsMetaCache = sorted;
  return sorted;
}

// 获取所有静态文章数据（包含完整内容，用于需要内容的场景）
export async function getAllStaticPosts(): Promise<StaticPost[]> {
  const fileNames = getPostsFromDir(postsDirectory);
  const posts: StaticPost[] = [];

  for (const { dir, fileName } of fileNames) {
    try {
      const matterResult = parseMDContent(dir, fileName);
      const id = generatePostId(dir, fileName, matterResult.data.date);
      
      const post: StaticPost = {
        id,
        title: String(matterResult.data.title),
        content: matterResult.content,
        contentHtml: await parseContent(matterResult.content),
        date: matterResult.data.date,
        tags: matterResult.data.tags,
        published: true,
        excerpt: extractExcerpt(matterResult.content),
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`Error processing post ${fileName}:`, error);
    }
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

// 缓存所有文章数据，避免重复读取文件
let postsCache: StaticPost[] | null = null;
let postsMetaCache: StaticPostMeta[] | null = null;

// 根据ID获取单个文章
export async function getStaticPostById(id: string): Promise<StaticPost | null> {
  if (!postsCache) {
    postsCache = await getAllStaticPosts();
  }
  return postsCache.find(post => post.id === id) || null;
}

// 清除缓存（用于开发环境）
export function clearPostsCache() {
  postsCache = null;
  postsMetaCache = null;
}

// 根据标签获取文章
export async function getStaticPostsByTag(tag: string): Promise<StaticPost[]> {
  if (!postsCache) {
    postsCache = await getAllStaticPosts();
  }
  return postsCache.filter(post => post.tags === tag);
}

// 标签 + 该标签下的文章数
export interface TagCount {
  name: string;
  count: number;
}

/*
 * 标签索引：名字与篇数一起返回。算在这里而不是调用方 —— 代价已经付过了（postsMetaCache 在内存里），
 * 而且「每个标签有几篇」只有这一处知道答案。
 * 排序：篇数多的在前，同数按名字；标签列表天然按热度读。
 */
export async function getTagIndex(): Promise<TagCount[]> {
  if (!postsMetaCache) {
    postsMetaCache = await getAllStaticPostsMeta();
  }
  const counts = new Map<string, number>();

  postsMetaCache.forEach(post => {
    if (post.tags) {
      counts.set(post.tags, (counts.get(post.tags) ?? 0) + 1);
    }
  });

  return Array.from(counts, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

// 只要名字的场景（构建脚本打印、tag 深链校验）。委托给 getTagIndex，避免两处各算一遍。
export async function getAllTags(): Promise<string[]> {
  return (await getTagIndex()).map(tag => tag.name);
}
