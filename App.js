
//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

//import React Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore,enableNetwork,disableNetwork,} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence,getAuth,} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//import from netinfo
import { useNetInfo } from "@react-native-community/netinfo";

//import from react
import { useEffect } from "react";

//import React-native compents
import { StyleSheet, Alert } from 'react-native';

//initialize a handler to Firebase storage
import { getStorage } from "firebase/storage";

//.env file
import { REACT_APP_API_KEY } from '@env';

// Create the navigator
const Stack = createNativeStackNavigator();

//create app
const App = () => {

  //determine if App is connected or not
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  
  //api info
  const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chatapp-a1dd0.firebaseapp.com",
  projectId: "chatapp-a1dd0",
  storageBucket: "chatapp-a1dd0.appspot.com",
  messagingSenderId: "306168821357",
  appId: "1:306168821357:web:355708a6593333d953f164"
};
  

  let app;

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } else {
    app = getApp();
    auth = getAuth(app);
  }

  //initialize Firestone db
  const db = getFirestore(app);

  //initialize Firebase storage
  const storage = getStorage(app);

  return (
    //Build Navigation
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              storage={storage}
              {...props}
              isConnected={connectionStatus.isConnected}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//style Navigation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;