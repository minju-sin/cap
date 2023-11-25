// src/components/user/board/Board.js
/*
* 게시판 페이지
* 작성된 게시글을 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/

import React from 'react';
import {
    HomeBody
} from "../../HomeCss";

import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLoginBefore from "../../style/Header/StyledLogInBefore";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledMainPage from "../../style/StyledMainPage";
import StyledBoard from "../../style/Board/StyledBoard";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledAi from "../../style/Header/StyledAi";
import StyledArrow from "../../style/StyledArrow";

function Board() {
    const {isAuthenticated } = useAuthStatus();

    return (
        <div>{isAuthenticated ? (
            <HomeBody>
                <StyledLoginAfter/>
                <StyledHeaderHome/>
                <StyledHeaderAfter/>
                <StyledAi/>

                <StyledBoard/>

                <StyledMainPage/>
                <StyledArrow/>
                <StyledFooter/>
            </HomeBody>
        ) : (
            <HomeBody>
                <StyledLoginBefore/>
                <StyledHeaderHome/>
                <StyledHeaderBefore/>
                <StyledAi/>

                <StyledBoard/>

                <StyledMainPage/>
                <StyledArrow/>
                <StyledFooter/>
            </HomeBody>
        )}
        </div>
    );
}

export default Board;