# vue2-hacknews-2023

未完结

## 说明
1. 实现完整的vue项目开发中的自动化测试流程。

2. 基于该书：《[Testing Vue.js Applications](https://www.manning.com/books/testing-vue-js-applications)》。中文版：《[Vue.js应用测试](https://e.jd.com/30658081.html?cu=true&utm_source=www.baidu.com&utm_medium=tuiguang&utm_campaign=t_1003608409_&utm_term=6246af0c3c234f9d899e9a6c015ab055)》

3. 该书作者，以及作者提供的起始项目：[eddyerburgh/vue-hackernews](https://github.com/eddyerburgh/vue-hackernews)

4. 什么样的人需要此仓库：
  - 具备一定开发经验的人（这是一个项目完整版本，而非像原项目中按章节提供分支的版本，因此您需要从该仓库中提取到对您有效，又或者能解决您遇到的问题的知识。）
  - 安装了较高版本的node / 无法成功安装原作者提供项目中某个依赖 / 不了解``firebase``, 且聚焦测试本身。
  - 想要在使用过程中，自行结合书中提及工具的官方文档：比如jest@27, vue-cli@4, vue-test-utils@1稳定版本。以及如果您如果之后要开启一个新项目，并进行自动化测试，您所安装的测试工具当下2023所提供的有效API而非18年某个依赖版本的API。

5. 该仓库的缺陷：
  - 完整版本而非章节分支版本。
  - 由于我并不了解Firebase的使用，此处根据[HackerNews/API](https://github.com/HackerNews/API)提供的可用API,采用axios来进行数据获取。不存在缓存的情况。因此该仓库仅用于完成自动化测试目的。如果您想要假设一个真正提供服务的网站。您应该实现一套具体的数据缓存方案。避免由于大量数据获取导致的白屏问题。

6. 该书提供章节以及此仓库涉及情况：
  如果您不了解此书，以及想要学习vue项目测试相关的知识。推荐您去阅读该书。
```
  1. Vue程序测试介绍 √
  2. 创建你的第一个测试(Vue Jest Vue-Test-Utils) √
  3. 渲染组件输出测试(测试规范、文本、DOM属性、组件数量、props、class, 样式测试) √
  4. 测试组件方法(公有私有方法、定时器函数、Vue实例添加属性、模拟代码、模拟模块依赖) √
  5. 测试事件(原生DOM事件、vue自定义事件、输入表单) √
  6. vuex介绍 √
  7. 测试vuex(测试vuex store的组成部分，vuex store实例， 组件中的vuex) √
  8. 使用工厂函数组织测试(DRY原则，设计模式，store以及wrapper的工厂函数创建) √
  9. vue-router介绍 √
  10. 测试vue-router(路由属性，RouterLink组件，vuex结合vue-router测试) √
  11. 测试Vue中的mixin和filter(全局，组件内部测试) √
  12. 快照测试 ~ 进行中
  13. 测试服务端渲染 ~ 进行中
  14. 端到端测试 ~ 进行中

```
