import {
    Contents,
    ContentsBox, ContentsBoxLink,
    ContentsImage,
    ContentsText1,
    ContentsText2,
    ContentsText3,
    ContentsText4,
    StyledLink3
} from "../../HomeCss";
import React from "react";
import menuImage1 from "../../images/ChickenPicture.jpg";
import menuImage4 from "../../images/PizzaPicture.jpg";
import menuImage3 from "../../images/Late-night snack picture.jpg";
import machine_learning_food from "../../images/recommend_food.jpg";

const StyledAi = ({ }) => {
    return (
        <>
            <ContentsText1>M A T N A M O</ContentsText1>
            <ContentsText2>
                " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                먹으러 가볼까? "
            </ContentsText2>
            <Contents>
                <ContentsBoxLink to="/store/category/CHICKEN">
                    <ContentsBox>
                        <ContentsImage src={menuImage1} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/CHICKEN">치킨</StyledLink3></ContentsText4>
                    </ContentsBox>
                </ContentsBoxLink>
                <ContentsBoxLink>
                <ContentsBox>
                    <ContentsImage src={machine_learning_food} alt="인공지능 추천 음식 이미지" />
                    <ContentsText4>AI 추천 음식</ContentsText4>
                </ContentsBox>
                </ContentsBoxLink>
                <ContentsBoxLink to="/store/category/NIGHT">
                <ContentsBox>
                    <ContentsImage src={menuImage3} alt="메뉴 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/NIGHT">야식</StyledLink3></ContentsText4>
                </ContentsBox>
                </ContentsBoxLink>
            </Contents>
        </>
    );
};

export default StyledAi;
