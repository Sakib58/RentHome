import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text,Button, CheckBox, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import * as firebase from 'firebase';
import "firebase/firestore";

const districtList={
  'none':[],
  'dhaka':[
      { label: 'Muhammadpur', value: 'muhammadpur' },
      { label: 'Lalmatia', value: 'lalmatia' },
  ],
  'mymensingh':[
      {label: 'Muktagasa', value: 'muktagasa'},
      {label: 'Sherpur', value: 'sherpur'},
  ],
}
const AddHome = (props) => {
  console.log("From AddHome",props.route.params.email);
  const [selectedDivision,setSelectedDivision]=useState("none");
  const [selectedDistrict,setSelectedDistrict]=useState("");
  const [districts,setDistricts]=useState([]);
  const [name,setName]=useState("");
  const [amount,setAmount]=useState(0);
  const [address,setAddress]=useState("");
  const [gasService,setGasService]=useState(false);
  const [backupElectricity,setBackupElectricity]=useState(false);
  const [wifiService,setWifiService]=useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      setImage(result.uri);
      console.log("image",image)
    }
  };

  return (
    <View style={styles.background}>
      <View style={{height:"30%"}}>
        <Image
          source={{uri:image}}
          style={{height:200}}
        />
      </View>
      <Text> </Text>

      <Button
        title="Add new photo"
        onPress={()=>{
          pickImage();
        }}
      />
      <Text> </Text>
      
      <RNPickerSelect
            onValueChange={(value)=>{
              setSelectedDivision(value);
              console.log('districts are,',districts);
            }}
            items={[
                { label: 'Dhaka', value: 'dhaka' },
                { label: 'Mymensingh', value: 'mymensingh' },
            ]}
            >
          <Text style={{fontSize:18,marginLeft:20}}>Division: {selectedDivision}</Text>
        </RNPickerSelect>

        <Text> </Text>

        <RNPickerSelect
            onValueChange={(value)=>{
              setSelectedDistrict(value);
              
            }}
            items={districtList[selectedDivision]}
            >
          <Text style={{fontSize:18,marginLeft:20}}>District: {selectedDistrict}</Text>
        </RNPickerSelect>
        <Text> </Text>
        <Input
          placeholder="Name of your house"
          onChangeText={(currentInput)=>{
            setName(currentInput);
          }}
        />
        <Input
          placeholder="Detailed address of your house"
          onChangeText={(currentInput)=>{
            setAddress(currentInput);
          }}
        />
        <Input
          placeholder="Expected amount to rent"
          onChangeText={(currentInput)=>{
            setAmount(currentInput);
          }}
        />
        <View style={{flex: 1,alignItems: "center",justifyContent: "center",}}>
          <View style={{flexDirection:"row"}}>
            <CheckBox
            value={gasService}
            onValueChange={setGasService}
            />
            <Text>Gas service available</Text>
          </View>
        </View>

        <View style={{flex: 1,alignItems: "center",justifyContent: "center",}}>
          <View style={{flexDirection:"row"}}>
          <CheckBox
            value={backupElectricity}
            onValueChange={setBackupElectricity}
          />
            <Text>Backup electricity service available</Text>
          </View>
        </View>

        <View style={{flex: 1,alignItems: "center",justifyContent: "center",}}>
          <View style={{flexDirection:"row"}}>
          <CheckBox
            value={wifiService}
            onValueChange={setWifiService}
          />
            <Text>Wifi service available</Text>
          </View>
        </View>
          
          
          
        
        <Button
          title="Save this home"
          onPress={()=>{
            //console.log(name,props.route.params.email,address,se)
            try{
              
              firebase.firestore().collection("homes").doc().set(
              {
                name:name,
                email:props.route.params.email,
                rating:5.0,
                address:address,
                district:selectedDistrict,
                division:selectedDivision,
                amount:amount,
                gasService:gasService,
                wifiService:wifiService,
                backupElectricity:backupElectricity,
                isBooked:false,
              }
            ).then(()=>{
              alert("Saved successfully!");
              console.log("Saved")
            }).catch((error)=>{
              alert(error);
              console.log(error);
            })
            }
            catch{(error)=>{
              console.log(error);
            }}
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  headline_text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20
  },
  explore_text: {
    marginTop: 5,
    marginBottom: 10,
    color: 'black',
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600'
  },
});

export default AddHome;