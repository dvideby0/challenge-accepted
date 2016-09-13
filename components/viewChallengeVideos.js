'use strict';

import React, {Component} from 'react';
import {Navigator, Image} from 'react-native';
import {Container, Header, Title, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col} from 'native-base';
import YouTubePlayer from './YouTubePlayer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/*
 * View for rendering videos related to a challenge
 */
class ViewChallengeVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: props.challenges
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <Container style={{backgroundColor: '#0099CC'}}>
        <Header style={{backgroundColor: '#BBEAFA'}}>
          <Button transparent onPress={this.goBack}><FontAwesome name='chevron-left' /> Back</Button>
          <Title>Videos</Title>
        </Header>
        <Content>
          {this.state.challenges.map(challenge => <YouTubePlayer key={challenge.id} videoId={challenge.youtube_id}/>)}
        </Content>
      </Container>
    );
  }
}

export default ViewChallengeVideos;
