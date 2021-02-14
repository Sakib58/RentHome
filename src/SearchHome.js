import React,{useState,useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Button} from 'react-native-elements'

import * as firebase from "firebase";
import "firebase/firestore";
import HomeCard from '../components/HomeCard';

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

function SearchHome(props) {
    const [selectedDivision,setSelectedDivision]=useState("none");
    const [selectedDistrict,setSelectedDistrict]=useState("");
    const [districts,setDistricts]=useState([]);
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedHomes,setSelectedHomes]=useState([]);


  const loadHomes = async () => {
    //setLoading(true);
    try {
      firebase
      .firestore()
      .collection("homes")
      .onSnapshot((querySnapshot) => {
        let temp_data = [];
        querySnapshot.forEach((doc) => {
            temp_data.push({email:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["email"]["stringValue"],
            name:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["name"]["stringValue"],
            rating:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["rating"]["integerValue"],
            address:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["address"]["stringValue"],
            district:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["district"]["stringValue"],
            division:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["division"]["stringValue"],
            amount:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["amount"]["stringValue"],
            gasService:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["gasService"]["booleanValue"],
            wifiService:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["wifiService"]["booleanValue"],
            backupElectricity:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["backupElectricity"]["booleanValue"],
            isBooked:doc["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["isBooked"]["stringValue"],})

        });
        setHomes(temp_data);
        //setLoading(false);
        console.log(temp_data);
      })
      .catch((error) => {
        //setLoading(false);
        alert(error);
      });
    } catch (error) {
      console.log(error);      
    }
  };

  useEffect(() => {
    loadHomes();
  }, []);
    return (
        <View style={{marginTop:"20%"}}>
            <View style={{height:"20%"}}>
            <Text style={{fontSize:30,color:'blue',marginLeft:"20%"}}>Search for home</Text>
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

          
          <Button
              title="Search"
              onPress={()=>{
                var td=[];
                homes.forEach((home)=>{
                  if(home.division==selectedDivision && home.district==selectedDistrict){
                    td.push(home);
                  }
                });
                setSelectedHomes(td);
              }}
          />
            </View>
        <View style={{height:"75%"}}>
          <FlatList
            data={selectedHomes}
            renderItem={(item)=>{
              console.log("ok ok",item);
              return(
                <HomeCard
                  props={props}
                  data={item}
                />
              )
            }}
          />
        </View>

        </View>
    );
}

export default SearchHome;