import { request } from "@shared/utils/request";

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refreshToken: string;
}

export const requestLogin = (loginRequest: LoginRequest) => {
    return request<LoginResponse>('http://localhost:8082/api/v1/auth/signin', {
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
    return request<LogoutResponse>('http://localhost:8082/api/v1/auth/logout', { method: 'POST' })
        .then()
        .catch();
}
