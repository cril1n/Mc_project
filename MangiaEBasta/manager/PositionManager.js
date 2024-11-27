import * as Location from 'expo-location';


export default class PositionManager {

    constructor() {
        this.lastLocation = null;
        this.canUseLocation = false;
    }

    resetPosition() {
        this.lastLocation = null;
        this.canUseLocation = false;
    }

    async checkLocationPermission() {
        try {
            console.log('Checking position permission...');
            const grantedPermission = await Location.getForegroundPermissionsAsync()
            if (grantedPermission.status === "granted") {
                this.canUseLocation = true;
                console.log('Position permission available')
                return true;
            } else {
                console.log('Position permission still not granted, please accept')
                return await this.getLocationPermission()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getLocationPermission() {
        try {
            const permissionResponse = await Location.requestForegroundPermissionsAsync()
            if (permissionResponse.status === "granted") {
                this.canUseLocation = true;
                console.log('Position permission now available')
                return true;
            } else {
                console.log('Position permission refused')
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrentPosition() {

        try {
            if (this.canUseLocation) {
                console.log("Calculating current position");
                const location = await Location.getCurrentPositionAsync();
                console.log("Position updated");
                this.lastLocation = location;
                return this.lastLocation;
            } else {
                await this.checkLocationPermission();
                return;
            }
        } catch (error) {
            console.log(error);
        }

    }

    async getLastPosition() {
        try {
            console.log('Getting last position')
            if (this.lastLocation) {
                return this.lastLocation;
            } else {
                console.log('Last position not available')
                return await this.getCurrentPosition();
            }
        } catch (error) {
            console.log(error)
        }
    }




}