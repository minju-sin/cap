// src/components/user/board/BoardShow.js
/*
* 게시글 상세 페이지
* 작성자 본인만 수정, 삭제 가능하도록 구현함
*/

import React from 'react';
import {
    HomeBody
} from "../../HomeCss";
import StyledFooter from "../../style/StyledFooter";
import StyledLogInBefore from "../../style/Header/StyledLogInBefore";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledArrow from "../../style/StyledArrow";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledBoardShow from "../../style/Board/StyledBoardShow";

function BoardShow() {
    const {isAuthenticated } = useAuthStatus();


    return (
        <div>{isAuthenticated ? (
            <HomeBody>
                <StyledLoginAfter/>
                <StyledHeaderHome/>
                <StyledHeaderAfter/>

                <StyledBoardShow/>

                <StyledArrow/>
                <StyledFooter/>
            </HomeBody>
        ) : (
            <HomeBody>
                <StyledLogInBefore/>
                <StyledHeaderHome/>
                <StyledHeaderBefore/>

                <StyledBoardShow/>

                <StyledArrow/>
                <StyledFooter/>
            </HomeBody>
        )}
        </div>


    );

}

export default BoardShow;
