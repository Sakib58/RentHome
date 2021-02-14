import React,{useState} from 'react';
import { View, StyleSheet, Text,Button } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import {AuthContext} from './../provider/AuthProvider';

const HomeDetails = (props) => {
  //console.log("in homedetails:",props.route.params.data)
  const imageUri='https://i.pinimg.com/originals/38/d7/5b/38d75b985d9d08ce0959201f8198f405.jpg';
  return (
    <AuthContext.Consumer>
      {
        (auth)=>(
          <View style={styles.background}>
            <View style={{height:"40%"}}>
              <Text style={styles.explore_text}>Click on an image to view in full screen mode</Text>
              <GridImageView data={[{ image: imageUri }, { image: imageUri }, { image: imageUri }, { image: imageUri }]} />
            </View>
            <Text style={{fontSize:18,color:"blue"}}>Name: {props.route.params.data.name}</Text>
            <Text style={{fontSize:18,color:"blue"}}>Rating of this house: {props.route.params.data.rating}</Text>
            <Text style={{fontSize:18,color:"blue"}}>Address: {props.route.params.data.address},{props.route.params.data.district},{props.route.params.data.division}</Text>
            <Text style={{fontSize:18,color:"blue"}}>Gas service? : {props.route.params.data.gasService==true ? "Yes":"No"}</Text>
            <Text style={{fontSize:18,color:"blue"}}>Wifi service? : {props.route.params.data.wifiService==true? "Yes": "No"}</Text>
            <Text style={{fontSize:18,color:"blue"}}>Backup Electricity? : {props.route.params.data.backupElectricity== true ? "Yes":"No"}</Text>
            <Text style={{fontSize:18,color:"blue"}}>Amount to rent : {props.route.params.data.amount}</Text>
            {
              auth.CurrentUser["d_"]["Zf"]["gt"]["proto"]["mapValue"]["fields"]["userType"]["stringValue"]== "renter" ?(
                <View>
                  <Button
                    title="Rent this home"
                  />
                </View>
              ):(<Text> </Text>)
            }
              
          </View>
        )
      }
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  headline_text: {
    color: 'black',
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

export default HomeDetails;