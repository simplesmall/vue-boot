# vue-boot

> A Vue intergration framework include Vuex + Vue Router + axios + element-ui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## Compile fetch
```
Utils\request.js for compile common request tool base axios
Utils\request-code.js for record net request back code
```

## Add API
```
// open config/index.js and search for proxyTable,Add as below:
proxyTable: {
  '/api': {
    //设置你调用的接口域名和端口号 别忘了加http eg： https://www.baidu.com/
    target: 'https://www.baidu.com/',
    changeOrigin: true,
    //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://www.baidu.com/user/add'，直接写‘/api/user/add’即可
    pathRewrite: {
      '^/api': ''
    }
  },
  '/zhihu':{
    target: 'https://www.zhihu.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/zhihu':''
    }
  }
}
```
## Use fetch
```javascript
this.$fetch({
    url: '/api/s?wd=好玩&pn=70&oq=好玩&ie=utf-8&usm=1&rsv_pq=eb42c8e40000898e&rsv_t=0f11KvFYYzLxo9ixfH3TVLi5S9Mx9QH84PME77AZ7aEgJDH8HtlBa9GaDrA',
    method: 'get',
    params:{}
    }).then((res) => {
        // 对请求数据的判断和处理
        if (res.code === 200) {
          console.log('Successfully!!!!!!!!!!!!!!!!!')
        }
    })
```
## Vuex
```
src\store\ for single vuex operation,more vuex part is support and suggest in same folder and make special part.
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
