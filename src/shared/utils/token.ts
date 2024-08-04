export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) as string
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY) as string
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}
