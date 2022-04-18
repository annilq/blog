---
title: swift小记
date: 2022-04-10 11:36:40
tags: swift
---
### json解析
1. [How To Parse JSON in Swift Using Codable and JSONSerialization](https://www.advancedswift.com/swift-json-without-swiftyjson/)

2. [JSON to Swift with Decoder and Decodable](https://swiftunboxed.com/stdlib/json-decoder-decodable/)

3. [How to parse JSON using JSONSerialization](https://www.fivestars.blog/articles/swift-decodable/)

4. [Encoding and Decoding in Swift](https://www.raywenderlich.com/3418439-encoding-and-decoding-in-swift)


### storyboards 
1. unwind segue should be located in the controller you wish to unwind TO, not the controller you are returning FROM. 
    >[unwind segue not work](https://stackoverflow.com/questions/15851247/unwind-segue-not-work)
2. When a segue is triggered, the view controller that triggered it will call the method prepare(for:sender:) and will provide the segue that it’s handling. There are two important properties in the segue you’ll frequently use: identifier and destination.

2. 通过[Storyboard References](https://www.raywenderlich.com/5055396-ios-storyboards-segues-and-more#toc-anchor-017)将项目分成多个storyboard

3. Automatically triggered segues are not meant to work hand-in-hand with actions when the order of execution is important. To fix this, you need to tell the view controller when to trigger the segue.
[来源](https://www.raywenderlich.com/5055396-ios-storyboards-segues-and-more#toc-anchor-013)

### defer
1. defer 所声明的 block 会在当前代码执行退出后被调用。正因为它提供了一种延时调用的方式，所以一般会被用来做资源释放或者销毁，这在某个函数有多个返回出口的时候特别有用 [参考](https://onevcat.com/2018/11/defer/)