import { request } from "@shared/utils/request";

export type SignupRequest = {
    name: string;
    email: string;
    password: string;
}

export type SignupResponse = {
    message: string;
}

export const requestSignup = (signupRequest: SignupRequest) => {
    return request<SignupRequest>('http://localhost:8082/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(signupRequest),
    })
        .then()
        .catch();
}
