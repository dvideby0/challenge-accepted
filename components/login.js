'use strict';

import React, {Component} from 'react';
import {Image, StatusBar, View} from 'react-native';
import {Text, Footer, Container, Header, Title, Content, Button, TextInput, Icon, Input, InputGroup, Grid, Col} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../assets/styles/style';
import ViewChallenges from './view-challenges';

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
      <Container style={{backgroundColor: '#140F2D'}}>
        <Header style={{backgroundColor: '#3F88C5'}}>
          <Title style={{color: 'white'}}>Login</Title>
        </Header>
        <Content style={{padding: 20}}>
          <StatusBar barStyle="light-content" />
          <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/img/ChallengeAccepted.png')} style={styles.loginImg}/>
          </View>
          <Grid style={{marginTop: 30, justifyContent: 'center'}}>
            <Col style={{width: 220}}>
              <FontAwesome.Button onPress={this.login} name='facebook' backgroundColor='#3b5998' style={{height: 50}}>
                <Text style={{fontFamily: 'Arial', fontSize: 20, color: 'white'}}>Login with Facebook</Text>
              </FontAwesome.Button>
            </Col>
          </Grid>
        </Content>
        <Footer style={{backgroundColor: '#3F88C5'}}>
          <Text style={{color: '#140F2D'}}>YOLO Tech 2016</Text>
        </Footer>
      </Container>
    );
  }
}

export default Login;
