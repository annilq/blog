import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkprism from "remark-prism";
import remarkGfm from 'remark-gfm'

// import highlight from 'remark-highlight.js'
const postsDirectory = path.join(process.cwd(), "posts");

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
      const subFiles = getPostsFromDir(path.join(dir, fileName)) || [];
      files.push(...subFiles);
    }
  });
  return files;
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getPostsFromDir(postsDirectory);
  const allPostsData = fileNames.map(({ dir, fileName }) =>
    getPostMeta(dir, fileName)
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 获取所有地址
export function getAllPostIds() {
  const fileNames = getPostsFromDir(postsDirectory);
  return fileNames.map(({ fileName }) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
        // type: fileName.indexOf("md") > -1 ? "md" : "dir",
      },
    };
  });
}

export async function getPostData(id) {
  const fileNames = getPostsFromDir(postsDirectory);
  const fileObj = fileNames.find((file) => file.fileName.indexOf(id) > -1);
  const fileContents = fs.readFileSync(
    path.join(fileObj.dir, fileObj.fileName),
    "utf8"
  );

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
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
