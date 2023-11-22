//  src/components/delivery/Store.js

/*
음식점 카테고리 별 페이지
* 한식, 일식, 중식, 야식, 치킨, 피자로 구분해서 음식점 보여줌
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import storeImage from "../images/storeImage.png"
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
} from "../HomeCss";

import exampleImage from "../images/HomeHeaderImage.jpg";
import menuImage1 from "../images/ChickenPicture.jpg";
import menuImage3 from "../images/Late-night snack picture.jpg";
import menuImage4 from "../images/PizzaPicture.jpg";
import proImage1 from "../images/main_pro.png";
import proButtonImage from "../images/main_pro_button.png";
import proButtonImageClick from "../images/pro_img_click.png";
import proImage from "../images/myPro_Image.png"
import logoutImage from "../images/logout_Image.png"
import facebookImage from "../images/facebookImage.png"
import instagramImage from "../images/Instagram.png"
import youtubeImage from "../images/Youtube.png"
import menu1 from "../images/menu1.png"
import menu2 from "../images/menu2.png"
import menu3 from "../images/menu3.png"
import menu4 from "../images/menu4.png"
import menu5 from "../images/menu5.png"
import menu6 from "../images/menu6.png"
import Icon from "../images/StoreImageIcon.png"

import logoImage2 from "../images/LogoImage2.png";
import {
    StoreButtonType1,
    StoreInputType1, StoreInputType2,
    StoreMenu,
    StoreMenuHead, StoreMenuHeader, StoreMenuHeaderType,
    StoreMenuImgType,
    StoreMenuLi,
    StoreMenuLink, StoreMenuSectionType1,
    StoreMenuTextTpye,
    StoreMenuUl,
    StoreMenuSectionType2,
    StoreMenuSectionType3,
    StoreMenuTextTpye2, LinkType1, PType, StoreMenuSectionImage1, StoreMenuSectionType4, PType2,
    StoreMenuSectionType5,StoreMenuSectionType6,StoreMenuImgType2,StoreMenuBar,StoreSection1
} from "./StoreCss";
import {
    BoardMainInputImage1,
    BoardMainInputImageBox1,
} from "../user/board/BoardCss";
import NoticeImage from "../images/NoticeImage.png";
import {HomeImageCss, LinkButtonFont1, MainPageFlex, MypageFont3} from "../user/ProfileCss";
import HomeImage from "../images/HomeImage.png";

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Store() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);

    const { category } = useParams();
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

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
        axios.get(`/store/category?category=${category}`)
            .then(response => {
                setStores(response.data);
            })
            .catch(error => {
                console.error('가게 목록을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [category]);

    // 검색 요청 함수
    const handleSearch = () => {
        // 검색어를 사용하여 서버로 검색 요청을 보냄
        axios.get(`/store/category?category=${category}&search=${searchTerm}`)
            .then((response) => {
                setStores(response.data);
            })
            .catch((error) => {
                console.error('가게 검색 중 오류가 발생했습니다:', error);
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
                <StoreSection1>
                    <StoreMenuHeader>
                        <StoreMenuHeaderType>{category}</StoreMenuHeaderType>
                        <BoardMainInputImageBox1>
                            <BoardMainInputImage1 src={NoticeImage} alt="돋보기 이미지"/>
                        </BoardMainInputImageBox1>
                        <StoreInputType1
                            type="text"
                            placeholder="제목을 검색해주세요."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <StoreInputType2
                            type="text"
                            placeholder="YYYY. MM.DD"
                        ></StoreInputType2>
                        <StoreButtonType1 onClick={handleSearch}>검색</StoreButtonType1>
                    </StoreMenuHeader>

                    {/* todo: 정렬 순서
                        - 최소주문금액  순서
                        - 배달팁 낮은 순
                        - 평점 높은 순
                        */}
                    {/*<button>최소주문금액 5000원이하</button>*/}
                    {/*<button>최소주문금액 10000원이하</button>*/}
                    {/*<button>최소주문금액 15000원이하</button>*/}
                    {/*<button>최소주문금액 20000원이하</button>*/}
                    {/*<button>배달팁</button>*/}
                    {/*<button>평점</button>*/}

                    <StoreMenuBar>
                        <StoreMenuSectionType1 className="store-list">
                            {stores.map(store => (
                                <div key={store.storeId} className="store-item">
                                    <LinkType1 to={`/store/${store.storeId}`}>
                                        <StoreMenuSectionType2>
                                            <StoreMenuSectionImage1
                                                src={store.simage}
                                                alt="가게 썸네일"
                                                onError={(e) => {
                                                    e.target.onerror = null; // 이후 재시도 방지
                                                    e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                }}
                                            />
                                            <StoreMenuSectionType3>
                                                <StoreMenuTextTpye2>{store.sname}</StoreMenuTextTpye2>

                                                <StoreMenuSectionType4>
                                                    <PType>⭐{store.sgrade}</PType>
                                                    <PType>리뷰 {formatNumberWithCommas(store.sreview)}</PType>
                                                </StoreMenuSectionType4>
                                                <StoreMenuSectionType5>
                                                    <PType2>배달  {store.stime}</PType2>
                                                    <PType2>최소주문 {formatNumberWithCommas(store.sorderMinimum)}원</PType2>
                                                    <PType2>배달팁  {store.stip}원</PType2>
                                                </StoreMenuSectionType5>
                                            </StoreMenuSectionType3>
                                            <StoreMenuSectionType6><StoreMenuImgType2 src={Icon} alt="아이콘 이미지" /> 주문하기</StoreMenuSectionType6>
                                        </StoreMenuSectionType2>
                                    </LinkType1>
                                </div>
                            ))}
                        </StoreMenuSectionType1>

                        <StoreMenu>
                            <StoreMenuHead>M A T N A M O&nbsp;&nbsp; M E N U</StoreMenuHead>
                            <StoreMenuUl>
                                <StoreMenuLi>
                                    <StoreMenuImgType src={menu5} alt="메뉴바 음식 이미지" />
                                    <StoreMenuLink to="/store/category/KOREAN">한식</StoreMenuLink>
                                    <StoreMenuTextTpye>#든든한 한끼 #밥심</StoreMenuTextTpye>
                                </StoreMenuLi>

                                <StoreMenuLi>
                                    <StoreMenuImgType src={menu6} alt="메뉴바 음식 이미지" />
                                    <StoreMenuLink to="/store/category/JAPANESE">일식</StoreMenuLink>
                                    <StoreMenuTextTpye>#데이트 #초밥</StoreMenuTextTpye>
                                </StoreMenuLi>
                                <StoreMenuLi>
                                    <StoreMenuImgType src={menu4} alt="메뉴바 음식 이미지" />
                                    <StoreMenuLink to="/store/category/CHINESE">중식</StoreMenuLink>
                                    <StoreMenuTextTpye>#짜장면 #탕수육은 찍먹</StoreMenuTextTpye>
                                </StoreMenuLi>
                                <StoreMenuLi>
                                    <StoreMenuImgType src={menu3} alt="메뉴바 음식 이미지" />
                                    <StoreMenuLink to="/store/category/NIGHT">야식</StoreMenuLink>
                                    <StoreMenuTextTpye>#맛있으면 0칼로리</StoreMenuTextTpye>
                                </StoreMenuLi>
                                <StoreMenuLi>
                                    <StoreMenuImgType src={menu1} alt="메뉴바 음식 이미지" />
                                    <StoreMenuLink to="/store/category/CHICKEN">치킨</StoreMenuLink>
                                    <StoreMenuTextTpye>#1인1닭 가능 #후라이드</StoreMenuTextTpye>
                                </StoreMenuLi>
                                <StoreMenuLi>
                                    <StoreMenuImgType src={menu2} alt="메뉴바 음식 이미지" />
                                    <StoreMenuLink to="/store/category/PIZZA">피자</StoreMenuLink>
                                    <StoreMenuTextTpye>#피자는 역시 #치즈 듬뿍</StoreMenuTextTpye>
                                </StoreMenuLi>
                            </StoreMenuUl>
                        </StoreMenu>
                    </StoreMenuBar>
                </StoreSection1>

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
                ):(
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
                    <StoreSection1>
                        <StoreMenuHeader>
                            <StoreMenuHeaderType>{category}</StoreMenuHeaderType>
                            <BoardMainInputImageBox1>
                                <BoardMainInputImage1 src={NoticeImage} alt="돋보기 이미지"/>
                            </BoardMainInputImageBox1>
                            <StoreInputType1
                                type="text"
                                placeholder="제목을 검색해주세요."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <StoreInputType2
                                type="text"
                                placeholder="YYYY. MM.DD"
                            ></StoreInputType2>
                            <StoreButtonType1 onClick={handleSearch}>검색</StoreButtonType1>
                        </StoreMenuHeader>

                        {/* todo: 정렬 순서
                        - 최소주문금액  순서
                        - 배달팁 낮은 순
                        - 평점 높은 순
                        */}
                        {/*<button>최소주문금액 5000원이하</button>*/}
                        {/*<button>최소주문금액 10000원이하</button>*/}
                        {/*<button>최소주문금액 15000원이하</button>*/}
                        {/*<button>최소주문금액 20000원이하</button>*/}
                        {/*<button>배달팁</button>*/}
                        {/*<button>평점</button>*/}

                        <StoreMenuBar>
                            <StoreMenuSectionType1 className="store-list">
                                {stores.map(store => (
                                    <div key={store.storeId} className="store-item">
                                        <LinkType1 to={`/store/${store.storeId}`}>
                                            <StoreMenuSectionType2>
                                                <StoreMenuSectionImage1
                                                    src={store.simage}
                                                    alt="가게 썸네일"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // 이후 재시도 방지
                                                        e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                    }}
                                                />
                                                <StoreMenuSectionType3>
                                                    <StoreMenuTextTpye2>{store.sname}</StoreMenuTextTpye2>

                                                    <StoreMenuSectionType4>
                                                        <PType>평점 ⭐{store.sgrade}</PType>
                                                        <PType>리뷰 {formatNumberWithCommas(store.sreview)}</PType>
                                                    </StoreMenuSectionType4>
                                                    <StoreMenuSectionType5>
                                                        <PType2>배달  {store.stime}</PType2>
                                                        <PType2>최소주문 {formatNumberWithCommas(store.sorderMinimum)}원</PType2>
                                                        <PType2>배달팁  {store.stip}원</PType2>
                                                    </StoreMenuSectionType5>
                                                </StoreMenuSectionType3>
                                                <StoreMenuSectionType6><StoreMenuImgType2 src={Icon} alt="아이콘 이미지" /> 주문하기</StoreMenuSectionType6>
                                            </StoreMenuSectionType2>
                                        </LinkType1>
                                    </div>
                                ))}
                            </StoreMenuSectionType1>

                            <StoreMenu>
                                <StoreMenuHead>M A T N A M O&nbsp;&nbsp; M E N U</StoreMenuHead>
                                <StoreMenuUl>
                                    <StoreMenuLi>
                                        <StoreMenuImgType src={menu5} alt="메뉴바 음식 이미지" />
                                        <StoreMenuLink to="/store/category/KOREAN">한식</StoreMenuLink>
                                        <StoreMenuTextTpye>#든든한 한끼 #밥심</StoreMenuTextTpye>
                                    </StoreMenuLi>

                                    <StoreMenuLi>
                                        <StoreMenuImgType src={menu6} alt="메뉴바 음식 이미지" />
                                        <StoreMenuLink to="/store/category/JAPANESE">일식</StoreMenuLink>
                                        <StoreMenuTextTpye>#데이트 #초밥</StoreMenuTextTpye>
                                    </StoreMenuLi>
                                    <StoreMenuLi>
                                        <StoreMenuImgType src={menu4} alt="메뉴바 음식 이미지" />
                                        <StoreMenuLink to="/store/category/CHINESE">중식</StoreMenuLink>
                                        <StoreMenuTextTpye>#짜장면 #탕수육은 찍먹</StoreMenuTextTpye>
                                    </StoreMenuLi>
                                    <StoreMenuLi>
                                        <StoreMenuImgType src={menu3} alt="메뉴바 음식 이미지" />
                                        <StoreMenuLink to="/store/category/NIGHT">야식</StoreMenuLink>
                                        <StoreMenuTextTpye>#맛있으면 0칼로리</StoreMenuTextTpye>
                                    </StoreMenuLi>
                                    <StoreMenuLi>
                                        <StoreMenuImgType src={menu1} alt="메뉴바 음식 이미지" />
                                        <StoreMenuLink to="/store/category/CHICKEN">치킨</StoreMenuLink>
                                        <StoreMenuTextTpye>#1인1닭 가능 #후라이드</StoreMenuTextTpye>
                                    </StoreMenuLi>
                                    <StoreMenuLi>
                                        <StoreMenuImgType src={menu2} alt="메뉴바 음식 이미지" />
                                        <StoreMenuLink to="/store/category/PIZZA">피자</StoreMenuLink>
                                        <StoreMenuTextTpye>#피자는 역시 #치즈 듬뿍</StoreMenuTextTpye>
                                    </StoreMenuLi>
                                </StoreMenuUl>
                            </StoreMenu>
                        </StoreMenuBar>
                    </StoreSection1>

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

export default Store;
