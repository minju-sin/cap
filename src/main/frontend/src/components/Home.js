// src/components/Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  HomeBody,
  Header,
  Logo,
  Login,
  SignUp,
  LoginSignUp,
  StyledLink1,
  StyledLink2,
  HeaderImage,
  HeaderText1,
  HeaderText2,
  HeaderBackgroundColor,
  HeaderText3,
  HeaderText4,
  HeaderText5,
  Menu,
  MenuText,
  ContentsText1,
  ContentsText2,
  ContentsText3,
  ContentsText4,
  Contents,
  ContentsBox,
  ContentsImage,
  ContentsText5,
} from "./HomeCss";
import exampleImage from "./images/HomeHeaderImage.jpg";
import menuImage1 from "./images/ChickenPicture.jpg";
import menuImage2 from "./images/KoreanPicture.png";
import menuImage3 from "./images/Late-night snack picture.jpg";
import menuImage4 from "./images/PizzaPicture.jpg";
import menuImage5 from "./images/SolarEclipsePicture.jpg";
import menuImage6 from "./images/ChinesePicture.jpg";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

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
        <div>
          <p>로그인 후 메인 화면</p>
          <p>{userId}님 환영합니다!</p>
          {userId === "admin" ? (
            // 관리자 메인 화면 페이지
            <Link to="/management">사용자 관리</Link>
          ) : (
            // 사용자 메인 화면 페이지
            <Link to="/profile">마이페이지</Link>
          )}
          <br />
          <Link to="/" onClick={handleLogout}>
            로그아웃
          </Link>
          <br />
          <Link to="/board">게시판</Link>
          <br />
          <Link to="/notice">공지사항</Link>
          <div>
            <h1>음식 카테고리</h1>
            <ul>
              <li>
                <Link to="/store/category/KOREAN">한식</Link>
              </li>
              <li>
                <Link to="/store/category/JAPANESE">일식</Link>
              </li>
              <li>
                <Link to="/store/category/CHINESE">중식</Link>
              </li>
              <li>
                <Link to="/store/category/NIGHT">야식</Link>
              </li>
              <li>
                <Link to="/store/category/CHICKEN">치킨</Link>
              </li>
              <li>
                <Link to="/store/category/PIZZA">피자</Link>
              </li>
            </ul>
          </div>

        </div>


      ) : (
        <HomeBody>
          <Header>
            <Logo>MatNaMo</Logo>
            <LoginSignUp>
              <Login>
                <StyledLink1 to="/login">로그인</StyledLink1>
              </Login>
              <SignUp>
                <StyledLink1 to="/signup">회원가입</StyledLink1>
              </SignUp>
            </LoginSignUp>
          </Header>

          <HeaderImage src={exampleImage} alt="헤더 배경 이미지" />

          <HeaderText1>
            <HeaderBackgroundColor></HeaderBackgroundColor>
            <HeaderText2>" MatNaMo "</HeaderText2>
            <HeaderText3>
              <HeaderText4>
                <HeaderText5>맛나모( MatNaMo )</HeaderText5>는 "맛있는
                나눔(Mate)"을 의미하며,
              </HeaderText4>
              <HeaderText4>
                학생들 간의 음식 나눔을 촉진하는 메시지를 전달합니다.
              </HeaderText4>
              <HeaderText4>
                이 플랫폼은 음식 공동 주문을 통해{" "}
                <HeaderText5>배달비와 주문최소금액</HeaderText5>을 절감 할 수
                있습니다.
              </HeaderText4>
            </HeaderText3>
          </HeaderText1>
          <Menu>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <StyledLink2 to="/board">게시판</StyledLink2>
            <MenuText>l</MenuText>
            <StyledLink2 to="/notice">공지사항 </StyledLink2>
            <MenuText>l</MenuText>
            <StyledLink2 to="/notice">내 정보</StyledLink2>
          </Menu>
          <ContentsText1>M A T N A M O &nbsp;&nbsp;M E N U</ContentsText1>
          <ContentsText2>
            " 오늘은 &nbsp;<ContentsText3>어떤 음식을&nbsp;</ContentsText3>{" "}
            누구와 함께? "
          </ContentsText2>
          <Contents>
            <ContentsBox>
              <ContentsImage src={menuImage1} alt="메뉴 음식 이미지" />
              <ContentsText4><Link to="/store/category/CHICKEN">치킨</Link></ContentsText4>
            </ContentsBox>
            <ContentsBox>
              <ContentsImage src={menuImage4} alt="메뉴 음식 이미지" />
              <ContentsText4> <Link to="/store/category/PIZZA">피자</Link></ContentsText4>
            </ContentsBox>
            <ContentsBox>
              <ContentsImage src={menuImage3} alt="메뉴 음식 이미지" />
              <ContentsText4><Link to="/store/category/NIGHT">야식</Link></ContentsText4>
            </ContentsBox>
            <ContentsBox>
              <ContentsImage src={menuImage6} alt="메뉴 음식 이미지" />
              <ContentsText4><Link to="/store/category/CHINESE">중식</Link></ContentsText4>
            </ContentsBox>
            <ContentsBox>
              <ContentsImage src={menuImage2} alt="메뉴 음식 이미지" />
              <ContentsText4><Link to="/store/category/KOREAN">한식</Link></ContentsText4>
            </ContentsBox>
            <ContentsBox>
              <ContentsImage src={menuImage5} alt="메뉴 음식 이미지" />
              <ContentsText4><Link to="/store/category/JAPANESE">일식</Link></ContentsText4>
            </ContentsBox>
          </Contents>
        </HomeBody>
      )}
    </div>
  );
}

export default Home;
