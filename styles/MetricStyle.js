import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
    title: {
        marginTop: 100,
        fontSize: 26,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        fontWeight: 'bold',
        color: 'black'
    },
    container:{
        flex:1,
        backgroundColor: '#87CEFA'
    },
    info_text: {
        marginTop: 10, 
        marginBottom: 15,
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        fontWeight: 'bold',
        color: 'black'
    },
    chart_title: {
        marginTop: 10, 
        marginBottom: 0,
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'black'
    },
    result_text: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        color: 'black'
    },
    chartContainer: {
        marginTop: 20,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 20,
        marginLeft: 20,
        marginRight: Platform.OS === 'android' ? 12 : 20
    }
})