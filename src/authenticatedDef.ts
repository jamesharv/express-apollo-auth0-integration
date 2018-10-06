/**
 * Graphql authenticated directive type.
 */
export const authenticatedDef = `
  enum Role {
    ADMIN
    AUTH0
    USER
  }
  directive @authenticated(
    requires: Role = ADMIN,
  ) on FIELD_DEFINITION | OBJECT
`.toString();
