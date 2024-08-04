import { request } from "@shared/utils/request";

export type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

export const requestRefreshToken = (token: string) => {
    return request<RefreshTokenResponse>('http://localhost:8082/api/v1/auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: token })
    })
        .then()
        .catch();
}
