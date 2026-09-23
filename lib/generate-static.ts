// 静态生成脚本 - 替代原来的seed.ts
// 这个脚本用于在构建时预生成所有静态页面数据

import { getAllStaticPosts, getAllTags } from './static-posts';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site';
import fs from 'fs';
import path from 'path';

async function generateStaticData() {
  console.log('开始生成静态数据...');
  console.log(`站点地址：${SITE_URL}`);

  try {
    const posts = await getAllStaticPosts();
    const tags = await getAllTags();

    console.log(`成功生成 ${posts.length} 篇文章的静态数据`);
    console.log(`发现 ${tags.length} 个标签: ${tags.join(', ')}`);

    // 生成sitemap
    await generateSitemap(posts);

    // 生成RSS feed
    await generateRSSFeed(posts);

    console.log('静态数据生成完成！');
  } catch (error) {
    console.error('静态数据生成失败:', error);
    process.exit(1);
  }
}

/*
 * 这个文件里此前写死了 16 处 `https://yourdomain.com`，RSS 的标题是 "Your Blog"、
 * 描述是 "Your blog description" —— 也就是前一份 create-next-app 占位，只是换了个位置。
 * 站点的 sitemap 和 RSS 因此在告诉爬虫「本站地址是 yourdomain.com」。
 * 现在统一取 lib/site.ts，和 <title>、OG 用同一份身份。
 */
async function generateSitemap(posts: any[]) {
  const lastmod = new Date().toISOString();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/thoughts</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/post</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${SITE_URL}/post/${post.id}</loc>
    <lastmod>${post.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap 生成完成');
}

async function generateRSSFeed(posts: any[]) {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.slice(0, 20).map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/post/${post.id}</link>
      <guid>${SITE_URL}/post/${post.id}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description><![CDATA[${post.content.substring(0, 200)}...]]></description>
    </item>`).join('')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
  console.log('RSS Feed 生成完成');
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  generateStaticData();
}

export { generateStaticData };
