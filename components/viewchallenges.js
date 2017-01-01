'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Thumbnail, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col, Row, Fab} from 'native-base';
import Recorder from './Recorder';
import ViewChallengeVideos from './ViewChallengeVideos';
import CreateChallenge from './CreateChallenge';
import UserProfile from './UserProfile';
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
    this.createChallenge = this.createChallenge.bind(this);
    this.signOut = this.signOut.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }

  viewChallengeVideos(challenge) {
    const {navigator} = this.props;
    navigator.push({
      component: ViewChallengeVideos,
      props: {challenge}
    });
  }

  createChallenge() {
    const {navigator} = this.props;
    navigator.push({
      component: CreateChallenge,
      props: {}
    });
  }

  viewProfile() {
    const {navigator} = this.props;
    navigator.push({
      component: UserProfile,
      props: {}
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
    return fetch('https://challenge-accepted-api.herokuapp.com/challenges')
      .then((response) => response.json())
      .then(jsonResponse => jsonResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getChallenges().then(challenges => {
      console.log(challenges);
      this.setState({challenges});
    });
  }

  renderPreviewImage(challenge) {
    if (challenge.preview_img) {
      return (
        <Image source={{uri: challenge.preview_img}} style={{width: screen.width, height: 280, resizeMode: 'contain', alignItems:'center'}} />
      );
    } else {
      return (
        <Image source={require('../assets/img/ChallengeAccepted.png')} style={{height: 300, resizeMode: 'contain', alignItems:'center'}} />
      );
    }
  }

  signOut() {
    //TODO: actual sign out logic
    this.props.navigator.pop();
  }

  renderChallenge(challenge) {
    return (
    <Card key={challenge._id} style={{borderRadius: 0}}>
      <CardItem cardBody style={{padding: 0}}>
        <Grid>
          <Row style={{height: 300}}>
            <Col style={{alignItems: 'center'}}>
              {this.renderPreviewImage(challenge)}
            </Col>
          </Row>
          <Row style={{height: 130}}>
            <Col style={{width: 100, padding: 5}}>
              <Row style={{height: 30}}>
                <Col>
                  <Thumbnail size={70} source={{uri: challenge.created_by.profile_picture}} />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 5}}>{challenge.name}</Text>
                  <Text style={{marginTop: 5, marginBottom: 10}}>{challenge.description}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{height: 40}}>
            <Col size={1} style={{alignItems: 'center', backgroundColor: '#4D9DE0'}}><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#4D9DE0' name='thumbs-o-up'>Like</FontAwesome.Button></Col>
            <Col size={2} style={{alignItems: 'center', backgroundColor: '#E1BC29'}}><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#E1BC29' name='youtube-play' onPress={() => this.viewChallengeVideos(challenge)}> Videos</FontAwesome.Button></Col>
            <Col size={2} style={{alignItems: 'center', backgroundColor: '#D72638'}}><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#D72638' name='video-camera' onPress={this.recordChallenge}> Accept</FontAwesome.Button></Col>
          </Row>
        </Grid>
      </CardItem>
    </Card>
    );
  }

  render() {
    return (
    <Container style={{flex: 1}}>
      <View style={{position: 'absolute', bottom: 20, right: 20, zIndex: 100}}>
        <Button style={{height: 60, width: 60, borderRadius: 30, backgroundColor: '#4D9DE0'}} onPress={this.createChallenge}><FontAwesome style={{color: 'white'}} name='plus' size={25} /></Button>
      </View>
      <Header style={{backgroundColor: '#3F88C5'}}>
        <Button transparent onPress={this.signOut}><FontAwesome style={{color: 'white'}} name='sign-out' size={25} /></Button>
        <Title style={{color: 'white'}}>Challenges</Title>
        <Button transparent onPress={this.viewProfile}><FontAwesome style={{color: 'white'}} name='user' size={25} /></Button>
      </Header>
      <Content style={{backgroundColor: '#cccccc'}}>
        {this.state.challenges.map(challenge => this.renderChallenge(challenge))}
      </Content>
    </Container>
    );
  }
}

export default ViewChallenges;
