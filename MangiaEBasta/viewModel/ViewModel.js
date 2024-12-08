import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from '../manager/CommunicationManager';
import StorageManager from '../manager/StorageManager';
import PositionManager from '../manager/PositionManager';
import * as Location from 'expo-location';


export default class ViewModel {

    static sid = null;
    static uid = null;

    static psManager = null;
    static stManager = null;

    //APP START

    // Inizializzo il database
    static async initDB() {
        this.stManager = new StorageManager();
        try {
            await this.stManager.openDB();
            console.log("Database opened");
        } catch (error) {
            console.log("Error opening database: " + error);
        }

    }

    // Controllo se è il primo avvio dell'applicazione
    static async checkFirstRun() {
        console.log("Checking if first run");
        let sid = null;
        let uid = null;
        let lastScreen = null;
        try {
            sid = await AsyncStorage.getItem("sid");
            uid = await AsyncStorage.getItem("uid");
            lastScreen = await AsyncStorage.getItem("lastScreen");
            console.log("lastScreen:", lastScreen);
        } catch (error) {
            console.log(error);
        }
        if (lastScreen == null) {
            await AsyncStorage.setItem("lastScreen", "Homepage"); 
        }
        // Se non è il primo avvio, non faccio nulla perche i dati saranno gia presenti nell'AsyncStorage
        if (sid && uid) {
            console.log(sid, uid);
            this.sid = sid;
            this.uid = uid;
            let user = JSON.parse(await AsyncStorage.getItem("user"));
            if (user.uid == uid) {
                console.log("Not first run, sid, uid and user already in AsyncStorage");
                return false;
            } else {
                console.log("Not first run, sid and uid already in AsyncStorage but user not present");
                try {
                    let user = await CommunicationController.fetchUser(uid, sid);
                    await AsyncStorage.setItem("user", JSON.stringify(user));
                    console.log("Utente salvato nel database");
                    return false;
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            // Se è il primo avvio, chiedo al server un nuovo utente e salvo nell'asyncStorage
            console.log("first run");
            // Creo il nuovo utente nel server
            let response = null;
            await AsyncStorage.setItem("lastScreen", "Homepage");
            try {
                response = await CommunicationController.getNewUser();
            } catch (error) {
                console.log(error);
            }
            console.log('Nuovo utente creato');
            newSid = response.sid;
            newUid = response.uid;

            // Salvo i nuovi sid e id nel AsyncStorage
            await AsyncStorage.setItem("sid", newSid);
            this.sid = newSid;
            await AsyncStorage.setItem("uid", JSON.stringify(newUid));
            console.log("Nuovi sid e uid salvati in AsyncStorage");
            // Recupero i dati del nuovo utente dal server e li salvo nell'asyncStorage
            try {
                let user = await CommunicationController.fetchUser(newUid, newSid);
                await AsyncStorage.setItem("user", JSON.stringify(user));
            } catch (error) {
                console.log(error);
            }
            console.log("Nuovo utente salvato nel AsyncStorage");
            return true;
        }
    }

    // Inizializzo il PositionManager
    static async initPosition() {
        console.log('Initializing position manager')
        this.psManager = new PositionManager()
        return await this.psManager.checkLocationPermission()
    }

    // Ricevo la posizione attuale
    static async getCurrentPosition() {
        try {
            return await this.psManager.getCurrentPosition();
        } catch (error) {
            console.log(error);
        }
    }

    // Funzione per recupare l'ultima schermata visitata dall'utente
    static async getLastScreen() {
        try {
            let lastScreen = await AsyncStorage.getItem("lastScreen");
            return lastScreen;
        } catch (error) {
            console.log(error);
        }
    }

    static async setLastScreen(screen) {
        try {
            await AsyncStorage.setItem("lastScreen", screen);
        } catch (error) {
            console.log(error);
        }
    }

    static async saveLastMenuOpened(menu) {
        try {
            await AsyncStorage.setItem("lastMenu", JSON.stringify(menu));
        } catch (error) {
            console.log(error);
        }
    }

    static async checkLastMenuOpened() {
        try {
            let lastMenu = await AsyncStorage.getItem("lastMenu");
            return JSON.parse(lastMenu);
        } catch (error) {
            console.log(error);
        }
    }

    static async ResetApp() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared');
            await this.stManager.resetDB();
            console.log('Database resetted');
            await this.psManager.resetPosition();
            console.log('Position resetted');
            console.log("App resetted");
        } catch (error) {
            console.log(error);
        }
    }
    //SESSIONID
    static async getSid() {
        try {
            let sid = await AsyncStorage.getItem("sid");
            return sid;
        } catch (error) {
            console.log(error);
        }
    }
    //USERID
    static async getUid() {
        try {
            let uid = await AsyncStorage.getItem("uid");
            return JSON.parse(uid);
        } catch (error) {
            console.log(error);
        }
    }
    //USER
    static async getUser() {
        try {
            let user = await AsyncStorage.getItem("user");
            return JSON.parse(user);
        } catch (error) {
            console.log(error);
        }
    }
    static async updateUser(user) {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteAccount(refresh, triggerRefresh) {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("sid");
            await AsyncStorage.removeItem("uid");
            triggerRefresh();
            console.log("Account deleted");
        } catch (error) {
            console.log(error);
        }
    }

    //MENU AND IMAGES

    static async getMenuComplete(lat, lng, mid) {
        try {
            let menu = await CommunicationController.getMenu(lat, lng, this.sid, mid);
            return menu;
        } catch (error) {
            console.log(error);
        }

    }

