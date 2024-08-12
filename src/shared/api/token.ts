import { request } from "@shared/utils/request";
import { REFRESH_TOKEN } from '@shared/utils/url';

export type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

export const requestRefreshToken = (token: string) => {
    return request<RefreshTokenResponse>(REFRESH_TOKEN, {
        method: 'POST',
        body: JSON.stringify({ refreshToken: token })
    })
        .then()
        .catch();
}
