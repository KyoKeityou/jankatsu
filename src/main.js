import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);

// Element Plus のアイコンを全てグローバルコンポーネントとして登録
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}

app.use(ElementPlus);
app.use(router);
app.mount('#app');
