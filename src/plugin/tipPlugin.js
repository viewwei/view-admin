import { Message } from 'element-ui'
import i18n from '@/lang/index'
const Tip = {
  success({
    message = i18n.t('success'),
    duration = 1,
    callback
  }) {
    Message.success(
      {
        duration,
        message
      }
    )
    setTimeout(() => {
      callback && callback()
    }, duration * 1000)
  },
  error({
    message = i18n.t('success'),
    duration = 1,
    callback
  }
  ) {
    Message.error(
      {
        duration,
        message
      }
    )
    setTimeout(() => {
      callback && callback()
    }, duration * 1000)
  }

}
Tip.install = (Vue, options) => {
  Vue.prototype.$tip = Tip
}
export default Tip
