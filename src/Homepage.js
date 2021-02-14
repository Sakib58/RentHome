import React,{useState, useEffect} from 'react';
import {View,Text,FlatList} from 'react-native';
import HomeCard from '../components/HomeCard';
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from './../components/Loading';



const Homepage=(props)=> {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(false);


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

  //setIsLoading(true);
  
  var data=[{},{},{},{},{},{},{},{},{},]

  return (
        <View >
          <View style={{marginLeft:"25%"}}>
            <Text style={{color:"blue",fontSize:20}}>Welcome to RentHome</Text>
          </View>
          
          <FlatList
            data={homes}
            renderItem={(item)=>{
              return(<HomeCard
                props={props}
                data={item}
              />);
            }}
          />
        </View>
  );
}

export default Homepage;