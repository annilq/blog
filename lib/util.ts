import fs from "fs";
import path from "path";
import matter from "gray-matter";
// next mdx 
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from 'remark-gfm'

const FILE_EXT = "md"

export interface PostMeta {
  name: string
  title: string
  date: Date
}

export interface Post extends PostMeta {
  contentHtml: string | TrustedHTML
  source: string
}

const postsDirectory = path.join(process.cwd(), "public", "posts");

function parseMDContent(dir: string, fileName: string) {
  // Read markdown file as string
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { delimiters: "---" });

  // Combine the data with the id
  return matterResult
}

/*
 * 从 markdown 原文里取一段可读文本 —— 用于 OG 描述，以及（下一步）列表页的摘要。
 *
 * 走 AST 而不是正则：正文里代码块、表格、标题都会被正则抓成"摘要"。
 * 候选节点是 paragraph / list / blockquote —— 这一条是被真实语料逼出来的：
 * 本站大量文章是「### 小标题 + 有序列表 + 代码块」的速记，**根本没有段落**
 * （如 public/posts/AI/langchainjs_ai.md 第一个文本节点就是列表第一项）。
 *
 * 长度门槛同样来自实测：只看"第一段"会拿到 `注意`（database/sql.md）和 `control+i`
 * （ios/SwiftUI.md）—— 一句碎屑当文章描述，比没有描述更糟。所以先找够长的那条，
 * 全都不够长才退回最长的一条；只有标题和代码的文章返回空串，由调用方决定要不要用。
 */
const MIN_EXCERPT_LENGTH = 24;

function nodeText(node: any): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
  if (node.type === "image") return "";
  if (!node.children) return "";
  return node.children.map(nodeText).join("");
}

function excerptCandidate(node: any): string {
  switch (node.type) {
    case "paragraph":
    case "blockquote":
      return nodeText(node);
    case "list": {
      /*
       * 取列表前几项，用分号连起来 —— 单项常常只是「1. 可以指定默认值」这种半句。
       * 只取每一项**自己的**文本，排除嵌套子列表：否则 database/sql.md 那种
       * 「1. DDL…数据定义语言 / 1.1 CREATE / 1.2 DROP」会拼成 `数据定义语言CREATEDROPALTER`。
       */
      const items = (node.children ?? [])
        .slice(0, 3)
        .map((item: any) =>
          (item.children ?? [])
            .filter((child: any) => child.type !== "list")
            .map(nodeText)
            .join(""),
        )
        .filter(Boolean);
      return items.join("；");
    }
    default:
      // heading / code / table / html / thematicBreak：都不是 reader 眼里的"第一段"。
      return "";
  }
}

export function extractExcerpt(markdown: string, maxLength = 120): string {
  const tree = unified()
    .use(remarkParse as any)
    .use(remarkGfm)
    .parse(markdown) as unknown as { children: any[] };

  const candidates = (tree.children ?? [])
    .map(excerptCandidate)
    .map((text: string) => text.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const text =
    candidates.find((candidate: string) => candidate.length >= MIN_EXCERPT_LENGTH) ??
    candidates.sort((a: string, b: string) => b.length - a.length)[0] ??
    "";

  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

export async function parseContent(mdxString: string): Promise<string> {
  const file = await unified()
    .use(remarkParse as any) // Convert into markdown AST
    .use(remarkGfm) // 支持 GitHub 风格的 Markdown，包括表格
    .use(remarkRehype as any) // Transform to HTML AST
    .use(rehypeSanitize, {
      // tagNames: ['table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span', 'code', 'pre','ul','li','a'],
    }) // Sanitize HTML input
    .use(rehypePrettyCode, {
      // See Options section below.
    })
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(mdxString)

  return String(file)
}


function getPostsFromDir(dir: string) {
  // Get file names under /posts
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


// this is used for init db data
export function getAllPostsData() {
  // Get file names under /posts
  const fileNames = getPostsFromDir(postsDirectory);
  const allPostsData = fileNames.map(({ dir, fileName }) => parseMDContent(dir, fileName));

  // Sort posts by date
  return allPostsData.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
}