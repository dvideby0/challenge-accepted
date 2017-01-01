'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Thumbnail, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col, Row, InputGroup, List, ListItem, Picker, Input} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class UserProfile extends Component {
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
          <Title style={{color: 'white'}}>User Profile</Title>
        </Header>
        <Content style={{backgroundColor: '#ffffff'}}>
          <Text style={{margin: 20}}>TODO: User profile options</Text>
          <List>
            <ListItem style={{padding: 20}}>
              <InputGroup borderType='regular'>
                <Input placeholder='user name...' />
              </InputGroup>
            </ListItem>
            <ListItem style={{padding: 20}}>
              <InputGroup borderType='regular'>
                <Input style={{height: 200}} multiline={true} placeholder='summary...' />
              </InputGroup>
            </ListItem>
          </List>
          <Button block style={{margin: 20}}>
            Save
          </Button>
        </Content>
      </Container>
    );
  }
}

export default UserProfile;
