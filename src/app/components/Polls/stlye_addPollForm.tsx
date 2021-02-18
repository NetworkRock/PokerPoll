import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0099ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 30,
    margin: 20
  },
  descriptionContainer: {
    flex: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 0,
    margin: 20,
  },
  textField: {
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
  },
  textArea: {
    minHeight: 180,
    maxHeight: 250,
    textAlign: 'center',
    padding: 10,
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
});