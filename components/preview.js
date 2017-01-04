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
import Video from 'react-native-video';
let RNUploader = require('NativeModules').RNUploader;

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false
    };
    this.goBack = this.goBack.bind(this);
    this.doUpload = this.doUpload.bind(this);
  }

  componentDidMount(){
    // upload progress
    DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;

      console.log( 'upload progress: ' + progress + '%');
    });
  }

  goBack() {
    this.setState({paused: true});
    this.props.navigator.pop();
  }

  doUpload(){
    let files = [
      {
        name: 'data[]',
        filename: 'test.mov',
        filepath: this.props.video,  // image from camera roll/assets library
        filetype: 'video/quicktime'
      }
    ];

    let opts = {
      url: 'https://challenge-accepted-api.herokuapp.com/media',
      files: files,
      method: 'POST',                             // optional: POST or PUT
      headers: {'Accept': 'application/json'},  // optional
      params: {'user_id': 1}
    };

    RNUploader.upload(opts, (err, response) => {
      if( err ){
        console.log(err);
        return;
      }

      let status = response.status;
      let responseString = response.data;
      let json = JSON.parse( responseString );
      console.log('upload complete with status ' + status);
      this.goBack();
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.goBack}>
          <Video
            source={{uri: this.props.video}}
            style={styles.videoWrapper}
            muted={false}
            resizeMode='cover'
            paused={this.state.paused}
            repeat={true}>
          </Video>
        </TouchableOpacity>
        <View style={styles.controls}>
          <TouchableOpacity onPressIn={this.doUpload} onPressOut={this.preview} style={styles.controlBtn}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goBack} style={styles.controlBtn}>
            <Text>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Preview;
