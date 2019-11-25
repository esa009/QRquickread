import React from 'react';
import { View, Text, WebView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Home extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    url: 'https://www.google.com/'
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{ flex: 1 }}
        />
        <WebView source={{ uri: this.state.url }} style={{ flex: 1 }} />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({
      url: data
    });
  };
}
