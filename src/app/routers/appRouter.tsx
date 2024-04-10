import {
    createHashRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom';

import { Layout } from '@app/layout';
import { HomePage } from '@pages/homePage';
import { Fallback } from '@shared/ui/fallback';

export const AppRouter = () => {
    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout/>}
            handle={{crumb: <Link to='/'>Главная</Link>}}
            errorElement={<Fallback/>}>
            <Route index element={<HomePage/>}/>
        </Route>
    )

    const router = createHashRouter(routers, {})

    return (<RouterProvider router={router}/>)
}
