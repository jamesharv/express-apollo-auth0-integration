import * as jwt from "jsonwebtoken";

export const createToken = (key, kid, payload): string =>
  jwt.sign(payload, key, { noTimestamp: true, algorithm: "RS256", header: { alg: "RS256", kid } });

export const createSymmetricToken = (key, payload): string =>
  jwt.sign(payload, key, { noTimestamp: true, algorithm: "HS256", header: { alg: "HS256" } });

export const decoded = {
    header: {
      alg: "RS256",
      kid: "a1bc",
      typ: "JWT",
    },
    payload: {
      at_hash: "wAEC_qrrm3tSY6OVOkrhhg",
      aud: "test.foo.com",
      exp: Math.floor(Date.now() / 1000) + 3600, // Set to hour in future.
      iss: "https://test.foo.com/",
      nonce: "_aH8GeQoqhh6aP4nQ3j3jn3iL-OKzHjk",
      sub: "auth0|59475404a6fbca179c82244e",
      "http://getequiem.com/portal": "503d1723-764c-4fef-b5e3-e9efaa840433",
      "http://getequiem.com/user": "f2cc358c-11cb-4ca7-b176-918585028f34",
    },
  };
