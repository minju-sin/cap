import {
    Contents,
    ContentsBox,
    ContentsImage, ContentsText1, ContentsText2, ContentsText3,
    ContentsText4, Menu, MenuText, StyledLink2,
    StyledLink3
} from "../HomeCss";
import menuImage1 from "../images/ChickenPicture.jpg";
import menuImage4 from "../images/PizzaPicture.jpg";
import menuImage3 from "../images/Late-night snack picture.jpg";
import menuImage6 from "../images/ChinesePicture.jpg";
import menuImage2 from "../images/KoreanPicture.png";
import menuImage5 from "../images/SolarEclipsePicture.jpg";
import React from "react";

const StyledStore = ({ }) => {
    return (
        <>
            <ContentsText1>M A T N A M O &nbsp;&nbsp;M E N U</ContentsText1>
            <ContentsText2>
                " 오늘은 &nbsp;<ContentsText3>어떤 음식</ContentsText3>을&nbsp;
                누구와 함께? "
            </ContentsText2>

            <Contents>
                <ContentsBox>
                    <ContentsImage src={menuImage1} alt="치킨 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/CHICKEN">치킨</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage4} alt="피자 음식 이미지" />
                    <ContentsText4> <StyledLink3 to="/store/category/PIZZA">피자</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage3} alt="야식 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/NIGHT">야식</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage6} alt="중식 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/CHINESE">중식</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage2} alt="한식 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/KOREAN">한식</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage5} alt="일식 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/JAPANESE">일식</StyledLink3></ContentsText4>
                </ContentsBox>
            </Contents>
        </>
    );
};

export default StyledStore;