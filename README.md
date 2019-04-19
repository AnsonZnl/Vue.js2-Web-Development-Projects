# Vue.js2-Web-Development-Projects
## Book Demo 采坑小结
- [x] 需要在熟悉：computed(计算属性)，watch(侦听)
- [x] 使用阿里巴巴矢量图-https://www.iconfont.cn/
- [x] :class 中有“-”的class要使用''括起来
```
<p :class = "{bgRed: true, 'bg-blue': true}"></p>
```
- [x] 显示收藏的方法，可以在优化,第一次刷新的bug
```
'false' !== false 
```
- [x] 文字不被用户选中
```css
user-select:none;
```
- [x] 刷新出{{ value }} ,解决方案： 
```html
css: [v-cloak]{display:none;}
html: <p v-cloak>{{ value }}</p>
```

待改进：
- [ ] 无收藏状态的提示信息
- [ ] 列表和perView的滚动条
- [ ] 后续可以放在服务器上，使用Node存在mgOB中
** 代码参考：示例 **  
- https://github.com/AnsonZnl/Vue-js-2-Web-Development-Projects
- https://github.com/AnsonZnl/packt-vue-project-guide
- https://cn.vuejs.org/
