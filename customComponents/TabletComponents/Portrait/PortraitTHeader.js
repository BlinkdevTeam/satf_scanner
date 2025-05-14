import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../../../assets/bi_logo.png';
import eventLogo from '../../../assets/event_logo.png';


export default function PortraitTHeader({screen}) {
  const deviceWidth = Dimensions.get("window").width

  return  (
    <View style={[
      styles.container,
      {
        paddingTop: screen === "home" ? 400 : 20,
        paddingBottom: 20,
      }
    ]}>
      <View
        style={{
          flexDirection: screen === 'home' ? 'column' : 'row',
          justifyContent: screen === 'home' ? 'space-between' : 'center',
          width: screen === 'home' ? '100%' : '80%',
          alignItems: 'center',
          paddingTop: screen === 'home' ? 0 : 30,
          paddingBottom: screen === 'home' ? 0 : 10,
        }}
      >
        <Image 
          source={logo} 
          style={[styles.imageStyle, 
            {
              width: "90%", 
              height: screen === "home" ? 50 : 40
            }
          ]} 
        />
        <Image 
          source={eventLogo} 
          style={[styles.imageStyle, 
            {
              width: "90%", 
              height: screen === "home" ? 300 : 40
            }
          ]} 
        />
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#08312A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageStyle: {
    resizeMode: 'contain'
  }
});
