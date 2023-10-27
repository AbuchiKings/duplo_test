const axios = require('axios');

type axiosParams = {
    verb?: String,
    headers?: Record<string, string>,
    payload?: any,
    url: String,
}
const defaultHeaders = {
    'content-type': 'application/json',
    'cache-control': 'no-cache',
    'connection': 'keep-alive',
};
export const requestHandler = async ({ verb, payload, url, headers = defaultHeaders }: axiosParams) => {
    const method = verb || 'get';
    return axios({
        data: payload,
        url: url,
        method,
        headers,
    });
};

