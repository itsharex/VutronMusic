import {
  LocalMusicScreen,
  SystemSettings,
  ErrorScreen,
  LoginAccount,
  LibraryMusic,
  AlbumPage,
  ArtistPage,
  UserPage,
  MvPage,
  SearchPage,
  HomePage,
  ExplorePage,
  PlaylistPage,
  DailyTracks
} from '../views'
import { createRouter, createWebHashHistory } from 'vue-router'
import { isAccountLoggedIn } from '../utils/auth'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      titleKey: 'nav.home',
      keepAlive: true,
      savePosition: true
    }
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExplorePage,
    meta: {
      titleKey: 'nav.search',
      keepAlive: true,
      savePosition: true
    }
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryMusic,
    meta: {
      titleKey: 'nav.library',
      requireLogin: true
    }
  },
  {
    path: '/library/liked-songs',
    name: 'likedSongs',
    component: PlaylistPage,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/localMusic',
    name: 'localMusic',
    component: LocalMusicScreen,
    meta: {
      titleKey: 'nav.localMusic'
      // keepAlive: true,
      // savePosition: true
    }
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: PlaylistPage
  },
  {
    path: '/localPlaylist/:id',
    name: 'localPlaylist',
    component: PlaylistPage
  },
  {
    path: '/settings',
    name: 'settings',
    component: SystemSettings,
    meta: {
      titleKey: 'nav.settings'
    }
  },
  {
    path: '/daily/songs',
    name: 'dailySongs',
    component: DailyTracks,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorScreen,
    meta: {
      titleKey: 'title.error'
    }
  },
  {
    path: '/login/account',
    name: 'loginAccount',
    component: LoginAccount,
    meta: {
      titleKey: 'title.login'
    }
  },
  {
    path: '/album/:id',
    name: 'album',
    component: AlbumPage
  },
  {
    path: '/artist/:id',
    name: 'ArtistPage',
    component: ArtistPage,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserPage
  },
  {
    path: '/mv/:id',
    name: 'mv',
    component: MvPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (isAccountLoggedIn()) {
      next()
    } else {
      next('/login/account')
    }
  } else {
    next()
  }
})

export default router
