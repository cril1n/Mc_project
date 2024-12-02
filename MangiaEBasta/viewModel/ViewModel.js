import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from '../manager/CommunicationManager';
import StorageManager from '../manager/StorageManager';
import PositionManager from '../manager/PositionManager';



export default class ViewModel {

    static sid = null;

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
        try {
            sid = await AsyncStorage.getItem("sid");
            uid = await AsyncStorage.getItem("uid");
        } catch (error) {
            console.log(error);
        }
        // Se non è il primo avvio, non faccio nulla perche i dati saranno gia presenti nell'AsyncStorage
        if (sid && uid) {
            this.sid = sid;
            let user = await AsyncStorage.getItem("user");
            if(user.uid == uid && user.sid == sid){
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

    //MENU AND IMAGES
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

}