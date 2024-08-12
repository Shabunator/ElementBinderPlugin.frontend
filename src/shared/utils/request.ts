import { getToken } from '@shared/utils/token';
import { refreshToken } from '@shared/model';

type inputType = string | URL;

type requestReturn<T> = {
    code: string
} | {
    state: 'hasData';
    data: T;
} | {
    state: 'hasError';
    error: Record<string, string>;
};

export const modifiedFetch = (input: inputType, init?: RequestInit): Promise<Response> => {
    const options: RequestInit = Object.assign({
        cache: 'no-store',
        credentials: 'include',
        method: 'GET',
        redirect: 'error',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    }, init);

    return fetch(input, options)
}

export const request = <T>(input: inputType, init?: RequestInit): Promise<requestReturn<T>> => {
    return modifiedFetch(input, init)
        .then(async (res) => {
            if (res.status === 401) {
                const data = await refreshToken();

                if (data.state === 'hasError') {
                    return { code: 'refreshTokenError' };
                }
                console.log('@refreshToken', data);
            }

            return res;
        })
        .then(async (res) => {
            if (!(res instanceof Response)) {
                return res;
            }

            const data = await res.json();

            if (res.ok) {
                return { state: 'hasData', data };
            }

            return { state: 'hasError', error: data };
        })
        .then()
        .catch((ex) => ({ state: 'hasError', error: ex }));
}
