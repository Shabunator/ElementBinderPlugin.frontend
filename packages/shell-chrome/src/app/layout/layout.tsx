import { Outlet } from 'react-router-dom';

import { Text, Button, Icon } from '@gravity-ui/uikit';
import { FileArrowDown } from '@gravity-ui/icons';

import './layout.css';

export const Layout = () => {
    return (
        <div className='layout'>
            <header className="layout__header">
                <Text
                    variant="header-1"
                    className="layout__title"
                >
                    Element binder plugin
                </Text>
                <div className="layout__buttonRow">
                    <Button view="action" size="l">
                        <Icon data={FileArrowDown} size={18}/>
                    </Button>
                </div>
            </header>
            <main className="layout__main">
                <Outlet/>
            </main>
        </div>
    )
}
