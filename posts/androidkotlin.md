---
title:  android kotlin小记
date: 2022-05-13 11:56:40
tags: android kotlin
---

### android的双向绑定
1. 启用buildFeatures的dataBinding功能
2. 将生成的FragmentBinding 膨胀布局
    ```kotlin 
    val fragmentBinding = FragmentFlavorBinding.inflate(inflater, container, false)
    ```
3. ViewModel 首先要用Viewmodel类用来持久化数据
4. 利用binding的lifecycleOwner与livedata数据来实现model 对view的绑定
    ```kotlin
    binding?.apply {
            viewModel = sharedViewModel
            lifecycleOwner = viewLifecycleOwner
            flavorFragment = this@FlavorFragment
        }
    ```
5. 将当前fragment与model 加入到binding中，以便view引用data和fun
6. 多个fragment可以[共享viewMode](https://developer.android.google.cn/topic/libraries/architecture/viewmodel.html?hl=zh-cn#sharing)


#### 真机调试
1. [android oppo 驱动,Android Studio无法连接OPPO](https://blog.csdn.net/weixin_34119722/article/details/117611420)
2. bios 来安装模拟器

#### Android打包
[Android Studio中生成APK文件、修改设置版本号](https://blog.csdn.net/xiaohelan/article/details/105514531)
