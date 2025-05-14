import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../../../assets/bi_logo.png';
import eventLogo from '../../../assets/event_logo.png';
import biDog from '../../../assets/dogBI.png';


export default function LandscapeTHeader({screen}) {
  const deviceWidth = Dimensions.get("window").width

  return  (
     <View style={[
       styles.container,
       {
         height: screen === "home" ? "100%" : null,
         paddingTop: screen === "home" ? 0 : 20,
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
               width: '90%', 
               height: screen === "home" ? 50 : 40,
             }
           ]} 
         />
         <Image 
           source={eventLogo} 
           style={[styles.imageStyle, 
             {
               width: '90%', 
               height: screen === "home" ? 250 : 40,
             }
           ]} 
         />
         {
          screen === "home" &&
            <>
              <View style={{paddingTop: 50, alignItems: 'center', gap: 10}}>
                <Text style={{color: '#ffffff', fontSize: 24, fontWeight: '900',}}>MAY 28, 2025 | 9:00 - 4:00 PM</Text>
                <Text style={{color: '#ffffff', fontSize: 24, fontWeight: '900',}}>Crimson Hotel, Alabang, Muntinlupa City</Text>
              </View>
              <View style={{paddingTop: 50, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#00e47c', fontSize: 42, fontStyle: 'italic', fontWeight: '900', width: '100%', textAlign: 'center'}}>Life Forward</Text>
              </View>
            </>
         }
        </View>
          {
            screen === "home" &&
            <Image 
              source={biDog} 
              style={{
                  opacity: 0.1,
                  width: "100%",
                  position: 'absolute',
                  height: screen === "home" ? "100%" : 40,
                  resizeMode: 'cover'
                }} 
            />
          }
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



