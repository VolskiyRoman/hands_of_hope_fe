import Link from 'next/link'
import routes, {routeIsActive} from 'routes/sidebar'
import * as Icons from 'icons'
import {IIcon} from 'icons'
import SidebarSubmenu from './SidebarSubmenu'
import {useRouter} from 'next/router'

function Icon({icon, ...props}: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon]
  return <Icon {...props} />
}

interface ISidebarContent {
  linkClicked: () => void
}

function SidebarContent({linkClicked}: ISidebarContent) {
  const {pathname} = useRouter();
  const appName = process.env.NEXT_PUBLIC_APP_NAME

  return (
    <div className="text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-3 px-5 pt-5">
        <img
          src="/assets/img/main-logo.png"
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-lg font-bold text-gray-800 dark:text-white tracking-wide">
          HANDS OF HOPE
        </h1>
      </div>
      <Link href="/#" passHref>
        <div className='ml-6 py-6'>
          <a
            className="text-lg font-bold text-gray-800 dark:text-gray-200"
          >
            {appName}
          </a>
        </div>
      </Link>
      <ul>
        {routes
          .filter(route => route.name !== 'Профіль' && route.name !== 'Сторінки')
          .map((route) =>
            route.routes ? (
              <SidebarSubmenu route={route} key={route.name} linkClicked={linkClicked}/>
            ) : (
              <li className='relative px-6 py-3' key={route.name}>
                <Link href={route.path || '#'} scroll={false}>
                  <a
                    className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                      routeIsActive(pathname, route)
                        ? 'dark:text-gray-100 text-gray-800'
                        : ''
                    }`}
                    onClick={linkClicked}
                  >
                    {routeIsActive(pathname, route) && (
                      <span
                        className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                        aria-hidden='true'
                      ></span>
                    )}

                    <Icon
                      className='w-5 h-5'
                      aria-hidden='true'
                      icon={route.icon || ''}
                    />
                    <span className='ml-4'>{route.name}</span>
                  </a>
                </Link>
              </li>
            )
          )}
      </ul>
      <div className="px-6 my-6">
      </div>
    </div>
  )
}

export default SidebarContent