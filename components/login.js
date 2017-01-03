'use strict';

import React, {Component, PropTypes} from 'react';
let {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import {Image, StatusBar, View} from 'react-native';
import {Text, Footer, Container, Header, Title, Content, Button, TextInput, Icon, Input, InputGroup, Grid, Col} from 'native-base';
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

  login(user) {
    const {navigator} = this.props;
    navigator.push({
      component: ViewChallenges,
      props: {user: user}
    });
  }

  render() {
    let _this = this;
    return (
      <Container style={{backgroundColor: '#140F2D'}}>
        <Content style={{padding: 20}}>
          <StatusBar barStyle='light-content' />
          <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/img/ChallengeAccepted.png')} style={styles.loginImg}/>
          </View>
          <Grid style={{marginTop: 30, justifyContent: 'center'}}>
            <Col style={{width: 220, alignItems: 'center'}}>
              <FBLogin style={{marginBottom: 10}}
                       ref={(fbLogin) => {this.fbLogin = fbLogin}}
                       permissions={['email', 'user_friends']}
                       loginBehavior={FBLoginManager.LoginBehaviors.Native}
                       onLogin={function(data) {
                         console.log(data);
                         _this.setState({user: data.credentials});
                         _this.login(data.credentials);
                       }}
                       onLogout={function(){
                         console.log('Logged out.');
                         _this.setState({user: null});
                       }}
                       onLoginFound={function(data) {
                         console.log('Existing login found.');
                         console.log(data);
                         _this.setState({user: data.credentials});
                         _this.login(data.credentials);
                       }}
                       onLoginNotFound={function() {
                         console.log('No user logged in.');
                         _this.setState({user: null});
                       }}
                       onError={function(data) {
                         console.log('ERROR');
                         console.log(data);
                       }}
                       onCancel={function() {
                         console.log('User cancelled.');
                       }}
                       onPermissionsMissing={function(data) {
                         console.log('Check permissions!');
                         console.log(data);
                       }}
              />
            </Col>
          </Grid>
        </Content>
        <Footer style={{backgroundColor: '#3F88C5'}}>
          <Text style={{color: '#140F2D', fontSize: 20}}>MobyIO</Text>
        </Footer>
      </Container>
    );
  }
}

export default Login;
