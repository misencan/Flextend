import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA'
        // backgroundImage: '../images/home-background.png' 
    },
    container2: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(255,255,255)',
        paddingTop: Platform.OS === 'ios' ? 30 : 40,
        paddingBottom: Platform.OS === 'ios' ? 30 : 40,
        marginLeft: 50,
        marginRight: 50,
        marginTop:50,
        borderRadius: 30
    },
    alertBox: {
        // flex: 1,
        backgroundColor: '#9acd32',
        marginLeft: 50,
        marginRight: 50,
        marginTop:30,
        borderRadius: 20,
        height: 80
    },
    device_content: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    welcome_message: {
        fontSize: 30,
        marginTop: 100,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: 'black',
    },
    text: {
        fontSize: 26,
        // marginTop: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: 'black',
        // marginBottom: 40,
    },
    textBox: {
        fontSize: 26,
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: 'black',
        // marginBottom: 40,
    },
     text2: {
        fontSize: 26,
        marginTop: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: 'black',
        // marginBottom: 40,
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
        //backgroundColor: '#87ceeb',
        backgroundColor: '#FFA500',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 100,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button2: {
        backgroundColor: '#FFA500',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button3: {
        backgroundColor: '#FFA500',
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
    textContent: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'arial',
        marginTop: 20,
        alignSelf: "center",
    },
    dayCheckBox: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderColor: 'transparent',
        justifyContent: 'flex-start'
    },
    welcome_message2: {
        fontSize: 30,
        marginTop: 100,
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
        justifyContent: "center",
        backgroundColor: 'rgba(255, 155, 0, 0.6)',
        marginTop: 20,
        borderRadius: 30,
        marginRight: 40,
        marginLeft: 40,
        // shadowOffset: { width: 50, height: 0}
        // paddingRight: SIZES.padding,
        // paddingBottom: SIZES.radius,
    }
})