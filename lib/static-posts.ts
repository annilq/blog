import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseContent } from "./util";

const FILE_EXT = "md";
const postsDirectory = path.join(process.cwd(), "public", "posts");

export interface StaticPostMeta {
  id: string;
  title: string;
  date: Date;
  tags?: string;
  published: boolean;
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
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`Error processing post ${fileName}:`, error);
    }
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
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

// 获取所有标签（使用元数据缓存，避免解析内容）
export async function getAllTags(): Promise<string[]> {
  if (!postsMetaCache) {
    postsMetaCache = await getAllStaticPostsMeta();
  }
  const tags = new Set<string>();
  
  postsMetaCache.forEach(post => {
    if (post.tags) {
      tags.add(post.tags);
    }
  });
  
  return Array.from(tags);
}
