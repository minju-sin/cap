// src/components/admin/notice/NoticeShow.js
/* 공지사항 상세 페이지
* 관리자만 수정, 삭제 버튼 생성됨
*/

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

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
    HomeLogoImage,
    HeaderImage,
    HeaderText1,
    HeaderBackgroundColor,
    HeaderText2,
    HeaderText3,
    HeaderText4, HeaderText5
} from "../../HomeCss";
import {
    BodyWrapper2,
    HeaderFont,
    NoticeShowButtonType,
    NoticeShowButtonType2, NoticeShowButtonType3,
    NoticeShowHeaderType,
    NoticeShowSectionType,
    NoticeShowType
} from "./NoticeDetailCss";

import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png"
import logoutImage from "../../images/logout_Image.png"
import {TableFontType2, TableImage1, Tdtype1, Tdtype4} from "./NoticeCss";
import ProImage2 from "../../images/MyPageImage.png";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLoginBefore from "../../style/Header/StyledLogInBefore";

function NoticeShow() {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState(null);
    const [isLoginNotice, setIsLoginNotice] = useState(false); // 사용자 로그인 아이디와 공지사항 작성자 아이디 확인

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);

    const handleButtonClick = () => {
        setBoxVisibility(!isBoxVisible);
    };

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
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

    useEffect(() => {
        // 공지사항 상세 정보를 가져오는 API 엔드포인트로 요청 보내기
        axios.get(`/notice/${noticeId}`)
            .then((response) => {
                setNotice(response.data);

            })
            .catch((error) => {
                console.error('공지사항을 불러오는 중 오류가 발생했습니다:', error);
            });

        // 공지사항 수정, 삭제 버튼을 공지사항 작성자 본인만 이용할 수 있도록 함
        axios.get(`/notice/check-login-Notice/${noticeId}`)
            .then(response => {
                if (response.data === 'loginNotice') {
                    setIsLoginNotice(true);
                } else {
                    setIsLoginNotice(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });
    }, [noticeId]);

    const handleDelete = () => {
        Swal.fire({
            title: '게시글을 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/notice/${noticeId}/delete`)
                    .then((response) => {
                        window.location.href = '/notice';
                    })
                    .catch((error) => {
                        console.error('공지사항 삭제 중 오류가 발생했습니다:', error);
                    });
            }
        });
    };

    return (

        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <Header>
                        <HomeLogoImage>
                            {/*<LogoImage2 src={logoImage2} alt="프로필 아이콘 이미지"/>*/}
                            <Logo>MatNaMo</Logo>
                        </HomeLogoImage>
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

                    {notice ? (
                    <BodyWrapper2>
                        <HeaderFont>공지사항</HeaderFont>
                        <TableFontType2>
                            <TableImage1 src={ProImage2} alt="프로필 아이콘 이미지"/>
                            <Tdtype1>{notice.user.username}</Tdtype1>
                        </TableFontType2>
                        <Tdtype4>{extractDate(notice.createdAt)} {new Date(notice.createdAt).toLocaleTimeString('en-US', { hour12: false })}</Tdtype4>
                            <NoticeShowType>
                                <NoticeShowHeaderType>{notice.title}</NoticeShowHeaderType>

                                <NoticeShowSectionType>{notice.content}</NoticeShowSectionType>

                            </NoticeShowType>
                    </BodyWrapper2>
                        ) : (
                            <p>공지사항을 불러오는 중입니다...</p>
                        )}

                    {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}
                    {isLoginNotice ? (
                        <NoticeShowButtonType3>
                            <Link to={`/notice`}>
                                <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                            </Link>
                            <Link to={`/`}>
                                <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                            </Link>
                            <Link to={`/notice/${noticeId}/update`}>
                                <NoticeShowButtonType2 type="button">수정하기</NoticeShowButtonType2>
                            </Link>
                            <NoticeShowButtonType2 type="button" onClick={handleDelete}>삭제하기</NoticeShowButtonType2>
                        </NoticeShowButtonType3>
                    ):(
                        <NoticeShowButtonType>
                            <Link to={`/notice`}>
                                <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                            </Link>
                            <Link to={`/`}>
                                <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                            </Link>
                        </NoticeShowButtonType>
                    )}

                    <StyledFooter/>
                </HomeBody>


            ) : (
                <HomeBody>
                    <StyledLoginBefore/>

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

                    <StyledHeaderBefore/>

                    {notice ? (
                    <BodyWrapper2>
                        <HeaderFont>공지사항</HeaderFont>

                        <TableFontType2>
                            <TableImage1 src={ProImage2} alt="프로필 아이콘 이미지"/>
                            <Tdtype1>{notice.user.username}</Tdtype1>
                        </TableFontType2>
                        <Tdtype4>{extractDate(notice.createdAt)} {new Date(notice.createdAt).toLocaleTimeString('en-US', { hour12: false })}</Tdtype4>


                            <NoticeShowType>
                                <NoticeShowHeaderType>{notice.title}</NoticeShowHeaderType>

                                <NoticeShowSectionType>{notice.content}</NoticeShowSectionType>

                            </NoticeShowType>
                    </BodyWrapper2>
                        ) : (
                            <p>공지사항을 불러오는 중입니다...</p>
                        )}
                    <NoticeShowButtonType>
                        <Link to={`/notice`}>
                            <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/`}>
                            <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                        </Link>
                    </NoticeShowButtonType>

                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );
}

export default NoticeShow;


