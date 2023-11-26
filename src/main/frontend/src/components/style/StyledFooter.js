import React from 'react';
import {
    Footer1,
    FooterText,
    FooterText2,
    FooterImages,
    FooterImage,
    Hr2,
    Footer} from '../HomeCss';
import facebookImage from "../images/facebookImage.png";
import instagramImage from "../images/Instagram.png";
import youtubeImage from "../images/Youtube.png";

const StyledFooter = ({ }) => {
    return (
        <>
            <Footer>
                <Footer1>
                    <FooterText>MatNaMo</FooterText>
                    <FooterText2>이성민(팀장) : 프로젝트 기획, 웹 퍼블리셔, 프론트엔드</FooterText2>
                    <FooterText2>우가현(팀원) : 웹 퍼블리셔</FooterText2>
                    <FooterText2>신민주(팀원) : 프로젝트 총괄, 풀스택, DB</FooterText2>
                    <FooterText2>이지훈(팀원) : 웹 크롤링, 머신러닝</FooterText2>

                    <FooterImages>
                        <FooterImage src={facebookImage} alt="페이스북 이미지"></FooterImage>
                        <FooterImage src={instagramImage} alt="인스타그램 이미지"></FooterImage>
                        <FooterImage src={youtubeImage} alt ="유튜브 이미지"></FooterImage>
                    </FooterImages>
                    <Hr2></Hr2>
                    <FooterText2>@2023 Capstone Project MatNaMo</FooterText2>
                </Footer1>
            </Footer>
        </>
    );
};

export default StyledFooter;
