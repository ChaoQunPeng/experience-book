import Vue from 'vue';
import VueRouter from 'vue-router';
import { APP_CONFIG } from '../config/app-config';

Vue.use(VueRouter);

import Home from '../views/home/home-index.vue';
import Detail from '../views/detail/index.vue';
import Record from '../views/record/index.vue';
import Edit from '../views/edit/index.vue';
import Recycle from '../views/recycle/index.vue';
import Chart from '../views/chart/index.vue';

import Layout from '../layout/layout.vue';
import LockScreen from '../layout/lock-screen.vue';
import Webpage from '../layout/web-page.vue';
import Book from '../layout/book.vue';

const routes = [
  {
    path: '',
    components: {
      layout: Layout
    },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          title: '首页'
        }
      },
      {
        path: 'detail/:id',
        component: Detail,
        name: 'detail',
        meta: {
          title: '经验列表'
        }
      },
      {
        path: 'record/:id',
        component: Record,
        name: 'record',
        meta: {
          title: '记录'
        }
      },
      {
        path: 'edit/:experienceId',
        component: Edit,
        name: 'edit',
        meta: {
          title: '编辑'
        }
      },
      {
        path: 'recycle',
        component: Recycle,
        name: 'recycle',
        meta: {
          title: '回收站'
        }
      },
      {
        path: 'chart',
        component: Chart,
        name: 'chart',
        meta: {
          title: '回收站'
        }
      },
      { path: '', component: Home, redirect: '/home' }
    ]
  },
  {
    path: '/lock-screen',
    name: 'lock-screen',
    components: {
      lock: LockScreen
    },
    meta: {
      title: '锁屏'
    }
  },
  {
    path: '/web-page',
    name: 'web-page',
    components: {
      webpage: Webpage
    },
    meta: {
      title: '文章内容'
    }
  },
  {
    path: '/book',
    name: 'book',
    components: {
      book: Book
    }
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes,
  linkActiveClass: 'actived'
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${APP_CONFIG.APP_NAME}-${to.meta.title}`;
  } else {
    document.title = `${APP_CONFIG.APP_NAME}-${to.name}`;
  }

  next(true);
});

export { router };
