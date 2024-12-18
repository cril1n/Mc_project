import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  //GENERAL
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  orderContainer: {
    flex: 1,
    padding: 20,
  },
  containerNavigator: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 190,
  },
  locationLogo: {
    width: 200,
    height: 200,
    margin: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  //OrderTrack
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

  //MenuDetail
  menuDetailImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    margin: 8,
  },



  //ProfileScreen
  profileMenuContainer: {
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#FFB534",
    borderRadius: 16,
    margin: 16,
    padding: 8,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileMenuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileMenuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    marginTop: 50,
  },
  profileHeaderName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3, // Ombra per Android
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
    flex: 1,
  },


  //Form
  formTitle: {
    fontSize: 28, // Titolo più grande
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 16, // Sottotitolo informativo
    color: '#666',
    marginBottom: 20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd', // Colore chiaro per i bordi
    backgroundColor: '#fff',
    borderRadius: 10, // Angoli arrotondati
    padding: 12,
    marginBottom: 15,
    width: '80%', // Maggiore larghezza
    fontSize: 16,
    color: '#333', // Testo scuro
  },
  formSubmitButton: {
    backgroundColor: '#FFA500', // Arancione brillante
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 25, // Angoli arrotondati
    width: '50%', // Larghezza del bottone
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Ombra per Android
  },
  formSubmitButtonText: {
    color: '#fff', // Colore del testo
    fontSize: 16,
    fontWeight: 'bold',
  },
  formSuccessText: {
    color: 'green', // Testo verde per il successo
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },

  //PaymentInfo & ProfileInfo
  infoContent: {
    padding: 20,
  },
  infoFieldContainer: {
    marginBottom: 20,
  },
  infoFieldLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  infoFieldText: {
    fontSize: 18,
    color: '#333',
  },
  infoInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#FF9F43', // Orange border color
    paddingVertical: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3, // Shadow for Android
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  //APP.JS
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 90,
    width: '80%',
    backgroundColor: 'orange',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  orangeButton: {
    marginTop: 20,
    width: '80%',
    backgroundColor: 'orange',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    elevetion: 3,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  locationInfoText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 50,
  },

  //MENUCARD
  cardContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Shadow for Android
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    elevation: 3
  },
  cardImage: {
    width: 150,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 14,
    color: "#555",
  },
  highlightedText: {
    fontWeight: "bold",
    color: "orange",
  },

  //menuDetail
  menuDetailcontainer: {
    padding: 30,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    flexGrow: 1,
  },
  menuDetailmenuImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  menuDetaildetailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuDetailmenuName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  menuDetailmenuDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  menuDetailinfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  menuDetaillabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  menuDetailvalue: {
    fontSize: 16,
    color: '#555',
  },
  menuDetailorderButton: {
    backgroundColor: '#FFB534',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  menuDetailorderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  //OrderCheckOut
  orderCheckOutcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFB534",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 30,
    elevation: 3,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addressContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 18,
    color: "#333",
  },
  addressText2: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});
