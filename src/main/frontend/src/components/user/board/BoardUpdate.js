// src/components/user/board/BoardUpdate.js
/*
* 게시글 수정 페이지
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
import StyledBoardUpdate from "../../style/Board/StyledBoardUpdate";

function BoardUpdate() {


    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <StyledBoardUpdate/>

            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>
    );
}

export default BoardUpdate;
