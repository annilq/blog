// 静态生成脚本 - 替代原来的seed.ts
// 这个脚本用于在构建时预生成所有静态页面数据

import { getAllStaticPosts, getAllTags } from './static-posts';
import fs from 'fs';
import path from 'path';

async function generateStaticData() {
  console.log('开始生成静态数据...');
  
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

async function generateSitemap(posts: any[]) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/post</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>https://yourdomain.com/post/${post.id}</loc>
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
    <title>Your Blog</title>
    <description>Your blog description</description>
    <link>https://yourdomain.com</link>
    <atom:link href="https://yourdomain.com/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.slice(0, 20).map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://yourdomain.com/post/${post.id}</link>
      <guid>https://yourdomain.com/post/${post.id}</guid>
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
