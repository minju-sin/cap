// src/components/user/board/BoardShow.js
/*
* 게시글 상세 페이지
* 작성자 본인만 수정, 삭제 가능하도록 구현함
*/

/* global kakao */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
    HomeBody,
    Header,
    Logo,
    Login,
    SignUp,
    LoginSignUp,
    StyledLink1,
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
    Footer1, LogoImage2, HomeLogoImage
} from "../../HomeCss";

import exampleImage from "../../images/HomeHeaderImage.jpg";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png"
import logoutImage from "../../images/logout_Image.png"
import facebookImage from "../../images/facebookImage.png"
import instagramImage from "../../images/Instagram.png"
import youtubeImage from "../../images/Youtube.png"
import BoardShowImage1 from "../../images/BoardShowImage1.png"
import BoardShowImage3 from "../../images/BoardShowImage3.png"
import BoardShowImage2 from "../../images/BoardShowImage2TextBox.png"
import logoImage2 from "../../images/LogoImage2.png";
import {
    BoardShowHeaderType,
    BoardShowSectionType,
    BoardShowType,
    Body,
    BodyWrapper2,
    HeaderFont,
    TableFontType2,
    TableImage1,
    Tdtype1,
    Tdtype4,
    BoardShowSectionType3,
    AType1,
    TableFontType3,
    TableImage3,
    TableImage4,
    BoardShowA,
    BoardShowTextImage1, BoardShowTextType1, BoardShowTextBoxText, TableImage3Click,KakaoMapDiv

} from "./BoardCss";
import ProImage2 from "../../images/MyPageImage.png";
import {NoticeShowButtonType, NoticeShowButtonType2, NoticeShowButtonType3} from "../../admin/notice/NoticeDetailCss";

