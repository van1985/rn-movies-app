import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#313337',
    borderWidth: 1,
    padding: 15
  },
  avatarContainer: {
    width: '20%'
  },
  titleContainer: {
    width: '50%',
    paddingTop: 25,
    paddingLeft: 10
  },
  title: {
    fontSize: 14
  },
  buttonContainer: {
    width: '30%',
    paddingTop: 15
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
});
