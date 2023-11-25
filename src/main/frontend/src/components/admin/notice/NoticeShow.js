// src/components/admin/notice/NoticeShow.js
/* 공지사항 상세 페이지
* 관리자만 수정, 삭제 버튼 생성됨
*/

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

import {
    HomeBody,
    Header,
    Logo,
    Login,
    SignUp,
    LoginSignUp,
    StyledLink1,
    StyledLink2,
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
    HomeLogoImage,
    HeaderImage,
    HeaderText1,
    HeaderBackgroundColor,
    HeaderText2,
    HeaderText3,
    HeaderText4, HeaderText5
} from "../../HomeCss";
import {
    AddressMainOption,
    BodyWrapper,
    BodyWrapper2,
    Box_1,
    Button_1,
    Button_2,
    Content_Input_1,
    Content_Input_2,
    Content_Input_3,
    Content_Textarea_1,
    ErrorText,
    ErrorText_Wrapper,
    FontOptionOne,
    HeaderFont,
    ImgFont,
    Input_1,
    LabelOption,
    NoticeShowButtonType,
    NoticeShowButtonType2, NoticeShowButtonType3,
    NoticeShowHeaderType,
    NoticeShowSectionType,
    NoticeShowType,
    Picture_Content_Wrapper,
    Section_Content_Wrapper,
} from "./NoticeDetailCss";

import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png"
import logoutImage from "../../images/logout_Image.png"
import {TableFontType2, TableFontType4, TableImage1, Tdtype1, Tdtype3, Tdtype4} from "./NoticeCss";
import ProImage2 from "../../images/MyPageImage.png";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLogInBefore from "../../style/Header/StyledLogInBefore";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledNoticeShow from "../../style/Notice/StyledNoticeShow";

function NoticeShow() {
    const {isAuthenticated } = useAuthStatus();


    return (

        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>


                    <StyledHeaderHome/>

                    <StyledHeaderAfter/>

<StyledNoticeShow/>

                    <StyledFooter/>

                </HomeBody>


            ) : (
                <HomeBody>
                    <StyledLogInBefore/>

                    <StyledHeaderHome/>

                    <StyledHeaderBefore/>

                    <StyledNoticeShow/>

                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );
}

export default NoticeShow;


