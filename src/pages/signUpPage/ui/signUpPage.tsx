import { SignUpForm } from '@widgets/signUpForm';
import { AuthenticationLayout } from '@shared/ui/layoutAuthentication';

export const SignUpPage = () => {
    return(
        <AuthenticationLayout>
            <SignUpForm />
        </AuthenticationLayout>
    );
}
