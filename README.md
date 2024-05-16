<img src="/assets/screenshot_1.png" alt="Home screen" width="200" height="200"/>

![image of app's home screen](/assets/screenshot_1.png)

# Objective
A chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images and location. The App utilizes google Firestone to save messages, photos, and locations.

# Dependencies
- React Native: Framework for building mobile applications using JavaScript and React.
- Expo: Development platform for building React Native applications.
- GiftedChat: A library for creating chat interfaces in React Native applications.
- Google Firebase: Cloud-based platform that provides various services, including Firestore for real-time database and authentication.
- AsyncStorage: Local storage system in React Native for caching and persisting data.
- Expo ImagePicker: Expo API for accessing the device's image picker to choose images from the gallery.
- Expo MediaLibrary: Expo API for accessing and managing media assets on the device.
- Expo Location: Expo API for obtaining location information from a device.
- react-native-maps: React Native Map components for iOS + Android.
- MapView: Specific component from the react-native-maps library used to display maps in React Native applications.

# Features
- Users can enter their name and choose a background color for the chat screen before joining the chat
- Send and receive messages
- Send and receive images (from the media library or device's camera)
- Send and receive locations
- Record, send, and receive audio
- Users can view previous messages when offline

# Installation
- Clone the repository
- Install Node.js. To avoid any potential conflicts, it is recommended to run nvm use 16.19.0 in the terminal
- Install Expo by running npm install -g expo-cli
- Navigate to the chat-app folder and run npm install
- Set up Firebase for your project:
- Sign in at Google Firebase
- Create a project
- Set up Firestore Database (production mode)
- Adjust rules from allow read, write: if false; to allow read, write: if true;
- Register app(</>) in Project Overview
- Navigate to the chat-app folder and install the Firebase using npm install firebase
- Initialize Firebase by copying and pasting the provided Firebase configuration into the App.js
- Download the Expo Go app on your mobile and open
- In the terminal run npm start or expo start from the project directory



