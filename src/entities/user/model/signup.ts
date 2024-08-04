import type { SignupRequest } from '../api/signup';

import { requestSignup } from '../api/signup';

export const signup = (value: SignupRequest) => {
    return requestSignup(value);
}
