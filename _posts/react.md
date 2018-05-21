title: 构建自己的前端组件
date: 2018-05-04 15:48:15
tags: react
---
### 先上react.js小书关于前端组件的代码
```javascript
const createDOMFromString = (domString) => {
  const div = document.createElement('div')
  div.innerHTML = domString
  return div
}
class Component {
    setState (state) {
      const oldEl = this.el
      this.state = state
      this._renderDOM()
      if (this.onStateChange) this.onStateChange(oldEl, this.el)
    }

    _renderDOM () {
      this.el = createDOMFromString(this.render())
      return this.el
    }
  }
 class LikeButton extends Component {
    constructor (props) {
      super(props)
      this.state = { isLiked: false }
    }

    onClick () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      return `
        <button class='like-btn' style="background-color: ${this.props.bgColor}">
          <span class='like-text'>
            ${this.state.isLiked ? '取消' : '点赞'}
          </span>
          <span>👍</span>
        </button>
      `
    }
  }
const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM())
    component.onStateChange = (oldEl, newEl) => {
      wrapper.insertBefore(newEl, oldEl)
      wrapper.removeChild(oldEl)
    }
  }
mount(new LikeButton({ bgColor: 'red' }), wrapper)
```
#### 代码说明
1. ```createDOMFromString```方法用于将dom字符串转成dom
2. ```mount```方法用于将组件与页面的dom元素```wrapper```初始化关联
    1. ```onStateChange```应该设置实例组件上面
3. 首先公共的部分抽象成一个component组件，其中包括两个方法
    1. ```setState```子组件调用时，根据state重新渲染组件
    2. ```_renderDOM``` 根据state变化调用```render```方法重新渲染组件
    3. 实例组件必须有实例```render```方法用于父组件调用

#### 参考
1. [React in 160 lines of JavaScript](https://medium.com/@sweetpalma/gooact-react-in-160-lines-of-javascript-44e0742ad60f)
2. [React.js 小书](http://huziketang.mangojuice.top/books/react/)
