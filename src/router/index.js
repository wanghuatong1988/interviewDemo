import Vue from 'vue'
import Router from 'vue-router'
import css from '@/components/web/css'
import js from '@/components/web/js'
import inputSelect from '@/components/input-select'
import tabSelect from '@/components/tab-select'
import dragEnlargeRotate from '@/components/drag-enlarge-rotate'
import vant from '@/components/web/vant'
import jsFn from '@/components/web/js-fn'
import jsOther from '@/components/web/js-other'
import elementUi from '@/components/element-ui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'css',
      component: css
    },
    {
      path: '/js',
      name: 'js',
      component: js
    },
    {
      path: '/tabselect',
      name: 'tab-select',
      component: tabSelect
    },
    {
      path: '/inputselect',
      name: 'input-select',
      component: inputSelect
    },
    {
      path: '/dragenlargerotate',
      name: 'drag-enlarge-rotate',
      component: dragEnlargeRotate
    },
    {
      path: '/vant',
      name: 'vant',
      component: vant
    },
    {
      path: '/jsfn',
      name: 'jsfn',
      component: jsFn
    },
    {
      path: '/jsother',
      name: 'jsOther',
      component: jsOther
    },
    {
      path: '/elementui',
      name: 'elementui',
      component: elementUi
    }
  ]
})
