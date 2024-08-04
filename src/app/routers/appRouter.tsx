import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom';

import { Layout } from '@app/layout';
import { HomePage } from '@pages/homePage';
import { LoginPage } from '@pages/loginPage';
import { SignUpPage } from '@pages/signUpPage';
import { Projects } from '@pages/projects';
import { Fallback } from '@shared/ui/fallback';

export const AppRouter = () => {
    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout/>}
            handle={{crumb: <Link to='/'>Главная</Link>}}
            errorElement={<Fallback/>}>
            <Route index element={<HomePage/>} />
            <Route path='login' element={<LoginPage />}/>
            <Route path='signup' element={<SignUpPage />}/>
            <Route path='projects' element={<Projects />}/>
        </Route>
    )

    const router = createBrowserRouter(routers)

    return (<RouterProvider router={router}/>)
}
