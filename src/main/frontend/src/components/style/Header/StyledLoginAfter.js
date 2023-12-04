import {
    BoxLayout, ContentsBoxLink, Header,
    HeaderProBox, HeaderProBoxSection, HeaderProButtonClick,
    HeaderProButtonImage,
    HeaderProImage, HeaderProText,
    HomeLogoImage, Hr, Hr2,
    Login,
    LoginSignUp,
    Logo, LogoImage2,
    MyproImage,
    ProBox,
    StyledLink4
} from "../../HomeCss";
import logoImage2 from "../../images/LogoImage2.png";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png";
import logoutImage from "../../images/logout_Image.png";
import React from "react";
import useAuthStatus from "../Backend/useAuthStatus";

const StyledLoginAfter = ({ }) => {
    const {  userId, username, isBoxVisible, handleLogout, handleButtonClick } = useAuthStatus();

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
                        <HeaderProImage src={proImage1} alt="프로필 아이콘 이미지"/>
                    </Login>
                    <Login>

                        <HeaderProButtonImage src={proButtonImage} alt="프로필 버튼 이미지"  onClick={handleButtonClick}/>
                        <HeaderProBox isVisible={isBoxVisible}>
                            <HeaderProButtonClick src={proButtonImageClick} alt="프로필 클릭시 이미지"/>
                            <HeaderProBoxSection>
                                <ProBox>
                                    <HeaderProImage src={proImage1} alt="프로필 아이콘 이미지"/>
                                    <HeaderProText>{username}<br/>{userId}</HeaderProText>
                                </ProBox>
                                <Hr/>
                                <BoxLayout>
                                    <MyproImage src={proImage} alt="내 정보 이미지"/>
                                    {userId === "admin" ? (
                                        // 관리자 메인 화면 페이지
                                        <StyledLink4 to="/management">사용자 관리</StyledLink4>
                                    ) : (
                                        // 사용자 메인 화면 페이지
                                        <StyledLink4 to="/profile">내 정보</StyledLink4>
                                    )}
                                </BoxLayout>
                                <Hr2/>
                                <BoxLayout>
                                    <MyproImage src={logoutImage} alt="로그아웃 이미지"/>
                                    <StyledLink4 to="/" onClick={handleLogout}>
                                        로그아웃
                                    </StyledLink4>
                                </BoxLayout>
                            </HeaderProBoxSection>
                        </HeaderProBox>
                    </Login>
                </LoginSignUp>
            </Header>

        </>
    );
};

export default StyledLoginAfter;