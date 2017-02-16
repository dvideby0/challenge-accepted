'use strict';

import React, {Component, PropTypes} from 'react';
import {Image, StatusBar, View} from 'react-native';
import {Text, Footer, Container, Header, Title, Content, Button, TextInput, Icon, Input, InputGroup, Grid, Col} from 'native-base';
import styles from '../assets/styles/style';
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
  LoginButton,
  AccessToken,
  LoginManager
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

  login() {
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
        console.log('RESPONSE: ', JSON.stringify(response));
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
              <LoginButton
                permissions={['email', 'user_friends']}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert('Login Error: ' + result.error);
                    } else if (result.isCancelled) {
                      alert('You must login');
                    } else {
                      _this.login();
                    }
                  }
                }
                onLogoutFinished={() => _this.setState({user: null})}/>
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
