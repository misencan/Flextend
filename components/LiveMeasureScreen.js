// import needed libs
import React from 'react';
import { TouchableOpacity, Text, View, Button, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

import firestore from '@react-native-firebase/firestore'
import auth, {firebase} from '@react-native-firebase/auth'
import styles from '../styles/MeasuringStyle';


// intialize global variables and BleManager
const manager = new BleManager();
let disconnect_subscription;
let flexion_subscription;
let extension_subscription;
let measuringCharacteristicID;
let calibrationCharacteristicID;
let device_id;
let service_id;
let extension_id = "extension_transaction";
let flexion_id = "flexion_transaction";

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Measure Now',
    };

    // adding some state values to keep track of flexion, extension, date, whether the device is connected, and whether a disconnect was intentional or not.
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            intendedDisconnect: false,
            flexion: 0,
            extension : 0,
            date: firebase.firestore.Timestamp.now().toDate().toISOString(),
            deviceFound: false,
        };
    }

    // asynchronous function to disconnect from Flextend device
    disconnectFromFlextend = async () => {
        if (this.state.isConnected) //only disconnect if device is connected
        {
            await manager.cancelDeviceConnection(device_id);
        }
    }

    //
    // main asynchronous function to connect to the device
    connectToFlextend = async () => {
        // begin scanning for devices
        manager.startDeviceScan(null, null, async (error, device) => { 
            if (error) {
                console.warn(error);
                return;
            }

            if (device) { //if any device is found
                if (device.name == "Flextend"){ //if that device has name Flextend, then connect
                    manager.stopDeviceScan(); // stop scanning when Flextend device is found
                    await device.connect().then( async (device) => { //attemps to connect to device; when this is done, perform operations with device
                        alert("Device connected successfully!")

                        //function to handle disconnects; if component sees that device did not disconnect intentionally, this code is run.
                        disconnect_subscription = device.onDisconnected((error, disconnectedDevice) => {
                            if (!this.state.intendedDisconnect)
                            {
                                // alert("Device lost connection. Please restart the Flextend device and navigate back to Start Tracking to reestablish connection.")
                                alert("Device lost connection.")
                                manager.cancelTransaction(flexion_id);
                                manager.cancelTransaction(extension_id);
                                disconnect_subscription.remove();
                                flexion_subscription.remove();
                                extension_subscription.remove();
                                this.setState({ isConnected: false });
                                this.setState({ intendedDisconnect: false });
                                this.props.navigation.navigate('Home')
                            }
                        })
                        
                        // set state values
                        this.setState({ isConnected: true });
                        device_id = device.id;
                        
                        if (device.isConnected())
                        {
                            //read characteristics and services for Flextend device
                            const allServicesAndCharacteristics = await device.discoverAllServicesAndCharacteristics();
                            //find all services for device
                            const discoveredServices = await allServicesAndCharacteristics.services();
                            let flextendService;
                            // strange bug with BLE on Android vs. iOS; there are more services read on Android that are hidden on iOS
                            // on iOS, the first service is our Flextend Service for reading flexion and extension
                            if (Platform.OS == 'ios')
                            {
                                flextendService = discoveredServices[0];
                            }
                            else // on Android, there are two extra services that we do not need, so read the third one
                            {
                                flextendService = discoveredServices[2];
                            }
                            // store Flextend service ID
                            service_id = flextendService.uuid;
                            // reading all characteristics for this service that we need
                            const all_characteristics = await flextendService.characteristics();
                            const flexionCharacteristic = all_characteristics[0];
                            const extensionCharacteristic = all_characteristics[1];
                            const measuringCharacteristic = all_characteristics[2];
                            const calibrationCharacteristic = all_characteristics[3];
                            // storing these characteristic IDs in global variables to be used by other functions
                            measuringCharacteristicID = measuringCharacteristic.uuid;
                            calibrationCharacteristicID = calibrationCharacteristic.uuid;
                            const flexion_characteristicUUID = flexionCharacteristic.uuid;
                            const extension_characteristicUUID = extensionCharacteristic.uuid;
                            // now we monitor the Flexion and Extension characteristics for any changes. When a change is noticed, put this value into the state.
                            flexion_subscription = flextendService.monitorCharacteristic(flexion_characteristicUUID, async (error, characteristic) => {
                                let printVal = base64.decode(characteristic.value);
                                this.setState({ flexion: printVal });

                            }, flexion_id);
                            extension_subscription = flextendService.monitorCharacteristic(extension_characteristicUUID, async (error, characteristic) => {
                                let printVal = base64.decode(characteristic.value);
                                this.setState({ extension: printVal });
                            }, extension_id);
                        }
                    });
                }
            }
        });

        // stop scanning devices after 1000 miliseconds
        setTimeout(() => {
            manager.stopDeviceScan();
            //if it did not find flextend, alert the user that device might be off 
            if(this.state.isConnected == false){
                alert("Device was not found")
                this.props.navigation.navigate('Home')
            }
        }, 2000);

        
    }

    beginMeasuring = () => {
        // first, check if device is indeed connected before continuing
        if (!this.state.isConnected) // if not connected navigate back to home to make user have to reconnect device to use screen
        {
            // alert("Device is not connected! Please restart Flextend device and navigate to Start Tracking to reestablish connection.")
            alert("Device is not connected!")
            this.props.navigation.navigate('Home')
        }
        else // if device is connected, we write the value MEASURING to this characteristic. The Flextend device is, as well, monitoring this change
        // in the measuringCharacteristic value, and will begin measuring when it sees this value written.
        {
            manager.writeCharacteristicWithResponseForDevice(device_id, service_id, measuringCharacteristicID, base64.encode('MEASURING'))
            // alert("Flextend device is now measuring! Begin extending and flexing your knee. When done, press Stop Measuring.")
            
        }
    }

    stopMeasuring = () => {
        // again, check if device is connected
        if (!this.state.isConnected) //if not, alert user device is not connected and navigate back to home
        {
            // alert("Device is not connected! Please restart Flextend device and navigate to Start Tracking to reestablish connection.")
            alert("Device is not connected!")
            this.props.navigation.navigate('Home')
        }
        else //now the value "NOTMEASURING" is written to communicate with the Flextend device that we are no longer measuring and to push the
        // flexion and extension values to the app.
        {
            manager.writeCharacteristicWithResponseForDevice(device_id, service_id, measuringCharacteristicID, base64.encode('NOTMEASURING'))
            // alert("Flextend device no longer measuring. Your flexion and extension results will appear on this page!")
            
        }
    }

    calibrate = () => {
        // same process here as beginMeasuring and stopMeasuring
        if (!this.state.isConnected)
        {
            // alert("Device is not connected! Please restart Flextend device and navigate to Start Tracking to reestablish connection.")
            alert("Device is not connected!")
            this.props.navigation.navigate('Home')
        }
        else
        {
            manager.writeCharacteristicWithResponseForDevice(device_id, service_id, calibrationCharacteristicID, base64.encode('CALIBRATING'))
            alert("Flextend device is now calibrating.")
        }
    }

    // connect to the device when we enter this page
    async componentDidMount() {
        await this.connectToFlextend()
    } 


    // handle some operations when we navigate away from this page
    async componentWillUnmount() {
        // first, push the read values to firebase for the user who is logged in
        if (this.state.flexion != "0" && this.state.extension != "0")
        {
            //then push the values after correction
            if (this.state.flexion == "No value"){
                firestore().collection('knee health').doc(auth().currentUser.phoneNumber).set(
                    {[this.state.date]: {flexion: "0", extension: this.state.extension} }, {merge: true})
            }
            else if(this.state.extension == "No value"){
                firestore().collection('knee health').doc(auth().currentUser.phoneNumber).set(
                    {[this.state.date]: {flexion: this.state.flexion, extension: "0"} }, {merge: true})
            }
            else{
                firestore().collection('knee health').doc(auth().currentUser.phoneNumber).set(
                    {[this.state.date]: {flexion: this.state.flexion, extension: this.state.extension} }, {merge: true})
            }
            
        }
        // cancel transactions and subscriptions when we disconnect
        manager.cancelTransaction(flexion_id);
        manager.cancelTransaction(extension_id);
        disconnect_subscription.remove();
        flexion_subscription.remove();
        extension_subscription.remove();
        // reset some state variables
        this.setState({ isConnected: false });
        this.setState({ intendedDisconnect: false });
        // finally, disconnect from the device
        await this.disconnectFromFlextend();
    }

    render() {
        const navigate = this.props.navigation.navigate;
        const startMeasuring = this.state.startMeasuring;
        const stopMeasuring = this.state.stopMeasuring;
        return (
            <View style={styles.container}>
                    <Text style={styles.welcome_message}> Start Measuring</Text>
                    <View style={styles.container2}>
                        <Text style={styles.text}>Flexion: {this.state.flexion}</Text>
                        <Text style={styles.text2}>Extension: {this.state.extension}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.beginMeasuring()} style={styles.button1}><Text style={styles.buttonTitle}>Begin Measuring</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.stopMeasuring()} style={styles.button2}><Text style={styles.buttonTitle}>Stop Measuring</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.calibrate()} style={styles.button2}><Text style={styles.buttonTitle}>Calibrate</Text></TouchableOpacity>
            </View>

        );
    }
}