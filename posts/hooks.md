---
title: react hooks
date: 2019-09-18 15:30:01
tags: hooks
---

#### hooks执行时候内部数据状态

1. 每一次渲染都有它自己的 Props and State
2. 每一次渲染都有它自己的事件处理函数
3. 每次渲染都有它自己的Effects
4. 每一次渲染都有它自己的…所有
    1. useRef保存的值是静态的不会变（在useEffect中可以保存上一次的值）
    2. dispatch 是静态的
    3. useCallback包裹生成函数只有在其依赖变化时候才会变

5. 当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们。

#### Effect中的清理顺序
假设第一次渲染的时候props是{id: 10}，第二次渲染的时候是{id: 20}

1. React 渲染{id: 20}的UI。
2. 浏览器绘制。我们在屏幕上看到{id: 20}的UI。
3. React 清除{id: 10}的effect。
4. React 运行{id: 20}的effect。
> React只会在浏览器绘制后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。上一次的effect会在重新渲染后被清除

> 组件内的每一个函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获定义它们的那次渲染中的props和state。
### 参考
1. [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/ )
2. [deep-dive-how-do-react-hooks-really-work](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)
