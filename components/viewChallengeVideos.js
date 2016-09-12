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
import YouTubePlayer from './YouTubePlayer';

/*
 * View for rendering videos related to a challenge
 */
class ViewChallengeVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: props.challenges
    };
  }

  render() {
    return (
      <View style={styles.challengeVideos}>
        <TouchableOpacity onPressIn={this.props.navigator.pop} style={styles.controlBtnBack}>
          <Text>Back</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.state.challenges.map(challenge => <YouTubePlayer key={challenge.id} videoId={challenge.youtube_id}/>)}
        </ScrollView>
      </View>
    );
  }
}

export default ViewChallengeVideos;
