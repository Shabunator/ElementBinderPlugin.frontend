import {
    createBrowserRouter,
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
            <Route index element={<HomePage/>} />
            <Route path="/packages/shell-chrome/index.html" element={<HomePage/>} />
        </Route>
    )

    const router = createBrowserRouter(routers)

    return (<RouterProvider router={router}/>)
}
