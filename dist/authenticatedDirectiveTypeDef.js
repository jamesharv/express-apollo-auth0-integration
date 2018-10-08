"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Graphql authenticated directive type.
 */
exports.authenticatedDirectiveTypeDef = `
  enum Role {
    ADMIN
    AUTH0
    USER
  }
  directive @authenticated(
    requires: Role = ADMIN,
  ) on FIELD_DEFINITION | OBJECT
`.toString();
//# sourceMappingURL=authenticatedDirectiveTypeDef.js.map