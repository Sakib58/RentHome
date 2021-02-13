import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";

import { AuthContext } from "./../provider/AuthProvider";
import * as firebase from "firebase";
import Loading from "./../components/Loading";


const SignIn = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
          {auth.setIsLoggedIn(false)}
            <Card>
              <Card.Title>Thanks for choosing us!</Card.Title>
              <Card.Divider />
              <Input
                leftIcon={
                  <FontAwesome name="envelope" size={24} color="black" />
                }
                placeholder="Phone number"
                onChangeText={function (currentInput) {
                  setEmail(currentInput);
                }}
              />

              <Input
                placeholder="Password"
                leftIcon={<Feather name="key" size={24} color="black" />}
                secureTextEntry={true}
                onChangeText={function (currentInput) {
                  setPassword(currentInput);
                }}
              />

              <Button
                icon={<AntDesign name="login" size={24} color="white" />}
                title="  Sign In!"
                type="solid"
                onPress={() => {
                  setIsLoading(true);
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(Email, Password)
                    .then((userCreds) => {
                      //setIsLoading(false);
                      auth.setIsLoggedIn(true);
                      // Retrieving user data and save it to auth.CurrentUser
                      firebase.firestore().collection('users').doc(userCreds.user.uid).get().then((doc)=>{
                        if(doc.exists){
                          //console.log(doc);
                          auth.setCurrentUser(doc);
                          setIsLoading(false);
                        }else{
                          console.log('No such document')
                          setIsLoading(false);
                        }
                      }).catch((error)=>{
                        console.log(error);
                      });

                      //console.log('userCreds',userCreds.uid);
                      //auth.setCurrentUser(userCreds.user);
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      alert(error);
                    });
                }}
              />
              <Button
                type="clear"
                icon={<AntDesign name="user" size={24} color="dodgerblue" />}
                title="  Don't have an account?"
                onPress={function () {
                  props.navigation.navigate("SignUp");
                }}
              />
            </Card>
          </View>
        )}
      </AuthContext.Consumer>
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
export default SignIn;