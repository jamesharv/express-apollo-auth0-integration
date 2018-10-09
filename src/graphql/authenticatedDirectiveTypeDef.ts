/**
 * Graphql authenticated directive type.
 */
export const authenticatedDirectiveTypeDef = `
  directive @authenticated on FIELD_DEFINITION | OBJECT
`.toString();
