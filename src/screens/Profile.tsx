import { View, Text } from 'react-native';
import React from 'react';
import { User } from 'lucide-react-native';
import { useUser } from '../context/UserContext';
import generalStyles from '../styles/global';
import profileStyles from '../styles/profile';
import { useTranslation } from 'react-i18next';
import { useLogout } from '../services/auth';
import { Button } from 'react-native-paper';
import passwordRecoveryStyles from '../styles/passwordRecovery';

const Profile = () => {
  const { t } = useTranslation();
  const logoutMutate = useLogout();
  const { logout, user } = useUser();

  const handleLogout = () => {
    logoutMutate.mutate(undefined,
      {
        onSuccess: () => {
          logout();
        },
        onError: (error) => {
          console.log('Error:', error)
        },
      }
    );
  }

  return (
    <View style={generalStyles.containerTop}>
      <View style={profileStyles.profileCard}>
        <View style={profileStyles.profileHeader}>
          <View style={profileStyles.avatar}>
            <User size={40} color="#FFF" />
          </View>
          <View style={profileStyles.profileDetails}>
            <Text style={profileStyles.profileName}>{`${user?.user.name} ${user?.user.lastName ? user?.user.lastName : ''}`}</Text>
            <Text style={profileStyles.profileID}>{user?.user.id}</Text>
          </View>
        </View>

        <View style={profileStyles.profileInfoSection}>
          <Text style={profileStyles.profileInfoLabel}>{t('general.email')}:</Text>
          <Text style={profileStyles.profileInfoValue}>{user?.user.email}</Text>

          <Text style={profileStyles.profileInfoLabel}>{t('general.phone')}:</Text>
          <Text style={profileStyles.profileInfoValue}>+58 412 123 4567</Text>

          <Text style={profileStyles.profileInfoLabel}>{t('general.documentId')}:</Text>
          <Text style={profileStyles.profileInfoValue}>V-12345678</Text>
        </View>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={passwordRecoveryStyles.button}
          loading={logoutMutate.isPending}
          disabled={logoutMutate.isPending}
        >
          {t('general.logout')}
        </Button>
      </View>
    </View>
  );
};

export default Profile;
