import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.8,
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
  verticaldescriptionScrollview: {
    flex: 1,
    alignSelf: 'stretch'
  },
  pollContentInScrollView: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight:10
  },
  voteInfoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  voteInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  voteScrollView: {
    flex: 0.3
  },
  startVotingBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ff',
  },
  btnText: {
    padding: 50,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  pollDescription: {
    fontSize: 18,
  },
});