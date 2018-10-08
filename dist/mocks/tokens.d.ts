export declare const createToken: (key: any, kid: any, payload: any) => string;
export declare const createSymmetricToken: (key: any, payload: any) => string;
export declare const decoded: {
    header: {
        alg: string;
        kid: string;
        typ: string;
    };
    payload: {
        at_hash: string;
        aud: string;
        exp: number;
        iss: string;
        nonce: string;
        sub: string;
    };
};
