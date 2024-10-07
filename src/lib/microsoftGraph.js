// file src/lib/microsoftGraph.js
import * as msal from '@azure/msal-browser'
/**
 * List the requested scopes (aka. the requested permissions)
 */
const requestedScopes = {
    scopes: ["User.Read"]
}
const msalInstance = new msal. PublicClientApplication({
    auth: {
        clientId: process.env. VUE_APP_OAUTH_CLIENT_ID
    },
    cache: {
        cacheLocation: "sessionStorage"
    }
});

// Initialisation explicite
async function initializeMsal() {
    try {
        await msalInstance.initialize();
    } catch (error) {
        console.error("Erreur d'initialisation de MSAL :", error);
    }
}

export async function signInAndGetUser() {
    // S'assurer que MSAL est initialisé avant d'utiliser d'autres fonctions
    await initializeMsal(); // Appel ici avant d'appeler loginPopup

    const authResult = await msalInstance.loginPopup(requestedScopes);
    msalInstance.setActiveAccount(authResult.account);
    console.log("Vous êtes connecté !")
    return authResult.account;
}