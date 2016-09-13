'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col} from 'native-base';
import Recorder from './Recorder';
import ViewChallengeVideos from './ViewChallengeVideos';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screen = Dimensions.get('window');

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
    <Card key={challenge.id} style={{borderRadius: 0}}>
      <CardItem cardBody style={{padding: 0}}>
        <View style={{padding: 5}}>
          <Text style={{fontSize: 20, marginTop: 5, marginBottom: 10}}>{challenge.name}</Text>
        </View>
        <Image style={{resizeMode: 'cover', height: 250}} source={{uri: uri}} />
        <Grid>
          <Col><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#4D9DE0' name='thumbs-o-up'>Like</FontAwesome.Button></Col>
          <Col><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#E1BC29' name='youtube-play' onPress={this.viewChallengeVideos}> Videos</FontAwesome.Button></Col>
          <Col><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#D72638' name='video-camera' onPress={this.recordChallenge}> Accept</FontAwesome.Button></Col>
        </Grid>
      </CardItem>
    </Card>
    );
  }

  render() {

    return (
    <Container>
      <Header style={{backgroundColor: '#3F88C5'}}>
        <Button transparent><FontAwesome style={{color: 'white'}} name='user' size={25} /></Button>
        <Title style={{color: 'white'}}>Challenges</Title>
        <Button transparent onPress={this.props.navigator.pop} textStyle={{color: 'white'}}>Log Out</Button>
      </Header>
      <Content style={{padding: 0, backgroundColor: '#cccccc'}}>
        {this.state.challenges.map(challenge => this.renderChallenge(challenge))}
      </Content>
    </Container>
    );
  }
}

export default ViewChallenges;
