import * as msal from '@azure/msal-browser';
import axios from 'axios'; // Importation d'axios pour les requêtes HTTP

// Définir l'URL de base de l'API Graph
const GRAPH_API_BASE_URL = 'https://graph.microsoft.com/v1.0';

/**
 * Liste des autorisations demandées (scopes)
 */
const requestedScopes = {
    scopes: ["User.Read", "Mail.Read", "Mail.Send", "Mail.ReadWrite"] // Ajout des permissions nécessaires
};

const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: "e8137439-4d1d-462d-a85f-f81cfea8f0d8" // Assurez-vous que le client ID est défini dans vos variables d'environnement
    },
    cache: {
        cacheLocation: "sessionStorage" // Utilisation du stockage de session pour la mise en cache des tokens
    }
});

// Initialisation explicite de MSAL
async function initializeMsal() {
    try {
        await msalInstance.initialize();
    } catch (error) {
        console.error("Erreur d'initialisation de MSAL :", error);
    }
}

/**
 * Connexion de l'utilisateur et récupération de ses emails
 */
export async function signInAndGetUser() {
    // S'assurer que MSAL est initialisé avant d'utiliser d'autres fonctions
    await initializeMsal();

    const authResult = await msalInstance.loginPopup(requestedScopes);
    msalInstance.setActiveAccount(authResult.account);
    console.log("Vous êtes connecté !");

    // Récupérer les emails de l'utilisateur après la connexion
    const userEmails = await fetchUserEmails(authResult.accessToken);
    
    return {
        account: authResult.account,
        emails: userEmails,
        accessToken : authResult.accessToken
    };
}


/**
 * Fonction pour récupérer les emails de l'utilisateur
 * @param {string} accessToken - Le jeton d'accès de l'utilisateur
 */
export async function fetchUserEmails(accessToken) {
    try {
        const response = await axios.get(`${GRAPH_API_BASE_URL}/me/messages`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const totalEmails = response.data["@odata.count"] || response.data.value.length; // Utiliser la propriété de comptage si disponible

        console.log("Nombre d'emails : " + totalEmails);

        // Retourne les messages email
        return response.data.value; // Cela retournera un tableau d'emails
    } catch (error) {
        console.error("Erreur lors de la récupération des emails :", error);
        return [];
    }
}

/**
 * Fonction pour envoyer un email
 * @param {string} accessToken - Le jeton d'accès de l'utilisateur
 * @param {Object} email - L'objet email à envoyer
 */
export async function sendEmail(accessToken, email) {
    try {
        const response = await axios.post(`${GRAPH_API_BASE_URL}/me/sendMail`, {
            message: {
                subject: email.subject,
                body: {
                    contentType: "Text", // Ou "HTML" si le contenu est en HTML
                    content: email.body,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: email.to,
                        },
                    },
                ],
            },
            saveToSentItems: true, // Enregistre une copie dans les éléments envoyés
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("Email envoyé avec succès :", response);
        return response;
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        throw error; // Renvoyer l'erreur pour la gestion en amont
    }
}

/**
 * Fonction pour supprimer un email
 * @param {string} accessToken - Le jeton d'accès de l'utilisateur
 * @param {string} emailId - L'identifiant de l'email à supprimer
 */
export async function deleteEmail(accessToken, emailId) {
    try {
        const response = await axios.delete(`${GRAPH_API_BASE_URL}/me/messages/${emailId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log("Email supprimé avec succès :", response);
        return response; // Retourne la réponse de l'API pour confirmation
    } catch (error) {
        console.error("Erreur lors de la suppression de l'email :", error);
        throw error; // Renvoyer l'erreur pour la gestion en amont
    }
}
