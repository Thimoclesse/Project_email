// GmailService.js
import {gapi} from "gapi-script";

let gapiLoaded = false;

// Fonction pour charger l'API GAPI
export const loadGapi = () => {
    return new Promise(resolve => {
        if (gapiLoaded) {
            resolve();
            return;
        }
        window.gapi.load('client:auth2', () => {
            gapiLoaded = true;
            resolve();
        });
    });
};

// Fonction d'initialisation de l'API Gmail
export const initGmailApi = async () => {
    await loadGapi();

    await window.gapi.client.init({
        apiKey: 'AIzaSyBMk-oXtezGLf1_R4yBQ9erHq3inMqX9y4',
        clientId: '880522436612-6q98chguavsdr75pafkhog9do0ck3ssi.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
    });
};
// Fonction de connexion
export const signIn = async () => {
    await initGmailApi();
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const user = await GoogleAuth.signIn();
    return user.getBasicProfile();
};


// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const user = GoogleAuth.currentUser.get();
    const profile = user.getBasicProfile();
    return {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
    };
};

// Fonction de déconnexion
export const signOut = async () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    await GoogleAuth.signOut();
};




export const fetchGmailEmails = async (accessToken) => {
    let emails = [];
    let nextPageToken = null;
    let attempts = 0; // Compteur pour le nombre de tentatives

    do {
        try {
            const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages${nextPageToken ? '?pageToken=' + nextPageToken : ''}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                if (response.status === 429) {
                    console.error("Trop de requêtes. Attente avant de réessayer...");
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Attendre 10 secondes
                    continue; // Réessayer la requête
                }
                throw new Error('Erreur lors de la récupération des emails: ' + response.statusText);
            }

            const data = await response.json();
            console.log("Données récupérées :", data); // Afficher les données récupérées

            emails = emails.concat(data.messages || []); // Ajouter les messages récupérés

            // Mise à jour du nextPageToken pour la prochaine itération
            nextPageToken = data.nextPageToken;
            attempts++; // Incrémenter le compteur de tentatives

        } catch (error) {
            console.error("Erreur lors de la récupération des emails :", error);
            throw error; // Propager l'erreur
        }
    } while (nextPageToken && attempts < 5); // Limiter à 5 pages pour éviter une boucle infinie

    return emails; // Retourner tous les emails récupérés
};


export const getMessageById = (messageId) => {
    return gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: messageId,
    });
};

