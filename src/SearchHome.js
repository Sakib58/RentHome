import React,{useState} from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Button} from 'react-native-elements'

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
    return (
        <View style={{marginTop:"20%"}}>
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
        />

        </View>
    );
}

export default SearchHome;