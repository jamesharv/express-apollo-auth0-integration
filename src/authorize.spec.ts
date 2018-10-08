import { expect, use as chaiUse } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as td from "testdouble";

// tslint:disable:no-unsafe-any
// tslint:disable:deprecation

chaiUse(chaiAsPromised);

/**
 * Tests for JWT Authorization.
 */
@suite(timeout(300), slow(50))
export class AuthorizeSpec {

  public before(): void {
    process.env.SNS_TOPIC_ARNS = "foo";
  }

  @test("It handles authorizing a JWT")
  public async authorize(): Promise<void> {
    expect(1).to.equal(1);
  }
}
