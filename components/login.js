'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  DeviceEventEmitter,
  ListView,
  Navigator,
  TouchableHighlight,
  Dimensions,
  Animated,
  StatusBar,
  CameraRoll,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import styles from '../assets/styles/style';
import ViewChallenges from './ViewChallenges';

/*
 * This is the initial view for user's to login
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    const {navigator} = this.props;
    navigator.push({
      component: ViewChallenges,
      props: {}
    });
  }

  render() {
    return (
      <View style={styles.login}>
        <Image source={require('../assets/img/woo.gif')} style={styles.loginImg} />
        <TextInput
          style={styles.loginInput}
          placeholder='username'
        />
        <TextInput
          style={styles.loginInput}
          placeholder='password'
        />
        <TouchableHighlight style={[styles.loginBtn]} onPress={this.login}>
          <Text style={[{color: '#fff'}]}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Login;
