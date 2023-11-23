import React from "react";
import {
    Menu, MenuText,
    StyledLink2
} from "../../HomeCss";

const StyledHeaderBefore = ({ }) => {
    return (
        <>
            <Menu>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                <StyledLink2 to="/board">게시판</StyledLink2>
                <MenuText>|</MenuText>
                <StyledLink2 to="/notice">공지사항 </StyledLink2>
                <MenuText>|</MenuText>
                <StyledLink2 to="/notice">내 정보</StyledLink2>
            </Menu>

        </>
    );
};

export default StyledHeaderBefore;