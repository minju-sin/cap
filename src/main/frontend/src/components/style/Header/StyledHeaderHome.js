import React from "react";
import {
    HeaderBackgroundColor,
    HeaderImage,
    HeaderText1,
    HeaderText2,
    HeaderText3,
    HeaderText4,
    HeaderText5, Menu, MenuText, StyledLink2
} from "../../HomeCss";
import exampleImage from "../../images/HomeHeaderImage.jpg";

const StyledHeaderHome = ({ }) => {
    return (
        <>
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

        </>
    );
};

export default StyledHeaderHome;
