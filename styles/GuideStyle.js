import { StyleSheet, View, Text, Image } from 'react-native';

export default StyleSheet.create({
   slide: { 
   //  flex: 1, 
   //  alignItems: 'center', 
   //  justifyContent: 'center', 
   //  padding: 20 
   }, 
   conatiner: {

   },
   title: { 
   flex:0.5,
    fontSize: 26, 
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 20, 
   }, 
   text: { 
      flex: 0.5,
    color: '#fff', 
    textAlign: 'center',
    fontSize: 20, 
   //  bottom: 50,
   
   }, 
   image: { 
    width: 400, 
    height: 400, 
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
   //  backgroundColor: 'transparenr'
   } 
});