    static async getMenuWithImage(menu) {
        try {

            let imageVersion = menu.imageVersion;
            let DBImageVersion = await this.stManager.getMenuImageVersionDB(menu.mid);

            if (imageVersion != DBImageVersion) {
                console.log("Image not up to date");
                let image = await CommunicationController.getMenuImage(menu.mid, this.sid);
                await this.stManager.saveMenuImage(image.base64, imageVersion, menu.mid);
                menu.imageCode = image.base64;
            } else {
                console.log("Image already up to date");
                menu.imageCode = await this.stManager.getMenuImageCodeDB(menu.mid);
            }

            return menu;
        } catch (error) {
            console.log(error);
        }
    }

    static async getNearMenus(lat, lng) {
        try {
            let menuList = await CommunicationController.getNearMenus(lat, lng, this.sid);
            menuList = menuList.filter(menu => menu.name !== 'string');
            menuList = menuList.sort((a, b) => a.deliveryTime - b.deliveryTime)

            for (let i = 0; i < menuList.length; i++) {
                menuList[i] = await this.getMenuWithImage(menuList[i]);
            }

            return menuList;
        } catch (error) {
            console.log(error);
        }
    }

    //ORDER

    static async checkUserCardBeforeOrder(user) {
        if (!user.cardFullName || !user.cardNumber || !user.cardCVV || !user.cardExpireMonth || !user.cardExpireYear ||
            user.cardFullName == "" || user.cardNumber == "" || user.cardCVV == "" || user.cardExpireMonth == "" || user.cardExpireYear  == ""
        ) {
            return false;
        }
        return true;
    }

    static async checkUserInfoBeforeOrder(user) {
        if (!user.firstName || !user.lastName || user.firstName == "" || user.lastName == "" ){
            return false;
        }
        return true;
    }

    static async getLastOrderInfo(oid) {
        try {
            console.log("Getting last order info...");
            return await CommunicationController.getOrderInfo(oid, this.sid);
        } catch (error) {
            console.log("Errore in getLatORderInfo:", error);
        }
    }

    static async sendOrder(mid, lat, lng, user, setUser) {
        try {
            const savedSid = await this.getSid();
            console.log("Sending order...");
            let response = await CommunicationController.sendOrder(mid, lat, lng, savedSid);
            console.log("Order sent");
            console.log("Updating user after order...");
            await this.updateUserAfterOrder(user, setUser, response.oid);
            console.log("User updated");
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateUserAfterOrder(user, setUser, newOid) {
        try {
            console.log("new oid:", newOid);
            user.lastOid = newOid;
            setUser(user);
            await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }

    }

    static async getMenuOrdered(){
        const menuOrdered = null;
        try{
            menuOrdered = await AsyncStorage.getItem("menuOrdered");
        }catch(error){
            console.log(error);
        }
        return JSON.parse(menuOrdered);
    }
    static async saveMenuOrdered(menu){
        if(menu == null){
            return;
        }
        try{
            await AsyncStorage.setItem("menuOrdered", JSON.stringify(menu));
        }
        catch(error){
            console.log(error);
        }
    }

    static async removeMenuOrdered(){
        try{
            await AsyncStorage.removeItem("menuOrdered");
        }
        catch(error){
            console.log(error);
        }
    }

    //PROFILE INFO

    static validateProfileInfoField(field, value) {
        let error = null;
        switch (field)  {
            case "firstName":
                // Controllo: deve essere una stringa con solo caratteri e che non sia vuota
                if(!/^[a-zA-Z]+$/.test(value)|| value == "" ) {
                    error = "The first name must be a valid string with only letters.";
                }
                break;
            case "lastName":
                // Controllo: deve essere una stringa con solo caratteri e che non sia vuota
                if(!/^[a-zA-Z]+$/.test(value) || value == "") {
                    error = "The last name must be a valid string with only letters.";
                }
                break;
            default:
                // Per campi non previsti
                error = "Invalid field.";
        }
        return error;
    }
    // CARD AND PAYMENT

    static validateCardField(field, value) {
        let error = null;
        switch (field) {
            case "cardFullName":
                // Controllo: deve essere una stringa con solo caratteri e un solo spazio
                if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
                    error = "The card full name must be a valid string with only letters and a single space.";
                }
                break;

            case "cardNumber":
                // Controllo: deve essere una stringa di 16 cifre
                if (!/^\d{16}$/.test(value)) {
                    error = "The card number must be exactly 16 digits.";
                }
                break;

            case "cardExpireMonth":
                // Controllo: deve essere un valore compreso tra "01" e "12"
                if (!/^(0[1-9]|1[0-2])$/.test(value)) {
                    error = "The expiration month must be a valid 2-digit number (01-12).";
                }
                break;

            case "cardExpireYear":
                // Controllo: deve essere una stringa di 2 cifre
                if (!/^\d{2}$/.test(value)) {
                    error = "The expiration year must be a valid 2-digit number.";
                }
                break;

            case "cardCVV":
                // Controllo: deve essere una stringa di 3 cifre
                if (!/^\d{3}$/.test(value)) {
                    error = "The CVV must be exactly 3 digits.";
                }
                break;

            default:
                // Per campi non previsti
                error = "Invalid field.";
        }

        return error;
    }
    
    //ADDRESS
    static async getAddress() {
        console.log("Getting delivery address...");
        const location = await this.getCurrentPosition();
        //console.log("location in getAddress:", location);
        const address = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
        return address[0];
      }
}

