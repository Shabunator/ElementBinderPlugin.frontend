import { LoginForm } from '@widgets/loginForm';
import { AuthenticationLayout } from '@shared/ui/layoutAuthentication';

export const LoginPage = () => {
    return(
        <AuthenticationLayout>
            <LoginForm />
        </AuthenticationLayout>
    );
}
