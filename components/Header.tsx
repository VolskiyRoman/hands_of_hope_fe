import { useContext, useState } from 'react'
import SidebarContext from 'context/SidebarContext'
import {
    OutlinePersonIcon,
    OutlineLogoutIcon,
    SunIcon,
    MoonIcon,
} from 'icons'
import {
    Avatar,
    Dropdown,
    DropdownItem,
    WindmillContext,
} from '@roketid/windmill-react-ui'
import { logoutThunk } from '../store/auth/logoutThunk'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const Header = () => {
    const { mode, toggleMode } = useContext(WindmillContext)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutThunk())
        router.replace('/login')
    }

    const [isProfileOpen, setProfileOpen] = useState(false)
    const toggleProfile = () => setProfileOpen(prev => !prev)

    return (
      <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
          <div className="container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
              <div className="flex items-center space-x-4">
                  {/* Theme toggler */}
                  <button
                    className="rounded-md focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleMode}
                    aria-label="Toggle color mode"
                  >
                      {mode === 'dark' ? (
                        <SunIcon className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <MoonIcon className="w-5 h-5" aria-hidden="true" />
                      )}
                  </button>

                  {/* Profile */}
                  <div className="relative">
                      <button
                        onClick={toggleProfile}
                        aria-label="Account"
                        aria-haspopup="true"
                        className="rounded-full focus:outline-none focus:shadow-outline-purple"
                      >
                          <Avatar
                            className="align-middle"
                            src="/assets/img/profile.png"
                            alt="Profile"
                            aria-hidden="true"
                          />
                      </button>

                      <Dropdown
                        align="right"
                        isOpen={isProfileOpen}
                        onClose={() => setProfileOpen(false)}
                      >
                          <DropdownItem onClick={() => router.push('/user')}>
                              <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                              <span>Профіль</span>
                          </DropdownItem>
                          <DropdownItem onClick={handleLogout}>
                              <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                              <span>Вийти</span>
                          </DropdownItem>
                      </Dropdown>
                  </div>
              </div>
          </div>
      </header>
    )
}

export default Header
