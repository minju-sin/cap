// src/components/Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    HomeBody,
    Header,
    Logo,
    Login,
    LoginSignUp,
    StyledLink2,
    Menu,
    MenuText,
    HeaderProImage,
    HeaderProText,
    HeaderProButtonImage,
    HeaderProBox,
    HeaderProButtonClick,
    HeaderProBoxSection,
    ProBox,
    Hr,
    StyledLink4,
    MyproImage,
    BoxLayout,
    Hr2,
    HomeLogoImage
} from "./HomeCss";
import proImage1 from "./images/main_pro.png";
import proButtonImage from "./images/main_pro_button.png";
import proButtonImageClick from "./images/pro_img_click.png";
import proImage from "./images/myPro_Image.png"
import logoutImage from "./images/logout_Image.png"
import StyledLoginBefore from "./style/Header/StyledLogInBefore";
import StyledHeaderHome from "./style/Header/StyledHeaderHome";
import StyledHeaderBefore from "./style/Header/StyledHeaderBefore";
import StyledStore from "./style/StyledStore";
import StyledFooter from "./style/StyledFooter";
import StyledArrow from "./style/StyledArrow";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [isBoxVisible, setBoxVisibility] = useState(true);

  const handleButtonClick = () => {
        setBoxVisibility(!isBoxVisible);
  };

  useEffect(() => {
    // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
      axios
          .get("/check-auth")
          .then((response) => {
              if (response.data === "authenticated") {
                  setIsAuthenticated(true);

                  // 사용자 ID를 가져와 상태에 저장
                  axios
                      .get("/get-user-id")
                      .then((response) => {
                          setUserId(response.data);
                      })
                      .catch((error) => {
                          // 에러 처리
                      });

                  // 사용자 ID를 가져와 상태에 저장
                  axios
                      .get("/get-user-name")
                      .then((response) => {
                          setUsername(response.data);
                      })
                      .catch((error) => {
                          // 에러 처리
                      });
              } else {
                  setIsAuthenticated(false);
              }
          })
          .catch((error) => {
              // 요청 실패 처리
          });
  }, []);

  // 로그아웃
  const handleLogout = () => {
    // 서버의 /logout 엔드포인트로 GET 요청을 보내 로그아웃을 수행
    axios
        .get("/logout")
        .then((response) => {
          // 로그아웃 성공 시 클라이언트 상태 초기화 및 원하는 작업 수행
          setIsAuthenticated(false);
          setUserId("");
        })
        .catch((error) => {
          // 오류 처리
          console.error("로그아웃 중 오류가 발생했습니다:", error);
        });
  };

    return (
        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <Header>
                        <HomeLogoImage>
                            {/*<LogoImage2 src={logoImage2} alt="프로필 아이콘 이미지"/>*/}
                            <Logo>MatNaMo</Logo>
                        </HomeLogoImage>
                        <LoginSignUp>
                            <Login>
                                <HeaderProImage src={proImage1} alt="프로필 아이콘 이미지"/>
                            </Login>
                            <Login>

                                <HeaderProButtonImage src={proButtonImage} alt="프로필 버튼 이미지"  onClick={handleButtonClick}/>
                                <HeaderProBox isVisible={isBoxVisible}>
                                    <HeaderProButtonClick src={proButtonImageClick} alt="프로필 클릭시 이미지"/>
                                    <HeaderProBoxSection>
                                        <ProBox>
                                            <HeaderProImage src={proImage1} alt="프로필 아이콘 이미지"/>
                                            <HeaderProText>{username}<br/>{userId}</HeaderProText>
                                        </ProBox>
                                        <Hr/>
                                        <BoxLayout>
                                            <MyproImage src={proImage} alt="내 정보 이미지"/>
                                            {userId === "admin" ? (
                                                // 관리자 메인 화면 페이지
                                                <StyledLink4 to="/management">사용자 관리</StyledLink4>
                                            ) : (
                                                // 사용자 메인 화면 페이지
                                                <StyledLink4 to="/profile">내 정보</StyledLink4>
                                            )}
                                        </BoxLayout>
                                        <Hr2/>
                                        <BoxLayout>
                                            <MyproImage src={logoutImage} alt="로그아웃 이미지"/>
                                            <StyledLink4 to="/" onClick={handleLogout}>
                                                로그아웃
                                            </StyledLink4>
                                        </BoxLayout>
                                    </HeaderProBoxSection>
                                </HeaderProBox>
                            </Login>
                        </LoginSignUp>
                    </Header>

                    <StyledHeaderHome/>

                    <Menu>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                        <StyledLink2 to="/board">게시판</StyledLink2>
                        <MenuText>|</MenuText>
                        <StyledLink2 to="/notice">공지사항 </StyledLink2>
                        <MenuText>|</MenuText>
                        {userId === "admin" ? (
                            // 관리자 메인 화면 페이지
                            <StyledLink2 to="/management">사용자 관리</StyledLink2>
                        ) : (
                            // 사용자 메인 화면 페이지
                            <StyledLink2 to="/profile">내 정보</StyledLink2>
                        )}
                    </Menu>

                    <StyledStore/>
                    <StyledArrow/>
                    <StyledFooter/>

                </HomeBody>


            ) : (
                <HomeBody>
                    <StyledLoginBefore/>
                    <StyledHeaderHome/>
                    <StyledHeaderBefore/>
                    <StyledStore/>
                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );
}

export default Home;