import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'midnightblue',
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#0099ff',
  },

  flatListHeader: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    margin: 2
  },
  listItemContainerWithoutImage: {
    fontSize: 15,
    flexDirection: 'row',
    flexGrow: 1,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7, 
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  searchField: {
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  
})