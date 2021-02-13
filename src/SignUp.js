import React, { useState } from "react";
import { View, StyleSheet,Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "./../components/Loading";
import RNPickerSelect from 'react-native-picker-select';

const SignUp = (props) => {
  const [Name, setName] = useState("");
  const [Phone,setPhone]=useState("");
  const [Email, setEmail] = useState("");
  const [userType,setUserType]=useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [UT,setUT]=useState("Select User Type");
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.viewStyle}>
        <Card>
          <Card.Divider />
          <Input
            leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
            placeholder="Phone number"
            onChangeText={function (currentInput) {
              setPhone(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder="E-mail Address"
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />

          <RNPickerSelect
            onValueChange={(value)=>{
              setUserType(value);
            }}
            value={userType}
            items={[
                { label: 'As a home owner', value: 'owner' },
                { label: 'As a renter', value: 'renter' },
            ]}
        >
          <Text style={{fontSize:18,marginLeft:20}}>As a {userType}</Text>
        </RNPickerSelect>

          <Input
            placeholder="Password"
            leftIcon={<Feather name="key" size={24} color="black" />}
            secureTextEntry={true}
            onChangeText={function (currentInput) {
              setPassword(currentInput);
            }}
          />

          <Button
            icon={<AntDesign name="user" size={24} color="white" />}
            title="  Sign Up!"
            type="solid"
            onPress={() => {
              if (Name && Phone && userType && Email && Password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        phone: Phone,
                        email: Email,
                        userType:userType,
                      })
                      .then(() => {
                        setIsLoading(false);
                        alert("Account created successfully!");
                        console.log(userCreds.user);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can not be empty!");
              }
            }}
          />
          <Button
            type="clear"
            icon={<AntDesign name="login" size={24} color="dodgerblue" />}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
});
export default SignUp;