---
title: SwiftUI小记
date: 2022-04-10 11:36:40
tags: Swift SwiftUI
---
### 视图组合
一个自定义的View一定要符合View协议
```Swift
struct CapsuleText: View {
    var text: String
    // View协议有关联类型body 
    var body: some View {
        Text(text)
            .font(.largeTitle)
    }
}
```
### [custom-modifiers](https://www.hackingwithswift.com/books/ios-swiftui/custom-modifiers)
1. 自定义的modifiers要符合ViewModifier协议
```Swift
struct Title: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.largeTitle)
            .foregroundColor(.white)
            .padding()
            .background(.blue)
            .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}

```
2. 自定义modifier的两种使用方式
```Swift
Text("Hello World")
    .modifier(Title())

```
```Swift
extension View {
    func titleStyle() -> some View {
        //直接调用函数本身 self.modifier(Title())
        modifier(Title())
    }
}
Text("Hello World")
    .titleStyle()
```