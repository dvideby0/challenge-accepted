'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  DeviceEventEmitter,
  ListView,
  Navigator,
  TouchableHighlight,
  Dimensions,
  Animated,
  StatusBar,
  CameraRoll,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import styles from '../assets/styles/style';
import Recorder from './Recorder';
import ViewChallengeVideos from './ViewChallengeVideos';

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
    return(
      <View key={challenge.id} style={styles.challenge}>
        <Text style={styles.challengeTitle}>
          {challenge.name}
        </Text>
        <Image style={{height: 200}}
               source={{uri: uri}}
        />
        <View style={styles.cardControls}>
          <TouchableHighlight style={[styles.controlBtn]} onPress={this.viewChallengeVideos}>
            <Text style={[{color: '#000'}]}>View Submissions</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.controlBtn, styles.controlBtnLast]} onPress={this.recordChallenge}>
            <Text style={[{color: '#000'}]}>Accept Challenge</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {

    return (
      <View style={{paddingTop: 40, backgroundColor: 'powderblue'}}>
        <ScrollView style={{height: screen.height}}>
          {this.state.challenges.map(challenge => this.renderChallenge(challenge))}
        </ScrollView>
      </View>
    );
  }
}

export default ViewChallenges;
