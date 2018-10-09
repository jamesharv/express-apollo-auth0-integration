# Express Apollo Auth0 Integration
Handles verifying JWTs inside your express application and/or graphQL schema.

Based on https://www.apollographql.com/docs/apollo-server/features/creating-directives.html#Enforcing-access-permissions

## Usage
Required env variables:
```
AUTH0_DOMAIN: tester-equiem.au.auth0.com
AUTH0_AUDIENCE: https://equiem-syndicate-api-staging.herokuapp.com/
```

Add to your package.json:
```
"express-apollo-auth0-integration": "git+https://github.com/Equiem/express-apollo-auth0-integration.git"
```

Imports:
```
import { AuthDirective, authenticatedDirectiveTypeDef } from "express-apollo-auth0-integration";
```

Configure ApolloServer:
```
const server = new ApolloServer({
  resolvers: yourResolvers,
  schemaDirectives: {
    authenticated: AuthDirective,
  },
  typeDefs: gql`${authenticatedDirectiveTypeDef} ${yourCustomTypes}`,
});
```

Copy the graphql definitions into `/graphql/vendor/authenticated.graphql`:
```
# Copied from node_modules/express-apollo-auth0-integration/src/authenticatedDirectiveTypeDef.ts
directive @authenticated on FIELD_DEFINITION | OBJECT
```

Use the `authenticated()` directive inside your schema:
```
type User @authenticated {
  uuid: String!
  destinations(type: String): UserDestinationConnection!
}
```
