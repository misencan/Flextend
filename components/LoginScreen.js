import React, {Component} from 'react';
import { TouchableOpacity, View, Text, TextInput, Image, ImageBackground } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import styles from "../styles/LoginStyle"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class LoginScreen extends Component {

  //Initializing states needed for user login
  state = {
    phone: '+1 ',
    confirmResult: null,
    verificationCode: '',
    userID: ''
  }

  //Function to check user phone number input using regular expressions
  validPhoneNumber = () => {
    var regEx = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regEx.test(this.state.phone)
  }

  //Function to handle the Google Firebase authentication 
  handleCode = () => {
    if (this.validPhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
            this.setState( {confirmResult} )
        })
        .catch(e => {
          alert("Invalid phone number. Please try again.")
          this.setState( {confirmResult: null})
          this.setState( {phone: '+1 '})
          this.setState( {verificationCode: ''})
        })
    } 
    else 
    {
      alert("Invalid phone number. Please try again.")
      this.setState( {confirmResult: null})
      this.setState( {phone: '+1 '})
      this.setState( {verificationCode: ''})
    }
  }

  //Function to handle a user wanting to change the entered phone number
  changePhoneNumber = () => {
    this.setState( {confirmResult: null, verificationCode: ''} )
  }

  //Function to verify the 6-digit verification code
  handleVerifyCode = () => {
    const {confirmResult, verificationCode} = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          if (firebase.auth().currentUser.displayName == null)
          {
            firebase.auth().signOut()
            alert('Phone number not found.\nPlease register as a new user.')

            this.setState( {confirmResult: null})
            this.setState( {phone: '+1 '})
            this.setState( {verificationCode: ''})
          }
          else
          {
            this.setState( {userID: user.uid} )
            this.props.navigation.navigate("Home")
            
            this.setState( {confirmResult: null})
            this.setState( {phone: '+1 '})
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

  //Function to navigate the user to the registration screen
  register = () => {
    this.setState( {confirmResult: null})
    this.setState( {phone: '+1 '})
    this.setState( {verificationCode: ''})
    this.props.navigation.navigate('Registration');
  }

  //Render the screen to include the verification code text box
  renderConfirmationView = () => {
    return (
      <View >
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
      </View>
    )
  }

  //Render login screen function 
  render() {
    return (
      <View >
      <ImageBackground source={require('../images/home-background.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}}  >
        <View>
            <Image 
              style = {styles.image} 
              source = {require('../images/Logo.png')}
            />
        </View> 
        <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'} style={{flex:1}} showsVerticalScrollIndicator={false}>
          <View  contentContainerStyle={styles.page}>
              <Text style = {styles.text}>Please Enter Your Phone Number to Login</Text>
              <Text style = {styles.format}>Example Format: +1 1111111111</Text>
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
              maxLength = {15}
              editable = {this.state.confirmResult ? false : true}
            />
            <TouchableOpacity
              style = {[styles.themeButton, {marginTop: 20}]}
              onPress = {
                this.state.confirmResult
                  ? this.changePhoneNumber
                  : this.handleCode
              }>
                <Text style={styles.themeButtonTitle}>
                  {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
                </Text>
            </TouchableOpacity>

            {this.state.confirmResult ? this.renderConfirmationView() : null}

            <TouchableOpacity
              style = {[styles.themeButtonRegister, {marginTop: 20}]}
              onPress = {this.register}>
                <Text style={styles.themeButtonTitle}>
                  Register as a New User
                </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    )
  }
}

  
export default LoginScreen;