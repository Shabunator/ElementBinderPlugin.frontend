import { Outlet } from 'react-router-dom';
import { House } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';

import './layout.css';

export const Layout = () => {
    return (
        <div className='layout'>
            <header className="layout__header">
                <div className="header__container">
                    <Icon data={House} size={26} />
                    Name
                </div>
            </header>
            <main className="layout__main">
                <Outlet/>
            </main>
        </div>
    )
}
