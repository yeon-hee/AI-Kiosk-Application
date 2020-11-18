import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {API_ID, API_KEY} from "../config/index.js";
import {recogFace} from "../api/face.js";
import {writeLog} from "../api/backend.js";
import Voice from '@react-native-community/voice';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      takingPic : false,
      flag : 0,
      accountName : ""
    }
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechStart = this.onSpeechStart;
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onFacesDetected={this.faceDetect}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('GuestVoice')} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  faceDetect = ({faces}) => {
    if (faces[0]) {
      if(!this.state.takingPic) {
        this.setState({
          takingPic : true
        });
        setTimeout(()=>this.takePicture(), 500);
      }
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { 
        width: 640,
        height: 480,
        base64: false };
      const data = await this.camera.takePictureAsync(options);
      this.requestMaumAi(data);
    }
  };

  requestMaumAi = (imageFile) => {
    let formData = new FormData();
    formData.append("apiId", API_ID);
    formData.append("apiKey", API_KEY);
    formData.append("file", {
      uri: imageFile.uri,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
    recogFace(formData,
      (res)=>{
        console.log(res.data.result.id);
        if(!res.data.result.id || res.data.result.id==="__no__match__") { // 인식실패
          this.checkGuest();
        } else { // 인식성공
          this.enter(res.data.result.id);
        }
      },
      (error)=> {
        console.log(error);
        setTimeout(()=>this.setState({
            takingPic : false
        }), 1000);
      }
    );
  }
  
  checkGuest = () => {
    // 직원 확인에 실패했고, 방문객이면 '호출'키워드를 말해달라는 것과 함께 음성인식 시작
    this.setState({
      flag : 2
    });
    console.log('직원인식실패, 방문객이면 호출을 말하세요');
    Voice.stop();
    Voice.start('ko-KR');
  }
  
  onSpeechStart = (e) => {
    console.log('Camera onSpeechStart: ' + e);
  }

  onSpeechResults = (e) => {
    console.log('Camera onSpeechResults: ', e);

    // 음성인식 결과중에 호출이란 단어가 있으면 방문객 시나리오 페이지 이동
    let list = e.value;
    for (let i = 0; i < list.length; i++) {
      if (list[i] == '호출') {
        console.log('페이지 이동: Camera >> GuestVoice');
        Voice.destroy().then(Voice.removeAllListeners);
        this.props.navigation.navigate('GuestVoice');
      }
    }
  }

  enter = (id) => {
    let data = {
      accountEmail : id,
      placeName : "신촌점"
    }
    // 로그 남기고 state 변화, 
    writeLog(data,
      (res)=>{
        this.setState({
          flag : 1,
          accountName : res.data.accountName
        });
        console.log(this.state.accountName+"님 출입확인 되었습니다.");
        setTimeout(()=>{
          this.setState({
            takingPic : false,
            flag : 0,
            accountName : ""
          });
          console.log("원상복구");
        }, 2000);
      },
      (error)=> {
        console.log(error);
        console.log("출입로그 찍는데 문제생김");
        this.setState({
          takingPic : false
        });
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});