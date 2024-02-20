import { Action, Obj } from "@/global/interface";
import { METHOD } from "@/global/enum";
import httpClient from "./axios";

export default async function actionRequest(uri: string, method: METHOD, request?: Action) {
    try {
        let response;
        let parseUri = uri;
        const listReqParams = request?.payload?.query?.params as Array<string>;
        if (listReqParams && !parseUri.includes('$params')) {
            throw new Error('Missing $params item');
        }
        else if (listReqParams && parseUri.includes('$params')) {
            listReqParams.forEach((_, idx) => {
                parseUri = parseUri.replace('$params', (listReqParams)[idx] as string);
            })
        }
        switch (method) {
            case METHOD.GET:
                response = httpClient.get(parseUri as string, { params: request?.payload?.query?.query }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
            case METHOD.POST:
                response = httpClient.post(parseUri as string, request?.payload?.query?.body, { params: request?.payload?.query?.query, ...request?.payload?.query?.headers ? { headers: request?.payload?.query?.headers } : {} }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
            case METHOD.PUT:
                response = httpClient.put(parseUri as string, request?.payload?.query?.body, { params: request?.payload?.query?.query, ...request?.payload?.query?.headers ? { headers: request?.payload?.query?.headers } : {} }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
            case METHOD.DELETE:
                response = httpClient.delete(parseUri as string, { params: request?.payload?.query?.query }).then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        return error.response;
                    }
                );
                break;
        }
        return response;
    } catch (error) {
        return {
            data: {
                isLoading: false,
                message: (error as Obj).message as string,
                status: false
            }
        }
    }
}