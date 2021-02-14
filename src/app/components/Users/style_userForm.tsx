import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  searchListHeader: {
    flex: 1,
    padding: 10,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'stretch'
  },

  listContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flex: 8,
    backgroundColor: 'skyblue',
  },

  listItem: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    paddingTop: 10
  },

  listItemContainerWithoutImage: {
    fontSize: 15,
    flexDirection: 'row',
    flexGrow: 1,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7, 
  },

  displayNameInUserSearchList: {
    fontWeight: 'bold',
  },

  container: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099ff',
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
    borderRadius: 100,
    height: 60,
    width: 60,
    marginRight: 5,
    marginLeft: 5
  },
})