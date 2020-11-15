# [WHO AM I]((https://k3a508.p.ssafy.io))
ai기반 비접촉 출입관리 솔루션

&nbsp;
&nbsp;
&nbsp;

## 서비스 소개

### 모바일 키오스크 어플리케이션

<img src="./docs/resources/mobile_pages.gif" width="200" style="padding:30px;">

### 웹 페이지
<img src="./docs/resources/web_pages.gif" style="padding:30px; display:block; margin:auto;">

### 서비스 시연
<iframe style="margin:auto; height: 315px; padding: 30px;" width="560" height="315" src="https://www.youtube.com/embed/vmDDOFXSgAs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> 시연영상 첨부예정

&nbsp;
&nbsp;
&nbsp;

## 핵심기능
### 1) 100% 비접촉 인터페이스
얼굴인식 및 인증, 그리고 음성인식 이라는 AI기술을 활용하여 기존 키오스크 대비 교차감염으로부터의 안전성을 제고하였습니다.

### 2) 모바일 어플리케이션
모바일 기기를 출입관리 키오스크로 활용함으로써 솔루션 도입에 따른 경제적 부담을 감소하였습니다.

### 3) 편리한 웹 UI
언제, 어디서든 간편하게 웹 환경을 통한 출입기록 조회, 지점 & 직원 관리가 가능합니다.

### 4) 사내메신저 알림 연동
slack, mattermost 등 기존에 널리 활용되는 사내 메신저와의 원활한 알림연동을 지원합니다.

&nbsp;
&nbsp;
&nbsp;

## 서비스 아키텍처
### 1) 인공지능 AI
#### 안면인식 Face Recognition
이미지를 512차원의 Vector로 변환한 후, 값을 대조하여 얼굴을 인증합니다.

신속하고 정확한 본인 인증을 통해 출입 기록을 남기고, 사무실에 출입할 수 있습니다. 

#### 음성인식 Voice Recognition

목소리를 인지하여 별도의 터치스크린을 통한 조작 없이 간편하게 찾는 직원에게 호출 메세지를 전송합니다. 

### 2) 서비스 구조도
<img src="./docs/resources/service_architecture.png" style="padding:30px; display:block; margin:auto;">

&nbsp;
&nbsp;
&nbsp;

## 팀 소개
### Team 띠로링
- ㅈㅁㅈ: 팀장 및 음성인식
- ㅊㅇㅎ: 팀원 및 웹 풀스택
- ㄱㄷㅎ: 팀원 및 얼굴인식