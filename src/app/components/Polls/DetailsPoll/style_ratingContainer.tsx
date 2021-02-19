import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099ff'
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  pollDescriptionContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  pollContentInScrollView: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight:10
  },
  voteInfoContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  voteInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  votingContainer: {
    flex: 1,
  },
  pollDescription: {
    fontSize: 18
  },
});