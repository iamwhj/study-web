import add from './add.js'
import { createApp } from 'vue'
import App from './app.vue'
import './index.css'

console.log(add(1, 4));

createApp(App).mount('#app')
