'use strict';

import React, {Component} from 'react';
import {Navigator, Image} from 'react-native';
import {Container, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col} from 'native-base';
import Recorder from './Recorder';
import ViewChallengeVideos from './ViewChallengeVideos';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ViewChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };
    this.viewChallengeVideos = this.viewChallengeVideos.bind(this);
    this.recordChallenge = this.recordChallenge.bind(this);
  }

  viewChallengeVideos() {
    const {navigator} = this.props;
    navigator.push({
      component: ViewChallengeVideos,
      props: {challenges: this.state.challenges}
    });
  }

  recordChallenge() {
    const {navigator} = this.props;
    navigator.push({
      component: Recorder,
      props: {}
    });
  }

  getChallenges() {
    return fetch('https://challenge-accepted-api.herokuapp.com/')
      .then((response) => response.json())
      .then(jsonResponse => jsonResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getChallenges().then(challenges => this.setState({challenges}));
  }

  renderChallenge(challenge) {
    const uri = 'https://img.youtube.com/vi/' + challenge.youtube_id + '/3.jpg';
    return (
    <Card key={challenge.id} style={{marginBottom: 10}}>
      <CardItem>
        <Text style={{fontSize: 15}}>{challenge.name}</Text>
      </CardItem>

      <CardItem cardBody>
        <Image style={{resizeMode: 'cover', height: 200}} source={{uri: uri}} />
      </CardItem>
      <CardItem>
        <Grid>
          <Col style={{padding: 5}}><FontAwesome.Button name='thumbs-o-up'>Like</FontAwesome.Button></Col>
          <Col style={{padding: 5}}><FontAwesome.Button backgroundColor='green' name='youtube-play' onPress={this.viewChallengeVideos}> Videos</FontAwesome.Button></Col>
          <Col style={{padding: 5}}><FontAwesome.Button backgroundColor='red' name='video-camera' onPress={this.recordChallenge}> Accept</FontAwesome.Button></Col>
        </Grid>
      </CardItem>
    </Card>
    );
  }

  render() {

    return (
    <Container style={{backgroundColor: '#0099CC'}}>
      <Header style={{backgroundColor: '#BBEAFA'}}>
        <Title>Challenges</Title>
      </Header>
      <Content style={{padding: 5}}>
        {this.state.challenges.map(challenge => this.renderChallenge(challenge))}
      </Content>
    </Container>
    );
  }
}

export default ViewChallenges;
