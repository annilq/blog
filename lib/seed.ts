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

  const createdPosts = await prisma.post.findMany({})
  const createdCategorys = await prisma.category.findMany({})

  const toCreatePost = postsData.filter(post => !createdPosts.find(createdPost => createdPost.title === post.title))
  const toCreateCategory = categorysData.filter(category => !createdCategorys.find(createdCategory => createdCategory.name === category.name))

  const createdPoustCount = await prisma.post.createMany({
    data: toCreatePost
  }).catch(e => {
    console.log(e);
  });

  const createdCategorysCount = await prisma.category.createMany({
    data: toCreateCategory,
    skipDuplicates: true,
  }).catch(e => {
    console.log(e);
  });

  // console.log(createdPoustCount, createdCategorysCount);

  const allCreatedCategorys = await prisma.category.findMany({})

  for (const post of toCreatePost) {

    const matterData = matters.find(matterData => matterData.data.title === post.title)

    await prisma.post.update({
      where: { title: post.title },
      data: {
        categorys: {
          // connect: allCreatedCategorys.map((createdCategory: { id: any; }) => ({ id: createdCategory.id }))
          connect: allCreatedCategorys.filter((createdCategory) => createdCategory.name === matterData?.data.tags).map((createdCategory) => ({ id: createdCategory.id }))

        }
      }
    });
  }

  return
}

seedPosts()

process.exit(0)