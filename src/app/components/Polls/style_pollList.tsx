import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'midnightblue',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#706f77',
  },
  flatListHeader: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  listItem: {
    display: 'flex',
    backgroundColor: '#0099ff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 130,
  },
  listItemContainerWithoutImage: {
    flex: 1,
    flexGrow: 0.8,
    padding: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    height: 130,
  },
  iconInListContainer: {
    flex: 1,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0.2,
    backgroundColor: 'white',
    borderRadius: 60,
    margin: 10
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


  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#fff',
    textShadowColor: '#0099ff',
  },

  description: {
    color: '#fff',
    //lineHeight: 22
  }
})