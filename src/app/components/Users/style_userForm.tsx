import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  searchListHeader: {
    flex: 1,
    padding: 10,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'stretch'
  },

  addedMembersScrollView: {
    display: 'flex',
    flex: 1,
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
    flexGrow: 1,
    justifyContent: 'center',
    borderColor: 'lightgrey',
    borderBottomWidth: 0.7, 
  },

  displayNameInUserSearchList: {
    fontWeight: 'bold',
    paddingLeft: 5
  },

  container: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',

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

  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: 'grey',
    marginBottom: 30
  },

  img: {
    borderRadius: 100,
    height: 200,
    width: 200
  },

  iconInListContainer: {
    alignItems: 'center',
    flexGrow: 0.2,
  },
  
  iconInList: {
    borderRadius: 100,
    height: 60,
    width: 60,
    fontSize: 15,
  },
})