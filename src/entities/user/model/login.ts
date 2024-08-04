import type { LoginRequest } from '../api/login';

import { removeRefreshToken, removeToken, setRefreshToken, setToken } from '@shared/utils/token';

import { requestLogin, requestLogout } from '../api/login';

export const login = async (value: LoginRequest) => {
    const response = await requestLogin(value);
    if (response.state === 'hasData') {
        const { token, refreshToken } = response.data;
        setToken(token);
        setRefreshToken(refreshToken);
    }

    return response;
}

export const logout = async () => {
    const response = await requestLogout();
    if (response.state === 'hasData') {
        removeToken();
        removeRefreshToken();
    }

    return response;
}
