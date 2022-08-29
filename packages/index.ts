import { App } from 'vue'
import WaTable from './waltable'
import WalInput from './walinput'
export { WaTable, WalInput}
const components = [WaTable,WalInput]

const install = (app: App) => {
  components.forEach(component => {
    app.use(component)
  })
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
}
