import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,165,0, 0.8)",
    flex: 1,
  },
  imageBackdrop: {
    width: '100%', 
    height: '100%', 
    resizeMode:'contain'
  },
  container2: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgb(255,255,255)',
    paddingTop: Platform.OS === 'ios' ? 30 : 40,
    paddingBottom: Platform.OS === 'ios' ? 30 : 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop:30,
    borderRadius: 30,
    height: 500
  },
  userRow: {
    alignItems: "center",
    padding: 15,
    // marginTop: 20,
    backgroundColor: 'orange'
  },
  nameText: {
    color: 'white', 
    fontSize: 30, 
    marginTop: 20, 
    marginBottom: Platform.OS == "ios" ? 0 : -10,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    // backgroundColor: "white",
  },
  button1: {
    backgroundColor: '#87ceeb',
    marginLeft: 30,
    marginRight: 30,
    marginTop: Platform.OS === 'android' ? 30 : 80,
    marginBottom: 20,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  button2: {
    backgroundColor: '#87ceeb',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 15,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  button3: {
    backgroundColor: '#87ceeb',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  button4: {
    backgroundColor: 'orange',
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
  switchRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20,
  },
  checkBoxRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  modalView: {
    backgroundColor: '#87CEFA',
    borderRadius: 30
  },
  textInput: {
    marginLeft: 30,
    // marginRight: 0,
    marginTop: 20,
    height: 45,
    width: 75,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    // fontFamily: 'arial',
  },
  height_text: {
    paddingLeft: 35
  },
  Title: {
    marginTop: 130,
    marginBottom: 20,
    fontSize: 28,
    textAlign: 'center',
    paddingLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    color: 'black'
  },
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  text: {
    paddingLeft: 20,
    // paddingRight: 20,
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    color: '#ff8c00',
    marginTop: 10
  },
  info_text: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 30,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    color: 'black',
  },
  section_text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    // marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#ff8c00',
  },
  modal_text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: -20,
    marginTop: 15,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },
  goalInput: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.6)',
    // width: 250,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
  },
  modal_title: {
    fontSize: 36,
    marginTop: 40,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
    alignSelf: "center",
    color: 'black',
},
});