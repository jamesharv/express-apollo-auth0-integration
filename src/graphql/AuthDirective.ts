import { AuthenticationError, SchemaDirectiveVisitor } from "apollo-server";
import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLField,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
import { Auth } from "../model/Auth";
import { ExtendedGraphQLObjectType } from "./ExtendedGraphQLObjectType";

/**
 * Interface defining input for the AuthDirective.
 */
interface AuthDirectiveInput {
  rolesCb: (userUUID: string, portalUUID: string) => Promise<string[]>;
  authHeader: string;
}

interface ExtendedGraphQLField<TSource, TContext> extends GraphQLField<TSource, TContext> {
  _markedAsAuthRequired: boolean;
  _requiredAuthRoles: string[];
}

/**
 * Auth directive for allowing field level authorization.
 */
export const AuthDirective = (input: AuthDirectiveInput):
typeof SchemaDirectiveVisitor => class extends SchemaDirectiveVisitor {
  public static getDirectiveDeclaration(
    directiveName: string,
    schema: GraphQLSchema,
  ): GraphQLDirective {
    return new GraphQLDirective({
      args: {
        roles: {
          type: new GraphQLList((schema.getType("Role") as GraphQLEnumType)),
        },
      },
      locations: [
        DirectiveLocation.OBJECT,
        DirectiveLocation.FIELD_DEFINITION,
      ],
      name: directiveName,
    });
  }

  public visitObject(object: ExtendedGraphQLObjectType): void {
    this.ensureFieldsWrapped(object);
    object._requiredAuthRoles = (this.args.roles as string[]);
  }

  public visitFieldDefinition(field: ExtendedGraphQLField<any, any>,
                              details: { objectType: ExtendedGraphQLObjectType }): void {
    field._markedAsAuthRequired = true;
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRoles = (this.args.roles as string[]);
  }

  public ensureFieldsWrapped(objectType: ExtendedGraphQLObjectType): void {
    if (objectType._authFieldsWrapped) {
      return;
    }
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = (fields[fieldName] as ExtendedGraphQLField<any, any>);
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args): Promise<any> {
        const requiredRoles = (field._requiredAuthRoles !== undefined) ?
        field._requiredAuthRoles : objectType._requiredAuthRoles;

        if (!field._markedAsAuthRequired && requiredRoles === undefined) {

          return resolve.apply(this, args);
        }

        const auth = new Auth();
        const decoded = await auth.authorize(input.authHeader);

        // Handle authorization to check if user has required roles.
        const currentUserRoles =
          await input.rolesCb(decoded["http://getequiem.com/user"], decoded["http://getequiem.com/portal"]);

        if (currentUserRoles.filter((role) => -1 !== requiredRoles.indexOf(role)).length === 0) {
          throw new AuthenticationError(
            `You require one of these roles to access this field: [${requiredRoles.join()}]`,
          );
        }

        return resolve.apply(this, args);
      };
    });
  }
};
