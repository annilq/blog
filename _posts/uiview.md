title: UIView小记
date: 2018-05-22 21:08:21
tags: iOS,UIView
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