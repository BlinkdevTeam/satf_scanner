import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../assets/bi_logo.png';
import eventLogo from '../assets/event_logo.png';

export default function Header() {
  return (
        <View style={styles.container}>
            <View style={{flexDirection: "row",  justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
              <Image
                  source={logo}
                  style={{ width: 100, height: 20, resizeMode: 'contain' }}
              />
              <Image
                  source={eventLogo}
                  style={{ width: 108, height: 30, resizeMode: 'contain'}}
              />
            </View>
            <View style={{flexDirection: "row",  justifyContent: "space-between", width: '100%', alignItems: 'center'}}>

            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#08312A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
