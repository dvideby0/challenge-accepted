'use strict';

import React, {Component} from 'react';
import {Navigator} from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Card, CardItem, Grid, Row, Col, Thumbnail, Text} from 'native-base';
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
    const {video, challenge} = this.props;
    return (
      <Card style={{borderRadius: 0}}>
        <CardItem>
          <Grid>
            <Row style={{height: 50}}>
              <Col style={{width: 50, padding: 5}}>
                <Row style={{height: 30}}>
                  <Col>
                    <Thumbnail size={45} style={{marginTop: -10}} source={{uri: video.created_by.profile_picture}} />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col size={3} style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>{video.created_by.name}</Text>
                    <Text style={{fontSize: 10}}>{video.created_at}</Text>
                  </Col>
                  <Col size={1}>
                    <Text style={{fontSize: 20}}>SCORE</Text>
                    <Text style={{fontSize: 15}}>{video.score}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </CardItem>
        <CardItem cardBody style={{padding: 0, marginTop: -10}}>
          <YouTube
            ref="youtubePlayer"
            videoId={video.youtube_id} // The YouTube video ID
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
