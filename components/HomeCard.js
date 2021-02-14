import React from 'react';
import { Button } from 'react-native';
import {View,Image,Text} from 'react-native';
import {Card} from 'react-native-elements';

function HomeCard(props) {
    //console.log('Props are . . . ',props.data.item);
    const imageSrc='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q8f5x8zXPQ-5XeYVG4kf1gHaE9%26pid%3DApi&f=1';
    //const title="Sweet Home";
    //const address="Muhammadpur,Dhaka"
    return(
        <View>
            <Card>
                <Image
                    style={{height:200}}
                    source={{uri:imageSrc}}

                />
                <Card.Divider/>
                <Text>Name: {props.data.item.name}</Text>
                <Text>Address: {props.data.item.address}</Text>
                <Text>Rating: {props.data.item.rating}</Text>
                <Text>  </Text>
                <Button
                    title="See Details..."
                    onPress={()=>{
                        props.props.navigation.navigate("Details",{data:props.data.item});
                    }}
                />
            </Card>
        </View>
    );
}

export default HomeCard;