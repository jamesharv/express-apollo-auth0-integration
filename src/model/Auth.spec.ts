import { AuthenticationError } from "apollo-server";
import { expect, use as chaiUse } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as td from "testdouble";
import { jwksEndpoint } from "../mocks/jwks";
import { privateKey, publicKey, x5cSingle } from "../mocks/keys";
import { createToken, decoded } from "../mocks/tokens";
import { Auth } from "./Auth";

// tslint:disable:no-unsafe-any
// tslint:disable:deprecation
// tslint:disable:max-line-length

chaiUse(chaiAsPromised);

/**
 * Tests for JWT Authorization.
 */
@suite(timeout(300), slow(50))
export class AuthorizeSpec {
  protected auth: Auth;
  protected jwksHost = "https://test.foo.com";
  protected jwt: string;

  public async before(): Promise<void> {
    process.env.AUTH0_DOMAIN = "test.foo.com";
    process.env.AUTH0_AUDIENCE = "test.foo.com";
    this.jwt = createToken(privateKey, "a1bc", decoded.payload);
    jwksEndpoint(this.jwksHost, [ { pub: publicKey, kid: "a1bc" } ]);
    this.auth = new Auth();
  }

  @test("No Auth header throws error")
  public async noAuthHeaderError(): Promise<void> {
    expect(this.auth.authorize(null)).to.eventually.throw(AuthenticationError, "No Authorization header provided.");
  }

  @test("Invalid Auth header throws error")
  public async invalidAuthHeaderError(): Promise<void> {
    expect(this.auth.authorize("Not a Header"))
      .to.eventually.throw(AuthenticationError, "Incorrectly formatted Authorization header.");
    expect(this.auth.authorize("bearer foo"))
      .to.eventually.throw(AuthenticationError, "Incorrectly formatted Authorization header.");
    expect(this.auth.authorize("Bearer"))
      .to.eventually.throw(AuthenticationError, "Incorrectly formatted Authorization header.");
  }

  @test("It decodes a valid JWT")
  public async decodeValidJWT(): Promise<void> {
    expect(this.auth.authorize(`Bearer ${this.jwt}`))
      .to.eventually.deep.equal(decoded.payload);
  }
}
