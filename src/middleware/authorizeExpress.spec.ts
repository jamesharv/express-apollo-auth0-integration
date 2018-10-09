import { AuthenticationError } from "apollo-server";
import { expect, use as chaiUse } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as httpMocks from "node-mocks-http";
import * as sinon from "sinon";
import { jwksEndpoint } from "../mocks/jwks";
import { privateKey, publicKey, x5cSingle } from "../mocks/keys";
import { createToken, decoded } from "../mocks/tokens";
import { Auth } from "../model/Auth";
import { authorizeExpress } from "./authorizeExpress";

// tslint:disable:no-unsafe-any
// tslint:disable:deprecation

chaiUse(chaiAsPromised);

/**
 * Tests for JWT Authorization.
 */
@suite(timeout(300), slow(50))
export class AuthorizeExpressMiddlewareSpec {
  protected jwksHost = "https://test.foo.com";
  protected jwt: string;

  public async before(): Promise<void> {
    process.env.AUTH0_DOMAIN = "test.foo.com";
    process.env.AUTH0_AUDIENCE = "test.foo.com";
    this.jwt = createToken(privateKey, "a1bc", decoded.payload);
    jwksEndpoint(this.jwksHost, [ { pub: publicKey, kid: "a1bc" } ]);
  }

  @test("No Auth header throws error")
  public async noAuthHeader(): Promise<void> {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    await authorizeExpress()(req, res, next);
    expect(next.notCalled);
    expect(res.statusCode).to.equal(403);
    const responseData = JSON.parse(res._getData());
    expect(responseData).to.deep.equal(
      { data: null, errors: [{ locations: [], message: "No Authorization header provided.", path: [] }] },
    );
  }

  @test("Invalid Auth header throws error")
  public async invalidAuthHeaderError(): Promise<void> {
    const req = httpMocks.createRequest({
      headers: {
        authorization: "Bearer eyabc",
      },
    });
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    await authorizeExpress()(req, res, next);
    expect(next.notCalled);
    expect(res.statusCode).to.equal(403);
    const responseData = JSON.parse(res._getData());
    expect(responseData).to.deep.equal(
      { data: null, errors: [{ locations: [], message: "Incorrectly formatted JWT.", path: [] }] },
    );
  }

  @test("Valid Auth header allows access")
  public async validAuthHeader(): Promise<void> {
    const req = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${this.jwt}`,
      },
    });
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    await authorizeExpress()(req, res, next);
    expect(next.called);
  }
}
