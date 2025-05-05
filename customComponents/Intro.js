import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../assets/bi_logo.png';
import eventLogo from '../assets/event_logo.png';

export default function Intro() {
  return (
    <View style={styles.container}>
        <Image
            source={eventLogo}
            style={{ width: 308, height: 200, resizeMode: 'contain'}}
        />
        <Image
            source={logo}
            style={{ width: 100, height: 53, resizeMode: 'contain' }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08312A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
