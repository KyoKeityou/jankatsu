import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'; // 1. element-plusのインポート
import 'element-plus/theme-chalk/index.css'; // 1. element-plusのCSSファイルをインポート

// 2. element-plusのコンポーネントをグローバルに登録
const app = createApp(App);
app.use(ElementPlus);

app.mount('#app');
