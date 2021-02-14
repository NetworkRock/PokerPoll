import { StyleSheet } from 'react-native';

export default StyleSheet.create({


  container: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099ff',
  },

  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: 'grey',
    marginBottom: 30,
    marginTop: 30
  },

  img: {
    borderRadius: 100,
    height: 200,
    width: 200
  },

  imgDescription: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },

  signInTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },

  nickNameField: {
    textAlign: 'center',
    maxWidth: 250,
    minWidth: 200,
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
  },

  logInBtn: {
    marginTop: 10,
    borderRadius: 10,
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: '#e3e3e3',
  }

})