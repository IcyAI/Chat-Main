//import react native components
import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";

//import ActionSheet
import { useActionSheet } from '@expo/react-native-action-sheet';

//import image picker
import * as ImagePicker from 'expo-image-picker';

//import expo-location
import * as Location from 'expo-location';

//import firebase storage to store pictures
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//create customActions component
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, id }) => {
  //actionSheet displays the menu of actions stored in const options
  const actionSheet = useActionSheet();

  //Create Function to open menu when component is pressed
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      },
    );
  };

  //pick an image from the device library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  }

  //upload a photo
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri)
      else Alert.alert("Permissions haven't been granted");
    }
  }

  //send your location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }

  //creates a unique string reference for each new file uploaded
  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${id}-${timeStamp}-${imageName}`;
  }

  //save images to cloud storage
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      //get the remote URL of the uploaded image
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL })
    });
  }

  //return button to open menu
  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}
      accessible={true}
      accessibilityLabel="This is an input field with a clickable icon that expands a menu"
      accessibilityHint="Choose what type of media to share with your contacts or cancel to collapse menu"
      accessibilityRole="button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

//styles for menu
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;