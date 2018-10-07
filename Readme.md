# Apollo Auth0 Directive
Handles verifying JWTs inside your graphql schema.

## Usage
Required env variables:
```
AUTH0_DOMAIN: tester-equiem.au.auth0.com
AUTH0_AUDIENCE: https://equiem-syndicate-api-staging.herokuapp.com/
```

Add to your package.json:
```
"apollo-auth0-extension": "git+https://github.com/Equiem/apollo-auth0-extension.git"
```

Imports:
```
import { AuthDirective, authenticatedDirectiveTypeDef } from "apollo-auth0-extension";
```

Configure ApolloServer:
```
const server = new ApolloServer({
  resolvers: yourResolvers,
  schemaDirectives: {
    authenticated: AuthDirective,
  },
  typeDefs: gql`${authenticatedDef} ${yourCustomTypes}`,
});
```

Copy the graphql definitions into `/graphql/vendor/authenticated.graphql`:
```
# Copied from node_modules/apollo-auth0-extension/src/authenticatedDef.ts
enum Role {
  ADMIN
  AUTH0
  USER
}
directive @authenticated(
  requires: Role = ADMIN,
) on FIELD_DEFINITION | OBJECT
```

Use the `authenticated()` directive inside your schema:
```
type User @authenticated(requires: USER) {
  uuid: String!
  destinations(type: String): UserDestinationConnection!
}
```
