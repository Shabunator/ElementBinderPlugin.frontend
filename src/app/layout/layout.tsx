import { Outlet } from 'react-router-dom';
import { Text, Button, Icon } from '@gravity-ui/uikit';
import { Xmark } from '@gravity-ui/icons';

import './layout.css';

export const Layout = () => {
    return (
        <div className='layout'>
            <header className="layout__header">
                <Text variant="header-1">Element binder plugin</Text>
                <Button view="flat" size="l">
                    <Icon data={Xmark} size={18}/>
                </Button>
            </header>
            <main className="layout__main">
                <Outlet/>
            </main>
        </div>
    )
}
