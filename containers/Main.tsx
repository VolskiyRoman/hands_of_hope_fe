import React, { ReactNode } from 'react'

interface IMainProps {
    children: ReactNode
}

function Main({ children }: IMainProps) {
    return (
        <main className="h-full overflow-y-auto py-8">
            <div className="container px-6 mx-auto">
                {children}
            </div>
        </main>
    )
}

export default Main
