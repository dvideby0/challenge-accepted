'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Thumbnail, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col, Row, InputGroup, List, ListItem, Picker, Input} from 'native-base';
import Recorder from './Recorder';
import ViewChallengeVideos from './ViewChallengeVideos';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screen = Dimensions.get('window');

class CreateChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };
  }

  componentWillMount() {

  }

  render() {

    return (
      <Container>
        <Header style={{backgroundColor: '#3F88C5'}}>
          <Button transparent onPress={this.props.navigator.pop} textStyle={{color: 'white'}}><FontAwesome name='chevron-left' /> Back</Button>
          <Title style={{color: 'white'}}>New Challenge</Title>
        </Header>
        <Content style={{backgroundColor: '#ffffff'}}>
          <List>
            <ListItem style={{padding: 20}}>
              <InputGroup borderType='regular'>
                <Input placeholder='Name' />
              </InputGroup>
            </ListItem>
            <ListItem style={{padding: 20}}>
              <InputGroup borderType='regular'>
                <Input style={{height: 200}} multiline={true} placeholder='Description' />
              </InputGroup>
            </ListItem>
          </List>
          <Button block style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
            Create Challenge
          </Button>
        </Content>
      </Container>
    );
  }
}

export default CreateChallenge;
