// src/components/admin/notice/Notice.js

/*
* 공지사항 페이지
* 작성된 공지사항 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후 관리자만  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    NoticeCssBody, NoticeFontType1,
    TableFontType1, TableFontType2, TableFontType3, TableImage1, TableImage2, TableLinkType,
    TableType1, TbodyDivType1,
    TbodyType,
    TdContents,
    Tdtype1, Tdtype2, Tdtype3,
    TheadType1,
    ThType1,
    TrType1, WriteButton, WriteImage2
} from "./NoticeCss"
import {
    HomeBody,
    Header,
    Logo,
    Login,
    SignUp,
    LoginSignUp,
    StyledLink1,
    StyledLink2,
    Menu,
    MenuText,
    ContentsText1,
    ContentsText2,
    ContentsText3,
    ContentsText4,
    Contents,
    ContentsBox,
    ContentsImage,
    HeaderProImage,
    StyledLink3,
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
    Footer1, HeaderImage, HeaderText1, HeaderBackgroundColor, HeaderText2, HeaderText3, HeaderText4, HeaderText5
} from "../../HomeCss";
import facebookImage from "../../images/facebookImage.png";
import instagramImage from "../../images/Instagram.png";
import youtubeImage from "../../images/Youtube.png";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png";
import logoutImage from "../../images/logout_Image.png";
import ProImage from "../../images/MyPageImage.png";
import NoticeImage from "../../images/NoticeImage.png";
import NoticeImage2 from "../../images/NoticeImage2.png";
import menuImage1 from "../../images/ChickenPicture.jpg";
import menuImage4 from "../../images/PizzaPicture.jpg";
import menuImage3 from "../../images/Late-night snack picture.jpg";
import {HomeImageCss, LinkButtonFont1, MainPageFlex, MypageFont3} from "../../user/ProfileCss";
import HomeImage from "../../images/HomeImage.png";
import menuImage6 from "../../images/ChinesePicture.jpg";
import menuImage2 from "../../images/KoreanPicture.png";
import menuImage5 from "../../images/SolarEclipsePicture.jpg";
import exampleImage from "../../images/HomeHeaderImage.jpg";

function Notice() {
    const [notices, setNotices] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // 사용자 로그인 상태
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);
    const [users, setUsers] = useState([]);


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
    const handleButtonClick = () => {
        setBoxVisibility(!isBoxVisible);
    };
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
        axios.get('/notice')
            .then(response => {
                setNotices(response.data);
            })
            .catch(error => {
                console.error('공지사항 목록을 가져오는 중 오류가 발생했습니다:', error);
            });

        // 서버로 사용자가 "admin"인지 확인을 위한 요청 보내기
        axios.get('/check-admin')
            .then(response => {
                if (response.data === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(error => {
                console.error('사용자 권한 확인 중 오류가 발생했습니다:', error);
            });
    }, []);

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
    };

    return (
        <div>
            {isAuthenticated ? (
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
                    <ContentsText1>M A T N A M O</ContentsText1>
                    <ContentsText2>
                        " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                        먹으러 가볼까? "
                    </ContentsText2>
                    <Contents>
                        <ContentsBox>
                            <ContentsImage src={menuImage1} alt="메뉴 음식 이미지" />
                            <ContentsText4><StyledLink3 to="/store/category/CHICKEN">치킨</StyledLink3></ContentsText4>
                        </ContentsBox>
                        <ContentsBox>
                            <ContentsImage src={menuImage4} alt="메뉴 음식 이미지" />
                            <ContentsText4> <StyledLink3 to="/store/category/PIZZA">피자</StyledLink3></ContentsText4>
                        </ContentsBox>
                        <ContentsBox>
                            <ContentsImage src={menuImage3} alt="메뉴 음식 이미지" />
                            <ContentsText4><StyledLink3 to="/store/category/NIGHT">야식</StyledLink3></ContentsText4>
                        </ContentsBox>
                    </Contents>
                    <NoticeCssBody>
                        <NoticeFontType1>공지사항</NoticeFontType1>
                        <Link to={`/`}>
                            {/*<button type="button">이전페이지(메인페이지로 이동)</button>*/}
                        </Link>

                        <TableType1>
                            <TheadType1>
                                <TrType1>
                                    <ThType1>순번</ThType1>
                                </TrType1>
                            </TheadType1>
                            <TbodyDivType1>
                                <TbodyType>
                                    {notices.map((notice, index) => (
                                        <TrType1 key={notice.id}>
                                            <Tdtype2>{index + 1}</Tdtype2>
                                            <TdContents>
                                                <Tdtype1>
                                                    {/* 해당 게시글의 상세 페이지로 이동 */}
                                                    <TableLinkType to={`/notice/${notice.id}`}>{notice.title}</TableLinkType>
                                                </Tdtype1>
                                                <TableFontType1>
                                                    <Tdtype1>{extractDate(notice.createdAt)}</Tdtype1>
                                                </TableFontType1>
                                                <TableFontType2>
                                                    <TableImage1 src={ProImage} alt="프로필 아이콘 이미지"/>
                                                    <Tdtype1>{notice.user.username}</Tdtype1>
                                                </TableFontType2>
                                            </TdContents>
                                            <Tdtype3> <TableImage2 src={NoticeImage} alt="돋보기 이미지"/>공지사항 필독</Tdtype3>
                                        </TrType1>
                                    ))}
                                </TbodyType>
                            </TbodyDivType1>
                        </TableType1>

                        {isAdmin && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                            <Link to="/noticeDetail">
                                <WriteButton><WriteImage2 src={NoticeImage2} alt="프로필 아이콘 이미지"/>공지사항 작성하기</WriteButton>
                            </Link>
                        )}
                    </NoticeCssBody>
                    <LinkButtonFont1 to={`/`}>
                        <MainPageFlex>
                            <HomeImageCss src={HomeImage} alt="홈 이미지"/>
                            <MypageFont3>메인 홈페이지</MypageFont3>
                        </MainPageFlex>
                    </LinkButtonFont1>

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
                        <StyledLink2 to="/notice">내 정보</StyledLink2>
                    </Menu>
                    <ContentsText1>M A T N A M O</ContentsText1>
                    <ContentsText2>
                        " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                        먹으러 가볼까? "
                    </ContentsText2>
                    <Contents>
                        <ContentsBox>
                            <ContentsImage src={menuImage1} alt="메뉴 음식 이미지" />
                            <ContentsText4><StyledLink3 to="/store/category/CHICKEN">치킨</StyledLink3></ContentsText4>
                        </ContentsBox>
                        <ContentsBox>
                            <ContentsImage src={menuImage4} alt="메뉴 음식 이미지" />
                            <ContentsText4> <StyledLink3 to="/store/category/PIZZA">피자</StyledLink3></ContentsText4>
                        </ContentsBox>
                        <ContentsBox>
                            <ContentsImage src={menuImage3} alt="메뉴 음식 이미지" />
                            <ContentsText4><StyledLink3 to="/store/category/NIGHT">야식</StyledLink3></ContentsText4>
                        </ContentsBox>
                    </Contents>
                    <NoticeCssBody>
                        <NoticeFontType1>공지사항</NoticeFontType1>
                        <Link to={`/`}>
                            {/*<button type="button">이전페이지(메인페이지로 이동)</button>*/}
                        </Link>

                        <TableType1>
                            <TheadType1>
                                <TrType1>
                                    <ThType1>순번</ThType1>
                                </TrType1>
                            </TheadType1>
                            <TbodyDivType1>
                                <TbodyType>
                                    {notices.map((notice, index) => (
                                        <TrType1 key={notice.id}>
                                            <Tdtype2>{index + 1}</Tdtype2>
                                            <TdContents>
                                                <Tdtype1>
                                                    {/* 해당 게시글의 상세 페이지로 이동 */}
                                                    <TableLinkType to={`/notice/${notice.id}`}>{notice.title}</TableLinkType>
                                                </Tdtype1>
                                                <TableFontType1>
                                                    <Tdtype1>{extractDate(notice.createdAt)}</Tdtype1>
                                                </TableFontType1>
                                                <TableFontType2>
                                                    <TableImage1 src={ProImage} alt="프로필 아이콘 이미지"/>
                                                    <Tdtype1>{notice.user.username}</Tdtype1>
                                                </TableFontType2>
                                            </TdContents>
                                            <Tdtype3> <TableImage2 src={NoticeImage} alt="돋보기 이미지"/>공지사항 필독</Tdtype3>
                                        </TrType1>
                                    ))}
                                </TbodyType>
                            </TbodyDivType1>
                        </TableType1>

                        {isAdmin && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                            <Link to="/noticeDetail">
                                <WriteButton><WriteImage2 src={NoticeImage2} alt="프로필 아이콘 이미지"/>공지사항 작성하기</WriteButton>
                            </Link>
                        )}
                    </NoticeCssBody>
                    <LinkButtonFont1 to={`/`}>
                        <MainPageFlex>
                            <HomeImageCss src={HomeImage} alt="홈 이미지"/>
                            <MypageFont3>메인 홈페이지</MypageFont3>
                        </MainPageFlex>
                    </LinkButtonFont1>
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

export default Notice;