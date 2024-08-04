import { getToken, setRefreshToken, setToken } from "@shared/utils/token.ts";
import { requestRefreshToken } from "@shared/api";

export const refreshToken = async () => {
    const token = getToken();
    const response = await requestRefreshToken(token);
    if (response.state === 'hasData') {
        const { accessToken, refreshToken } = response.data;
        setToken(accessToken);
        setRefreshToken(refreshToken);
    }

    return response;
}
