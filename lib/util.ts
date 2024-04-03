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

export async function parseContent(mdxString: string): Promise<string> {
  const file = await unified()
    .use(remarkParse as any) // Convert into markdown AST
    .use(remarkRehype as any) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
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
    if (fileName.indexOf("mdx") > -1) {
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