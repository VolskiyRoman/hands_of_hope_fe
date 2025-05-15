import { useContext, useState } from 'react'
import SidebarContext from 'context/SidebarContext'
import {
    BellIcon,
    OutlinePersonIcon,
    OutlineCogIcon,
    OutlineLogoutIcon, SunIcon, MoonIcon,
} from 'icons'
import {
    Avatar,
    Badge,
    Dropdown,
    DropdownItem,
    WindmillContext,
} from '@roketid/windmill-react-ui'

const Header = () => {
    const { mode, toggleMode } = useContext(WindmillContext)
    const { toggleSidebar } = useContext(SidebarContext)

    const [isNotificationsOpen, setNotificationsOpen] = useState(false)
    const [isProfileOpen, setProfileOpen] = useState(false)

    const toggleNotifications = () => setNotificationsOpen(prev => !prev)
    const toggleProfile = () => setProfileOpen(prev => !prev)

    return (
        <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
            <div className="container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                {/* <!-- Theme toggler --> */}
                <li className="flex">
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
                </li>
                {/* Profile */}
                <div className="relative ml-4">
                    <button
                        onClick={toggleProfile}
                        aria-label="Account"
                        aria-haspopup="true"
                        className="rounded-full focus:outline-none focus:shadow-outline-purple"
                    >
                        <Avatar
                            className="align-middle"
                            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                            alt=""
                            aria-hidden="true"
                        />
                    </button>

                    <Dropdown align="right" isOpen={isProfileOpen} onClose={() => setProfileOpen(false)}>
                        <DropdownItem tag="a" href="#">
                            <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                            <span>Profile</span>
                        </DropdownItem>
                        <DropdownItem tag="a" href="#">
                            <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                            <span>Settings</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => alert('Log out!')}>
                            <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                            <span>Log out</span>
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

export default Header
