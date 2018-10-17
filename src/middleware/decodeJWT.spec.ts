import { expect, use as chaiUse } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as httpMocks from "node-mocks-http";
import * as sinon from "sinon";
import { jwksEndpoint } from "../mocks/jwks";
import { privateKey, publicKey, x5cSingle } from "../mocks/keys";
import { createToken, decoded } from "../mocks/tokens";
import { decodeJWT } from "./decodeJWT";

// tslint:disable:no-unsafe-any
// tslint:disable:deprecation

chaiUse(chaiAsPromised);

/**
 * Tests for JWT Authorization.
 */
@suite(timeout(300), slow(50))
export class DecodeJWTMiddlewareSpec {
  protected jwksHost = "https://test.foo.com";
  protected jwt: string;

  public async before(): Promise<void> {
    this.jwt = createToken(privateKey, "a1bc", decoded.payload);
    jwksEndpoint(this.jwksHost, [ { pub: publicKey, kid: "a1bc" } ]);
  }

  @test("No Auth header does nothing")
  public async noAuthHeader(): Promise<void> {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    await decodeJWT()(req, res, next);
    expect(next.called);
    expect(req.jwt).to.equal(undefined);
  }

  @test("Invalid Auth header does nothing")
  public async invalidAuthHeaderError(): Promise<void> {
    const req = httpMocks.createRequest({
      headers: {
        authorization: "Bearer eyabc",
      },
    });
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    await decodeJWT()(req, res, next);
    expect(next.called);
    expect(req.jwt).to.equal(undefined);
  }

  @test("Valid Auth header adds decoded JWT to request")
  public async validAuthHeader(): Promise<void> {
    const req = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${this.jwt}`,
      },
    });
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    await decodeJWT()(req, res, next);
    expect(next.called);
    expect(req.jwt).to.deep.equal(decoded.payload);
  }
}
