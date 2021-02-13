import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'midnightblue',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 10
  },
  flatListHeader: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    borderStyle: 'solid',
    borderWidth: 0.5,
    margin: 2
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