import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  
  listContainer: {
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#706f77',
  },

  searchListHeader: {
    padding: 10,
    backgroundColor: 'white',
  },

  listItem: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    backgroundColor: '#0099ff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },

  listItemContainerWithoutImage: {
    flex: 1,
    fontSize: 15,
    padding: 30,
    flexDirection: 'row',
    flexGrow: 1,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
  },

  displayNameInUserSearchList: {
    fontWeight: 'bold',
    fontSize: 16
  },

  iconInListContainer: {
    alignItems: 'center',
    flexGrow: 0.2,
  },

  iconInList: {
    borderRadius: 100,
    height: 60,
    width: 60,
  },
  iconInAddMemberHeader: {
    height: 70,
    width: 70,
    borderRadius: 100,
    margin: 10
  },
  scrollViewAddMembersToPollScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})