import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  // const [content, setContent] = useState("");
  
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
    formData.append("dbId", 'test');
    formData.append("file", {
      uri: imageFile.uri,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
    recogFace(formData,
      (res)=>{
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
        setFlag(1);
        setAccountName(res.data.accountName);
        setTimeout(()=>{
          setTakingPic(false);
          setFlag(0);
          setAccountName("");
        }, 2000);
      },
      (error)=> {
        console.log(error);
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
        justifyContent: 'center',
        alignItems: 'center',
      },
      normal : {
        borderWidth : 10,
        borderColor : "transparent",
        flex: 5,
      },
      fail : {
        borderWidth : 10,
        borderColor : 'red',
        flex: 5,
      },
      certificated : {
        borderWidth : 10,
        borderColor : 'green',
        flex: 5,
      }
  });
  let camera =  
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
    />;
  let edge;
  let text;
  if(flag==0) {
    edge=<View style={styles.normal}>{camera}</View>;
    text = <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', backgroundColor:'black', alignItems:'center'}}></View>
  }else if(flag==1) {
    edge=<View style={styles.certificated}>{camera}</View>;
    text = 
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor:'black', alignItems:'center' }}>
        <Text style={{ fontSize: 30, color:'green'}}>{accountName}님</Text>
        <Text style={{ fontSize: 18, color:'white'}}>인증되었습니다.</Text>
      </View>;
  }else {
    edge=<View style={styles.fail}>{camera}</View>;
    text = 
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor:'black', alignItems:'center' }}>
        <Text style={{ fontSize: 16, color:'white'}}>얼굴인식 실패</Text>
        <Text style={{ fontSize: 32, color:'red'}}>호출</Text>
        <Text style={{ fontSize: 16, color:'white'}}>을 말씀해주세요.</Text>
      </View>;
  }

  return (
    <View style={styles.container}>
      {edge}
      {text}
    </View>
  );
}

export default Camera;