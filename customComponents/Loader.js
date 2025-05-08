import { StyleSheet, Text, View, Image, ActivityIndicator, } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../assets/bi_logo.png';
import eventLogo from '../assets/event_logo.png';
import Spinner from 'react-native-spinkit';

export default function Loader() {
  return (
    <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#00e47c"
          style={styles.spinner} // Applying custom styles here
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
  spinner: {
    marginBottom: 20, // Example of custom margin
    transform: [{ scale: 1 }], // Example of scaling the spinner
  },
});
