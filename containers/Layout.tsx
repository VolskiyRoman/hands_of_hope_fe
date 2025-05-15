import {useContext} from 'react'
import SidebarContext, {SidebarProvider} from 'context/SidebarContext'
import Sidebar from 'components/Sidebar'
import Header from 'components/Header'
import Main from './Main'
import ReduxProvider from "../store/reduxProvider";


interface ILayout {
  children: React.ReactNode
}

function Layout({children}: ILayout) {
  const {isSidebarOpen} = useContext(SidebarContext)

  return (
    <ReduxProvider>
      <SidebarProvider>
        <div
          className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
        >
          <Sidebar/>
          <div className="flex flex-col flex-1 w-full">
            <Header/>
            <Main>
              {children}
            </Main>
          </div>
        </div>
      </SidebarProvider>
    </ReduxProvider>
  )
}

export default Layout