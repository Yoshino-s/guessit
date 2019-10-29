import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Final from './views/Final.vue';


Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: '/guessit/',
  routes: [
    {
      path: '/final',
      name: 'final',
      component: Final,
    },
    {
      path: '/*',
      name: 'home',
      component: Home,
    },
  ],
});
