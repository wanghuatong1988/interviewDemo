import Vue from 'vue'
import Router from 'vue-router'
import css from '@/components/web/css'
import es6 from '@/components/web/es6'
import git from '@/components/web/git'
import html from '@/components/web/html'
import js from '@/components/web/js'
import networke from '@/components/web/networke'
import other from '@/components/web/other'
import vue from '@/components/web/vue'
import webpack from '@/components/web/webpack'
import inputSelect from '@/components/input-select'
import tabSelect from '@/components/tab-select'
import dragEnlargeRotate from '@/components/drag-enlarge-rotate'
import vant from '@/components/web/vant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'css',
      component: css
    },
    {
      path: '/es6',
      name: 'es6',
      component: es6
    },
    {
      path: '/git',
      name: 'git',
      component: git
    },
    {
      path: '/html',
      name: 'html',
      component: html
    },
    {
      path: '/js',
      name: 'js',
      component: js
    },
    {
      path: '/networke',
      name: 'networke',
      component: networke
    },
    {
      path: '/other',
      name: 'other',
      component: other
    },
    {
      path: '/vue',
      name: 'vue',
      component: vue
    },
    {
      path: '/webpack',
      name: 'webpack',
      component: webpack
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
    }
  ]
})
