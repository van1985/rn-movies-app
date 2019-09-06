import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  subContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  boxContainer: {
    width: '50%'
  },
  image: {
    width: 150,
    height: 150
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
  },
  label: {
    fontSize: 12
  },
  titleTop: {
    paddingTop: 15
  },
  marginLeft: {
    marginLeft: 10
  },
  movieDescriptionContainer: {
    width: '100%'
  },
  descriptionText: {
    paddingTop: 15,
    paddingBottom: 5
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
});
