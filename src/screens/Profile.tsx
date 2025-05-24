import { View, Text } from 'react-native';
import React from 'react';
import { CustomButton } from '../components/ui/custom-button';
import { User } from 'lucide-react-native';
import { useUser } from '../context/UserContext';
import generalStyles from '../styles/global';
import profileStyles from '../styles/profile';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
  }

  return (
    <View style={generalStyles.containerTop}>
      <View style={profileStyles.profileCard}>
        <View style={profileStyles.profileHeader}>
          <View style={profileStyles.avatar}>
            <User size={40} color="#FFF" />
          </View>
          <View style={profileStyles.profileDetails}>
            <Text style={profileStyles.profileName}>María González</Text>
            <Text style={profileStyles.profileID}>PC-123456</Text>
          </View>
        </View>

        <View style={profileStyles.profileInfoSection}>
          <Text style={profileStyles.profileInfoLabel}>{t('general.email')}:</Text>
          <Text style={profileStyles.profileInfoValue}>maria.gonzalez@email.com</Text>

          <Text style={profileStyles.profileInfoLabel}>{t('general.phone')}:</Text>
          <Text style={profileStyles.profileInfoValue}>+58 412 123 4567</Text>

          <Text style={profileStyles.profileInfoLabel}>{t('general.documentId')}:</Text>
          <Text style={profileStyles.profileInfoValue}>V-12345678</Text>
        </View>

        <CustomButton onPress={handleLogout}>
          {t('general.logout')}
        </CustomButton>
      </View>
    </View>
  );
};

export default Profile;
