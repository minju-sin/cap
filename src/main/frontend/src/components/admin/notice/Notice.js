// src/components/admin/notice/Notice.js

/*
* 공지사항 페이지
* 작성된 공지사항 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후 관리자만  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/


import React, { } from 'react';
import {
    HomeBody,
    ContentsText1,
    ContentsText2,
    ContentsText3,
    ContentsText4,
    Contents,
    ContentsBox,
    ContentsImage,
    StyledLink3, HeaderImage, HeaderText1, HeaderBackgroundColor, HeaderText2, HeaderText3, HeaderText4, HeaderText5
} from "../../HomeCss";
import menuImage1 from "../../images/ChickenPicture.jpg";
import menuImage4 from "../../images/PizzaPicture.jpg";
import menuImage3 from "../../images/Late-night snack picture.jpg";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLogInBefore from "../../style/Header/StyledLogInBefore";
import StyledMainPage from "../../style/StyledMainPage";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledNotice from "../../style/Notice/StyledNotice";

function Notice() {
    const {isAuthenticated } = useAuthStatus();

    return (
        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>
                    <StyledHeaderHome/>


                    <StyledHeaderAfter/>

                    <ContentsText1>M A T N A M O</ContentsText1>
                    <ContentsText2>
                        " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                        먹으러 가볼까? "
                    </ContentsText2>
                    <Contents>
                        <ContentsBox>
                            <ContentsImage src={menuImage1} alt="메뉴 음식 이미지" />
                            <ContentsText4><StyledLink3 to="/store/category/CHICKEN">치킨</StyledLink3></ContentsText4>
                        </ContentsBox>
                        <ContentsBox>
                            <ContentsImage src={menuImage4} alt="메뉴 음식 이미지" />
                            <ContentsText4> <StyledLink3 to="/store/category/PIZZA">피자</StyledLink3></ContentsText4>
                        </ContentsBox>
                        <ContentsBox>
                            <ContentsImage src={menuImage3} alt="메뉴 음식 이미지" />
                            <ContentsText4><StyledLink3 to="/store/category/NIGHT">야식</StyledLink3></ContentsText4>
                        </ContentsBox>
                    </Contents>

                    <StyledNotice/>

                    <StyledMainPage/>
                    <StyledFooter/>
                </HomeBody>
            ) : (
                <HomeBody>
                    <StyledLogInBefore/>
                    <StyledHeaderHome/>

                    <StyledHeaderBefore/>



                    <StyledNotice/>
                    <StyledMainPage/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );

}

export default Notice;