# test

> ex

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

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
# 好记性不如破笔头，记录前端笔记
  - [css、es6、git、html、js、networke、other、vue、webpack]
# 组件开发
  - inputSearch  [下拉搜索组件 /src/components/input-select](http://chuantu.biz/t6/289/1524031014x-1404793244.gif)
```
  这是一款下拉搜索的插件，像类似下拉搜索的实现还算比较简单
  只需全局对键盘进行监听，没有实现太多的配置，一般需求是够用
  参数的设置有如下：
  @  getSearchName 获取搜索内容
  @  data 数据格式 [{label: '飞机', value: 1}]
  @  width 设置搜索框宽度
  @  visibleInput 是否显示搜索框
```