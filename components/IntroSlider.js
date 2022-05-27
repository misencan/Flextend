import AppIntroSlider from 'react-native-app-intro-slider';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, Animated, Easing, ImageBackground} from 'react-native';
import { useState, useEffect, useReducer }from "react";
import styles from '../styles/GuideStyle';

//slides data 
const slides = [
  {
    key: 'one',
    title: '',
    text: '',
    image: require('../images/guide1.png'),
    backgroundColor: '',
  },
  {
    key: 'two',
    title: '',
    text: '',
    image: require('../images/guide2.png'),
    backgroundColor: '',
  },
  {
    key: 'three',
    title: 'Progress Reports',
    text: 'See How You Are Doing',
    image: require('../images/guide3.png'),
    backgroundColor: '',
  },
  {
    key: 'four',
    title: 'Set Reminders',
    text: 'We Help You Keep Your Agenda',
    image: require('../images/guide4.png'),
    backgroundColor: '',
  }
  
];


const IntroSlider = ({navigation}) => {

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex:1, backgroundColor: item.backgroundColor}}>
        <ImageBackground source={item.image} style={{width: '100%', height: '100%', resizeMode:'contain'}}/>
      </View>
    );

  }

  
  const onDone = () => {
    // navigate to home screen
    navigation.navigate('Home')
  }

  const onSkip = () => {
    // navigate to home screen
    navigation.navigate('Home')
  }

  
  return (
    <AppIntroSlider 
      renderItem={renderItem} 
      data={slides} 
      onDone={onDone} 
      onSkip={onSkip}
      showSkipButton
      showPrevButton/>
  ); 
}

export default IntroSlider;