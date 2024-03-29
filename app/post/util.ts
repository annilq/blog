import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  name: string
  title: string
  date: Date
}

export interface Post extends PostMeta {
  // contentHtml: string | TrustedHTML
  source: string
}

const postsDirectory = path.join(process.cwd(), "public", "posts");

function parsemdContent(dir: string, fileName: string) {
  // Read markdown file as string
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { delimiters: "---" });

  // Combine the data with the id
  return matterResult
}

function getPostMeta(dir: string, fileName: string): PostMeta {
  const name = fileName.replace(/\.mdx$/, "");

  // Use gray-matter to parse the post metadata section
  const matterResult = parsemdContent(dir, fileName)

  // Combine the data with the id
  return {
    ...matterResult.data as PostMeta,
    name,
  };
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

async function getPostContent(name: string): Promise<string> {
  const fileNames = getPostsFromDir(postsDirectory);
  const fileObj = fileNames.find((file) => file.fileName.indexOf(name) > -1)!;
  const fileContents = fs.readFileSync(path.join(fileObj.dir, fileObj.fileName), "utf8");
  return fileContents
}

export function getAllPostsMetaData() {
  // Get file names under /posts
  const fileNames = getPostsFromDir(postsDirectory);
  const allPostsData = fileNames.map(({ dir, fileName }) => getPostMeta(dir, fileName));

  // Sort posts by date
  return allPostsData.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export async function getPostData(name: string): Promise<Post> {

  const fileContents = await getPostContent(name)
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);


  // Combine the data with the id and contentHtml
  return {
    name,
    source: fileContents,
    title: matterResult.data.title,
    date: matterResult.data.date.toISOString(),
  };
}

// this is used for init db data
export function getAllPostsData() {
  // Get file names under /posts
  const fileNames = getPostsFromDir(postsDirectory);
  const allPostsData = fileNames.map(({ dir, fileName }) => parsemdContent(dir, fileName));

  // Sort posts by date
  return allPostsData.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
}