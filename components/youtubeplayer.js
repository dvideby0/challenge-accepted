'use strict';

import React, {Component} from 'react';
import {Navigator} from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Card, CardItem, Grid, Col} from 'native-base';
import YouTube from 'react-native-youtube';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <Card style={{marginBottom: 12, borderRadius: 0}}>
        <CardItem cardBody style={{padding: 0, marginTop: -10}}>
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

            style={{height: 200}}
          />
          <Grid>
            <Col><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#4D9DE0' name='thumbs-o-up'>Like</FontAwesome.Button></Col>
            <Col><FontAwesome.Button style={{height: 40}} borderRadius={0} backgroundColor='#D72638' name='thumbs-o-down'>Dislike</FontAwesome.Button></Col>
          </Grid>
        </CardItem>
      </Card>
    );
  }
}

export default YouTubePlayer;
