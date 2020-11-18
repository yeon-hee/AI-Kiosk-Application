import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import Voice from '@react-native-community/voice';
import Sound from 'react-native-sound';

import { PlaceContext } from '../context/PlaceContext';
import { findStaff, sendMessageReq } from '../api/backend';
import GuestVoicePhase from './GuestVoicePhase';

import micActiveIcon from '../resources/ic_mic_24px.png';
import micDeactiveIcon from '../resources/ic_mic_none_24px.png'

const SOUND = {
  guide: new Sound('guide_tts.wav'),
  confirm: new Sound('confirm_tts.wav'),
  finish: new Sound('result_tts.wav'),
}
const YES_FILTER = ['예', '네', '얘', '내', '응', '그래 이놈아', '오키', '어'];
const TRY_MAX = 10;

class GuestVoice extends Component {
  static contextType = PlaceContext;

  state = {
    pitch: '',
    error: '',
    results: [], // 여기까지 Voice에 대한 state
    tryCnt: 0,
    staff: {},
    voicePhase: 0, // 0: 초기상태, 1: 직원호출중, 2: 컨펌중, 3: 호출완료, 4: 인식횟수초과, 5: 찾는직원없음
    isListening: false,
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentDidMount() {
    this.playSound();    // 안내 음성 재생하고, 음성인식 시작
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  playSound() {
    this.setState({voicePhase: 1});
    SOUND.guide.play(() => {
      this._startRecognizing();
    });
  }

  _startRecognizing = async () => {
    this.setState({
      pitch: '',
      error: '',
      results: [],
    });

    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

////////////////////////////////////// Voice 관련 Lifecycle 메서드 시작
  onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    this.setState({isListening: true});
  };

  onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);
    this.setState({isListening: false});
  };

  onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    this.setState({error: JSON.stringify(e.error),isListening: false});

    // 말한게 없을경우 여기에서 처리
    this.setState({tryCnt: this.state.tryCnt + 1});
    console.log('인식재시도횟수: ' + this.state.tryCnt);

    if (this.state.tryCnt >= TRY_MAX) {
      // 인식시간초과, 다시시도해주세요
      this.setState({voicePhase: 4});
      setTimeout(() => {this.props.navigation.navigate('Camera')}, 2000);
    } else if (e.error.message[0] == 8) { // error code 8: all voice listeners are busy
      setTimeout(this._startRecongnizing, 2000);
    } else {
      this._startRecognizing();
    }
  };

  onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    // 음성인식 정상 종료 >> 인식횟수카운트초기화
    this.setState({results: e.value, tryCnt: 0});
    if (this.state.voicePhase == 1) { // 백앤드에 음성인식처리결과 보냄
      this.matchRequest(e);
    } else if (this.state.voicePhase == 2) { // confirm 에 대한 음성인식처리결과 확인
      this.checkConfirm(e);
    }
  };

  onSpeechVolumeChanged = (e) => {
    this.setState({pitch: e.value});
  };

////////////////////////////////////// Voice 관련 Lifecycle 메서드 끝


  matchRequest({value}) {   // 음성인식 결과 리스트 전송해서 매치되는 직원 있는지 찾는 요청 보내기
    let data = {
      placeId: this.context._place.id,
      names: value.join(','),
    }

    findStaff(data, (res) => {
      if (res.status == 200 && res.data.length != 0) {  // 정상응답 and 데이터있는경우
        // 결과 반영 후, 컨펌절차로 넘어감
        this.setState({staff: res.data[0], voicePhase: 2});
        SOUND.confirm.play(() => { this._startRecognizing(); });
      } else {  // 서버에 매치되는 직원이 없음
        this.setState({voicePhase: 5});
        setTimeout(() => {this.props.navigation.navigate('Camera')}, 2000);
      }
    });
  }

  checkConfirm({value}) { // 음성인식 결과물 중 예 있는지 확인
    let saidYes = value.filter( x => YES_FILTER.includes(x)).length > 0
    if (saidYes) {
      sendMessageReq( this.state.staff.id, (res) => {
        if (res.status == 200) {
          // 정상적으로 호출메세지보냈다는 화면 및 음성 표시 및 시나리오 종료
          this.setState({voicePhase: 3});
          SOUND.finish.play(() => {
            setTimeout(() => {
              this.props.navigation.navigate('Camera')
            }, 1000);
          });
        }
      })
    } else {
      // 되돌아가기
      this.playSound();
    }
  }

  render() {
    let information = null;
    let staffName = null;
    if (this.state.voicePhase == 0) {
      information = null;
    } else if (this.state.voicePhase == 1) {
      information = "찾는 분의 이름을 말해주세요."
    } else if (this.state.voicePhase == 2) {
      information = "입력하신 내용이 맞습니까?"
      staffName = this.state.staff.name;
    } else if (this.state.voicePhase == 3) {
      information = this.state.staff.name + " 님에게 호출메세지를 보냈습니다.\n잠시만 기다려주세요."
    } else if (this.state.voicePhase == 4) {
      information = "인식시간 초과, 다시 시도해주세요."
    } else {
      information = "찾을 수 없습니다."
    }

    return (
      <>
        <GuestVoicePhase phase={this.state.voicePhase}/>

        <View style={styles.container}>

          <View style={styles.infoContainer}>
            {this.state.voicePhase == 2 && <Text style={styles.staffName}>{staffName}</Text>}
            <Text style={styles.welcome}>{information}</Text>
          </View>

          <Image style={styles.button} source={this.state.isListening ? micActiveIcon : micDeactiveIcon} />

        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    resizeMode:'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    height: 200,
  },
  welcome: {
    margin: 10,
    fontSize: 30,
    fontFamily: 'Jua-Regular',
    color: '#707070',
    textAlign: 'center',
  },
  staffName: {
    marginBottom: 30,
    fontSize: 40,
    fontFamily: 'Jua-Regular',
    color: '#663398',
    textAlign: 'center',
  },
});

export default GuestVoice;