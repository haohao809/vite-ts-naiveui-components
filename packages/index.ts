import { App } from 'vue'
import WaTable from './waltable'
export { WaTable }
const components = [WaTable]

const install = (app: App) => {
  components.forEach(component => {
    app.use(component)
  })
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
}
