<template>
    <div>
        <h-nav></h-nav>
        <section id="hero" class="clearfix" style="background-color:white;">
            <div class="container d-flex h-100">
            <div class="row justify-content-center align-self-center" data-aos="fade-up">
                <div class="col-md-6 intro-info order-md-first order-last" data-aos="zoom-in" data-aos-delay="100">
                <h2>WHO <span>A</span>M <span>I</span></h2>
                <h3>AI기반 비접촉 출입관리 솔루션</h3>
                <div>
                    <button @click="login" v-if="!$store.state.isSigned" class="btn-get-started scrollto">둘러보기</button>
                </div>
                </div>

                <div class="col-md-6 intro-images order-md-last order-first" style="text-align:center" data-aos="zoom-out" data-aos-delay="200">
                <img style="height:500px" src="../../public/images/mobile_pages.gif" alt="">
                </div>
            </div>

            </div>
        </section><!-- End Hero -->
        <section id="services" class="services section-bg">
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                <h3>Services</h3>
                <hr>
                <p></p>
                </header>

                <div class="row">

                <div class="col-md-6 col-lg-3 wow bounceInUp" data-aos="zoom-in" data-aos-delay="100">
                    <div class="box">
                    <div class="icon"><img src="../../public/images/d1.png" alt=""></div>
                    <h4 class="title"><a href="" style="pointer-events: none; ">비접촉 인터페이스</a></h4>
                    <p class="description" style="text-align: center;">교차감염으로부터의 안전성 제고</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
                    <div class="box">
                    <div class="icon"><img src="../../public/images/d2.png" alt=""></div>
                    <h4 class="title"><a href="" style="pointer-events: none;">모바일 키오스크</a></h4>
                    <p class="description" style="text-align: center;">간편하고 합리적인 솔루션</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
                    <div class="box">
                    <div class="icon"><img src="../../public/images/d3.png" alt=""></div>
                    <h4 class="title"><a href="" style="pointer-events: none;">웹 UI</a></h4>
                    <p class="description" style="text-align: center;">어디서든 쉽게 기록 조회 및 관리</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
                    <div class="box">
                    <div class="icon"><img src="../../public/images/d4.png" alt=""></div>
                    <h4 class="title"><a href="" style="pointer-events: none;">알림 연동</a></h4>
                    <p class="description" style="text-align: center;">사내메신저와 원활한 연동</p>
                    </div>
                </div>
            </div>

            </div>
        </section><!-- End Services Section -->
        <section id="features" class="features" >
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                    <h3>Features</h3>
                    <hr>
                    <p></p>
                </header>

                <div class="row feature-item">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <img src="../../public/images/Face-recognition-1.jpg" class="images-fluid" alt="">
                </div>
                <div class="col-lg-6 wow fadeInUp pt-5 pt-lg-0" data-aos="fade-left" data-aos-delay="150">
                    <h4 style="margin-top:100px;">얼굴 인식 <span>Face Recognition</span></h4>
                    <p style="margin-top: 40px">
                    이미지를 512차원의 Vector로 변환한 후, 값을 대조하여 얼굴을 인증합니다.
                    </p>
                    <p>
                    신속하고 정확한 본인 인증을 통해 출입 기록을 남기고, 사무실에 출입할 수 있습니다.
                    </p>
                </div>
                </div>

                <div class="row feature-item mt-5 pt-5">
                <div class="col-lg-6 wow fadeInUp order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                    <img src="../../public/images/voice.jpg" class="images-fluid" alt="">
                </div>

                <div class="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-right" data-aos-delay="150">
                    <h4 style="margin-top:80px;">음성 인식 <span>Voice Recognition</span></h4>
                    <p style="margin-top: 40px">
                    목소리를 인지하여 별도의 터치스크린을 통한 조작 없이
                    </p>
                    <p>
                    간편하게 찾는 직원에게 호출 메세지를 전송합니다.
                    </p>
                </div>

                </div>

            </div>
        </section><!-- End Features Section -->
        <!-- ======= UCC Section ======= -->
        <section id="team" class="team section-bg">
            <div class="container" data-aos="fade-up">
                <div class="section-header">
                    <h3>How It Works</h3>
                    <hr id="how-it-works" class="how-it-works">
                    <p></p>
                </div>
                <div class="row">
                    <iframe style="margin:auto; height: 315px;" width="560" height="315" src="https://www.youtube.com/embed/vmDDOFXSgAs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </section><!-- End UCC Section -->
        <!-- ======= Team Section ======= -->
        <section id="team" class="team">
            <div class="container" data-aos="fade-up">
                <div class="section-header">
                <h3>About Us</h3>
                <hr>
                <h4 style="text-align:center">상호보완하며 시너지를 창출하는 개발팀 띠로링입니다.</h4>
                </div>

                <div class="row">
                <div class="col-lg-4 col-md-6 profile" data-aos="fade-up" data-aos-delay="100">
                    <div class="member">
                    <img src="../../public/images/team-1.jpg" class="images-fluid" alt="">
                    <div class="member-info">
                        <div class="member-info-content">
                        <h4>정명주</h4>
                        <span>팀장 및 음성 인식</span>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 profile" data-aos="fade-up" data-aos-delay="200">
                    <div class="member">
                    <img src="../../public/images/team-2.jpg" class="images-fluid" alt="">
                    <div class="member-info">
                        <div class="member-info-content">
                        <h4>최연희</h4>
                        <span>팀원 및 웹 풀스텍</span>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 profile" data-aos="fade-up" data-aos-delay="300">
                    <div class="member">
                    <img src="../../public/images/team-3.jpg" class="images-fluid" alt="">
                    <div class="member-info">
                        <div class="member-info-content">
                        <h4>김동현</h4>
                        <span>팀원 및 앱 얼굴 인식</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </section><!-- End Team Section -->
             <!-- ======= Footer ======= -->
        <footer id="footer" class="section-bg">
            <div class="container">
            <div class="copyright">
                &copy; Copyright <strong>WHO AM I</strong>. All Rights Reserved
            </div>
            <div class="credits">
                Designed by Tiroring
            </div>
            </div>
        </footer><!-- End  Footer -->
    </div>
</template>

<script>

import HNav from "../components/common/HNav";
import {login} from "../api/user.js";

export default {
    name: "app",
    data() {
        return {
            user: {
                email: "a508whoami@gmail.com",
                password: "admin"
            }
            
        };
    },
    components: {
        HNav
    },
    mounted() {
        
    },
    methods: {
        login() { // admin 계정으로 로그인
            const scope = this;
            login(
                this.user.email,
                this.user.password,
                function(success){
                    console.log(success);
                    scope.$store.commit("setIsSigned", true);
                    scope.$store.commit("setUserEmail", success.data.email);
                    scope.$store.commit("setUserName", success.data.name);
                    if(success.data.authority==1){ // 관리자일 경우
                        scope.$store.commit("setIsAdmin", true);
                    }
                    location.reload(); // 창 닫기
                },
                function(fail){
                    alert("유저 이메일 혹은 비밀번호가 일치하지 않습니다.");
                },
            )
        }
        

    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

div {
    color: #707070;
}

.banner{
    height:500px;
    background: linear-gradient( to right, rgb(236,222,227), rgb(204,234,238) );
}
#service{
    font-family: 'Archivo Black', sans-serif;
    font-size:38px;
    padding-top: 200px;
}

</style>