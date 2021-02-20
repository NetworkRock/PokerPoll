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
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  listItemContainerWithoutImage: {
    flex: 1,
    flexGrow: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    height: 130,
  },
  iconInListContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 12,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#fff',
    textShadowColor: '#0099ff',
  },

  description: {
    color: '#fff',
    fontSize: 16,
    //lineHeight: 22
  },

})