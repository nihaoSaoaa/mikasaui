import Vue from 'vue'
import MiAlert from  './MiAlert.vue'

MiAlert.newInstance = ( props = {} ) => {
  const Instance = new Vue({
    data: props,
    render: h => h(MiAlert, { props })
  })

  const component = 
  Instance.$mount();
  document.body.appendChild(component.$el)

  const alert = Instance.$children[0];
  return {
    add(notice) {
      alert.add(notice);
    },
    remove(name) {
      alert.remove(name);
    }
  }
}

export default MiAlert;