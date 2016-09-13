'use strict';

import React, {Component} from 'react';
import {Image, StatusBar} from 'react-native';
import {Container, Header, Title, Content, Button, TextInput, Icon, Input, InputGroup} from 'native-base';

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
      <Container style={{backgroundColor: '#0099CC'}}>
        <Header style={{backgroundColor: '#BBEAFA'}}>
          <Title>Login</Title>
        </Header>
        <Content style={{padding: 20}}>
          <StatusBar barStyle='default' />
          <Image source={require('../assets/img/logo-login.png')} style={styles.loginImg}/>
          <InputGroup style={{marginBottom: 10, backgroundColor: '#BBEAFA'}} borderType='regular'>
            <Input placeholder='username'/>
          </InputGroup>
          <InputGroup style={{marginBottom: 10, backgroundColor: '#BBEAFA'}} borderType='regular'>
            <Input placeholder='password'/>
          </InputGroup>
          <Button block warning onPress={this.login}>Login</Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
