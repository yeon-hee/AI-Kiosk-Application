<template>
    <div>
        <h-nav></h-nav>
        <section id="hero" class="clearfix" style="background-color:white;">
            <div class="container d-flex h-100">
            <div class="row justify-content-center align-self-center" data-aos="fade-up">
                <div class="col-md-6 intro-info order-md-first order-last" data-aos="zoom-in" data-aos-delay="100">
                <h2>AI Solutions<br>for Your <span>Business!</span></h2>
                <div>
                    <button @click="login" href="#services" class="btn-get-started scrollto">Get Started</button>
                </div>
                </div>

                <div class="col-md-6 intro-images order-md-last order-first" data-aos="zoom-out" data-aos-delay="200">
                <img src="../../public/images/intro-img.svg" alt="" class="images-fluid">
                </div>
            </div>

            </div>
        </section><!-- End Hero -->
        <section id="services" class="services section-bg">
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                <h3>Services</h3>
                <p>인공지능 기술을 활용한 출입통제 키오스크 어플리케이션</p>
                </header>

                <div class="row">

                <div class="col-md-6 col-lg-4 wow bounceInUp" data-aos="zoom-in" data-aos-delay="100">
                    <div class="box">
                    <div class="icon" style="background: #fceef3;"><i class="ion-ios-analytics-outline" style="color: #ff689b;"></i></div>
                    <h4 class="title"><a href="" style="pointer-events: none; ">얼굴 인식</a></h4>
                    <p class="description" style="text-align: center;">기존 지문 등록이 가지는 단점을 보완하여 안면 인식을 통해 출입 통제</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="200">
                    <div class="box">
                    <div class="icon" style="background: #fff0da;"><i class="ion-ios-bookmarks-outline" style="color: #e98e06;"></i></div>
                    <h4 class="title"><a href="" style="pointer-events: none;">음성 인식</a></h4>
                    <p class="description" style="text-align: center;">방문객일 경우, 음성 인식을 통해 호출할 관계자를 말하면 해당 관계자에게 호출 메세지 전송</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="300">
                    <div class="box">
                    <div class="icon" style="background: #e6fdfc;"><i class="ion-ios-paper-outline" style="color: #3fcdc7;"></i></div>
                    <h4 class="title"><a href="" style="pointer-events: none;">출입 로그</a></h4>
                    <p class="description" style="text-align: center;">출입 기록을 로그로 관리하여 권한에 따라 등록된 지점의 로그 조회</p>
                    </div>
                </div>
            </div>

            </div>
        </section><!-- End Services Section -->
          <section id="features" class="features" >
            <div class="container" data-aos="fade-up">

                <div class="row feature-item">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <img src="../../public/images/Face-recognition-1.jpg" class="images-fluid" alt="">
                </div>
                <div class="col-lg-6 wow fadeInUp pt-5 pt-lg-0" data-aos="fade-left" data-aos-delay="150">
                    <h4 style="margin-top:100px;">얼굴 인식을 통해 건물 및 사무실 출입</h4>
                    <p>
                    Ipsum in aspernatur ut possimus sint. Quia omnis est occaecati possimus ea. Quas molestiae perspiciatis occaecati qui rerum. Deleniti quod porro sed quisquam saepe. Numquam mollitia recusandae non ad at et a.
                    </p>
                    <p>
                    Ad vitae recusandae odit possimus. Quaerat cum ipsum corrupti. Odit qui asperiores ea corporis deserunt veritatis quidem expedita perferendis. Qui rerum eligendi ex doloribus quia sit. Porro rerum eum eum.
                    </p>
                </div>
                </div>

                <div class="row feature-item mt-5 pt-5">
                <div class="col-lg-6 wow fadeInUp order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                    <img src="../../public/images/voice.jpg" class="images-fluid" alt="">
                </div>

                <div class="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-right" data-aos-delay="150">
                    <h4 style="margin-top:80px;">음성 인식을 통해 관계자 호출</h4>
                    <p>
                    Delectus alias ut incidunt delectus nam placeat in consequatur. Sed cupiditate quia ea quis. Voluptas nemo qui aut distinctio. Cumque fugit earum est quam officiis numquam. Ducimus corporis autem at blanditiis beatae incidunt sunt.
                    </p>
                    <p>
                    Voluptas saepe natus quidem blanditiis. Non sunt impedit voluptas mollitia beatae. Qui esse molestias. Laudantium libero nisi vitae debitis. Dolorem cupiditate est perferendis iusto.
                    </p>
                    <p>
                    Eum quia in. Magni quas ipsum a. Quis ex voluptatem inventore sint quia modi. Numquam est aut fuga mollitia exercitationem nam accusantium provident quia.
                    </p>
                </div>

                </div>

            </div>
        </section><!-- End Features Section -->
          <!-- ======= Team Section ======= -->
            <section id="team" class="team section-bg">
            <div class="container" data-aos="fade-up">
                <div class="section-header">
                <h3>Team</h3>
                <p>성장하기 위해 끊임없이 노력하는 개발팀 띠로링입니다. 협업을 통해 서로를 발전시킬 수 있는 팀이 되는것이 목표입니다.</p>
                </div>

                <div class="row">
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
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

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
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

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
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
                Designed by <a href="https://bootstrapmade.com/">tiroring</a>
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

#link-to-admin{
    color:rgb(83,71,122);
}

#link-to-entrance, #link-to-home, #link-to-board{
    color: white;

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