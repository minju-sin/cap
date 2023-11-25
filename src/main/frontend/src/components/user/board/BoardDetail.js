//  src/components/user/board/BoardDetail.js
/*
* 게시글 작성 페이지
*/

import React from 'react';
import {
    HomeBody
} from "../../HomeCss";

import StyledFooter from "../../style/StyledFooter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledArrow from "../../style/StyledArrow";
import StyledBoardDetail from "../../style/Board/StyledBoardDetail";


function BoardDetail() {

    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <StyledBoardDetail/>

            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>
    );
}

export default BoardDetail;
