import prisma from '@/lib/prisma'
import { getAllPostsData } from './util';
import { Post, Prisma } from '@prisma/client';
import { seedThoughts } from './thought';


const createOrUpdatePost = async (posts: Prisma.PostCreateInput[]) => {
  return await Promise.all(posts.map(async (post) => {
    return await prisma.post.upsert({
      where: {
        createdAt: post.createdAt,
      } as Prisma.PostWhereUniqueInput,
      update: post,
      create: post,
    }).catch((e) => {
      console.log(e);
    })
  }))
}

const deletePost = async (posts: Prisma.PostCreateManyInput[]) => {
  return await prisma.post.deleteMany({
    where: {
      id: {
        in: posts.map(post => post.id!),
      },
    },
  }).catch(e => {
    console.log(e);
  });
}


const createOrUpdateCategory = async (categorys: Prisma.CategoryCreateInput[]) => {
  return await Promise.all(categorys.map(async (category) => {
    return await prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: category,
      create: category,
    })
  }))
}

const deleteCategory = async (categorys: Prisma.CategoryCreateInput[]) => {
  return await prisma.category.deleteMany({
    where: {
      id: {
        in: categorys.map(category => category.id!),
      },
    },
  }).catch(e => {
    console.log(e);
  });
}


export const seedPosts = async () => {

  const matters = getAllPostsData()
  const postsData: Prisma.PostCreateInput[] = matters?.map(matterData => ({
    title: String(matterData.data.title),
    content: matterData.content,
    createdAt: matterData.data.date,
    published: true,
  })) as unknown as Post[]

  const categorysData: Prisma.CategoryCreateInput[] = matters?.filter(matterData => !!matterData.data.tags).map(matterData => ({
    name: matterData.data.tags,
  }))

  const createdPosts = await prisma.post.findMany({})
  const createdCategorys = await prisma.category.findMany({})

  const toDeletePost = createdPosts.filter(post => !postsData.find(createdPost => (new Date(createdPost.createdAt!)).valueOf() === post.createdAt.valueOf()))
  const toDeletegory = createdCategorys.filter(category => !categorysData.find(createdCategory => createdCategory.name === category.name))
  // console.log(toDeletePost.map(a => a.title));
  // console.log(toDeletegory.map(a => a.name));

  // if createdAt is not match ,the post will be created
  // if createdAt is not change ,the post will be updated
  // if createdAt is not match ,the post will be deleted

  await deletePost(toDeletePost);
  await deleteCategory(toDeletegory);

  const allPosts = await createOrUpdatePost(postsData)

  const allCreatedCategorys = await createOrUpdateCategory(categorysData)

  for (const post of allPosts) {
    // console.log(post);

    const matterData = matters.find(matterData => matterData.data.title === post?.title)

    await prisma.post.update({
      where: { id: post?.id },
      data: {
        categorys: {
          // connect: allCreatedCategorys.map((createdCategory: { id: any; }) => ({ id: createdCategory.id }))
          connect: allCreatedCategorys.filter((createdCategory) => createdCategory.name === matterData?.data.tags).map((createdCategory) => ({ id: createdCategory.id }))
        }
      }
    });
  }
  process.exit(0)
}

const main = async () => {
  seedPosts()
  seedThoughts()
}
main()