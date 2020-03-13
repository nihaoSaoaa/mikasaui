import Notification from './notification'

let msgInstance;

function getMsgInstance() {
  msgInstance = msgInstance || Notification.newInstance();
  return msgInstance;
}

function notice({ duration = 1.5, content = '', type = '' }) {
  const instance = getMsgInstance();
  instance.add({
    content,
    duration,
    type
  })
}

export default {
  info(options) {
    notice(options)
  },
  success(options) {
    notice(Object.assign(options, { type: 'chenggong' }))
  },
  warn(options) {
    notice(Object.assign(options, { type: 'jinggao' }))
  },
  defeat(options) {
    notice(Object.assign(options, { type: 'shibai' }))
  },
}