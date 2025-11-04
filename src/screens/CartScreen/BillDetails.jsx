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
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const BillDetails = () => {
  const { TotalPrice, TotalMrp, Netpayable } = useSelector(
    state => state.cart,
    shallowEqual,
  );
  return (
    <>
      <View style={styles.billContainer}>
        <Text style={styles.optionName}>Bill Details</Text>
        <View style={styles.BillBox}>
          <View style={styles.billvalueBox}>
            <View style={styles.billvalueBoxLeft}>
              <Text style={styles.billvalueBoxText}>MRP Total</Text>
            </View>
            <View style={styles.billvalueBoxRight}>
              <Text style={styles.billvalueBoxText}>₹{TotalMrp}</Text>
            </View>
          </View>
          <View style={styles.billvalueBox}>
            <View style={styles.billvalueBoxLeft}>
              <Text style={styles.billvalueBoxText}>Total Price</Text>
            </View>
            <View style={styles.billvalueBoxRight}>
              <Text style={styles.billvalueBoxText}>₹{TotalPrice}</Text>
            </View>
          </View>
          <View style={styles.billvalueBox}>
            <View style={styles.billvalueBoxLeft}>
              <Text style={styles.billvalueBoxText}>Item Saving</Text>
            </View>
            <View style={styles.billvalueBoxRight}>
              <Text style={styles.billvalueBoxText2}>
                ₹{TotalMrp - Netpayable}
              </Text>
            </View>
          </View>
          <View style={styles.billvalueBox}>
            <View style={styles.billvalueBoxLeft}>
              <Text style={styles.billvalueBoxText}>Delivery Partner fee</Text>
            </View>
            <View style={styles.billvalueBoxRight}>
              <Text style={styles.billvalueBoxText2}>
                {' '}
                <Text style={styles.billvalueBoxText1}>₹40</Text> FREE{' '}
              </Text>
            </View>
          </View>
          <View style={styles.billvalueBox}>
            <View style={styles.billvalueBoxLeft}>
              <Text style={styles.billvalueBoxText4}>To Pay</Text>
            </View>
            <View style={styles.billvalueBoxRight}>
              <Text style={styles.billvalueBoxText5}>
                {' '}
                {TotalMrp > Netpayable && (
                  <>
                    <Text style={styles.billvalueBoxText1}>₹{TotalMrp}</Text>
                  </>
                )}
                ₹{Netpayable}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default BillDetails;

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
  BillBox: {
    width: responsiveScreenWidth(94),
    padding: responsiveWidth(2),
    backgroundColor: '#eee3ff',
    borderRadius: responsiveWidth(2),
  },
  billvalueBox: {
    width: '100%',
    height: responsiveScreenHeight(3),
    display: 'flex',
    flexDirection: 'row',
    marginVertical: responsiveHeight(0.5),
  },
  billvalueBoxLeft: {
    width: '50%',
    height: responsiveScreenHeight(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: responsiveWidth(2),
  },
  billvalueBoxRight: {
    width: '50%',
    height: responsiveScreenHeight(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(2),
  },
  billvalueBoxText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    color: '#404040',
    fontWeight: '400',
  },
  billvalueBoxText4: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    color: '#404040',
    fontWeight: '700',
  },
  billvalueBoxText2: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    color: colors.primerycolour,
    fontWeight: '400',
  },
  billvalueBoxText5: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    color: '#404040',
    fontWeight: '700',
  },
  billvalueBoxText1: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    color: '#404040',
    fontWeight: '400',
    textDecorationLine: 'line-through',
  },
});
