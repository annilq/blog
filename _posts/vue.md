title: vue小记
date: 2016-10-14 21:28:01
tags: vue
---

1. 首先通过构造函数传入vue实例的作用域el
在el上面查找所有的vue指令生成一个array
```javascript
selector= Object.keys(Directives).map(function (d) {
        return '[' + prefix + '-' + d + ']'
    }).join()
els  = root.querySelectorAll(selector)
```
2. 解析使用指令的dom的，返回一个object,里面包含指令所需的数据key,filter,update(）
```javascript
{
    "attr": attr,//包含指令的key,value
    "key": key,//该directive依赖的外部数据
    "filters": filters,//model 用的filter
    "definition": def,//内部的directive name
    "argument": arg,
    /*
    如果指令名字是function，则使用function做为model change
    handle，如果指令是一个对象，则使用对象自己实现的update做为model change
    handle（所以每一个自定义指令都要实现update方法
    */
    "update": typeof def === 'function' ? def: def.update
}
```
3. 之后将dom中的指令标记删除恢复到普通的dom
并且整理出directive需要的key,
再将数据key与对应的directive生成一个依赖map(当key发生变化时会更新对应的directive)
```javascript
/*
directive为以来此数据的指令，value为key实际的值
*/
{
	key:{directive:[],value}
}
```
最后设置当前key的setter与getter方法,在调用setter方法中设置当前数据对象的值并且依次调用依赖directive中的update方法实现view model的更新
```javascript
Object.defineProperty(seed.scope, key, {
        get: function () {
            return binding.value
        },
        set: function (value) {
            binding.value = value
            binding.directives.forEach(function (directive) {
                if (value && directive.filters) {
                    value = applyFilters(value, directive)
                }
                directive.update(
                    directive.el,
                    value,
                    directive.argument,
                    directive,
                    seed
                )
            })
        }
    })
```
