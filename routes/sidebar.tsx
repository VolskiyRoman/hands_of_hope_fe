/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute{
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive (pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/',
    icon: 'HomeIcon',
    name: 'Головна',
    exact: true,
  },
  {
    path: '/forms',
    icon: 'FormsIcon',
    name: 'Форми',
  },
  {
    path: '/charts',
    icon: 'ChartsIcon',
    name: 'Графіки',
  },
  {
    path: '/buttons',
    icon: 'ButtonsIcon',
    name: 'Кнопки',
  },
  {
    path: '/modals',
    icon: 'ModalsIcon',
    name: 'Модальні вікна',
  },
  {
    path: '/tables',
    icon: 'TablesIcon',
    name: 'Таблиці',
  },
  {
    path: '/articles',
    icon: 'TablesIcon',
    name: 'Корисні статті',
  },
  {
    path: '/help',
    icon: 'CardsIcon',
    name: 'Допомога',
  },
  {
    icon: 'PagesIcon',
    name: 'Сторінки',
    routes: [
      {
        path: '/login',
        name: 'Увійти',
      },
      {
        path: '/create-account',
        name: 'Створити акаунт',
      },
      {
        path: '/forgot-password',
        name: 'Забув пароль',
      },
      {
        path: '/404',
        name: '404',
      },
      {
        path: '/blank',
        name: 'Пуста сторінка',
      },
    ],
  },
]

export type {IRoute}
export default routes
