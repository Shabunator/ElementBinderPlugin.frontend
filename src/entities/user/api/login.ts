import { request } from "@shared/utils/request";
import { SIGN_IN, LOGOUT } from '@shared/utils/url';

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refreshToken: string;
}

export const requestLogin = (loginRequest: LoginRequest) => {
    return request<LoginResponse>(SIGN_IN, {
        method: 'POST',
        body: JSON.stringify(loginRequest),
    })
        .then()
        .catch();
}

export type LogoutResponse = {
    message: string;
};

export const requestLogout = () => {
    return request<LogoutResponse>(LOGOUT, { method: 'POST' })
        .then()
        .catch();
}
