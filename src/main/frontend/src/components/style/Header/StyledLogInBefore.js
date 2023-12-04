// 로그인 전 상단 헤더

import React from "react";
import {
    ContentsBoxLink,
    Header, HomeLogoImage,
    Login,
    LoginSignUp,
    Logo, LogoImage2,
    SignUp,
    StyledLink1
} from "../../HomeCss";
import logoImage2 from "../../images/LogoImage2.png";

const StyledLoginBefore = ({ }) => {
    return (
        <>
            <Header>
                <ContentsBoxLink to={"/"}>
                    <HomeLogoImage>
                        <LogoImage2 src={logoImage2} alt="로고 이미지"/>
                        <Logo>MatNaMo</Logo>
                    </HomeLogoImage>
                </ContentsBoxLink>
                <LoginSignUp>
                    <Login>
                        <StyledLink1 to="/login">로그인</StyledLink1>
                    </Login>
                    <SignUp>
                        <StyledLink1 to="/signup">회원가입</StyledLink1>
                    </SignUp>
                </LoginSignUp>
            </Header>

        </>
    );
};

export default StyledLoginBefore;