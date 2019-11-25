import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';

const AppNavigator = createSwitchNavigator({
  AuthStack: AuthNavigator
});

export default createAppContainer(AppNavigator);
