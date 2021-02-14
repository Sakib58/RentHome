import React, { useState } from 'react';
import { Button } from 'react-native';
import {View,Image,Text} from 'react-native';
import {Card} from 'react-native-elements';

function OwnerHomeCard(props) {
    //console.log('Props are . . . ',props.params);
    const imageSrc='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q8f5x8zXPQ-5XeYVG4kf1gHaE9%26pid%3DApi&f=1';

    //var imageSrc=props.params.item.imageSrc;
    var title=props.params.item.name;
    var address=props.params.item.address;
    console.log(title,address)
    return(
        <View>
            <Card>
                <Image
                    style={{height:200}}
                    source={{uri:imageSrc}}

                />
                <Card.Divider/>
                <Text>{title}</Text>
                <Text>{address}</Text>
                <Text>  </Text>
                
            </Card>
        </View>
    );
}

export default OwnerHomeCard;