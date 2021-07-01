// 导入组件
import Toast from './Toast';

const obj = {};

// install方法
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.new 根据组件构造器，创建一个组件对象  new一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'));

  // 4. 将挂载了组件对象的元素添加到body toast.$el 对应的是div
  document.body.appendChild(toast.$el);

  // 5.将组件对象挂载到Vue的原型上
  Vue.prototype.$toast = toast;
}

//暴露当前插件
export default obj;

//https://www.jianshu.com/p/a11b6b22c439
