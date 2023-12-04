import {
    ContentsText1,
    ContentsText2,
   RecommendFoodImage
} from "../../HomeCss";
import React from "react";
import machine_learning_food from "../../images/recommend_food.jpg";

const StyledAi = ({ }) => {
    return (
        <>
            <ContentsText1>M A T N A M O</ContentsText1>
            <ContentsText2>
                " 오늘  &nbsp;
                <RecommendFoodImage src={machine_learning_food} alt="인공지능 추천 음식 이미지" />
                &nbsp;{" "}어때? "
            </ContentsText2>
        </>
    );
};

export default StyledAi;
