import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkprism from "remark-prism";
// import highlight from 'remark-highlight.js'
const postsDirectory = path.join(process.cwd(), "posts");

function getDirMeta(fileName) {
  return {
    id: fileName,
    title: fileName,
  };
}
function getPostMeta(dir, fileName) {
  const id = fileName.replace(/\.md$/, "");

  // Read markdown file as string
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { delims: "---" });

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
    // 时间要转成字符串，否则解析报错
    date: matterResult.data.date.toISOString(),
  };
}

function getPostsFromDir(dir) {
  // Get file names under /posts
  const files = [];
  const fileNames = fs.readdirSync(dir);
  fileNames?.map((fileName) => {
    if (fileName.indexOf("md") > -1) {
      files.push({ dir, fileName });
    } else {
      files.push(...getPostsFromDir(path.join(dir, fileName)));
    }
  });
  return files;
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getPostsFromDir(postsDirectory);

  const allPostsData = fileNames.map(({ dir, fileName }) => {
    if (fileName.indexOf("md") > -1) {
      return getPostMeta(dir, fileName);
    } else {
      return getDirMeta(fileName);
    }
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
        type: fileName.indexOf("md") > -1 ? "md" : "dir",
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkprism)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
    date: matterResult.data.date.toISOString(),
  };
}
