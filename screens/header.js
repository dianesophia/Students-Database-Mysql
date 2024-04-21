import { Text, View, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Semi - Final Act</Text>
      <Text style={styles.myname}>Fuentes, D</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ECBC00',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  title: {
    textAlign: 'left',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  myname: {
    textAlign: 'right',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginHorizontal: 10,
    marginRight: 10, 
  },
});
