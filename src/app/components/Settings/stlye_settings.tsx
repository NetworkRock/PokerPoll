import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#0099ff',
    flexDirection: 'column',
    padding: 125
  },
  settings_title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 50
  },
  img: {
    borderRadius: 100,
    height: 200,
    width: 200
  },
  userName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10
  },
  logout_btn: {
      marginTop: 100,
      borderRadius: 10,
      fontSize: 40,
      fontWeight: 'bold',
      backgroundColor: '#e3e3e3',
      minWidth: 150
  }
})