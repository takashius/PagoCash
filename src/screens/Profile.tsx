import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { CustomButton } from '../components/ui/custom-button';
import { User } from 'lucide-react-native'; // Ícono de usuario
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User size={40} color="#FFF" />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>María González</Text>
            <Text style={styles.profileID}>PC-123456</Text>
          </View>
        </View>

        <View style={styles.profileInfoSection}>
          <Text style={styles.profileInfoLabel}>Correo:</Text>
          <Text style={styles.profileInfoValue}>maria.gonzalez@email.com</Text>

          <Text style={styles.profileInfoLabel}>Teléfono:</Text>
          <Text style={styles.profileInfoValue}>+58 412 123 4567</Text>

          <Text style={styles.profileInfoLabel}>Cédula:</Text>
          <Text style={styles.profileInfoValue}>V-12345678</Text>
        </View>

        <CustomButton onPress={handleLogout}>
          Cerrar sesión
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#2ECC71',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileID: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  profileInfoSection: {
    marginTop: 15,
    marginBottom: 20,
  },
  profileInfoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 3,
  },
  profileInfoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#ff7f50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Profile;
