'use strict';

import React, {Component} from 'react';
import {Navigator, Image, Dimensions, View} from 'react-native';
import {Container, Thumbnail, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col, Row, Fab, Spinner} from 'native-base';
import Recorder from './recorder';
import ViewChallengeVideos from './view_challenge_videos';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screen = Dimensions.get('window');
import * as config from './config';

class ViewFavoriteChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      loading: true
    };
    this.viewChallengeVideos = this.viewChallengeVideos.bind(this);
    this.recordChallenge = this.recordChallenge.bind(this);
  }

  componentWillMount() {
    let self = this;
    this.setState({loading: true});
    this.getChallenges().then(challenges => {
      this.setState({challenges, loading: false});
    });
  }

  viewChallengeVideos(challenge) {
    const {navigator} = this.props;
    navigator.push({
      component: ViewChallengeVideos,
      props: {challenge}
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
    return fetch(config.API_URL + '/challenges')
      .then((response) => response.json())
      .then(jsonResponse => jsonResponse)
      .catch((error) => {
        console.error(error);
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

  renderChallenge(challenge) {
    return (
      <Card key={challenge._id} style={{borderRadius: 0, marginTop: 0}}>
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
                    <Thumbnail size={70} source={{uri: `https://graph.facebook.com/${challenge.created_by.facebook_id}/picture?type=large`}} />
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
      <Container>
        <Content style={{backgroundColor: '#cccccc'}}>
          {this.state.loading ? <View style={{alignItems: 'center'}} ><Spinner color='blue'/></View> : null}
          {this.state.challenges.map(challenge => this.renderChallenge(challenge))}
        </Content>
      </Container>
    );
  }
}

export default ViewFavoriteChallenges;
