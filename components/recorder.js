'use strict';

import React, {Component} from 'react';
import {Navigator, Dimensions, Animated, StatusBar, CameraRoll, View} from 'react-native';
import {Container, Header, Title, Text, Content, Button, TextInput, Icon, Card, CardItem, Grid, Col} from 'native-base';
import Camera from 'react-native-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../assets/styles/style';
import Preview from './preview';
const screen = Dimensions.get('window');

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: 'front',
      recording: false,
      activeRecording: false,
      nbSegments: 0,
      barPosition: new Animated.Value(0),
      currentDuration: 0,
      maxDuration: 10000,
      durationInSeconds: 0,
      limitReached: false,
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto
      }
    };
    this.startBarAnimation = this.startBarAnimation.bind(this);
    this.resetBarAnimation = this.resetBarAnimation.bind(this);
    this.stopBarAnimation = this.stopBarAnimation.bind(this);
    this.record = this.record.bind(this);
    this.pause = this.pause.bind(this);
    this.finish = this.finish.bind(this);
    this.reset = this.reset.bind(this);
    this.preview = this.preview.bind(this);
    this.setDevice = this.setDevice.bind(this);
    this.toggleFlash = this.toggleFlash.bind(this);
    this.onRecordDone = this.onRecordDone.bind(this);
    this.onNewSegment = this.onNewSegment.bind(this);
    this.renderBar = this.renderBar.bind(this);
    this.exit = this.exit.bind(this);
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'slide');
  }

  resetBarAnimation() {
    Animated.spring(this.state.barPosition, {toValue: 0}).start();
  }

  startBarAnimation() {
    this.animRunning = true;
    this.animBar = Animated.timing(
      this.state.barPosition,
      {
        toValue: screen.width,
        duration: this.state.maxDuration - this.state.currentDuration
      }
    );
    this.animBar.start(() => {
      // The video duration limit has been reached
      if (this.animRunning) {
        this.finish();
      }
    });
  }

  stopBarAnimation() {
    this.animRunning = false;
    if (this.animBar) {
      this.animBar.stop();
    }
  }

  record() {
    const {navigator} = this.props;
    this.camera.capture()
      .then(data => {
        this.reset();
        navigator.push({component: Preview, props: {video: data.path}});
      });
    if (this.state.limitReached) {
      return;
    }
    this.setState({recording: true, activeRecording: true});
    var self = this;
    var interval = setInterval(function() {
      if (!self.state.activeRecording) {
        clearInterval(interval);
      } else {
        self.setState({durationInSeconds: self.state.durationInSeconds + 1});
        if (self.state.durationInSeconds === 10) {
          clearInterval(interval);
          self.preview();
        }
      }
    }, 1000);
  }

  pause(limitReached) {
    if (!this.state.recording) {
      return;
    }
    this.refs.recorder.pause();
    this.stopBarAnimation();
    this.setState({recording: false, nbSegments: ++this.state.nbSegments});
  }

  finish() {
    this.stopBarAnimation();
    this.setState({recording: false, limitReached: true, nbSegments: ++this.state.nbSegments});
  }

  reset() {
    this.resetBarAnimation();
    this.setState({
      recording: false,
      nbSegments: 0,
      currentDuration: 0,
      durationInSeconds: 0,
      limitReached: false
    });
  }

  preview() {
    this.setState({activeRecording: false});
    this.camera.stopCapture();
    this.stopBarAnimation();
    const {navigator} = this.props;
  }

  setDevice() {
    var device = (this.state.device == "front") ? "back" : "front";
    this.setState({device: device});
  }

  toggleFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode
      }
    });
  }

  /*
   *  EVENTS
   */

  onRecordDone() {
    this.setState({nbSegments: 0});
  }

  onNewSegment(segment) {
    console.log('segment = ', segment);
    this.state.currentDuration += segment.duration * 1000;
  }

  /*
   *  RENDER METHODS
   */

  renderBar() {
    return (
      <View style={styles.barWrapper}>
        <Animated.View style={[styles.barGauge, {width: this.state.barPosition}]}/>
      </View>
    );
  }

  exit() {
    this.props.navigator.pop();
    StatusBar.setHidden(false, 'slide');
  }

  render() {
    var bar = this.renderBar();
    var recordBtn = null;
    var resetBtn = null;

    return (
      <Camera
        captureMode={Camera.constants.CaptureMode.video}
        ref={(cam) => {this.camera = cam;}}
        aspect={Camera.constants.Aspect.fill}
        flashMode={this.state.camera.flashMode}
        style={styles.wrapper}>
        {bar}
        <View style={styles.infoBtn}>
          <Text style={styles.infoBtnText}>{this.state.durationInSeconds}</Text>
        </View>
        <View>
          <Grid style={{marginTop: screen.height - 150}}>
            <Col style={{padding: 15}}>
              <FontAwesome.Button backgroundColor='red' onPressIn={this.record} onPressOut={this.preview} name='video-camera'>
                <Text>Record</Text>
              </FontAwesome.Button>
            </Col>
            <Col style={{padding: 15}}>
              <FontAwesome.Button backgroundColor='silver' onPress={this.exit} name='sign-out'>
                <Text>Exit</Text>
              </FontAwesome.Button>
            </Col>
          </Grid>
        </View>
      </Camera>
    );
  }
}

export default Recorder;
