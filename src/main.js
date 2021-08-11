import 'lib-flexible/flexible.js'
import '@vant/touch-emulator'
import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import vantComponents from './lazy_components/vant'
import directive from './utils/directive'
import './styles/global.less' // 放在vant组件之后

const app = createApp(App)

app.use(vantComponents).use(store).use(directive).use(router).mount('#app')

app.provide('appState', '初始化成功')
