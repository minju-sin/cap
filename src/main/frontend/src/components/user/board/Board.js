// src/components/user/board/Board.js
/*
* 게시판 페이지
* 작성된 게시글을 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    Footer1, LogoImage2, HomeLogoImage
} from "../../HomeCss";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import menuImage2 from "../../images/KoreanPicture.png";
import menuImage5 from "../../images/SolarEclipsePicture.jpg";
import menuImage6 from "../../images/ChinesePicture.jpg";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png"
import logoutImage from "../../images/logout_Image.png"
import facebookImage from "../../images/facebookImage.png"
import instagramImage from "../../images/Instagram.png"
import youtubeImage from "../../images/Youtube.png"
import {HomeImageCss, LinkButtonFont1, MainPageFlex, MypageFont3} from "../ProfileCss";
import HomeImage from "../../images/HomeImage.png";
import {
    BoardMainButtonType1,
    BoardMainFlexType,
    BoardMainHeader,
    BoardMainInputImage1,
    BoardMainInputImageBox1,
    BoardMainInputType1,
    BoardMainInputType2, BoardMainLink,
    BoardMainTable1,
    BoardMainTbody,
    BoardMainTd,
    BoardMainTh,
    BoardMainThead,
    BoardMainTr, WriteButton2, WriteImage3,Pagination
} from "./BoardCss";
import NoticeImage from "../../images/NoticeImage.png";
import NoticeImage2 from "../../images/NoticeImage2.png";

function Board() {

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const postsPerPage = 10; // 페이지당 게시물 수

    const [articles, setArticles] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태
    const [search, setSearch] = useState(''); // 검색어 상태 추가
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);

    // 게시물 목록을 현재 페이지에 맞게 가져오는 함수
    const getCurrentPosts = () => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return articles.slice(indexOfFirstPost, indexOfLastPost);
    };

    // 페이지 변경 시 호출되는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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


    useEffect(() => {
        axios.get('/board')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('게시글 목록을 가져오는 중 오류가 발생했습니다:', error);
            });

        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios.get('/check-auth')
            .then(response => {
                if (response.data === 'authenticated') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });
    }, []);

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
    };

    // 검색 함수
    const handleSearch = () => {
        axios.get('/board', { params: { search } }) // 검색어를 서버로 전달
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('게시글 검색 중 오류가 발생했습니다:', error);
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
                        <ContentsImage src={menuImage6} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/CHINESE">중식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage2} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/KOREAN">한식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage5} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/JAPANESE">일식</StyledLink3></ContentsText4>
                    </ContentsBox>
                </Contents>

                <BoardMainFlexType>
                    <BoardMainHeader>
                        <BoardMainInputImageBox1>
                            <BoardMainInputImage1 onClick={handleSearch} src={NoticeImage} alt="돋보기 이미지"/>
                        </BoardMainInputImageBox1>
                        <BoardMainInputType1
                            type="text"
                            placeholder="제목을 검색해주세요."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {    //  Enter 눌러도 검색됨
                                    handleSearch();
                                }
                            }}
                        />
                        <BoardMainInputType2
                            type="text"
                            placeholder="YYYY. MM.DD ~ YYYY. MM.DD"
                        ></BoardMainInputType2>

                        <BoardMainButtonType1 onClick={handleSearch}>검색</BoardMainButtonType1>
                    </BoardMainHeader>
                    <BoardMainTable1>
                        <BoardMainThead>
                            <BoardMainTr>
                                <BoardMainTh>순번</BoardMainTh>
                                <BoardMainTh>제목</BoardMainTh>
                                <BoardMainTh>작성자</BoardMainTh>
                                <BoardMainTh>작성일</BoardMainTh>
                            </BoardMainTr>
                        </BoardMainThead>
                        <BoardMainTbody>
                            {getCurrentPosts().map((article, index) => (
                                <BoardMainTr key={article.id}>
                                    <BoardMainTd>{index + 1 + (currentPage - 1) * postsPerPage}</BoardMainTd>
                                    <BoardMainTd>
                                        <BoardMainLink to={`/board/${article.id}`}>{article.title}</BoardMainLink>
                                    </BoardMainTd>
                                    <BoardMainTd>{article.user.username}</BoardMainTd>
                                    <BoardMainTd>{extractDate(article.createdAt)}</BoardMainTd>
                                </BoardMainTr>
                            ))}
                        </BoardMainTbody>
                    </BoardMainTable1>

                    {/* 페이징 컴포넌트 */}
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={articles.length}
                        paginate={paginate}
                    />

                    {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                        <Link to="/boardDetail">
                            <WriteButton2> <WriteImage3 src={NoticeImage2} alt="프로필 아이콘 이미지"/> 게시물 등록하기</WriteButton2>
                        </Link>
                    )}
                </BoardMainFlexType>

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
                        <ContentsImage src={menuImage6} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/CHINESE">중식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage2} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/KOREAN">한식</StyledLink3></ContentsText4>
                    </ContentsBox>
                    <ContentsBox>
                        <ContentsImage src={menuImage5} alt="메뉴 음식 이미지" />
                        <ContentsText4><StyledLink3 to="/store/category/JAPANESE">일식</StyledLink3></ContentsText4>
                    </ContentsBox>
                </Contents>

                <BoardMainFlexType>
                    <BoardMainHeader>
                        <BoardMainInputImageBox1>
                            <BoardMainInputImage1 onClick={handleSearch} src={NoticeImage} alt="돋보기 이미지"/>
                        </BoardMainInputImageBox1>
                        <BoardMainInputType1
                            type="text"
                            placeholder="제목을 검색해주세요."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {    //  Enter 눌러도 검색됨
                                    handleSearch();
                                }
                            }}
                        />
                        <BoardMainInputType2
                            type="text"
                            placeholder="YYYY. MM.DD ~ YYYY. MM.DD"
                        ></BoardMainInputType2>

                        <BoardMainButtonType1 onClick={handleSearch}>검색</BoardMainButtonType1>
                    </BoardMainHeader>

                    <BoardMainTable1>
                        <BoardMainThead>
                            <BoardMainTr>
                                <BoardMainTh>순번</BoardMainTh>
                                <BoardMainTh>제목</BoardMainTh>
                                <BoardMainTh>작성자</BoardMainTh>
                                <BoardMainTh>작성일</BoardMainTh>
                            </BoardMainTr>
                        </BoardMainThead>
                        <BoardMainTbody>
                            {getCurrentPosts().map((article, index) => (
                                <BoardMainTr key={article.id}>
                                    <BoardMainTd>{index + 1 + (currentPage - 1) * postsPerPage}</BoardMainTd>
                                    <BoardMainTd>
                                        <BoardMainLink to={`/board/${article.id}`}>{article.title}</BoardMainLink>
                                    </BoardMainTd>
                                    <BoardMainTd>{article.user.username}</BoardMainTd>
                                    <BoardMainTd>{extractDate(article.createdAt)}</BoardMainTd>
                                </BoardMainTr>
                            ))}
                        </BoardMainTbody>
                    </BoardMainTable1>

                    {/* 페이징 컴포넌트 */}
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={articles.length}
                        paginate={paginate}
                    />

                    {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                        <Link to="/boardDetail">
                            <WriteButton2> <WriteImage3 src={NoticeImage2} alt="프로필 아이콘 이미지"/> 게시물 등록하기</WriteButton2>
                        </Link>
                    )}
                </BoardMainFlexType>

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

export default Board;
