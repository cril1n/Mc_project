import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  containerNavigator:{
    flex:1,
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
    fontSize: 20,
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
    margin:8,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500', // Colore arancione
    padding: 16,
    borderRadius: 25,
    marginTop: 20,
    width: '50%', // Larghezza del bottone
  },
  submitButtonText: {
    color: '#fff', // Colore del testo
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff', // Colore del testo
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff", // Colore chiaro per lo sfondo
  },
  title: {
    fontSize: 28, // Titolo più grande
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16, // Sottotitolo informativo
    color: '#666',
    marginBottom: 20,
  },
  input: {
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
  submitButton: {
    backgroundColor: '#FFA500', // Arancione brillante
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 25, // Angoli arrotondati
    width: '50%', // Larghezza del bottone
    alignItems: 'center',
    marginTop: 10,
  },
  successText: {
    color: 'green', // Testo verde per il successo
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
