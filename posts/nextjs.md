---
title: nextjs小记
date: 2022-11-11 17:14:01
tags: nextjs小记
---

### 通常访问一个链接是ssr的，但页面可以通过下面两种方式实现client-side navigations 
1. 使用link实现客户端渲染
2. router.push('/about')

### Script
1. 页面加载
```javascript
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```
2. 应用加载
```javascript
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://example.com/script.js" />
      <Component {...pageProps} />
    </>
  )
}
```

### Static Generation with data 
ssg是在build阶段，所以各种数据需要提前知道，页面动态数据需要用<code>getStaticProps</code>导出，动态路由需要根据<code>getStaticPaths</code>导出
#### getStaticProps  
1. always runs on the server and never on the client
2. getStaticProps always runs during next build

```javascript
export default function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

```
#### getStaticPaths
1. getStaticPaths 必须和 getStaticProps 一起用
2. 返回值
    #### paths:[{params:{a:1,id:1}}]
      1. 如果页面名字是 pages/posts/[postId]/[commentId],  params 需包含 postId and commentId.
      2. If the page name uses catch-all routes like pages/[...slug], then params should contain slug (which is an array). If this array is ['hello', 'world'], then Next.js will statically generate the page at /hello/world.

    #### fallback
    1. false  当访问到getStaticPaths方法没有返回的路径，都走到404
    2. true  不支持next export
    3. blocking 类似ssr 不支持next export

```javascript
function Post({ post }) {
  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post

```

### 支持sass,可自定义配置参数

### layout
1. app layput
2. page layout

```javascript
// pages/index.js

import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'

export default function Page() {
  return {
    /** Your content */
  }
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}
```
```javascript
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
```