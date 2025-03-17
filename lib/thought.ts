import { Thought } from "@prisma/client"

const thoughts: Thought[] = [{
  createdAt: new Date("2020-09-06"),
  content: `早上带仔仔去童乐王国，中午结束准备回家时，仔仔就开始磨人哭了一会儿说想回家小超市买吃的，等到小区门口快进小区时候，仔仔就要停车去小超市
“仔仔，你刚刚为什么哭呀”
“我看到个小姐姐吃东西，我也想要，就哭了”
“是什么东西呀”
“嗯...,就是...,嗯...,不说了,等去超市就知道了,走吧!”
“好，走吧!”
`
}, {
  createdAt: new Date("2021-01-03"),
  content: `早上和大仔吵架了，他说他不和我玩了，可是我也很难过哇`
}, {
  createdAt: new Date("2022-05-30"),
  content: `周末给仔仔买了电话手表，小家伙兴奋的不的了，他知不知道当我接到他电话的时候也很兴奋呀`
}, {
  createdAt: new Date("2024-02-03"),
  content: `最近晚上在家写代码，示意娃娃不要太吵闹，娃娃出入都像做贼一样哈哈，还会给我倒水，太可爱了`
}, {
  createdAt: new Date("2025-02-04"),
  content: `年后最后一天假期下午带娃娃出去江边逛，妹妹闹情绪，哥哥还在旁边得瑟，我就用包拍了一下pp，结果大仔也闹情绪了，还说为啥他闹情绪爸爸妈妈就不会哄他，妹妹闹情绪就哄妹妹，这下子可问倒我了，只能说对哥哥的期望高一些，希望他更坚强，但是很明显我们有点没照顾到他的情绪，以后要以此为戒。`
}, {
  createdAt: new Date("2025-03-17"),
  content: `吃过晚饭后，哥哥说要下去玩，但是妹妹还没有完成打卡，正在犹豫是不是要打完卡再下去玩，哥哥说：“妹妹，下去玩吧，你知道吗，开心是最重要的”, 好吧，真是谢谢提醒了`
}
]

export const seedThoughts = async () => {
  await prisma.thought.deleteMany({})
  const result = await prisma.thought.createMany({
    data: thoughts
  })
  return result
}