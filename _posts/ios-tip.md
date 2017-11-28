title: iOS开发记录
date: 2016-11-15 19:43:21
tags: iOS开发记录
---
### UIview
##### 子类的模版会自动生成两个方法
1. initWithFrame
2. drawRect
初始化直接创建初始化子类并且加入到UIwindow中

```
Someview *view=[[Someview alloc] initWithFrame:frame];
[self.window addsubview:view];
[self.window makeKeyAndVisiable];
```
### 视图控制器UIViewController
1. 每一个controller都有一个view属性作为这个controller的根视图
2. controller的默认初始化方法是<code>initWithNibName:bundle</code>
当像controller发送init消息时候会自动调用<code>initWithNibName:bundle</code>方法并且参数传入nil
>当传入了nil时controller对象仍然会找和当前controller同名xib文件

##### 视图控制器可以通过两种方式创建视图层次结构
1. 代码方式：覆盖UIViewController中的loadView方法(如果当前controller的view属性未nil则自动调用loadview方法)
  ```
  -(void)loadView
  {
    someView *view=[[someView alloc] init];
    self.view=view;
  }
  ```
2. nib文件方式(相应的controller载入由nib编译撑的xib文件再生成视图)
##### 将controller的view添加到主窗口
1. 因为rootViewController的view需要启动后马上显示，所以会在设置完立刻加载view
```
somecontroller *con=[[somecontroller alloc] init]
self.window.rootViewController=con;
```
##### controller中的方法简介
1. <code>initWithBundle</code>:当对视图控制器属性初始化时可以，还不能访问视图对象
2. <code>viewDidLoad</code>:当像访问视图对象时候可以访问，但只执行一次
3. <code>viewWillAppear</code>:每次看到view都会执行
