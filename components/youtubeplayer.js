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

import YouTube from 'react-native-youtube';
import styles from '../assets/styles/style';

/*
 * This is a component for rendering youtube videos, it requires a youtube ID.
 */
class YouTubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true
    };
  }

  render() {
    const {videoId} = this.props;
    return (
      <View>
        <YouTube
          ref="youtubePlayer"
          videoId={videoId} // The YouTube video ID
          play={false}           // control playback of video with true/false
          hidden={false}        // control visiblity of the entire view
          playsInline={true}    // control whether the video should play inline
          loop={false}          // control whether the video should loop when ended

          onReady={(e)=>{this.setState({isReady: true})}}
          onChangeState={(e)=>{this.setState({status: e.state})}}
          onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
          onError={(e)=>{this.setState({error: e.error})}}
          onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

          style={{alignSelf: 'stretch', height: 300, backgroundColor: 'powderblue', marginVertical: 10}}
        />
        <TouchableHighlight style={styles.likeBtn} onPress={this.viewChallengeVideos}>
          <Text>Like</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default YouTubePlayer;
