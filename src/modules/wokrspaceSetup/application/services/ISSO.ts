import Email from "../../domain/entities/Email";
import Password from "../../domain/entities/Password";

export default interface ISSO {
  realmExists(realmName: string): Promise<boolean>;
  createRealm(realmName: string): Promise<void>;
  createClient(
    realmName: string,
    clientId: string,
    clientSecret: string
  ): Promise<string>;
  assignClientRoles(
    realmName: string,
    clientId: string,
    roles: Array<string>
  ): Promise<void>;
  createUser(
    realmName: string,
    username: string,
    firstName: string,
    lastName: string,
    email: Email,
    password: Password
  ): Promise<any>;
  getClientUUID(clientId: string, realmName: string): Promise<string>;
  loginUser(
    username: string,
    password: string,
    realmName: string,
    subdomainClientName: string,
    subdomainClientSecret: string
  ): Promise<string[]>;

  setClientSecret(
    realm: string,
    clientId: string,
    clientSecret: string
  ): Promise<string[]>;

  addClientRoleToUser(
    userId: string,
    clientUUID: string,
    role: { id: string; name: string },
    realmName: string
  ): Promise<boolean>;

  getClientRole(
    roleName: string,
    realmName: string,
    clientName: string
  ): Promise<{ id: string; name: string }>;
  getCert(realmName: string): Promise<string>;
}
