import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#0099ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
    },
    textField: {
      textAlign: 'center',
      maxWidth: 250,
      minWidth: 200,
      padding: 5,
      borderRadius: 10,
      fontSize: 20,
      backgroundColor: '#e3e3e3',
    },
    btn: {
      marginTop: 10,
      borderRadius: 10,
      fontSize: 40,
      fontWeight: 'bold',
    }
})