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
import Login from "../screens/Login";
import { Home, List, User } from "lucide-react-native";
import { useUser } from "../context/UserContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useUser();

  const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="QR" component={MyQR} options={{ headerTitle: "Mi código QR" }} />
    </Stack.Navigator>
  );

  return (
    <PaperProvider theme={CustomTheme}>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let IconComponent;

                switch (route.name) {
                  case "Inicio":
                    IconComponent = Home;
                    break;
                  case "Movimientos":
                    IconComponent = List;
                    break;
                  case "Perfil":
                    IconComponent = User;
                    break;
                  default:
                    IconComponent = Home;
                }

                return <IconComponent color={color} size={size} />;
              },
              tabBarActiveTintColor: "#2ECC71",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: "white",
                borderTopWidth: 1,
                borderTopColor: "#f4f4f4",
                height: 80,
                paddingTop: 12,
              },
              headerStyle: { backgroundColor: "#2ECC71" },
              headerTintColor: "white",
            })}
          >
            <Tab.Screen
              name="Inicio"
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarLabel: "Inicio",
                headerTitle: "Inicio",
              }} />
            <Tab.Screen
              name="Movimientos"
              component={Transactions}
              options={{
                tabBarLabel: "Movimientos",
                headerTitle: "Movimientos",
              }} />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarLabel: "Perfil",
                headerTitle: "Mi perfil",
              }} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );

};

export default AppNavigator;