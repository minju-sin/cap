import {HomeImageCss, LinkButtonFont1, MainPageFlex, MypageFont3} from "../user/ProfileCss";
import HomeImage from "../images/HomeImage.png";
import React from "react";

const StyledMainPage = ({ }) => {
    return (
        <>
            <LinkButtonFont1 to={`/`}>
                <MainPageFlex>
                    <HomeImageCss src={HomeImage} alt="홈 이미지"/>
                    <MypageFont3>메인 홈페이지</MypageFont3>
                </MainPageFlex>
            </LinkButtonFont1>
        </>
    );
};

export default StyledMainPage;
