'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Thumbnail, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col, Row, InputGroup, List, ListItem, Picker, Input} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screen = Dimensions.get('window');
import * as config from './config';

class CreateChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge_name: '',
      challenge_description: ''
    };
    this.createChallenge = this.createChallenge.bind(this);
  }

  componentWillMount() {

  }

  createChallenge(event) {
    fetch(config.API_URL + '/challenges', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.challenge_name,
        description: this.state.challenge_description,
        created_by: this.props.user._id
      })
    })
      .then(this.props.navigator.pop)
      .catch(console.log);
  }

  render() {

    return (
      <Container>
        <Header style={{backgroundColor: '#3F88C5'}}>
          <Button transparent onPress={this.props.navigator.pop} textStyle={{color: 'white'}}><FontAwesome name='chevron-left' /> Back</Button>
          <Title style={{color: 'white'}}>New Challenge</Title>
        </Header>
        <Content style={{backgroundColor: '#ffffff'}}>
          <Text style={{margin: 20}}>TODO: Instructions for creating a challenge. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          <List>
            <ListItem style={{padding: 20}}>
              <InputGroup borderType='regular'>
                <Input placeholder='Name...' onChangeText={(text) => this.setState({challenge_name: text})} value={this.state.challenge_name} />
              </InputGroup>
            </ListItem>
            <ListItem style={{padding: 20}}>
              <InputGroup borderType='regular'>
                <Input style={{height: 200}} multiline={true} placeholder='Description...' onChangeText={(text) => this.setState({challenge_description: text})} value={this.state.challenge_description} />
              </InputGroup>
            </ListItem>
          </List>
          <Button block style={{margin: 20}} onPress={this.createChallenge}>
            Create Challenge
          </Button>
        </Content>
      </Container>
    );
  }
}

export default CreateChallenge;
