// src/components/user/board/Board.js
/*
* 게시판 페이지
* 작성된 게시글을 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/

import React from 'react';
import {
    HomeBody,
    HeaderImage,
    HeaderText1,
    HeaderText2,
    HeaderBackgroundColor,
    HeaderText3,
    HeaderText4,
    HeaderText5,
    ContentsText1,
    ContentsText2,
    ContentsText3,
    ContentsText4,
    Contents,
    ContentsBox,
    ContentsImage,
    StyledLink3,
} from "../../HomeCss";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import menuImage2 from "../../images/KoreanPicture.png";
import menuImage5 from "../../images/SolarEclipsePicture.jpg";
import menuImage6 from "../../images/ChinesePicture.jpg";
import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLoginBefore from "../../style/Header/StyledLogInBefore";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledMainPage from "../../style/StyledMainPage";
import StyledBoard from "../../style/Board/StyledBoard";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";

function Board() {
    const {isAuthenticated } = useAuthStatus();

    return (
        <div>{isAuthenticated ? (
            <HomeBody>
                <StyledLoginAfter/>

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

                <StyledHeaderAfter/>

                <ContentsText1>M A T N A M O</ContentsText1>
                <ContentsText2>
                    " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                    먹으러 가볼까? "
                </ContentsText2>
                <Contents>
                    <ContentsBox>
                        <ContentsImage src={menuImage6} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/CHINESE">중식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage2} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/KOREAN">한식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage5} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/JAPANESE">일식</StyledLink3></ContentsText4>
                    </ContentsBox>
                </Contents>

                <StyledBoard/>

                <StyledMainPage/>

                <StyledFooter/>
            </HomeBody>
        ) : (
            <HomeBody>
                <StyledLoginBefore/>
                <StyledHeaderHome/>

                <StyledHeaderBefore/>

                <ContentsText1>M A T N A M O</ContentsText1>
                <ContentsText2>
                    " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                    먹으러 가볼까? "
                </ContentsText2>

                <Contents>
                    <ContentsBox>
                        <ContentsImage src={menuImage6} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/CHINESE">중식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage2} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/KOREAN">한식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage5} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/JAPANESE">일식</StyledLink3></ContentsText4>
                    </ContentsBox>
                </Contents>

                <StyledBoard/>

                <StyledMainPage/>

                <StyledFooter/>
            </HomeBody>
        )}
        </div>
    );
}

export default Board;