import KeycloakSystem from "../services/SSO";


(async () => {
    const keycloakUrl = 'http://<keycloak-url>';
    const adminRealm = 'master';
    const adminClientId = '<admin-client-id>';
    const adminClientSecret = '<admin-client-secret>';

    const system = new KeycloakSystem(keycloakUrl, adminRealm, adminClientId, adminClientSecret);

    const realmName = 'new-realm';
    const clientId = 'new-client';

    try {
        await system.createRealm(realmName);
        const clientUuid = await system.createClient(realmName, clientId);
        await system.assignClientRoles(realmName, clientUuid);
        await system.createMapper(realmName, clientUuid);

        console.log(`Realm "${realmName}" and client "${clientId}" with roles and mapper created successfully.`);
    } catch (error:any) {
        console.error(`Error in script execution: ${error.message}`);
    }
})();