function BoardShow() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoginArticle, setIsLoginArticle] = useState(false); // 사용자 로그인 아이디와 게시글 작성자 아이디 확인
    const [mapCoords, setMapCoords] = useState({ lat: 33.5563, lng: 126.79581 }); // 초기 좌표 상태 정의
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);
    const [isBoxVisible2, setBoxVisibility2] = useState(true);

    const handleButtonClick = () => {
        setBoxVisibility(!isBoxVisible);
    };

    const handleButtonClick2 = () => {
        setBoxVisibility2(!isBoxVisible2);
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
        // 게시글 상세 정보를 가져오는 API 엔드포인트로 요청 보내기
        axios.get(`/board/${articleId}`)
            .then((response) => {
                setArticle(response.data);

                // 주소-좌표 변환 객체 생성 및 호출
                const geocoder = new kakao.maps.services.Geocoder();

                geocoder.addressSearch(response.data.address, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const newCoords = {lat: result[0].y, lng: result[0].x};
                        setMapCoords(newCoords); // 좌표 상태 업데이트
                    }
                });
            })
            .catch((error) => {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            });

        // 게시글 수정, 삭제 버튼을 게시글 작성자 본인만 이용할 수 있도록 함
        axios.get(`/board/check-login-Article/${articleId}`)
            .then(response => {
                if (response.data === 'loginArticle') {
                    setIsLoginArticle(true);
                } else {
                    setIsLoginArticle(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });
    }, [articleId]);


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
                axios.post(`/board/${articleId}/delete`)
                    .then((response) => {

                        window.location.href = '/board';
                    })
                    .catch((error) => {
                        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
                    });
            }
        });

    };

    // 주문 링크 클릭을 처리하는 함수
    const handleJoinGroupOrder = (event) => {
        event.preventDefault(); //  링크 이동을 막는 함수
        axios.post(`/order/join`, { orderLink: article.orderLink })
            .then(response => {
                // 성공 응답을 받았을 때 링크로 이동합니다.
                window.location.href = article.orderLink;
                // 백엔드가 어떤 종류의 응답 메시지를 보낸다고 가정합니다.
                Swal.fire({
                    title: '참가 성공!',
                    text: response.data.message || '그룹 주문에 참가했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            })
            .catch(error => {
                if (error.response) {
                    // 요청은 이루어졌지만 서버가 2xx 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.error('Error response:', error.response.data);
                    // 에러 메시지를 알림으로 표시합니다.
                    Swal.fire({
                        title: '참가 실패!',
                        text: error.response.data.message || '참가자 수가 최대라 참여할 수 없습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                } else if (error.request) {
                    // 요청은 이루어졌지만 응답을 받지 못했습니다.
                    console.error('Error request:', error.request);
                    Swal.fire({
                        title: '서버 응답 오류',
                        text: '네트워크 상태를 확인해주세요.',
                        icon: 'warning',
                        confirmButtonText: '확인'
                    });
                } else {
                    // 요청을 설정하는 과정에서 오류가 발생했습니다.
                    console.error('Error message:', error.message);
                    Swal.fire({
                        title: '요청 중 오류가 발생했습니다.',
                        icon: 'warning',
                        confirmButtonText: '확인'
                    });
                }
            });
    };


    return (
        <div>{isAuthenticated ? (
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
                <Body>
                    <BodyWrapper2>
                        <HeaderFont>게시글</HeaderFont>
                        {article ? (
                            <div>
                                <TableFontType2>
                                    <TableImage1 src={ProImage2} alt="프로필 아이콘 이미지"/>
                                    <Tdtype1>{article.user.username}</Tdtype1>
                                    <BoardShowA href={article.orderLink}><TableImage4 src={BoardShowImage3} alt="링크 아이콘 이미지"/></BoardShowA>
                                    <BoardShowTextBoxText isVisible2={isBoxVisible2}>
                                        <BoardShowTextType1>{article.address}</BoardShowTextType1>
                                        <BoardShowTextImage1 src={BoardShowImage2} alt="텍스처 박스 아이콘 이미지"/>
                                    </BoardShowTextBoxText>
                                    <TableImage3Click src={BoardShowImage1} alt="위치 아이콘 이미지" onClick={handleButtonClick2}/>
                                </TableFontType2>
                                <Tdtype4>{new Date(article.createdAt).toLocaleTimeString('en-US', { hour12: false })}</Tdtype4>
                                <BoardShowType>
                                    <BoardShowHeaderType>{article.title}</BoardShowHeaderType>
                                    <BoardShowSectionType>
                                        <BoardShowSectionType>{article.content}</BoardShowSectionType>
                                        <TableFontType3 >
                                            <TableImage3 src={BoardShowImage1} alt="위치 아이콘 이미지"/>
                                            <BoardShowSectionType>배달 도착 위치 : {article.address}</BoardShowSectionType>
                                        </TableFontType3>
                                        {/* 도착 위치 표시 디자인 수정 해주세요 */}
                                        <BoardShowSectionType3>
                                            <AType1 href={article.orderLink} onClick={(event) => handleJoinGroupOrder(event)} rel="noopener noreferrer">
                                                주문 참가하기</AType1>
                                        </BoardShowSectionType3>
                                    </BoardShowSectionType>
                                    {/* 도착 위치 표시 디자인 수정 해주세요 */}
                                    <Map
                                        center={mapCoords}
                                        style={{ width: "100%", height: "360px" }}
                                    >
                                        <MapMarker position={mapCoords}></MapMarker>
                                    </Map>
                                </BoardShowType>
                                {/* 제목, 작성자, 작성일, 그룹주문링크, 위치, 내용 순서로 나열 */}
                                {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}
                            </div>
                        ) : (
                            <p>게시글을 불러오는 중입니다...</p>
                        )}
                    </BodyWrapper2>
                </Body>

                {isLoginArticle ? (
                    <NoticeShowButtonType3>
                        <Link to={`/board`}>
                            <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/`}>
                            <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/board/${articleId}/update`}>
                            <NoticeShowButtonType2 type="button">수정하기</NoticeShowButtonType2>
                        </Link>
                        <NoticeShowButtonType2 type="button" onClick={handleDelete}>
                            삭제하기
                        </NoticeShowButtonType2>
                    </NoticeShowButtonType3>
                ) : (
                    <NoticeShowButtonType3>
                        <Link to={`/board`}>
                            <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/`}>
                            <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                        </Link>
                    </NoticeShowButtonType3>
                )}

                <Footer>
                    <Footer1>
                        <FooterText>MatNaMo</FooterText>
                        <FooterText2>이성민(팀장) : 프로젝트 아이디어, 웹 퍼블리셔, 프론트엔드</FooterText2>
                        <FooterText2>우가현(팀원) : 웹 퍼블리셔</FooterText2>
                        <FooterText2>신민주(팀원) : 프로젝트 총괄, 백엔드, DB설계</FooterText2>
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
        ) : (
            <HomeBody>
                <Header>
                    <Header>
                        <Logo>MatNaMo</Logo>
                        <LoginSignUp>
                            <Login>
                                <StyledLink1 to="/login">로그인</StyledLink1>
                            </Login>
                            <SignUp>
                                <StyledLink1 to="/signup">회원가입</StyledLink1>
                            </SignUp>
                        </LoginSignUp>
                    </Header>
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
                <Body>
                    <BodyWrapper2>
                        <HeaderFont>게시글</HeaderFont>
                        {article ? (
                            <div>
                                <TableFontType2>
                                    <TableImage1 src={ProImage2} alt="프로필 아이콘 이미지"/>
                                    <Tdtype1>{article.user.username}</Tdtype1>
                                    <BoardShowA href={article.orderLink}><TableImage4 src={BoardShowImage3} alt="링크 아이콘 이미지"/></BoardShowA>
                                    <BoardShowTextBoxText isVisible2={isBoxVisible2}>
                                        <BoardShowTextType1>{article.address}</BoardShowTextType1>
                                        <BoardShowTextImage1 src={BoardShowImage2} alt="텍스처 박스 아이콘 이미지"/>
                                    </BoardShowTextBoxText>
                                    <TableImage3Click src={BoardShowImage1} alt="위치 아이콘 이미지" onClick={handleButtonClick2}/>
                                </TableFontType2>
                                <Tdtype4>{new Date(article.createdAt).toLocaleTimeString('en-US', { hour12: false })}</Tdtype4>
                                <BoardShowType>
                                    <BoardShowHeaderType>{article.title}</BoardShowHeaderType>
                                    <BoardShowSectionType>
                                        <BoardShowSectionType>{article.content}</BoardShowSectionType>
                                        <TableFontType3>
                                            <TableImage3 src={BoardShowImage1} alt="위치 아이콘 이미지"/>
                                            <BoardShowSectionType>배달 도착 위치 : {article.address}</BoardShowSectionType>
                                        </TableFontType3>
                                        <KakaoMapDiv id="map" ></KakaoMapDiv>
                                        <BoardShowSectionType3>
                                            <AType1 href={article.orderLink} onClick={(event) => handleJoinGroupOrder(event)} rel="noopener noreferrer">
                                                주문 참가하기</AType1>
                                        </BoardShowSectionType3>
                                        {/* 도착 위치 표시 디자인 수정 해주세요 */}
                                        <Map
                                            center={mapCoords}
                                            style={{ width: "100%", height: "360px" }}
                                        >
                                            <MapMarker position={mapCoords}></MapMarker>
                                        </Map>
                                    </BoardShowSectionType>

                                </BoardShowType>
                                {/* 제목, 작성자, 작성일, 그룹주문링크, 위치, 내용 순서로 나열 */}
                                {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}


                            </div>
                        ) : (
                            <p>게시글을 불러오는 중입니다...</p>
                        )}
                    </BodyWrapper2>
                </Body>

                {isLoginArticle ? (
                    <NoticeShowButtonType3>
                        <Link to={`/board`}>
                            <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/`}>
                            <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/board/${articleId}/update`}>
                            <NoticeShowButtonType2 type="button">수정하기</NoticeShowButtonType2>
                        </Link>
                        <NoticeShowButtonType2 type="button" onClick={handleDelete}>
                            삭제하기
                        </NoticeShowButtonType2>
                    </NoticeShowButtonType3>
                ) : (
                    <NoticeShowButtonType>
                        <Link to={`/board`}>
                            <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                        </Link>
                        <Link to={`/`}>
                            <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                        </Link>
                    </NoticeShowButtonType>
                )}

                <Footer>
                    <Footer1>
                        <FooterText>MatNaMo</FooterText>
                        <FooterText2>이성민(팀장) : 프로젝트 아이디어, 웹 퍼블리셔, 프론트엔드</FooterText2>
                        <FooterText2>우가현(팀원) : 웹 퍼블리셔</FooterText2>
                        <FooterText2>신민주(팀원) : 프로젝트 총괄, 백엔드, DB설계</FooterText2>
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
        )}
        </div>


    );

}

export default BoardShow;
