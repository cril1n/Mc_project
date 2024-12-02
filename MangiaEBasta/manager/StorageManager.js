import * as SQLite from "expo-sqlite";

export default class StorageManager {
  constructor() {
    this.db = null;
  }

  async openDB() {
    try {
      this.db = await SQLite.openDatabaseAsync("MangiaEBastaDB");
      const queryImage =
        "CREATE TABLE IF NOT EXISTS menuImages (ID INTEGER PRIMARY KEY AUTOINCREMENT, imageCode TEXT, imageVersion TEXT, mid TEXT );";
      await this.db.execAsync(queryImage);
    } catch (error) {
      console.log(error);
    }
  }

  async resetDB() {
    const query = "Drop TABLE IF EXISTS menuImages;";
    try {
      await this.db.execAsync(query);
    } catch (error) {
      console.log(error);
    }
  }

  //MENU IMAGES

  async saveMenuImage(imageCode, imageVersion, mid) {
    const query =
      "INSERT INTO menuImages (imageCode, imageVersion, mid) VALUES (?, ?, ?);";
    try {
      await this.db.runAsync(query, imageCode, imageVersion, mid);
      console.log("Immagine saved in database");
    } catch (error) {
      console.log(error);
    }
  }

  async getMenuImageVersionDB(mid) {
    const query = "SELECT imageVersion FROM menuImages WHERE mid = ?;";
    try {
      const result = await this.db.getFirstAsync(query, mid);
      return result ? result.imageVersion : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getMenuImageCodeDB(mid) {
    const query = "SELECT imageCode FROM menuImages WHERE mid = ?;";
    try {
      const result = await this.db.getFirstAsync(query, mid);
      return result ? result.imageCode : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getMenuImagesTable() {
    const query = "SELECT * FROM menuImages;";
    try {
      const result = await this.db.getAllAsync(query);
      return result ? result : [];
    } catch (error) {
      console.log(error);
    }
  }
}
