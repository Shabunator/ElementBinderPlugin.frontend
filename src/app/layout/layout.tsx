import { useCallback, useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Text, Button, Icon } from '@gravity-ui/uikit';
import { ArrowRightToLine, FileArrowDown } from '@gravity-ui/icons';

import { postMessage } from '@shared/utils';

import './layout.css';

const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
        const cr = entry.contentRect;
        postMessage('change-height', { height: cr.height });
    }
});

export const Layout = () => {
    const myRef = useRef<HTMLDivElement | null>(null);
    const closeHandler = useCallback(() => {
        postMessage('click-extension-button', { isMenuOpen: false });
    }, []);

    useLayoutEffect(() => {
        const node = myRef.current;
        if (node instanceof HTMLDivElement) {
            ro.observe(node);
            return () => ro.unobserve(node);
        }
    }, [myRef]);

    return (
        <div className='layout' ref={myRef}>
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
                    <Button view="flat" size="l" onClick={closeHandler}>
                        <Icon data={ArrowRightToLine} size={18}/>
                    </Button>
                </div>
            </header>
            <main className="layout__main">
                <Outlet/>
            </main>
        </div>
    )
}
