'use strict';

import React, {Component} from 'react';
import {Navigator, Image} from 'react-native';
import {Container, Header, Title, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col} from 'native-base';
import YouTubePlayer from './you_tube_player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/*
 * View for rendering videos related to a challenge
 */
class ViewChallengeVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: props.challenge,
      videos: []
    };
  }

  getChallengeVideos(challengeId) {
    return fetch('https://challenge-accepted-api.herokuapp.com/challenges/' + challengeId + '/videos')
      .then((response) => response.json())
      .then(jsonResponse => jsonResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getChallengeVideos(this.state.challenge._id).then(videos => {
      console.log(videos);
      this.setState({videos});
    });
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#3F88C5'}}>
          <Button transparent onPress={this.props.navigator.pop} textStyle={{color: 'white'}}><FontAwesome name='chevron-left' /> Back</Button>
          <Title style={{color: 'white'}}>{this.state.challenge.name}</Title>
        </Header>
        <Content style={{padding: 0, backgroundColor: '#cccccc'}}>
          {this.state.videos.map(video => <YouTubePlayer key={video._id} video={video} />)}
        </Content>
      </Container>
    );
  }
}

export default ViewChallengeVideos;
