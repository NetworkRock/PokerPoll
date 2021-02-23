import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099ff',
  },
  headerContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20
  },

  textInputContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: '#e3e3e3',
    marginBottom: 20
  },

  imgContainer: {
    height: 180,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'grey',
    marginBottom: 10
  },

  img: {
    borderRadius: 100,
    height: 180,
    width: 180
  },

  imgDescription: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },

  signInTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {width: 0, height: 0}
  },

  nickNameField: {
    textAlign: 'center',
    maxWidth: 250,
    minWidth: 200,
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
    marginBottom: 10
  },



})