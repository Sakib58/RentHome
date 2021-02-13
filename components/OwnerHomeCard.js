import React, { useState } from 'react';
import { Button } from 'react-native';
import {View,Image,Text} from 'react-native';
import {Card} from 'react-native-elements';

function OwnerHomeCard(props) {
    //console.log('Props are . . . ',props.params);

    var imageSrc=props.params.item.imageSrc;
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