'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  Navigator,
  TouchableHighlight,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import Recorder from 'react-native-screcorder';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import styles from './styles';
const screen = Dimensions.get('window');

/*
 * This is a component for rendering youtube videos, it requires a youtube ID.
 */
class YouTubeVideos extends Component {
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
    );
  }
}

/*
 * This is the initial view for user's to login
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    const {navigator} = this.props;
    navigator.push({
      component: ViewChallenges,
      props: {}
    });
  }

  render() {
    return (
      <View style={styles.login}>
      <Image source={require('./assets/img/woo.gif')} style={styles.loginImg} />
        <TextInput
          style={styles.loginInput}
          placeholder='username'
        />
        <TextInput
          style={styles.loginInput}
          placeholder='password'
        />
        <TouchableHighlight style={[styles.loginBtn]} onPress={this.login}>
          <Text style={[{color: '#fff'}]}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

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
      component: Record,
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
          <TouchableHighlight style={styles.controlBtn} onPress={this.viewChallengeVideos}>
            <Text style={[{color: '#000'}]}>View Videos</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.controlBtn} onPress={this.recordChallenge}>
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
      <View style={{flex: 1, backgroundColor: 'powderblue', padding: 10}}>
        <TouchableOpacity onPressIn={this.props.navigator.pop} style={styles.controlBtn}>
          <Text>Back</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.state.challenges.map(challenge => <YouTubeVideos key={challenge.id} videoId={challenge.youtube_id}/>)}
        </ScrollView>
      </View>
    );
  }
}

class Record extends Component {
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
      config: {
        flashMode: Recorder.constants.SCFlashModeOff,
        video: {
          enabled: true,
          format: 'MPEG4'
        }
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
    if (this.state.limitReached) {
      return;
    }
    this.refs.recorder.record();
    this.startBarAnimation();
    this.setState({recording: true, activeRecording: true});
    var self = this;
    var interval = setInterval(function() {
      if (!self.state.activeRecording) {
        clearInterval(interval);
      } else {
        self.setState({durationInSeconds: self.state.durationInSeconds + 1});
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
    this.refs.recorder.pause();
    this.setState({recording: false, limitReached: true, nbSegments: ++this.state.nbSegments});
  }

  reset() {
    this.resetBarAnimation();
    this.refs.recorder.removeAllSegments();
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
    this.refs.recorder.pause();
    this.stopBarAnimation();
    const {navigator} = this.props;
    this.refs.recorder.save((err, url) => {
      this.reset();
      console.log('url = ', url);
      navigator.push({component: Preview, props: {video: url}});
    });
  }

  setDevice() {
    var device = (this.state.device == "front") ? "back" : "front";
    this.setState({device: device});
  }

  toggleFlash() {
    if (this.state.config.flashMode == Recorder.constants.SCFlashModeOff) {
      this.state.config.flashMode = Recorder.constants.SCFlashModeLight;
    } else {
      this.state.config.flashMode = Recorder.constants.SCFlashModeOff;
    }
    this.setState({config: this.state.config});
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
  }

  render() {
    var bar = this.renderBar();
    var recordBtn = null;
    var resetBtn = null;

    return (
      <Recorder
        ref="recorder"
        config={this.state.config}
        device={this.state.device}
        onNewSegment={this.onNewSegment}
        style={styles.wrapper}>
        {bar}
        <View style={styles.infoBtn}>
          <Text style={styles.infoBtnText}>{this.state.durationInSeconds}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPressIn={this.record} onPressOut={this.preview} style={styles.controlBtn}>
            <Text>Record</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleFlash} style={styles.controlBtn}>
            <Text>Flash</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.setDevice} style={styles.controlBtn}>
            <Text>Switch</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.exit} style={styles.controlBtn}>
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
      </Recorder>
    );
  }
}

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.setState({paused: true});
    this.props.navigator.pop();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.goBack}>
        <Video
          source={{uri: this.props.video}}
          style={styles.wrapper}
          muted={false}
          resizeMode="cover"
          paused={this.state.paused}
          repeat={true}/>
      </TouchableWithoutFeedback>
    );
  }

}

/*
 * Main app which houses navigator
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, nav) {
    if (route.component) {
      // pass navigator and route info
      var props = {navigator: nav, route: route};
      // expose any additional props
      if (route.props) {
        Object.assign(props, route.props);
      }
      return React.createElement(route.component, props);
    }
  }

  render() {
    return (
      <Navigator
        style={[styles.nav]}
        title='Challenge Accepted'
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{
            component: Login, title: 'Challenge Accepted'
          }}>
      </Navigator>
    );
  }
}

AppRegistry.registerComponent('ChallengeAccepted', () => App);
