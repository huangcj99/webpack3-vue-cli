import { Toast } from 'mint-ui'

const toast = (errorMsg) => {
  Toast(errorMsg)
}

const setErrorMsgToVue = (vueCompCtx, bindData, errorMsg) => {
  vueCompCtx[bindData + 'Error'] = errorMsg
}

const resetErrorMsgInVue = (vueCompCtx, bindData) => {
  vueCompCtx[bindData + 'Error'] = ''
}

export default {
  toast,
  setErrorMsgToVue,
  resetErrorMsgInVue
}