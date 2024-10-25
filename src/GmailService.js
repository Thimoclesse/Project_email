import { gapi } from 'gapi-script';


const CLIENT_ID = "880522436612-6q98chguavsdr75pafkhog9do0ck3ssi.apps.googleusercontent.com";
const API_KEY = "AIzaSyBMk-oXtezGLf1_R4yBQ9erHq3inMqX9y4";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

export const initClient = () => {
    return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(() => {
                resolve(gapi);
            }, error => reject(error));
        });
    });
};

export const signIn = () => {
    return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
    return gapi.auth2.getAuthInstance().signOut();
};

export const listMessages = () => {
    return gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: 10,
    });
};

// Fonction pour récupérer les détails d'un email spécifique
export const getMessageById = (messageId) => {
    return gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: messageId,
    });
};

