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

### Middlewares

Imports:
```
import { authorizeExpress, decodeJWT } from "express-apollo-auth0-integration";
```

`authorizeExpress` middleware will protect your routes and throw a graphQL friendly error if invalid JWT is in the Authorization header. `decodeJWT` won't protect anything, but will decode any valid JWTs found in the Authorization header and add it to your request.
```
app.use(authorizeExpress());
app.use(decodeJWT());
```

You can totally build your own custom middleware using the `Auth` class exported:
```
import { Auth } from "express-apollo-auth0-integration";

export const yourMiddleware = (args): express.RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      const auth = new Auth();
      const decodedJWT = await auth.authorize((req.headers.authorization as string));
      // Do something with decoded JWT.
    }
    catch (e) {
      // Handle errors.
    }
    next();
  };

```

### GraphQL directive

Imports:
```
import { AuthDirective } from "express-apollo-auth0-integration";
```

Configure ApolloServer:
```
const getRoles = async (userUUID: string, portalUUID): Promise<string[]> => {
  // Your code for fetching roles based on a user/portal combo.
  return [
    "ADMIN",
  ];
}

const getAuthHeader = async(graphQLContext: Container): Promise<string> => {
  return graphQLContext.get(RequestContext).authHeader;
}

const directiveInput = {
  authHeader: getAuthHeader,
  rolesCb: getRoles,
};

const server = new ApolloServer({
  resolvers: yourResolvers,
  schemaDirectives: {
    authenticated: AuthDirective(directiveInput),
  },
  ...
});
```

Create your own graphql definition in `/graphql/local/authenticated.graphql`:
```
// These should match the roles that your callback function returns.
enum Role {
  ADMIN
  USER
  ...
}
directive @authenticated(
  roles: [Role],
) on FIELD_DEFINITION | OBJECT
```

Use the `authenticated` directive inside your schema:
```
type User {
  firstName: String!
  uuid: String! @authenticated
  email: String! @authenticated(roles: [USER, ADMIN])
  isAdmin: Boolean! @authenticated(roles: [ADMIN])
}
```
