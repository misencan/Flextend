import { StyleSheet, Platform, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundImage: '../images/home-background.png' 
        // backgroundColor: 'white'
        
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === 'ios' ? 30 : 40,
        paddingBottom: 20
    },
    device_content: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    welcome_message: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        marginBottom: Platform.OS === 'android' ? -20 : 0,
        alignSelf: "center",
        color: 'black',
        // #191970
    },
    italic: {
        fontSize: 15,
        marginTop: 20,
        fontStyle: 'italic',
        alignSelf: "center",
        color: 'black',
    },
    home_image: {
        height: 180,
        width: 350,
        alignSelf: "center",
        margin: 30,
    },
    button1: {
        backgroundColor: '#87CEFA',
        
        // '#87ceeb'
        marginLeft: 30,
        marginRight: 30,
        marginTop: 70,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button2: {
        backgroundColor: 'rgb(255,99,71)',
        marginLeft: 90,
        marginRight: 90,
        marginTop: 20,
        marginBottom: 15,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button3: {
        backgroundColor: '#87CEFA',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'black',
        fontSize: 24,
        fontFamily: Platform.OS == 'ios' ? 'Arial' : 'sans-serif'
    },
    buttonTitle1: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Platform.OS == 'ios' ? 'Arial' : 'sans-serif'
    },
    textContent: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'arial',
        marginTop: 20,
        alignSelf: "center",
    },
    dayCheckBox: {
        // backgroundColor: 'transparent',
        // borderRadius: 0,
        // borderColor: 'transparent',
        // justifyContent: 'flex-start'
    },
    welcome_message2: {
        fontSize: 30,
        marginTop: 0,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: '#c71585',
        marginBottom: 40,
    },
    button2Reminder: {
        backgroundColor: '#ffa500',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 5,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    goals: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'rgb(255,165,0)',
        
        // 'rgba(255, 155, 0, 0.9)'
        marginTop: 20,
        borderRadius: 30,
        marginRight: 40,
        marginLeft: 40,
        // shadowOffset: { width: 50, height: 0}
        // paddingRight: SIZES.padding,
        // paddingBottom: SIZES.radius,
    },
    image: {
        width: Dimensions.get("window").width - 20,
        // paddingLeft: 50,
        marginTop: Platform.OS === 'ios' ? 100 : 90,
        height: 60,
        alignSelf: 'center',
        // borderRadius: 10,
        resizeMode: 'contain',
    }
})