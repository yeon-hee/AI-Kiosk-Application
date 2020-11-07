import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-community/voice';
import { PlaceContext } from '../context/PlaceContext';

import Sound from 'react-native-sound';
import axios from 'axios';

type Props = {};
type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
};

let guide = new Sound('guide_tts.wav');
let confirm = new Sound('confirm_tts.wav');
let result = new Sound('result_tts.wav');
const YES_FILTER = ['예', '네', '얘', '내'];
const TRY_MAX = 10;

class GuestVoice extends Component<Props, State> {
  static contextType = PlaceContext;

  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [], // 여기까지 Voice에 대한 state
    tryCnt: 0,

    // 여기부터는 음성 컴포넌트 전체적인 상태
    staff: {},
    voicePhase: 0, // 0: 초기상태, 1: 직원호출중, 2: 컨펌중, 3: 호출완료, 4: 인식횟수초과, 5: 찾는직원없음
    
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
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
    guide.play(() => {
      this._startRecognizing();
    });
  }
  
////////////////////////////////////// Voice 관련 Lifecycle 메서드 시작
  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({started: '√'});
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({recognized: '√'});
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({end: '√'});

  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    this.setState({error: JSON.stringify(e.error),});

    // 말한게 없을경우 여기에서 처리
    this.setState({tryCnt: this.state.tryCnt + 1});
    console.log('인식재시도횟수: ' + this.state.tryCnt);

    if (this.state.tryCnt >= TRY_MAX) {
      // 인식시간초과, 다시시도해주세요
      console.log('인식시간초과, 다시시도해주세요');
      this.setState({voicePhase: 4});
      setTimeout(() => {this.props.navigation.navigate('Camera')}, 2000);
    } else {
      this._startRecognizing();
    }
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState({results: e.value});

    // 음성인식 정상 종료 >> 인식횟수카운트초기화
    this.setState({tryCnt: 0});

    if (this.state.voicePhase == 1) {
      // 백앤드에 음성인식처리결과 보냄
      this.matchRequest(e);
    } else if (this.state.voicePhase == 2) {
      // confirm 에 대한 음성인식처리결과 확인
      this.checkConfirm(e);
    }
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    // console.log('onSpeechPartialResults: ', e);
    this.setState({partialResults: e.value});
  };

  onSpeechVolumeChanged = (e: any) => {
    // console.log('onSpeechVolumeChanged: ', e);
    this.setState({pitch: e.value});
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };
////////////////////////////////////// Voice 관련 Lifecycle 메서드 끝



  matchRequest({value}) {   // 음성인식 결과 리스트 전송해서 매치되는 직원 있는지 찾는 요청 보내기
    let host = 'http://k3a508.p.ssafy.io';
    let placeId = this.context._place.id;
    const url = host + '/kiosk/account/getAccountInfo?placeId='+placeId+'&names=' + value.join(',');

    console.log(url);

    axios.get(url)
      .then(res => {
        if (res.status == 200 && res.data.length != 0) {  // 정상응답 and 데이터있는경우

          let staff = res.data[0];
          console.dir(staff);
          this.setState({
            staff: staff,
          });

          // 컨펌절차로 넘어감
          this.setState({voicePhase: 2});
          confirm.play(() => {
            this._startRecognizing();
          });
        } else {  // 서버에 매치되는 직원이 없음
          console.log('서버에 매치되는 직원이 없음');
          // 찾을 수 없습니다.
          this.setState({voicePhase: 5});
          setTimeout(() => {this.props.navigation.navigate('Camera')}, 2000);
        }
      })
      .catch(e => {
          console.log('response error: '+e);
      })
  }

  checkConfirm({value}) { // 음성인식 결과물 중 예 있는지 확인
    console.log(value);

    let saidYes = false;
    for (let i = 0; i < value.length; i++) {
      if (YES_FILTER.includes(value[i])) {
        saidYes = true;
        break;
      }
    }

    if (saidYes) {
      // 컨펌확인 했으니 호출 메세지 보내
      console.log('user confirm checked!!');

      let host = 'http://k3a508.p.ssafy.io';
      let staffCallUrl = host + '/kiosk/account/SendMessage?accountId=' + this.state.staff.id;

      console.log(staffCallUrl);

      axios.get(staffCallUrl)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);

            // 정상적으로 호출메세지보냈다는 화면 및 음성 표시 및 한 루틴 종료
            this.setState({voicePhase: 3});
            result.play(() => {
              this.setState({staff: {}, voicePhase: 0});
              setTimeout(() => {this.props.navigation.navigate('Camera')}, 2000);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 되돌아가기
      this.playSound();
    }
  }

  render() {

    let information = null;
    if (this.state.voicePhase == 0) {
      information = null;
    } else if (this.state.voicePhase == 1) {
      information = <Text style={styles.welcome}>찾는 분의 이름을 말해주세요</Text>
    } else if (this.state.voicePhase == 2) {
      information = <Text style={styles.welcome}>입력하신 내용이 맞습니까?</Text>
    } else if (this.state.voicePhase == 3) {
      information = <Text style={styles.welcome}>{this.state.staff.name} 님에게 호출메세지를 보냈습니다. 잠시만 기다려주세요.</Text>
    } else if (this.state.voicePhase == 4) {
      information = <Text style={styles.welcome}>인식시간 초과, 다시 시도해주세요</Text>
    } else {
      information = <Text style={styles.welcome}>찾을 수 없습니다.</Text>
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => this.playSound()}>수동으로 시작</Text>

        {information}

        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('../resources/button.png')} />
        </TouchableHighlight>
        
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}

        <Text style={styles.stat}>Match Result</Text>
        <Text style={styles.stat}>
          {this.state.staff.name}
        </Text>

        <Text style={styles.stat}>누적시도: {this.state.tryCnt}</Text>

        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Camera')} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default GuestVoice;