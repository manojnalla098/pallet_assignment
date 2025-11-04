import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  BackHandler,
  TextInput,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { loginStart } from '../redux/authSlice/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(true);

  const [logerror, setLogerror] = useState('');
  const [btnLoading, setbtnLoading] = useState(false);

  function handleBackButtonClick() {
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      return true;
    });
    return unsubscribe;
  }, [navigation]);

  const loginPess = () => {
    setbtnLoading(true);
    if (userName !== '' && password !== '') {
      if (userName === 'manojkumar' && password === '98765') {
        const fakeToken = 'secure_token_123';
        dispatch(loginStart(fakeToken));
        navigation.navigate('home');
        setbtnLoading(false);
        setLogerror('');
      } else {
        setbtnLoading(false);
        setLogerror('Please enter a valid username and password.');
      }
    } else {
      setbtnLoading(false);
      setLogerror('Please enter your username and password');
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={{ margin: 10 }}>
        <View style={styles.MainContainer}>
          <Text style={styles.SignInText}>Login In Your Account</Text>
          <Text style={styles.ExampleText}>Fill your credentials below </Text>
        </View>

        <View style={{ margin: 10 }}>
          <View style={styles.TextndInputCon}>
            <Text style={styles.EmailText}>User Name</Text>
            <View style={styles.InputCntainer}>
              <TextInput
                placeholder="user name"
                placeholderTextColor="gray"
                value={userName}
                style={{ color: '#000' }}
                onChange={e =>
                  setuserName(e.nativeEvent.text.replace(/^\s+/, ''))
                }
              />
            </View>
          </View>

          <View style={styles.TextInputIconCon}>
            <Text style={styles.EmailText}>Password</Text>
            <View style={styles.InputCntainer}>
              <TextInput
                placeholder="your Password"
                secureTextEntry={toggleCheckBox}
                placeholderTextColor="gray"
                value={password}
                style={{ color: '#000' }}
                onChange={e =>
                  setPassword(e.nativeEvent.text.replace(/^\s+/, ''))
                }
              />
            </View>
            <Feather
              name={toggleCheckBox ? 'eye-off' : 'eye'}
              size={20}
              style={styles.EyeContainer}
              onPress={() => setToggleCheckBox(!toggleCheckBox)}
            />

            {logerror ? (
              <>
                <Text style={{ color: 'red' }}>{logerror}</Text>
              </>
            ) : (
              <></>
            )}
          </View>

          <View style={{ marginTop: responsiveHeight(4) }}>
            {btnLoading === true ? (
              <>
                <Pressable>
                  <View style={styles.PressAbleCon}>
                    <Text style={styles.SignPressText}>Loging...</Text>
                  </View>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => loginPess()}>
                  <View style={styles.PressAbleCon}>
                    <Text style={styles.SignPressText}>Login</Text>
                  </View>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  SignInText: {
    fontSize: responsiveFontSize(3.5),
    color: 'black',
    fontWeight: 'bold',
    marginTop: responsiveHeight(5),
  },
  ExampleText: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: responsiveWidth(70),
    color: 'black',
  },
  MainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputCntainer: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    position: 'relative',
  },
  EmailText: {
    fontWeight: 'bold',
    color: 'black',
  },
  TextndInputCon: {
    paddingVertical: responsiveHeight(1.5),
  },
  EyeContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 20,
    marginTop: responsiveHeight(2),
  },

  PressAbleCon: {
    backgroundColor: '#531a86',
    borderRadius: 5,
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignPressText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  OrSinCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
