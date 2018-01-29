import Vue from 'vue'
import Router from 'vue-router'
import css from '@/components/css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'css',
      component: css
    }
  ]
})
