import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../../assets/bi_logo.png';
import eventLogo from '../../assets/event_logo.png';


export default function MobileHeader({screen}) {
  const deviceWidth = Dimensions.get("window").width

  return  (
    <View style={styles.mobile.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Image source={logo} style={styles.mobile.imageStyle} />
        <Image source={eventLogo} style={styles.mobile.imageStyle} />
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  mobile: {
    container: {
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#08312A',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    imageStyle: {
      width: 100, 
      height: 20, 
      resizeMode: 'contain'
    }
  },
});
