# vue-cli-demo
npm config set registry https://registry.npm.taobao.org
npm config get registry
npm config get prefix

npm install -g @vue/cli
  vue-cli-plugin-eslint
npm install -g @vue/cli-service-global
vue serve
vue build

vue ui

vue create hello-world

 vue add element
 npm install
  node-sass安装失败 升级为dart sass
  npm uninstall node-sass
  npm install sass -S -D

vscode
  - 如何快速生成.vue文件
  - 如何准备快捷生成代码
  - 快捷键
    - 
  AutoSave
  ctrl + -
  View In Browser
  Copy Relative Path
  eslint
    - js配置
    - vscode setting配置
  Local History
  Vetur

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# js异步处理
# axios
- npm install axios
- 在node_modules中的axios目录下的dist正是可以直接引用的js
    - .map是
- promise then catch
- 异步请求 没有同步

- async await

# mock 模拟数据
- npm install mockjs

# 打包
vue-cli-service build --target lib --name myLib

# 自动写入package.json
- npm --save-dev --save

# 动画
- npm install animate.css
  - import 'animate.css'
  - 封装添加动画函数
    -  import { animateCSS } from '../plugins/animatecss' 
      - exports 如果没有default 则要{}

```html
<transition 
  enter-active-class="animated tada"
  leave-active-class="animated hinge">
  <h1 v-show="isShow"> much？</h1>
</transition>
```

# 数组操作
- find
- findIndex
- filter
- map
- reduce
- slice

- vue监听的方法
push()
pop()
shift()
unshift()
splice()
sort()
reverse()

-  props 传到data 仍然是引用
  - 采用deepClone


# npm install uuid

# npm install vuedraggable