import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  adminviewContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    backgroundColor: '#0099ff',
  },
  adminRatingPointsField: {
    textAlign: 'center',
    maxWidth: 50,
    minWidth: 50,
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
  },
  adminRatingBtnLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black",
  },
  submitRatingBtn: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  chartContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.7
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#0099ff',
  },
  pollContentInScrollView: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight:10,
  },
  votingContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  pollDescription: {
    fontSize: 18
  },
  userIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  userIconContainerWithoutRate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconInAddMemberHeader: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  rateNumberContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  rateNumber: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
  },
  userName: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    marginLeft: 20
  }
});