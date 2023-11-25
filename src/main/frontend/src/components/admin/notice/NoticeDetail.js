//  src/components/admin/notice/NoticeDetail.js
/*  공지사항 작성 페이지 */

import React, {useState} from 'react';
import axios from 'axios';
import {
    HomeBody
} from "../../HomeCss";
import {
    BodyWrapper,
    Button_2
} from "./NoticeDetailCss";
import Swal from "sweetalert2";
import StyledFooter from "../../style/StyledFooter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledArrow from "../../style/StyledArrow";
import StyledNoticeDetail from "../../style/Notice/StyledNoticeDetail";

function NoticeDetail() {

    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <BodyWrapper>
                <StyledNoticeDetail/>
            </BodyWrapper>

            <StyledArrow/>
            <StyledFooter/>

        </HomeBody>
    );
}

export default NoticeDetail;
