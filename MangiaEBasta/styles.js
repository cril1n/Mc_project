import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
