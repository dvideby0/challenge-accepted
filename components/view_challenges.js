'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Thumbnail, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col, Row, Fab, Tabs} from 'native-base';
import ViewPopularChallenges from './view_popular_challenges';
import ViewNewChallenges from './view_new_challenges';
import ViewFavoriteChallenges from './view_favorite_challenges';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CreateChallenge from './create_challenge';

class ViewChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };
    this.signOut = this.signOut.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
  }

  componentWillMount() {

  }

  signOut() {
    //TODO: actual sign out logic
    this.setState({user: null});
    this.props.navigator.pop();
  }

  createChallenge() {
    const {navigator} = this.props;
    navigator.push({
      component: CreateChallenge,
      props: {user: this.props.user}
    });
  }

  render() {
    return (
    <Container>
      <View style={{position: 'absolute', bottom: 20, right: 20, zIndex: 100}}>
        <Button style={{height: 60, width: 60, borderRadius: 30, backgroundColor: '#4D9DE0'}} onPress={this.createChallenge}><FontAwesome style={{color: 'white'}} name='plus' size={25} /></Button>
      </View>
      <Header style={{backgroundColor: '#3F88C5'}}>
        <Button transparent onPress={this.signOut}><FontAwesome style={{color: 'white'}} name='bars' size={25} /></Button>
        <Title style={{color: 'white'}}>Challenges</Title>
      </Header>
      <Content style={{backgroundColor: '#cccccc'}}>
        <Tabs>
          <ViewPopularChallenges navigator={this.props.navigator} tabLabel='Popular' />
          <ViewNewChallenges navigator={this.props.navigator} tabLabel='New' />
          <ViewFavoriteChallenges navigator={this.props.navigator} tabLabel='Favorites' />
        </Tabs>
      </Content>
    </Container>
    );
  }
}

export default ViewChallenges;
