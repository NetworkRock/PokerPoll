import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  flatListHeader: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  searchField: {
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#e3e3e3',
  },
})