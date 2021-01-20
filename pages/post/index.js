function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.key}>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  const posts = [
    {
      key: "post1",
      title: "post1",
    }, {
      key: "post2",
      title: "post2",
    }, {
      key: "post3",
      title: "post3",
    }, {
      key: "post4",
      title: "post4",
    }
  ]
  return {
    props: {
      posts,
    },
  }
}
export default Blog