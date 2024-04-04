import prisma from '@/lib/prisma'
import { getAllPostsData } from './util';
import { Post, Prisma } from '@prisma/client';

export const seedPosts = async () => {

  const matters = getAllPostsData()
  const postsData: Prisma.PostCreateInput[] = matters?.map(matterData => ({
    title: String(matterData.data.title),
    content: matterData.content,
    createdAt: matterData.data.date,
    // categorys: {
    //   createMany: { data: [{ name: matterData.data.tags ?? "other" }] },
    //   skipDuplicates: true,
    // },
    published: true,
  })) as unknown as Post[]

  const categorysData: Prisma.CategoryCreateInput[] = matters?.filter(matterData => !!matterData.data.tags).map(matterData => ({
    name: matterData.data.tags,
  }))

  const createdPoustCount = await prisma.post.createMany({
    data: postsData
  });

  const createdCategorysCount = await prisma.category.createMany({
    data: categorysData,
    skipDuplicates: true,
  });

  const createdPosts = await prisma.post.findMany({})
  const createdCategorys = await prisma.category.findMany({})

  for (const post of createdPosts) {

    const matterData = matters.find(matterData => matterData.data.title === post.title)

    await prisma.post.update({
      where: { id: post.id },
      data: {
        categorys: {
          // connect: createdCategorys.map((createdCategory: { id: any; }) => ({ id: createdCategory.id }))
          connect: createdCategorys.filter((createdCategory) => createdCategory.name === matterData?.data.tags).map((createdCategory) => ({ id: createdCategory.id }))

        }
      }
    });
  }

  return await prisma.post.findMany({})
}

seedPosts()