import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  searchListHeader: {
    flex: 1,
    padding: 10,
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'grey',
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  listContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flex: 8,
    backgroundColor: '#706f77',
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

  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  searchField: {
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
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
    // flex: 1,
    // flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})