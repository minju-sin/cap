// src/components/user/Profile.js
/*
* 사용자 프로필 페이지
* 정보 | 내가 쓴 게시판 | 내가 만든 주문 그룹 | 주문 내역 | 참가하고 있는 주문 그룹
* 학과, 비밀번호, 전화번호, 주소만 변경 가능
* 다른 것은 수정 불가
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    HomeBody,
    Header,
    Logo,
    Login,
    LoginSignUp,
    StyledLink2,
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
    HeaderProImage2
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

import proImage1 from "../images/main_pro.png";
import proButtonImage from "../images/main_pro_button.png";
import proButtonImageClick from "../images/pro_img_click.png";
import proImage from "../images/myPro_Image.png";
import logoutImage from "../images/logout_Image.png";
import myPageImage from "../images/MyPageImage.png"
import HomeImage from "../images/HomeImage.png"
import StyledHeaderHome from "../style/Header/StyledHeaderHome";
import StyledFooter from "../style/StyledFooter";

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

            <StyledHeaderHome/>

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
                                    <ButtonType1 type="button" onClick={openAddressSearch}>도로명 검색</ButtonType1>
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
            <StyledFooter/>
        </HomeBody>

    );
}

export default Profile;
