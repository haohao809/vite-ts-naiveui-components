import { App } from 'vue'
import WalInput from './src/walinput.vue'
export default {
   install(app: App) {
      app.component('wal-input', WalInput)
   }
}