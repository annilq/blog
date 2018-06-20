title: UIview初始化
date: 2016-11-15 19:43:21
tags: iOS
---
1. 各个组件默认高度
    1. ````statusbar```:20
    2. ```navigationbar``` :44
    3. ```UISegmentedControl``` :44
    4. ```tabbar``` :49

2. UIView通过给UIView的layer新增layer来为UIView新增bolder
```objective-c
 CALayer *bottomBorder = [CALayer layer];
    bottomBorder.frame =CGRectMake(0, userinput.frame.size.height , userinput.frame.size.width, 1);
    bottomBorder.backgroundColor = bdcolor.CGColor;
    [userinput.layer addSublayer:bottomBorder];
```
3. 在其他view controller中改变当前app 的rootViewcontroller
    1. 通过如下代码解决
    ```objective-c
    mainViewController *main=[[mainViewController alloc] init];
    UINavigationController *Maincon= [[UINavigationController alloc] initWithRootViewController:main];
    AppDelegate *app=[[UIApplication sharedApplication] delegate];
    app.window.rootViewController=Maincon;
    ```



4. 为UIImageView添加Tap手势
```UIImageView *imageView =[[UIImageView alloc]initWithFrame:CGRectMake(100, 100, 200, 200)];
    imageView.image=[UIImageimageNamed:@"filter_laozhaopian_a.png"];
    imageView.userInteractionEnabled = YES;
    UITapGestureRecognizer *singleTap = [[UITapGestureRecognizeralloc] initWithTarget:selfaction:@selector(UesrClicked:)];
    [imageView addGestureRecognizer:singleTap];
    [singleTap release];
    [self.view addSubview:imageView];
```

5. 在UIImageView外层套一个UIView，在外层UIView上添加点击事件处理函数

```UIView*view = [[UIControl alloc] initWithFrame:CGRectMake(50,200,150,150)] ;
view.backgroundColor = [UIColor clearColor];
[(UIControl *)view addTarget:self action:@selector(xxx) forControlEvents:UIControlEventTouchUpInside];
UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"a.gif"]];
imageView.frame = CGRectMake(0, 0, view.bounds.size.width, view.bounds.size.height);
[view addSubview:imageView];
[self.view addSubview:view];
```
