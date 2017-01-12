'use strict';

import React, {Component, PropTypes} from 'react';
let {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import {Image, StatusBar, View} from 'react-native';
import {Text, Footer, Container, Header, Title, Content, Button, TextInput, Icon, Input, InputGroup, Grid, Col} from 'native-base';
import styles from '../assets/styles/style';
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import ViewChallenges from './view_challenges';
import * as config from './config';
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
    /*
     { tokenExpirationDate: '2017-03-11T22:10:16-05:00',
     permissions: [ 'email', 'public_profile', 'user_friends' ],
     userId: '10208672890363068',
     token: 'EAATheZBzxfFgBALrbxyd2XdgpAMhZCIDXRkeFkje1aP3QmgcWQ6Sqt1fvsZB2IyRqiNBI9AQQ65ZBktFF22a4TMVp6ZBYpPo2f5q19TAQZCSpeZAHrrfZCCQoMKwR4dHmZCviSekXLf2DxkU9T31U6wFCjQB6ZCF2hRIRuwZA8wMjBxXeQnCGhpDyW1kRpgeaylOZBoZD' }
     */
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,name' // what you want to get
          }
        }
      },
      function(err, response) {
        console.log('EMAIL: ', response.email);
        if (err) {
          alert(err);
        } else {
          fetch(config.API_URL + '/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: response.name,
              facebook_id: response.id,
              email: response.email
            })
          })
            .then((response) => response.json())
            .then(jsonResponse => {
              navigator.push({
                component: ViewChallenges,
                props: {user: jsonResponse}
              });
            })
            .catch(console.log);
        }
      }
    );

    new GraphRequestManager().addRequest(infoRequest).start();
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
