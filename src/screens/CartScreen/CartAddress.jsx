import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../global/GlobalStyle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const CartAddress = () => {
  return (
    <>
      <View style={styles.billContainer}>
        <Text style={styles.optionName}> Delivery address</Text>
        <View style={styles.AddressBox}>
          <View style={styles.AddressBoxLeft}>
            <FontAwesome6 name="location-dot" style={styles.optionIcon} />
          </View>
          <View style={styles.AddressBoxRight}>
            <View style={styles.AddressBoxRight1}>
              <Text style={styles.AddresType}> Home</Text>
              <Text style={styles.AddresText}>
                Begumpet Somajiguda Medchal Telangana
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CartAddress;

const styles = StyleSheet.create({
  billContainer: {
    width: responsiveScreenWidth(100),
    padding: responsiveWidth(3),
  },
  optionName: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    fontWeight: '700',
    marginVertical: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(2),
  },
  optionIcon: {
    fontSize: responsiveFontSize(2.5),
    color: colors.primerycolour,
    fontWeight: '700',
    marginVertical: responsiveHeight(0.5),
  },

  AddressBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  AddressBoxLeft: {
    width: '7%',
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
  },
  AddressBoxRight: {
    width: '93%',
    display: 'flex',
    flexDirection: 'row',
  },
  AddressBoxRight1: {
    width: '90%',
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(1),
  },
  AddresType: {
    fontSize: responsiveFontSize(1.8),
    color: colors.primerycolour,
    fontWeight: '700',
    // marginVertical: responsiveHeight(0.5),
  },
  AddresText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.grey1,
    fontWeight: '400',
    textAlign: 'justify',
  },

  AddressBoxRight2: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddressChangebtn: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(3),
    backgroundColor: '#eee3ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
  },
  AddressText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.primerycolour,
    fontWeight: '700',
  },
});
