import {Dimensions, StyleSheet} from 'react-native';
const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  login: {
    height: window.height,
    backgroundColor: "#eee",
    flex: 1
  },
  loginImg: {
    width: window.width - 200,
    marginBottom: 20
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  loginInput: {
    height: 60,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15
  },
  loginBtn: {
    bottom: 0,
    backgroundColor: '#a60707',
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowOffset: {height: 5},
    shadowRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    width: window.width - 40
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  videoWrapper: {
    height: screen.height,
    width: screen.width
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  },
  barWrapper: {
    width: screen.width,
    height: 10,
    backgroundColor: "black",
    opacity: 0.3
  },

  barGauge: {
    width: 0,
    height: 10,
    backgroundColor: "red"
  },

  controls: {
    position: 'absolute',
    bottom: 50,
    width: screen.width,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.6
  },
  cardControls: {
    position: 'absolute',
    bottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.6
  },
  controlBtn: {
    backgroundColor: "white",
    padding: 20,
    opacity: 0.8,
    // borderRadius: 5,
    // marginBottom: 10,
    // marginRight: 10,
    // width: 160,
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#000000",
    justifyContent: 'center',
    flexDirection: 'row'
  },
  controlBtnLast: {
    borderRightWidth: 0
    //width: 160
  },
  controlBtnAccept: {
    //width: 160
  },
  controlBtnBack: {
    height: 50,
    padding: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  likeBtn: {
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#00FFFF',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 15
  },
  infoBtn: {
    backgroundColor: "#2ecc71",
    opacity: 0.8,
    padding: 10,
    position: 'absolute',
    top: 20,
    right: 20,
    opacity: 0.7,
    borderRadius: 5
  },

  infoBtnText: {
    color: "white"
  },

  challenge: {
    backgroundColor: 'white', 
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  challengeTitle: {
    flex: 1, 
    height: 40,
    textAlign: 'center',
    fontSize: 20
  },
  challengeVideos: {
    flex: 1, 
    padding: 10
  }
});

export default styles;