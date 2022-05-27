import React from 'react';
import { View, ScrollView, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from "../styles/LoginStyle"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class RegistrationScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Register New User',
    };

    //loading background image 
    // componentWillMount() {
    //   this.image = (<ImageBackground source={require('../images/graphs.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}} />);
    // }

    //Initializing states needed for user registration
    state = {
        phone: '+1 ',
        firstName: '',
        lastName: '',
        verificationCode: '',
        confirmResult: null,
        userID: ''
    }

    //Function to check user phone number input using regular expressions
    validPhoneNumber = () => {
        var regEx = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regEx.test(this.state.phone)
    }

    //Function to sign in a user to Google Firebase 
    registerUser = () => {
        if (this.validPhoneNumber() && this.state.firstName != '' && this.state.lastName != '')
        {
            auth()
              .signInWithPhoneNumber(this.state.phone)
              .then(confirmResult => {
                this.setState( {confirmResult} )
            })
        }
        else 
        {
          alert("Please enter all information to register.")
          this.setState( {confirmResult: null})
          this.setState( {phone: '+1 '})
          this.setState( {firstName: ''})
          this.setState( {lastName: ''})
          this.setState( {verificationCode: ''})
        }
    }

    //Function to create a user profile in Firebase Auth & Firestore
    handleVerifyCode = () => {
        const {confirmResult, verificationCode} = this.state
        if (verificationCode.length == 6) {
          confirmResult
            .confirm(verificationCode)
            .then(user => {
              if (auth().currentUser.displayName != null)
              {
                  auth().signOut()
                  alert('Your user account has already been registered!')
                  this.setState( {confirmResult: null})
                  this.setState( {phone: '+1 '})
                  this.setState( {firstName: ''})
                  this.setState( {lastName: ''})
                  this.setState( {verificationCode: ''})
              }
              else 
              {
                auth().currentUser.updateProfile({
                    displayName: this.state.firstName + ' ' + this.state.lastName
                })

                const phone = this.state.phone.replace(/\s/g, "")
                console.log(phone)

                firestore().doc('users/' + phone).set({
                  phone: phone,
                  first_name: this.state.firstName,
                  last_name: this.state.lastName
                })

                this.props.navigation.navigate("Guide")

                this.setState( {userID: user.uid} )
                this.setState( {confirmResult: null})
                this.setState( {phone: '+1 '})
                this.setState( {firstName: ''})
                this.setState( {lastName: ''})
                this.setState( {verificationCode: ''})
               }
            })
            .catch(error => {
              alert("Please enter a 6 digit OTP code\nCheck messages for OTP code")
              this.setState( {verificationCode: ''})
            })
        } else {
          alert("Please enter a 6 digit OTP code\nCheck messages for OTP code")
          this.setState( {verificationCode: ''})
        }
      }

    //Render the screen to include the verification code text box
    renderConfirmationView = () => {
        return (
          <KeyboardAwareScrollView>
            <TextInput
              style = {styles.textInput}
              placeholder = 'Verification Code'
              placeholderTextColor = '#000'
              textAlign ='left'
              value = {this.state.verificationCode}
              keyboardType = 'numeric'
              onChangeText = {verificationCode => {
                this.setState( {verificationCode} )
              }}
              maxLength = {6}
            />
            <TouchableOpacity
              style={[styles.themeButton, {marginTop: 20}]}
              onPress={this.handleVerifyCode}>
              <Text style = {styles.themeButtonTitle}>Verify Code</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        )
    }

    //Render login screen function 
    render () {
        return (
          <View>
            {/* {this.image} */}
          <ImageBackground source={require('../images/home-background.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}} >
            <ScrollView >
                <Text style = {styles.textRegister}>Please Enter the Information Below to Register</Text>
                <TextInput 
                    style = {styles.textInput}
                    placeholder = 'Phone Number'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    keyboardType = 'phone-pad'
                    value = {this.state.phone}
                    onChangeText = {phone => {
                        this.setState( {phone} )
                    }}
                    maxLength = {13}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'First Name'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    value = {this.state.firstName}
                    keyboardType = 'default'
                    onChangeText = {firstName => {
                        this.setState( {firstName} )
                    }}
                    maxLength = {20}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'Last Name'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    keyboardType = 'default'
                    value = {this.state.lastName}
                    onChangeText = {lastName => {
                        this.setState( {lastName} )
                    }}
                    maxLength = {20}
                />
                <TouchableOpacity
                    style = {[styles.themeButton, {marginTop: 20}]}
                    onPress = {this.registerUser}>
                      <Text style={styles.themeButtonTitle}>
                        Complete Registration
                      </Text>
                </TouchableOpacity>

                {this.state.confirmResult ? this.renderConfirmationView() : null}
            </ScrollView>
          </ImageBackground>
        </View>
        )
    }
}