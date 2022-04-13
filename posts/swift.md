---
title: swift小记
date: 2022-04-10 11:36:40
tags: swift
---
### json解析
1. [How To Parse JSON in Swift Using Codable and JSONSerialization](https://www.advancedswift.com/swift-json-without-swiftyjson/)
2. [How to parse JSON using JSONSerialization](https://www.hackingwithswift.com/example-code/system/how-to-parse-json-using-jsonserialization)
3. [Parsing JSON using the Codable protocol](https://www.hackingwithswift.com/read/7/3/parsing-json-using-the-codable-protocol)
4. [JSON to Swift with Decoder and Decodable](https://swiftunboxed.com/stdlib/json-decoder-decodable/)

### storyboards 
1. unwind segue should be located in the controller you wish to unwind TO, not the controller you are returning FROM. 
    >[unwind segue not work](https://stackoverflow.com/questions/15851247/unwind-segue-not-work)
2. When a segue is triggered, the view controller that triggered it will call the method prepare(for:sender:) and will provide the segue that it’s handling. There are two important properties in the segue you’ll frequently use: identifier and destination.

2. 通过[Storyboard References](https://www.raywenderlich.com/5055396-ios-storyboards-segues-and-more#toc-anchor-017)将项目分成多个storyboard

3. Automatically triggered segues are not meant to work hand-in-hand with actions when the order of execution is important. To fix this, you need to tell the view controller when to trigger the segue.
[来源](https://www.raywenderlich.com/5055396-ios-storyboards-segues-and-more#toc-anchor-013)