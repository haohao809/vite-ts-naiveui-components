import { App } from 'vue'
import WaTable from './src/watable.vue'
export default {
   install(app: App) {
      app.component('wa-table', WaTable)
   }
}
