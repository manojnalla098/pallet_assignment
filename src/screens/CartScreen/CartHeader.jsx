import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Pressable } from 'react-native';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../global/GlobalStyle';

const CartHeader = props => {
  const navigation = useNavigation();
  return (
    <>
      {/* <StatusBar
                barStyle={"dark-content"}
                backgroundColor="transparent"
                translucent
            /> */}
      <View style={styles.container}>
        <View style={styles.Maincontainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              onFocus={() => {
                navigation.goBack();
              }}
            >
              <View style={styles.LogoArrowContainer}>
                <Arrowleft name="arrowleft" style={styles.LogoArrow} />
              </View>
            </Pressable>
            <View>
              <Text style={styles.title}>{props.title}</Text>
            </View>
          </View>
          {/* {props.title === "Select delivery location" || "Delivery location direction" ? (
                        <> */}
          {/* <Pressable
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}
            onFocus={() => {
              navigation.navigate('SearchScreen');
            }}
          >
            <View style={styles.searchView}>
              <AntDesign name="search1" style={styles.LogoArrow} />
            </View>
          </Pressable> */}

          {/* </>
                    ) : (<></>)} */}
        </View>
      </View>
    </>
  );
};

export default CartHeader;

const styles = {
  container: {
    // paddingTop: ,
    marginBottom: 0,
    height: responsiveHeight(7.5),
    justifyContent: 'center',
    shadowOffset: { y: 0 },
    // backgroundColor: "red",
    // shadowOpacity: 0.5,
    // elevation: 1,
    zIndex: 100,
    borderBottomWidth: responsiveWidth(0.2),
    borderColor: colors.grey,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primerycolour,
    marginTop: responsiveHeight(1.4),
    marginLeft: responsiveWidth(1),
  },
  Maincontainer: {
    width: responsiveWidth(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LogoArrowContainer: {
    marginLeft: responsiveWidth(3),
    backgroundColor: 'transparent',
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  LogoArrow: {
    fontSize: 20,
    color: colors.primerycolour,
    fontWeight: 'bold',
  },
  searchView: {
    backgroundColor: '#f3f3f3',
    height: responsiveHeight(5.5),
    width: responsiveWidth(11),
    marginRight: responsiveWidth(6),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
};
