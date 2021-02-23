import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0099ff',
  },
  chartTitle: {
    fontSize: 30
  },
  chartContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.7
  },
  pollDescriptionContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  pollContentInScrollView: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight:10
  },
  votingContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  pollDescription: {
    fontSize: 18
  }
});