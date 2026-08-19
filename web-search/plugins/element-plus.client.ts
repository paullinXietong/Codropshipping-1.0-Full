import {
  ElButton,
  ElCarousel,
  ElCarouselItem,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElInput,
  ElOption,
  ElPagination,
  ElPopover,
  ElSelect,
} from 'element-plus'
import 'element-plus/es/components/base/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/carousel/style/css'
import 'element-plus/es/components/carousel-item/style/css'
import 'element-plus/es/components/collapse/style/css'
import 'element-plus/es/components/collapse-item/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/select/style/css'

export default defineNuxtPlugin((nuxtApp) => {
  const components = [ElButton, ElCarousel, ElCarouselItem, ElCollapse, ElCollapseItem, ElDialog, ElInput, ElOption, ElPagination, ElPopover, ElSelect]
  for (const component of components) nuxtApp.vueApp.component(component.name!, component)
})
