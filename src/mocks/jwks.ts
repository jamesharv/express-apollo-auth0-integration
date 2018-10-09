import * as nock from "nock";

export const jwksEndpoint = (host, certs): any =>
  nock(host)
    .get("/.well-known/jwks.json")
    .reply(200, {
      keys: certs.map((cert) =>
        ({
          alg: "RS256",
          kid: cert.kid,
          kty: "RSA",
          use: "sig",
          x5c: [
            /-----BEGIN CERTIFICATE-----([^-]*)-----END CERTIFICATE-----/g.exec(cert.pub)[1].replace(/[\n|\r\n]/g, ""),
          ],
        })),
    });
