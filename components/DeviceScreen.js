import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, ScrollView, Button, View, StyleSheet } from 'react-native';
import { Service } from 'react-native-ble-plx';

export default function DeviceScreen({device}){



    // const DeviceScreen = ({
    // route,
    // navigation,
    // }: StackScreenProps<RootStackParamList, 'Device'>) => {
    // get the device object which was given through navigation params
    //const { device } = route.params;

    const [isConnected, setIsConnected] = useState(false);

    // handle the device disconnection
    const disconnectDevice = useCallback(async () => {
        navigation.goBack();
        const isDeviceConnected = await device.isConnected();
        if (isDeviceConnected) {
        await device.cancelConnection();
        }
    }, [device, navigation]);

    useEffect(() => {
        const getDeviceInformations = async () => {
        // connect to the device
        const connectedDevice = await device.connect();
        if (connectedDevice)
        {
          setIsConnected(true);
          console.log("device connected")
        }
        

        // discover all device services and characteristics
        const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
        // get the services only
        const discoveredServices = await allServicesAndCharacteristics.services();
        setServices(discoveredServices);
        console.log("got here");
        const myService = discoveredServices[1]; //isolating this service just for testing
        const myCharacteristics = myService.characteristics();
        const characteristicUUID = myCharacteristics[0].uuid;
        const readData = myService.readCharacteristic(characteristicUUID);
        console.log(readData);
        };
        console.log("got here!")
        getDeviceInformations();

        device.onDisconnected(() => {
        navigation.navigate('Home');
        });

        // give a callback to the useEffect to disconnect the device when we will leave the device screen
        return () => {
        disconnectDevice();
        };
    }, [device, disconnectDevice, navigation]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Button title="disconnect" onPress={disconnectDevice} />
        <View style={styles.container}>
            <View style={styles.header}>
            <Text>{`Id : ${device.id}`}</Text>
            <Text>{`Name : ${device.name}`}</Text>
            <Text>{`Is connected : ${isConnected}`}</Text>
            <Text>{`RSSI : ${device.rssi}`}</Text>
            <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
            <Text>{`ServiceData : ${device.serviceData}`}</Text>
            <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
            </View>
            {/* Display a list of all services */}
            {services &&
            services.map((service) => <ServiceCard service={service} />)}
        </View>
        </ScrollView>
    );
    //};

    }


const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  header: {
    backgroundColor: 'teal',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
});

export { DeviceScreen };