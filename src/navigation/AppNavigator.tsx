import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import CustomTheme from "../utils/CustomTheme";
import HomeScreen from "../screens/Home";
import Transactions from "../screens/Transactions";
import Login from "../screens/Login";
import { Home, List, User } from "lucide-react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const user = true;

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
              tabBarActiveTintColor: "#ff7f50",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: "white",
                borderTopWidth: 1,
                borderTopColor: "#f4f4f4",
                height: 80,
                paddingTop: 12,
              },
              headerStyle: { backgroundColor: "#ff7f50" },
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
              name="Perfil"
              component={HomeScreen}
              options={{
                tabBarLabel: "Perfil",
                headerTitle: "",
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