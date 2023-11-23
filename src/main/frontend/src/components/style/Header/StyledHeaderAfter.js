import React from "react";
import {
    Menu, MenuText,
    StyledLink2
} from "../../HomeCss";

import useAuthStatus from "../Backend/useAuthStatus";

const StyledHeaderAfter = ({ }) => {
    const {  userId } = useAuthStatus();

    return (
        <>
            <Menu>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                <StyledLink2 to="/board">게시판</StyledLink2>
                <MenuText>|</MenuText>
                <StyledLink2 to="/notice">공지사항 </StyledLink2>
                <MenuText>|</MenuText>
                {userId === "admin" ? (
                    // 관리자 메인 화면 페이지
                    <StyledLink2 to="/management">사용자 관리</StyledLink2>
                ) : (
                    // 사용자 메인 화면 페이지
                    <StyledLink2 to="/profile">내 정보</StyledLink2>
                )}
            </Menu>

        </>
    );
};

export default StyledHeaderAfter;