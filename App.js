import React from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import Sentry from 'sentry-expo';
import PropTypes from 'prop-types';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import AppNavigator from './navigation/AppNavigator';

if (!__DEV__) {
  Sentry.config('https://<key>@sentry.io/<project>').install();
}

YellowBox.ignoreWarnings(['react-native-i18n module is not correctly linked']);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  static propTypes = {
    skipLoadingScreen: PropTypes.bool
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <InAppNotificationProvider height={150}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </InAppNotificationProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf')
      })
    ]);
  };

  _handleLoadingError = error => {
    Sentry.captureException(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});