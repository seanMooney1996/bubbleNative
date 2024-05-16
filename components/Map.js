import { Dimensions, StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'

export default function Map() {


  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  const [myLocation, setMyLocation] = useState(initialLocation);
  const [pin, setPin] = useState({})
  const [region, setRegion] = useState(null)
  const mapRef = React.useRef()






  const local ={
    latitude: "37.78825",
    longitude: "-122.4324",
  }

  //get user's location
  useEffect(() => {
    setPin(local)
    _getLocation()
  }, [])

  const _getLocation =async() => {

    try{
      let { status } = await Location.requestForegroundPermissionsAsync()

      if(status !== 'granted'){ 
        console.warn('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setMyLocation(location.coords) //from expo
    }
    catch(err){
      console.warn(err);
    }
  }
  


  const focusOnLocation = () =>{
    if (myLocation.latitude && myLocation.longitude){
        const newRegion = {
          latitude: parseFloat(myLocation.latitude),
          longitude: parseFloat(myLocation.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        if(mapRef.current){
          mapRef.current.animateToRegion(newRegion, 1000)
        }
      }
   
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider='google'
      >

    {myLocation.latitude && myLocation.longitude &&
            <Marker
                coordinate={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude
                }}
                title='My Location2'
                description='I am here'
            />
        }




        {pin.latitude && pin.longitude &&
            <Marker
                coordinate={{
                    latitude: parseFloat(pin.latitude),
                    longitude: parseFloat(pin.longitude)
                }}
                title='My Location'
                description='I am here'
            />
        }




      </MapView>

      <View style={styles.buttonContainer}>
            <Button title='Get Location' onPress = {focusOnLocation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  markerImage: {
    width: 40,
    height: 40, 
    borderRadius: 20,
  }
});
