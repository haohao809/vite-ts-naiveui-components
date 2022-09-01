import { App } from 'vue'
import WalButton from './src/walbutton.vue'
export default {
   install(app: App) {
      app.component('wal-button', WalButton)
   }
}