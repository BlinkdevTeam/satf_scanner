import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../../../assets/bi_logo.png';
import eventLogo from '../../../assets/event_logo.png';
import biDog from '../../../assets/dogBI.png';


export default function PortraitTHeader({screen}) {
  const deviceWidth = Dimensions.get("window").width

  return  (
    <View style={[
      styles.container,
      {
        paddingTop: screen === "home" ? 150 : 20,
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
         {
          screen === "home" &&
          <>
            <View style={{paddingTop: 50, paddingBottom: 50, alignItems: 'left', gap: 20, width: '70%'}}>
              <Text style={{color: '#ffffff', fontSize: 24, fontWeight: '900',}}>Join us for a day of insightful discussions and</Text>
              <Text style={{color: '#ffffff', fontSize: 24, fontWeight: '900',}}>updates in companion animal health — May 28,</Text>
              <Text style={{color: '#ffffff', fontSize: 24, fontWeight: '900',}}>2025 at Crimson Hotel, Alabang, Muntinlupa City.</Text>
              <Text style={{color: '#ffffff', fontSize: 24, fontWeight: '900',}}>Secure your spot today!</Text>
          </View>
          <Image 
            source={biDog} 
            style={{
                opacity: 0.8,
                width: "100%",
                height: screen === "home" ? 400 : 40
              }} 
          />
          </>
         }
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
