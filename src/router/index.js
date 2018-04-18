import Vue from 'vue'
import Router from 'vue-router'
import css from '@/components/css'
import es6 from '@/components/es6'
import git from '@/components/git'
import html from '@/components/html'
import js from '@/components/js'
import networke from '@/components/networke'
import other from '@/components/other'
import vue from '@/components/vue'
import webpack from '@/components/webpack'
import inputSelect from '@/components/input-select'

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
      path: '/inputselect',
      name: 'inputselect',
      component: inputSelect
    }
  ]
})
