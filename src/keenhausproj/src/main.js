import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ElementUI);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import VueGistEmbed from 'vue-gist-embed';
Vue.use(VueGistEmbed);

// import VueEmbedGist from "vue-embed-gist";
// Vue.use(VueEmbedGist);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
