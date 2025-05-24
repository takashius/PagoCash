import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "../utils/CustomTheme";
import HomeScreen from "../screens/Home";
import Transactions from "../screens/Transactions";
import Profile from "../screens/Profile";
import MyQR from "../screens/MyQR";
import QRScanner from "../components/QRScanner";
import RechargeScreen from "../screens/Recharge";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/register";
import TransferScreen from "../screens/Transfer";
import { Home, List, User } from "lucide-react-native";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const TabsNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent;

          switch (route.name) {
            case "Home":
              IconComponent = Home;
              break;
            case "Transactions":
              IconComponent = List;
              break;
            case "Profile":
              IconComponent = User;
              break;
            default:
              IconComponent = Home;
          }

          return <IconComponent color={color} size={size} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#f4f4f4",
          height: 80,
          paddingTop: 12,
        },
        headerStyle: { backgroundColor: "#007bff" },
        headerTintColor: "white",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('menu.home'),
          headerTitle: t('menu.home'),
        }} />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: t('menu.transactions'),
          headerTitle: t('menu.transactions'),
        }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t('menu.profile'),
          headerTitle: t('menu.myProfile'),
        }} />
    </Tab.Navigator>
  );

  return (
    <PaperProvider theme={CustomTheme}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#007bff" },
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="Tabs"
              component={TabsNavigator}
              options={{
                headerShown: false,
                headerTitle: t('menu.home'),
              }}
            />
            <Stack.Screen
              name="QR"
              component={MyQR}
              options={{
                headerTitle: t('home.myQr'),
              }}
            />
            <Stack.Screen
              name="QRScanner"
              component={QRScanner}
              options={{
                headerTitle: t('menu.scanQr'),
              }}
            />
            <Stack.Screen
              name="Recharge"
              component={RechargeScreen}
              options={{
                headerTitle: t('menu.recharge'),
              }}
            />
            <Stack.Screen
              name="Transfer"
              component={TransferScreen}
              options={{
                headerTitle: t('menu.transfer'),
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );

};

export default AppNavigator;