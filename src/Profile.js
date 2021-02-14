import React,{useState, useEffect} from 'react';
import {View,Text, Alert, TouchableOpacity, FlatList,Image} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthContext} from './../provider/AuthProvider';
import { Avatar, Card ,Accessory} from 'react-native-elements';
import HomeCard from '../components/HomeCard';
import OwnerHomeCard from '../components/OwnerHomeCard';
import * as firebase from "firebase";
import "firebase/firestore";

const homeList=[
  {
    imageSrc:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q8f5x8zXPQ-5XeYVG4kf1gHaE9%26pid%3DApi&f=1',
    name:"Sweet Home 1",
    address:"Abc",
  },
  {
    imageSrc:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q8f5x8zXPQ-5XeYVG4kf1gHaE9%26pid%3DApi&f=1',
    name:"Sweet Home 2",
    address:"Def",
  },
  {
    imageSrc:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q8f5x8zXPQ-5XeYVG4kf1gHaE9%26pid%3DApi&f=1',
    name:"Sweet Home 3",
    address:"Ghi"
  },
]

const homeList2=[
  {},{},{},
]

function Profile(props) {
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
  return (
    <AuthContext.Consumer>
      {(auth)=>(
        <View>
          <View style={{height:"20%"}}>
            
              <Card>            
            <Text>Name: {auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["name"]["stringValue"]}</Text>
            <Text>Email: {auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["email"]["stringValue"]}</Text>
            <Text>Phone: {auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["phone"]["stringValue"]}</Text>
          </Card>
          
          </View>
          
            
          <View style={{height:"75%"}}>
          {
            auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["userType"]["stringValue"]== "owner" ? (
              <View>
              <Text style={{marginLeft:20,fontSize:18,color:"blue"}}>Your homes</Text>
                <FlatList
                  data={homes}
                  renderItem={(item)=>{
                    console.log("Items data in profile: ",item.item.email);
                    if(item.item.email==auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["email"]["stringValue"]){
                      return(
                      <OwnerHomeCard
                        params={item}
                      />
                    );
                    }
                    
                  }}
                />
                <Button
                  title="Add New Home"
                  onPress={()=>{
                    props.navigation.navigate("AddHome",{email:auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["email"]["stringValue"]})
                  }}
                />
                
              </View>
            ):(
              <Text> </Text>
            )
          }
          </View>
          
          
        </View>
      )}
    </AuthContext.Consumer>
  );
}

export default Profile;