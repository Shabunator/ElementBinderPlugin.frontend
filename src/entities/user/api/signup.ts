import { request } from "@shared/utils/request";
import { REGISTER } from '@shared/utils/url';

export type SignupRequest = {
    name: string;
    email: string;
    password: string;
}

export type SignupResponse = {
    message: string;
}

export const requestSignup = (signupRequest: SignupRequest) => {
    return request<SignupRequest>(REGISTER, {
        method: 'POST',
        body: JSON.stringify(signupRequest),
    })
        .then()
        .catch();
}
