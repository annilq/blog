import prisma from '@/lib/prisma'
import { getAllPostsData } from './util';
import { Post, Prisma } from '@prisma/client';

export const seedData = async () => {

  const users = await prisma.user.findMany({});
  const authorId = users[0]?.id
  const matters = getAllPostsData()
  const postsData: Prisma.PostCreateInput[] = matters?.map(matterData => ({
    title: String(matterData.data.title),
    content: matterData.content,
    createdAt: matterData.data.date,
    categorys: {
      create: [
        { name: matterData.data.tags },
      ]
    },
    authorId,
    published: true,
  })) as unknown as Post[]

  const posts = await prisma.post.createMany({
    data: postsData
  });

  return await prisma.post.findMany({})
}

seedData()