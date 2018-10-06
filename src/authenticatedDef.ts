/**
 * Graphql authenticated directive type.
 */
export const authenticatedDef = `
  enum Role {
    ADMIN
    USER
  }
  directive @authenticated(
    requires: Role = ADMIN,
  ) on FIELD_DEFINITION | OBJECT
`.toString();
