import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import {API_ID, API_KEY} from "../config/index.js";
import {recogFace} from "../api/face.js";
import {writeLog} from "../api/backend.js";
import Voice from '@react-native-community/voice';

import { useContext } from 'react';
import { PlaceContext } from '../context/PlaceContext';

function Camera({navigation}) {
  const {_place} = useContext(PlaceContext);
    
  const [takingPic, setTakingPic] = useState(false);
  const [flag, setFlag] = useState(0);
  const [accountName, setAccountName] = useState("");
  
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
        setTakingPic(false);
        setFlag(0);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const faceDetect = ({faces}) => {
    if (faces[0]) {
      if(!takingPic) {
        setTakingPic(true)
        setTimeout(()=>takePicture(), 500);
      }
    }
  };

  const takePicture = async () => {
    if (this.camera) {
      const options = { 
        width: 640,
        height: 480,
        base64: false 
      };
      const data = await this.camera.takePictureAsync(options);
      requestMaumAi(data);
    }
  };

  const requestMaumAi = (imageFile) => {
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
          checkGuest();
        } else { // 인식성공
          enter(res.data.result.id);
        }
      },
      (error)=> {
        console.log(error);
        setTimeout(()=>setTakingPic(false), 1000);
      }
    );
  }

  const checkGuest = () => {
    // 직원 확인에 실패했고, 방문객이면 '호출'키워드를 말해달라는 것과 함께 음성인식 시작
    setFlag(2);
    console.log('직원인식실패, 방문객이면 호출을 말하세요');
    Voice.stop();
    Voice.start('ko-KR');
  }

  Voice.onSpeechStart = (e) => {
    console.log('Camera onSpeechStart: ' + e);
  }

  Voice.onSpeechResults = (e) => {
    console.log('Camera onSpeechResults: ', e);

    // 음성인식 결과중에 호출이란 단어가 있으면 방문객 시나리오 페이지 이동
    let list = e.value;
    let num = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] == '호출') {
        num++;
        console.log('페이지 이동: Camera >> GuestVoice');
        Voice.destroy().then(Voice.removeAllListeners);
        navigation.navigate('GuestVoice');
        return;
      }
    }

    if(num == 0) {
      console.log("잘못말했을때");
      setTakingPic(false);
      setFlag(0);
    }
  }

  Voice.onSpeechError = (e) => {
    setTakingPic(false);
    setFlag(0);
  }

  const enter = (id) => {
  	let placeName = _place.name;
    let data = {
      accountEmail : id,
      placeName : placeName,
    }
      // 로그 남기고 state 변화, 
    writeLog(data,
      (res)=>{
        console.log(res.data.accountName);
        setFlag(1);
        setAccountName(res.data.accountName);
        console.log(accountName+"님 출입확인 되었습니다.");
        setTimeout(()=>{
          setTakingPic(false);
          setFlag(0);
          setAccountName("");
          console.log("원상복구");
        }, 2000);
      },
      (error)=> {
        console.log(error);
        console.log("출입로그 찍는데 문제생김");
        setTakingPic(false);
      }
    )
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
      edge : {
        
      }
  });

  return (
    <View style={styles.container}>
      <View style={styles.edge}>
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
          onFacesDetected={faceDetect}
        />
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={()=>navigation.navigate('GuestVoice')} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Camera;