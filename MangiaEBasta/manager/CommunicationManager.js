import AsyncStorage from "@react-native-async-storage/async-storage";
export default class CommunicationController {
    static BASE_URL = null;

    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
        const queryParamsFormatted = new URLSearchParams(queryParams).toString();
        const url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
        //console.log("sending " + verb + " request to: " + url);
        let fatchData = {
            method: verb,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        if (verb != 'GET') {
            fatchData.body = JSON.stringify(bodyParams);
        }
        let httpResponse = await fetch(url, fatchData);

        const status = httpResponse.status;
        if (status >= 200 && status <= 299) {
            console.log('Request ' + verb + ' completed');
            let deserializedObject = await httpResponse.json();
            return deserializedObject;
        } else {
            console.log(httpResponse);
            const message = await httpResponse.text();
            let error = new Error("Error message from the server. HTTP status: " + status + " " + message);
            throw error;
        }
    }

    static async getNewUser() {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/user/';

        const endPoint = '';
        const verb = 'POST';
        const queryParams = {};
        const bodyParams = {};
        return await CommunicationController.genericRequest(endPoint, verb, queryParams, bodyParams);
    }

    static async fetchUser(userId, userSid) {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/user/';

        console.log("fetching user with id: " + userId + " and sid: " + userSid);
        const id = userId;
        const verb = 'GET';
        const queryParams = { sid: userSid };
        const bodyParams = {};
        return await this.genericRequest(id, verb, queryParams, bodyParams);
    }

    static async modifyUser(userData) {

        console.log("userdata (Dentro modifyuser):", userData);
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/user/';
        console.log(userData.uid);
        const id = parseInt(userData.uid);
        const keysToRemove = ['uid', 'orderStatus', 'lastOid']; // Sostituisci con le chiavi che vuoi rimuovere
        keysToRemove.forEach((key) => {
            delete userData[key];
        });
        console.log(userData);
        const verb = 'PUT';
        const queryParams = {};
        const bodyParams = userData
        try{
            return await this.genericRequest(id, verb, queryParams, bodyParams);
        }catch(error){
            console.log("ERRORE IN MODIFYUSER:", error);
        }
        
    }

    static async getMenu(userLat, userLng, userSid, mid) {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/menu/';

        const endPoint = mid;
        const verb = 'GET';
        const queryParams = { lat: userLat, lng: userLng, sid: userSid };
        const bodyParams = {};
        return await this.genericRequest(endPoint, verb, queryParams, bodyParams);
    }

    static async getMenuImage(mid, userSid) {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/menu/';

        const endPoint = mid + '/image';
        const verb = 'GET';
        const queryParams = { sid: userSid };
        const bodyParams = {};
        return await this.genericRequest(endPoint, verb, queryParams, bodyParams)
    }

    static async getNearMenus(userLat, userLng, userSid) {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/menu/';

        const endPoint = '';
        const verb = 'GET';
        const queryParams = {lat: userLat, lng: userLng, sid: userSid};
        const bodyParams = {};
        return await this.genericRequest(endPoint, verb, queryParams, bodyParams);
    }

    static async sendOrder(mid, userLat, userLng, userSid) {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/menu/';

        deliveryLoc = { lat: userLat, lng: userLng };

        const endPoint = mid + '/buy';
        const verb = 'POST';
        const queryParams = {};
        const bodyParams = { sid: userSid, deliveryLocation: deliveryLoc };
        return await this.genericRequest(endPoint, verb, queryParams, bodyParams);
    }

    static async getOrderInfo(oid, userSid) {
        this.BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425/order/';

        const endPoint = oid;
        const verb = 'GET';
        const queryParams = { sid: userSid };
        const bodyParams = {};
        return await this.genericRequest(endPoint, verb, queryParams, bodyParams);
    }

   
}