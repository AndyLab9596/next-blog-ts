import React, { Fragment } from 'react'
import MainNavigation from './main-navigation'

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout