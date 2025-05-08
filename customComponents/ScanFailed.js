import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logo from '../assets/bi_logo.png';
import eventLogo from '../assets/event_logo.png';

export default function ScanFailed({ onTap, user, onClick, screen }) {
    
    useEffect(() => {
        setTimeout(() => {
            onClick({
                trigger:
                  screen === 'timeinSuccess'
                    ? 'in'
                    : screen === 'timeoutSuccess'
                    ? 'out'
                    : null,
              });
        }, 3000)
      }, []);

    return (
        <View style={styles.container}>
            <Text style={{color: "red", fontSize: 24}}>Scan Failed!</Text>
            <Text style={{color: "red", fontSize: 24}}>Please try again</Text>
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
