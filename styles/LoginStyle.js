import { StyleSheet, Platform, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    page: {
      flex: 3,
      alignItems: 'center',
      // backgroundColor:'rgba(255,255,255, 0.6)',
      // marginTop: 2
    },
    textInput: {
      backgroundColor: 'rgba(255,255,255, 0.9)',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 10,
      color: 'black',
      fontSize: 16,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
      fontWeight: 'bold'
    },
    text: {
      marginTop: Platform.OS === 'ios' ? 100 : 80,
      fontSize: 24,
      textAlign: 'center',
      paddingLeft: 10,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
      fontWeight: 'bold', 
      color: 'black',
      textShadowColor: 'white',
      textShadowRadius: 20,
    },
    textRegister: {
      marginTop: Platform.OS === 'ios' ? 100 : 100,
      fontSize: 24,
      textAlign: 'center',
      paddingLeft: 10,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
      fontWeight: 'bold', 
      color: 'black',
      textShadowColor: 'white',
      textShadowRadius: 20,
    },
    format: {
      marginTop: 20,
      fontSize: 18,
      textAlign: 'center',
      paddingLeft: 10,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
      fontWeight: 'bold',
      color: 'black',
      textShadowColor: 'white',
      textShadowRadius: 20
    },
    themeButton: {
      backgroundColor: '#87ceeb', 
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      borderColor: '#555',
      // borderWidth: 2,
      borderRadius: 10
    },
    themeButtonRegister: {
      backgroundColor: 'orange', 
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      borderColor: '#555',
      // borderWidth: 2,
      borderRadius: 10
    },
    themeButtonTitle: {
      fontSize: 24,
      fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
      color: 'black'
    },
    verificationView: {
      width: '100%',
      alignItems: 'center',
      marginTop: 30
    },
    image: {
        width: Dimensions.get("window").width - 20,
        // paddingLeft: 50,
        marginTop: Platform.OS === 'ios' ? 100 : 90,
        marginBottom: Platform.OS === 'android' ? -40 : 0,
        height: 60,
        alignSelf: 'center',
        // borderRadius: 10,
        resizeMode: 'contain',
    }
})