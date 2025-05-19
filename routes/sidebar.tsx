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
    path: '/articles',
    icon: 'ButtonsIcon',
    name: 'Корисні статті',
  },
  {
    path: '/help',
    icon: 'FormsIcon',
    name: 'Допомога',
  },
  {
    path: '/user',
    icon: 'CardsIcon',
    name: 'Профіль',
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
        path: '/404',
        name: '404',
      },
    ],
  },
]

export type {IRoute}
export default routes
