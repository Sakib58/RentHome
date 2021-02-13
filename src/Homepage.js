import React from 'react';
import {View,Text,FlatList} from 'react-native';
import HomeCard from '../components/HomeCard';

const Homepage=(props)=> {
  const data=[{},{},{},{},{},{},{},{},{},]
  return (
      <View >
        <View style={{marginLeft:"25%"}}>
          <Text style={{color:"blue",fontSize:20}}>Welcome to RentHome</Text>
        </View>
        
        <FlatList
          data={data}
          renderItem={(item)=>{
            return(<HomeCard
              props={props}
            />);
          }}
        />
      </View>
  );
}

export default Homepage;