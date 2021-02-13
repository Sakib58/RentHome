import React from 'react';
import { Button } from 'react-native';
import {View,Image,Text} from 'react-native';
import {Card} from 'react-native-elements';

function HomeCard(props) {
    //console.log('Props are . . . ',props.props);
    const imageSrc='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q8f5x8zXPQ-5XeYVG4kf1gHaE9%26pid%3DApi&f=1';
    const title="Sweet Home";
    return(
        <View>
            <Card>
                <Image
                    style={{height:200}}
                    source={{uri:imageSrc}}

                />
                <Card.Divider/>
                <Text>{title}</Text>
                <Text>  </Text>
                <Button
                    title="See more..."
                    onPress={()=>{
                        props.props.navigation.navigate("Details",{imageSrc:imageSrc,title:title});
                    }}
                />
            </Card>
        </View>
    );
}

export default HomeCard;