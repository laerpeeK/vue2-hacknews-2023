漏桶问题：测试时以单组件测试，而实际调用从main.js出发。所以如果Vue实例属性在组件引用前，已经被注册过，在测试时无法识别到。
解决方法：
1. 调用shallowMount时，通过mocks选项传入对应方法
2. 更改接收数据的方式