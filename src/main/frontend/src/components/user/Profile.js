// src/components/user/Profile.js
/*
* 사용자 프로필 페이지
* 학과, 비밀번호, 전화번호, 주소만 변경 가능
* 다른 것은 수정 불가
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {
    HomeBody,
    Header,
    Logo,
    Login,
    LoginSignUp,
    StyledLink2,
    HeaderImage,
    HeaderText1,
    HeaderText2,
    HeaderBackgroundColor,
    HeaderText3,
    HeaderText4,
    HeaderText5,
    Menu,
    MenuText,
    HeaderProImage,
    HeaderProText,
    HeaderProButtonImage,
    HeaderProBox,
    HeaderProButtonClick,
    HeaderProBoxSection,
    ProBox,
    Hr,
    StyledLink4,
    MyproImage,
    BoxLayout,
    Hr2,
    Footer,
    FooterText,
    FooterText2,
    FooterImage,
    FooterImages,
    Footer1, HeaderProImage2
} from "../HomeCss";

import {
    ButtonType1,
    LinkButtonFont1,
    MyPageFlex,
    MyPageFlex_2,
    MyPageFlex_3,
    MypageFont,
    MypageFont2,
    HomeImageCss,
    MainPageFlex,
    MypageFont3,
    MypageFont4,
    MypageChangeFlex,
    MyPageInputType,
    FromStyle,
    MyPageInputType2,
    ButtonType2, ButtonFlex
} from "./ProfileCss"

import exampleImage from "../images/HomeHeaderImage.jpg";
import proImage1 from "../images/main_pro.png";
import proButtonImage from "../images/main_pro_button.png";
import proButtonImageClick from "../images/pro_img_click.png";
import proImage from "../images/myPro_Image.png";
import logoutImage from "../images/logout_Image.png";
import facebookImage from "../images/facebookImage.png";
import instagramImage from "../images/Instagram.png";
import youtubeImage from "../images/Youtube.png";
import myPageImage from "../images/MyPageImage.png"
import HomeImage from "../images/HomeImage.png"

function Profile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);

    const handleButtonClick = () => {
        setBoxVisibility(!isBoxVisible);
    };
    useEffect(() => {
        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios
            .get("/check-auth")
            .then((response) => {
                if (response.data === "authenticated") {
                    setIsAuthenticated(true);

                    // 사용자 ID를 가져와 상태에 저장
                    axios
                        .get("/get-user-id")
                        .then((response) => {
                            setUserId(response.data);
                        })
                        .catch((error) => {
                            // 에러 처리
                        });

                    // 사용자 ID를 가져와 상태에 저장
                    axios
                        .get("/get-user-name")
                        .then((response) => {
                            setUsername(response.data);
                        })
                        .catch((error) => {
                            // 에러 처리
                        });
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch((error) => {
                // 요청 실패 처리
            });
    }, []);

    // 로그아웃
    const handleLogout = () => {
        // 서버의 /logout 엔드포인트로 GET 요청을 보내 로그아웃을 수행
        axios
            .get("/logout")
            .then((response) => {
                // 로그아웃 성공 시 클라이언트 상태 초기화 및 원하는 작업 수행
                setIsAuthenticated(false);
                setUserId("");
            })
            .catch((error) => {
                // 오류 처리
                console.error("로그아웃 중 오류가 발생했습니다:", error);
            });
    };

    const [user, setUser] = useState({
        userId: '',
        username: '',
        department: '',
        password: '',
        phone: '',
        address: '',
        detailsAddress: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    // address 상태와 이를 업데이트할 setAddress 함수
    const [selectedAddress, setSelectedAddress] = useState('');


    useEffect(() => {
        // 서버로부터 사용자 정보를 가져오기
        axios.get('/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                // 에러 처리
                console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
            });
    }, []);

    //  회원 정보 수정 버튼
    const handleEdit = () => {
        setIsEditing(true);
    };

    //  회원 정보 업데이트 버튼
    const handleSave = () => {
        // 서버로 수정된 사용자 정보를 보내고 업데이트
        axios.post('/profile/update', user)
            .then(response => {
                setUser(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                // 에러 처리
                console.error('프로필 정보를 업데이트하는 데 실패했습니다:', error);
            });
    };

    // 회원 탈퇴 버튼
    const handleDelete = () => {
        // 회원 탈퇴 API를 호출
        axios.delete('/profile/delete')
            .then(response => {
                // 탈퇴에 성공하면 로그인 페이지로 리다이렉트 또는 다른 작업 수행
                window.location.href = '/login'; // 탈퇴 성공 후 로그인 페이지로 이동
            })
            .catch(error => {
                // 에러 처리
                console.error('회원탈퇴에 실패했습니다:', error);
            });
    };


    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 selectedAddress 상태에 설정
                setSelectedAddress(data.address);
                // 도로명 주소를 user 상태에 설정
                setUser({ ...user, address: data.address});
            },
        }).open();
    };

    return (
        <HomeBody>

            <Header>
                <Logo>MatNaMo</Logo>
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
                                    <StyledLink4 to="/profile">내 정보</StyledLink4>
                                </BoxLayout>
                                <Hr2/>
                                <BoxLayout>
                                    <MyproImage src={logoutImage} alt="내 정보 이미지"/>
                                    <StyledLink4 to="/" onClick={handleLogout}>
                                        로그아웃
                                    </StyledLink4>
                                </BoxLayout>
                            </HeaderProBoxSection>
                        </HeaderProBox>
                    </Login>
                </LoginSignUp>
            </Header>

            <HeaderImage src={exampleImage} alt="헤더 배경 이미지" />

            <HeaderText1>
                <HeaderBackgroundColor></HeaderBackgroundColor>
                <HeaderText2>" MatNaMo "</HeaderText2>
                <HeaderText3>
                    <HeaderText4>
                        <HeaderText5>맛나모( MatNaMo )</HeaderText5>는 "맛있는
                        나눔(Mate)"을 의미하며,
                    </HeaderText4>
                    <HeaderText4>
                        학생들 간의 음식 나눔을 촉진하는 메시지를 전달합니다.
                    </HeaderText4>
                    <HeaderText4>
                        이 플랫폼은 음식 공동 주문을 통해{" "}
                        <HeaderText5>배달비와 주문최소금액</HeaderText5>을 절감 할 수
                        있습니다.
                    </HeaderText4>
                </HeaderText3>
            </HeaderText1>

            <Menu>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                <StyledLink2 to="/board">게시판</StyledLink2>
                <MenuText>l</MenuText>
                <StyledLink2 to="/notice">공지사항 </StyledLink2>
                <MenuText>l</MenuText>
                {userId === "admin" ? (
                    // 관리자 메인 화면 페이지
                    <StyledLink2 to="/management">사용자 관리</StyledLink2>
                ) : (
                    // 사용자 메인 화면 페이지
                    <StyledLink2 to="/profile">내 정보</StyledLink2>
                )}
            </Menu>
            <MyPageFlex>
                <MyPageFlex_2>
                    <MypageFont>MYPAGE</MypageFont>
                    <HeaderProImage2 src={myPageImage} alt="프로필 아이콘 이미지"/>
                    <MypageFont2>{username}</MypageFont2>
                    <MypageFont2>{userId}</MypageFont2>
                    <LinkButtonFont1 to={`/`}>
                        <MainPageFlex>
                            <HomeImageCss src={HomeImage} alt="홈 이미지"/>
                            <MypageFont3>메인 홈페이지</MypageFont3>
                        </MainPageFlex>
                    </LinkButtonFont1>
                </MyPageFlex_2>
                <MyPageFlex_3>
                    <FromStyle>
                        <MypageFont>내 정보 변경</MypageFont>
                        <MypageChangeFlex>
                            <MypageFont4>아이디(학번)</MypageFont4>
                            <MyPageInputType type="text" value={user.userId} readOnly />
                        </MypageChangeFlex>
                        <MypageChangeFlex>
                            <MypageFont4>이름</MypageFont4>
                            <MyPageInputType type="text" value={user.username} readOnly />
                        </MypageChangeFlex>
                        <MypageChangeFlex>
                            <MypageFont4>학과</MypageFont4>
                            {isEditing ? (
                                <MyPageInputType type="text" value={user.department} onChange={(e) => setUser({ ...user, department: e.target.value })} />
                            ) : (
                                <MyPageInputType type="text" value={user.department} readOnly />
                            )}
                        </MypageChangeFlex>
                        <MypageChangeFlex>
                            <MypageFont4>비밀번호</MypageFont4>
                            {isEditing ? (
                                <MyPageInputType type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            ) : (
                                <MyPageInputType type="password" value={user.password} readOnly />
                            )}
                        </MypageChangeFlex>
                        <MypageChangeFlex>
                            <MypageFont4>전화 번호</MypageFont4>
                            {isEditing ? (
                                <MyPageInputType type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            ) : (
                                <MyPageInputType type="text" value={user.phone} readOnly />
                            )}
                        </MypageChangeFlex>
                        <MypageChangeFlex>
                            <MypageFont4>도로명 주소</MypageFont4>
                            {isEditing ? (
                                <>
                                    <MyPageInputType2 type="text" value={selectedAddress} readOnly />
                                    <ButtonType1 type="button" onClick={openAddressSearch}>검색</ButtonType1>
                                </>
                            ) : (
                                <MyPageInputType type="text" value={user.address} readOnly />
                            )}
                        </MypageChangeFlex>
                        <MypageChangeFlex>
                            <MypageFont4>상세 주소</MypageFont4>
                            {isEditing ? (
                                <MyPageInputType type="text" value={user.detailsAddress || ''} onChange={(e) => setUser({ ...user, detailsAddress: e.target.value })} />
                            ) : (
                                <MyPageInputType type="text" value={user.detailsAddress || ''} readOnly />
                            )}
                        </MypageChangeFlex>
                        {isEditing ? (
                            <ButtonType2 type="button" onClick={handleSave}>저장</ButtonType2>
                        ) : (
                            <ButtonFlex>
                                <ButtonType2 type="button" onClick={handleEdit}>정보 수정</ButtonType2>
                                <ButtonType2 type="button" onClick={handleDelete}>회원 탈퇴</ButtonType2>
                            </ButtonFlex>
                        )}
                    </FromStyle>
                </MyPageFlex_3>
            </MyPageFlex>
            <Footer>
                <Footer1>
                    <FooterText>MatNaMo</FooterText>
                    <FooterText2>이성민(팀장) : 프로젝트 아이디어, 웹 퍼블리셔, 프론트엔드</FooterText2>
                    <FooterText2>우가현(팀원) : 웹 퍼블리셔</FooterText2>
                    <FooterText2>신민주(팀원) : 프로젝트 총괄, 백엔드, DB설계</FooterText2>>
                    <FooterText2>이지훈(팀원) : 웹 크롤링, 인공지능</FooterText2>

                    <FooterImages>
                        <FooterImage src={facebookImage} alt="페이스북 이미지"></FooterImage>
                        <FooterImage src={instagramImage} alt="인스타그램 이미지"></FooterImage>
                        <FooterImage src={youtubeImage} alt ="유튜브 이미지"></FooterImage>
                    </FooterImages>
                    <Hr2></Hr2>
                    <FooterText2>@2023 Capstone Project MatNaMo</FooterText2>
                </Footer1>
            </Footer>
        </HomeBody>

    );
}

export default Profile;
