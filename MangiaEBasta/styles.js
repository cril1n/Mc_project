import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  orderContainer: {
    flex: 1,
    padding: 20,
  },
  containerNavigator: {
    flex: 1,
    backgroundColor: '#fff',
  },
  trackingInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  card: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    flex: 1, // Occupa 1/3 dello spazio verticale
    backgroundColor: '#ffffff', // Colore di sfondo del componente info
    borderRadius: 10, // Bordi smussati
    padding: 15, // Padding interno
    marginBottom: 10, // Spazio sotto il componente
    // Aggiungi elevazione per Android
    elevation: 3,
  },
  mapContainer: {
    flex: 2, // Occupa 2/3 dello spazio verticale
    backgroundColor: '#ffffff', // Colore di sfondo del componente mappa
    borderRadius: 10, // Bordi smussati
    padding: 15, // Padding interno (opzionale, se desideri)
    // Aggiungi elevazione per Android
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 8,
  },
  menuContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    margin: 16,
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF0F0',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 0,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    marginBottom: 20, // Increased margin between boxes
    width: '40%', // Shortened width
  },
  submitButton: {
    padding: 50, // Increased button size
  },
  successText: {
    color: 'green',
    marginTop: 10,
    fontSize: 17,
  },
});
