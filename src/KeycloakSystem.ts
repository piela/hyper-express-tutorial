export default class KeycloakSystem {
    private keycloakUrl: string;
    private adminRealm: string;
    private adminClientId: string;
    private adminClientSecret: string;
    private accessToken: string | null = null;

    constructor(keycloakUrl: string, adminRealm: string, adminClientId: string, adminClientSecret: string) {
        this.keycloakUrl = keycloakUrl;
        this.adminRealm = adminRealm;
        this.adminClientId = adminClientId;
        this.adminClientSecret = adminClientSecret;
    }

    private async getAccessToken(): Promise<string> {
        if (this.accessToken) {
            return this.accessToken;
        }

        try {
            const response = await fetch(`${this.keycloakUrl}/realms/${this.adminRealm}/protocol/openid-connect/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: this.adminClientId,
                    client_secret: this.adminClientSecret,
                }).toString(),
            });

            if (!response.ok) {
                throw new Error(`Failed to obtain access token: ${response.statusText}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            return data.access_token;
        } catch (error:any) {
            console.error(`Error in getAccessToken: ${error.message}`);
            throw error;
        }
    }

    public async createRealm(realmName: string): Promise<void> {
        try {
            const token = await this.getAccessToken();

            const response = await fetch(`${this.keycloakUrl}/admin/realms`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    realm: realmName,
                    enabled: true,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create realm: ${response.statusText}`);
            }

            console.log(`Realm "${realmName}" created successfully.`);
        } catch (error:any) {
            console.error(`Error in createRealm: ${error.message}`);
            throw error;
        }
    }

    public async createClient(realmName: string, clientId: string): Promise<string> {
        try {
            const token = await this.getAccessToken();

            const response = await fetch(`${this.keycloakUrl}/admin/realms/${realmName}/clients`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId,
                    enabled: true,
                    publicClient: true,
                    directAccessGrantsEnabled: true,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create client: ${response.statusText}`);
            }

            const locationHeader = response.headers.get('location');
            if (!locationHeader) {
                throw new Error('Failed to get client UUID from response headers.');
            }

            const clientUuid = locationHeader.split('/').pop()!;
            console.log(`Client "${clientId}" created successfully with UUID: ${clientUuid}`);
            return clientUuid;
        } catch (error:any) {
            console.error(`Error in createClient: ${error.message}`);
            throw error;
        }
    }

    public async assignClientRoles(realmName: string, clientId: string): Promise<void> {
        try {
            const token = await this.getAccessToken();

            const roles = ['Admin', 'Agent', 'Supervisor'];

            for (const roleName of roles) {
                const response = await fetch(`${this.keycloakUrl}/admin/realms/${realmName}/clients/${clientId}/roles`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: roleName,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to create role "${roleName}": ${response.statusText}`);
                }

                console.log(`Role "${roleName}" assigned to client "${clientId}".`);
            }
        } catch (error:any) {
            console.error(`Error in assignClientRoles: ${error.message}`);
            throw error;
        }
    }

    public async createMapper(realmName: string, clientId: string): Promise<void> {
        try {
            const token = await this.getAccessToken();

            const response = await fetch(`${this.keycloakUrl}/admin/realms/${realmName}/clients/${clientId}/protocol-mappers/models`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'realm-roles-mapper',
                    protocol: 'openid-connect',
                    protocolMapper: 'oidc-usermodel-realm-role-mapper',
                    consentRequired: false,
                    config: {
                        'multivalued': 'true',
                        'user.attribute': 'roles',
                        'id.token.claim': 'true',
                        'access.token.claim': 'true',
                        'claim.name': 'role',
                        'jsonType.label': 'String',
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create mapper: ${response.statusText}`);
            }

            console.log(`Mapper "realm-roles-mapper" created successfully for client "${clientId}".`);
        } catch (error:any) {
            console.error(`Error in createMapper: ${error.message}`);
            throw error;
        }
    }
}

