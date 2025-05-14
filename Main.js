import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, useWindowDimensions } from 'react-native';
import MobileComponent from './customComponents/MobileComponent/MobileComponent';
import TabletComponent from './customComponents/TabletComponents/TabletComponent';


export default function Main() {
    const { width, height } = useWindowDimensions();
   
    const isTablet = Math.min(width, height) >= 600;

    console.log( 'isTablet:', isTablet )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#08312A' }}>
            <StatusBar style="light" />
            {
                isTablet ?
                    <TabletComponent/>
                    :
                    <MobileComponent/>
            }
        </SafeAreaView>
    );
}

