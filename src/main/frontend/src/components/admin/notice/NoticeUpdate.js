// src/components/admin/notice/NoticeUpdate.js
/* 공지사항 수정 페이지*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    HomeBody,
    Header,
    Logo,
    Login,
    LoginSignUp,
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
} from "../../HomeCss";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png";
import logoutImage from "../../images/logout_Image.png";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import {
    AddressMainOption, BodyWrapper, Box_1, Button_1, Button_2,
    Content_Input_1, Content_Input_2, Content_Input_3, Content_Textarea_1,
    ErrorText,
    ErrorText_Wrapper,
    FontOptionOne,
    HeaderFont, ImgFont, Input_1, LabelOption, Picture_Content_Wrapper,
    Section_Content_Wrapper
} from "./NoticeDetailCss";
import Swal from "sweetalert2";
import StyledFooter from "../../style/StyledFooter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledArrow from "../../style/StyledArrow";
import StyledNoticeUpdate from "../../style/Notice/StyledNoticeUpdate";

function NoticeUpdate() {
    
    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <BodyWrapper>
                <StyledNoticeUpdate/>
            </BodyWrapper>

            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>
    );
}

export default NoticeUpdate;
