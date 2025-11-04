import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Button,
  Linking,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Added useFocusEffect for re-checking on focus

const BarcodeScannerScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d?.position === 'back');

  const requestCameraPermission = async () => {
    try {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to scan barcodes. Please grant permission.',
          [
            { text: 'Retry', onPress: requestCameraPermission },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert(
        'Error',
        'Failed to request camera permission. Try again or check settings.',
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      requestCameraPermission();
      setIsScanning(true);
    }, []),
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'upc-a', 'qr', 'code-128'],
    onCodeScanned: async codes => {
      if (codes.length > 0 && isScanning) {
        const barcode = codes[0].value;
        Alert.alert('Error', `your barcode is ${barcode}`);
        setIsScanning(false);
        try {
          const response = await fetch(
            `https://api.example.com/products/${barcode}`,
          );
          if (response.ok) {
            const product = await response.json();
            navigation.navigate('ProductDetails', { product });
          } else {
            Alert.alert(
              'Product Not Found',
              'No product found for this barcode.',
            );
            setIsScanning(true);
          }
        } catch (error) {
          console.error('API error:', error);
        //   Alert.alert('Error', 'Failed to fetch product details.');
          setIsScanning(true);
        }
      }
    },
  });

  const toggleTorch = () => {
    setTorchEnabled(!torchEnabled);
  };

  const handleManualEntry = async () => {
    if (!manualBarcode.trim()) {
      Alert.alert('Invalid Input', 'Please enter a barcode.');
      return;
    }
    try {
      const response = await fetch(
        `https://api.example.com/products/${manualBarcode}`,
      ); // Replace with your API
      if (response.ok) {
        const product = await response.json();
        navigation.navigate('ProductDetails', { product });
      } else {
        Alert.alert('Product Not Found', 'No product found for this barcode.');
      }
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to fetch product details.');
    }
  };

  if (devices.length === 0 || !device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {devices.length === 0
            ? 'Loading camera devices...'
            : 'Loading camera or permission denied...'}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestCameraPermission}
        >
          <Text style={styles.buttonText}>Retry Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        torch={torchEnabled ? 'on' : 'off'}
        codeScanner={codeScanner} // Pass the codeScanner here
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={toggleTorch}>
          <Text style={styles.buttonText}>
            {torchEnabled ? 'Turn Off Flash' : 'Turn On Flash'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter barcode manually"
          value={manualBarcode}
          onChangeText={setManualBarcode}
          keyboardType="numeric"
        />
        <Button title="Submit Manual Barcode" onPress={handleManualEntry} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BarcodeScannerScreen;
