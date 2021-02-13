import React from 'react';
import {View,Text, Alert, TouchableOpacity, FlatList,Image} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthContext} from './../provider/AuthProvider';
import { Avatar, Card ,Accessory} from 'react-native-elements';
import HomeCard from '../components/HomeCard';
import OwnerHomeCard from '../components/OwnerHomeCard';

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
                  data={homeList}
                  renderItem={(item)=>{
                    return(
                      <OwnerHomeCard
                        params={item}
                      />
                    );
                  }}
                />
                <Button
                  title="Add New Home"
                  onPress={()=>{
                    
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