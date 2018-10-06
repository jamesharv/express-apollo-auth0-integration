"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Graphql authenticated directive type.
 */
exports.authenticatedDef = `
  enum Role {
    ADMIN
    USER
  }
  directive @authenticated(
    requires: Role = ADMIN,
  ) on FIELD_DEFINITION | OBJECT
`.toString();
//# sourceMappingURL=authenticatedDef.js.map