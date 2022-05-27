import React from 'react';
import {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, ScrollView, ActivityIndicator, ImageBackground, Image} from 'react-native';
import { firebase } from '@react-native-firebase/auth'
import styles from '../styles/HomeStyle';
import auth from '@react-native-firebase/auth'
import CheckboxList from 'rn-checkbox-list';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({navigation}) {

    const [isLoading, setIsLoading] = useState(true)
    const [image, setImage] = useState()

    const logout = () => {
        console.log(firebase.auth().currentUser);
        firebase.auth().signOut().then(() => {
            console.log(firebase.auth().currentUser);
        });
    }

    const [goalsData, setGoalsData] = useState();
    const userID = auth().currentUser.phoneNumber;

    //Pulls the name of the current user to be displayed in welcome message
  if(auth().currentUser != null){
    const name = firebase.auth().currentUser.displayName;
    var first_name = ''
    var last_name = ''

    if (name != null)
    {
        var n = name.indexOf(' ')
    
        first_name = name.substring(0, n)
        last_name = name.substring((n - 1) + 2)
    }
}

    //Pulls Goals data from Firebase to display. Updates every time a new goal is added and user 
    //navigates to home screen
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            //Querying the database 
            const pull_data = async () => {
                try {
                    const documentSnapshot = await firestore()
                        .collection('users')
                        .doc(userID)
                        .get();

                    if (documentSnapshot.data() == null )
                    {
                        console.log("Data is null")
                    }
                    else{
                        data = []
                        for(let i = 0; i < documentSnapshot.data()["goals"].length; i++){
                            data.push({id: i+1, name: documentSnapshot.data()["goals"][i]})
                        }
                        setGoalsData(data)
                    }
                }
                catch {
                }
            }

            pull_data()

            return () => {
                isActive = false;
                };
        }, [])
    );

    //Querying the database 
    // const pull_data = async () => {
    //     try {
    //         const documentSnapshot = await firestore()
    //             .collection('users')
    //             .doc(userID)
    //             .get();

    //         if (documentSnapshot.data() == null )
    //         {
    //             setGoalsData(null)
    //         }
    //         else{
    //             data = []
    //             for(let i = 0; i < documentSnapshot.data()["goals"].length; i++){
    //                 data.push({id: i+1, name: documentSnapshot.data()["goals"][i]})
    //             }
    //             setGoalsData(data)
    //         }
    //     }
    //     catch {
    //     }
    // }


    // useEffect(() => {
    //     pull_data()
    // }, []);

    //Clears goals from firebase, only goals that are selected 
    //need to reload goal component 
    // const [clearGoal, setClearGoal] = useState(false)
    // const clearGoals = () => {
    //     firestore().collection('users').doc(userID).update({
    //         goals: firestore.FieldValue.delete(),
    //     });
    //     setClearGoal(true)
    // }

    // useEffect(() => {
    //     pull_data()
    // }, [clearGoal]);

    /////////////////////////////////////////////////////////////////////

    return (
        // <View style={styles.container}>
        <View>
            {/* <View> */}
            {/* </View>  */}
            <ImageBackground source={require('../images/home-background.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}}  >
                <ScrollView style= {styles.container}>
                <Image 
                style = {styles.image} 
                source = {require('../images/Logo.png')}
                />
                <Text style={styles.welcome_message}> Welcome {first_name}! </Text>
                    <TouchableOpacity onPress={() => navigation.navigate( 'Live Measure' )} style={styles.button1}><Text style={styles.buttonTitle}>Start Tracking</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate( 'Previous Results' )} style={styles.button3}><Text style={styles.buttonTitle}>Previous Results</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()} style={styles.button2}><Text style={styles.buttonTitle1}>Sign Out</Text></TouchableOpacity>
                    {/* <Text style={styles.welcome_message}> My Goals</Text> */}
                    {/* Goals Checklist */}
                    <View style= {styles.goals}>
                        <CheckboxList
                            theme="green"
                            headerName="My Goals"
                            headerStyle = {{
                                padding: 10,
                                flexDirection: 'row',
                                borderRadius: 30,
                                alignItems: 'center',
                                backgroundColor: 'rgba(255,165,0, 0.8)',
                                text: {
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                },
                            }}
                            listItems={goalsData}
                            listItemStyle={{  
                                borderBottomWidth: 0, 
                                marginTop: 10,
                                marginLeft: 25,
                                marginBottom: 10,
                                // text: {
                                //     color: 'black',
                                //     fontWeight: 'bold',
                                //     fontSize: 24,
                                // },
                                }}
                            // style={styles.dayCheckBox}
                        />
                        {/* <TouchableOpacity style={styles.button2} onPress={() => clearGoals()}><Text>Clear Selected Goals</Text></TouchableOpacity> */}
                    </View>
                </ScrollView> 
            </ImageBackground>
        </View>
     );
     
}
