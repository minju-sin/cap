import {
    Contents,
    ContentsBox,
    ContentsImage,
    ContentsText1,
    ContentsText2,
    ContentsText3
} from "../../HomeCss";
import React from "react";
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
                <ContentsBox>
                    <ContentsImage src={machine_learning_food} alt="인공지능 추천 음식 이미지" />
                </ContentsBox>
            </Contents>
        </>
    );
};

export default StyledAi;
