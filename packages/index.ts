import { App } from 'vue'
import WaTable from './waltable'
import WalInput from './walinput'
import WalButton from './walbutton'
export { WaTable, WalInput, WalButton }
const components = [WaTable,WalInput,WalButton]

const install = (app: App) => {
  components.forEach(component => {
    app.use(component)
  })
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
}
