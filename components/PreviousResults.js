import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import styles from '../styles/MetricStyle'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default function PreviousResults() {
    
    //Variables flexion, extension, metrics, and userID
    const [flexion, setFlexion] = useState(0);
    const [extension, setExtension] = useState(0);
    const [metrics, setMetrics] = useState({})
    const userID = auth().currentUser.phoneNumber;

    //Get the specified user knee health data from Firestore
    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('knee health')
                .doc(userID)
                .get();
            
            if (documentSnapshot.data() == null)
            {
                alert("Start Your First Measurment!\nNavigate to the Live Measurement Screen.")
            }
            else {
                const user_data = documentSnapshot.data();
                const user_keys = Object.keys(user_data).sort().reverse()
                const recent = user_keys[0]
                const values = user_data[recent.toString()]
                setFlexion(values["flexion"]);
                setExtension(values["extension"]);
            }
        } catch {
            console.log("Error")
        }
    };

    //Get the user information from Firestore
    const getUserMetrics = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('users')
                .doc(auth().currentUser.phoneNumber)
                .get()
            
            if (documentSnapshot.data() == null)
            {
                const user_metrics = {"0":0}
            }
            else 
            {
                const user_metrics = documentSnapshot.data();
                setMetrics(user_metrics)
            }
        }
        catch {

        }
    }

    useEffect(() => {
        getUser();
        getUserMetrics();
    }, [])

    //Initialize noData to be false
    var noData = false;

    const surgery = metrics["recent_surgery"]

    //If flexion and extension read 0...set noData to true
    if (flexion == 0 && extension == 0)
    {
        noData = true;
    }

    //If the user has not had a recent knee surgery...
    if (surgery == false)
    {
        //Divide flexion by 150 to get the percentage value
        if(flexion == 0){
            var flexion_data = {
                data:[0]
            }
        }
        else{
            var flexion_data = {
                data: [(100-flexion) / 90]
            }
        }
        

        //Subtract extension from 100 and divide by 100 to get the percentage value
        if(extension == 0){
            var extension_data = {
                data:[0]
            }
        }
        else{
            var extension_data = {

                data: [(extension -90) / 90]
                
            }
        }
        
    }
    //If the user has had a recent knee surgery...
    else 
    {
        // var new_flexion = 55
        // var new_extension = 180

        // if (flexion > 120)
        // {
        //     new_flexion = 120
        // }
        // if (extension < 20)
        // {
        //     new_extension = 20
        // }

        if(flexion == 0){
            var flexion_data = {
                data:[0]
            }
        }
        else{
            var flexion_data = {
                data: [(100-flexion) / 55]
            }
        }

        if(extension == 0){
            var extension_data = {
                data:[0]
            }
        }
        else{
            var extension_data = {

                data: [(extension -90) / 90]
                
            }
        }
        //Divide flexion by 120 to get the percentage value
        // var flexion_data = {
        //     data: [new_flexion / 120]
        // }

        //Subtract extension from 100 and divide by 100 to get the percentage value
        // var extension_data = {
        //     data: [(100 - new_extension) / 80]
        // }
    }

    //If there was no user data...set flexion and extension to 0 in the data field for the progress chat
    if (noData == true) {

        flexion_data = {
            data: [0]
        }

        extension_data = {
            data: [0]
        }
    }
    
    //Get the screen width 
    const screenWidth = Dimensions.get("window").width;

    //Get the name from the user profile
    const name = auth().currentUser.displayName;
    var first_name = ''
    var last_name = ''

    //Combine first and last name and add a space between
    var n = name.indexOf(' ')
        
    first_name = name.substring(0, n)
    last_name = name.substring((n - 1) + 2)

    //Return function displays the screen
    return (
        <View style={styles.container}>
        {/* <ImageBackground source={require('../images/graphs.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}}  > */}
        <ScrollView>
            <Text style={styles.title}>Hello {first_name} {last_name}</Text>
            <Text style={styles.info_text}>Here are your most recent results:</Text>
            <View style={styles.chartContainer}>
                <Text style={styles.result_text}>Flexion: {flexion} degrees</Text>
                <Text style={styles.chart_title}>Progress toward perfect knee flexion...</Text>
                <ProgressChart
                    data={flexion_data}
                    width={Platform.OS === 'ios' ? screenWidth : screenWidth - 10}
                    height={120}
                    strokeWidth={16}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: 'white',
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255,140,0, ${opacity})`,
                        style: {
                        borderRadius: 16,
                        marginRight: 400
                        },
                    }}
                    style={{
                        marginVertical: 24,
                        borderRadius: 20,
                        borderColor: 'blue',
                        paddingRight: 400
                    }}
                />
            </View>
            <View style={styles.chartContainer}> 
                <Text style={styles.result_text}>Extension: {extension} degrees</Text>
                <Text style={styles.chart_title}>Progress toward perfect knee extension...</Text>
                <ProgressChart
                    data={extension_data}
                    width={Platform.OS === 'ios' ? screenWidth : screenWidth}
                    height={120}
                    strokeWidth={16}
                    chartConfig={{
                        backgroundGradientFrom: "white",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "white",
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255,140,0, ${opacity})`,
                        style: {
                        borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 24,
                        paddingRight: 50,
                        borderRadius: 20,
                        borderColor: 'black'
                    }}
                />
            </View>
        </ScrollView>
        {/* </ImageBackground> */}
    </View>
    );  
}