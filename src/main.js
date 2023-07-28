import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // ルーターのインポート
import ElementPlus from 'element-plus'; // element-plusのインポート
import 'element-plus/theme-chalk/index.css'; // element-plusのCSSファイルのインポート

createApp(App)
  .use(router) // ルーターをアプリケーションに適用
  .use(ElementPlus) // element-plusをアプリケーションに適用
  .mount('#app');
