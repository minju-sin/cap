//  src/components/delivery/StoreDetail.js

/*
음식점 상세 페이지
* 가게 정보
* 메뉴
* 메뉴 클릭하면 모달창 나옴 -> 모달창에서 `주문 담기` 기능 사용 가능
* 음식점 상세 페이지에서 주문 기능 추가할거임 (단, 주문은 로그인한 상태여야 함)
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import storeImage from "../images/storeImage.png";
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
    BoardMainTr, WriteButton2, WriteImage3, Pagination, TableImage4
} from "../user/board/BoardCss";


import exampleImage from "../images/HomeHeaderImage.jpg";
import proImage1 from "../images/main_pro.png";
import proButtonImage from "../images/main_pro_button.png";
import proButtonImageClick from "../images/pro_img_click.png";
import proImage from "../images/myPro_Image.png"
import logoutImage from "../images/logout_Image.png"
import facebookImage from "../images/facebookImage.png"
import instagramImage from "../images/Instagram.png"
import youtubeImage from "../images/Youtube.png"
import logoImage2 from "../images/LogoImage2.png";
import NoticeImage2 from "../images/NoticeImage2.png";
import NoticeImage from "../images/NoticeImage.png";
import {
    StoreDetailBar,
    StoreDetailBarHeader,
    StoreDetailBarHeaderIcon,
    StoreDetailBarHeaderText, StoreDetailBarHeaderText2, StoreDetailFooter, StoreDetailHeaderIconImage,
    StoreDetailSectionText1, StoreDetailSectionText2
} from "./StoreDetailCss";
import BoardShowImage3 from "../images/BoardShowImage3.png";


// 스타일 태그 내의 CSS - 모달창 디자인
const modalStyle = `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1040;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            background-color: white;
            padding: 20px;
            z-index: 1050;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal h2 {
            margin-top: 0;
            color: #333;
            font-size: 1.5rem;
        }
        
        .menu-modal p {
            color: #666;
            font-size: 1rem;
        }
        
        .menu-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .menu-modal button:hover {
            background-color: #0056b3;
        }
        
        .menu-modal .close-button {
            background-color: #6c757d;
        }
        
        .menu-modal .close-button:hover {
            background-color: #545b62;
        }
        
        @media (max-width: 768px) {
            .menu-modal {
                width: 80%;
                padding: 10px;
            }
        }
        
        @media (max-width: 480px) {
            .menu-modal {
                width: 90%;
                padding: 5px;
            }
        }
    `;

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StoreDetail({ match }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태
    const [menus, setMenus] = useState([]);
    const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보 (모달창으로 보여줌)
    const { storeId } = useParams();
    const [groupOrderUrl, setGroupOrderUrl] = useState(''); // 그룹 주문 URL 상태
    const [articles, setArticles] = useState([]);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);

    const [search, setSearch] = useState(''); // 검색어 상태 추가

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const postsPerPage = 10; // 페이지당 게시물 수

    // 게시물 목록을 현재 페이지에 맞게 가져오는 함수
    const getCurrentPosts = () => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return articles.slice(indexOfFirstPost, indexOfLastPost);
    };

    // 페이지 변경 시 호출되는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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


    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
    };


    useEffect(() => {
        //  가게 메뉴 불러오기
        axios.get(`/store/${storeId}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('가게 메뉴를 불러오는 중 오류가 발생했습니다:', error);
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

        axios.get('/board/orderLink')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('게시글 목록을 가져오는 중 오류가 발생했습니다:', error);
            });
    }, [storeId]);

    // 그룹 주문 링크 함수
    const createGroupOrder = () => {
        axios.post('/order/create-group-order/' + storeId)
            .then(response => {
                const groupOrderLink = response.data;
                setGroupOrderUrl(groupOrderLink);

                // 클립보드에 링크 복사
                navigator.clipboard.writeText(groupOrderLink).then(() => {
                    Swal.fire({
                        title: '그룹주문 링크 복사 성공!',
                        text: '클립보드에 복사되었습니다. 공유하세요!',
                        icon: 'success',
                        confirmButtonText: '닫기'
                    });
                });
            })
            .catch(error => {
                Swal.fire({
                    title: '오류!',
                    text: '그룹 주문 링크 생성 중 오류가 발생했습니다',
                    icon: 'error',
                    confirmButtonText: '닫기'
                });
                console.error('그룹 주문 생성 중 오류가 발생했습니다:', error);
            });

    };


    return (
        <><style>{modalStyle}</style>
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
                <div>
                    <h1>가게 정보</h1>
                    {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                    배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                    {menus.length > 0 ?
                        <img
                            src={menus[0].store.simage}
                            alt="가게 썸네일"
                            onError={(e) => {
                                e.target.onerror = null; // 이후 재시도 방지
                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                            }}
                        /> : null}
                    {menus.length > 0 ? <p>{menus[0].store.sname}</p> : null}
                    {menus.length > 0 ? <p>⭐{menus[0].store.sgrade}</p> : null}
                    {menus.length > 0 ? <p>{formatNumberWithCommas(menus[0].store.sreview)}</p> : null}
                    {menus.length > 0 ? <p>💰{formatNumberWithCommas(menus[0].store.sorderMinimum)}원</p> : null}
                    {menus.length > 0 ? <p>💲{formatNumberWithCommas(menus[0].store.stip)}원</p> : null}
                    {menus.length > 0 ? <p>⏰{menus[0].store.stime}</p> : null}
                    {menus.length > 0 ? <p>{menus[0].store.sopen}</p> : null}
                    {menus.length > 0 ? <p>☎️{menus[0].store.sphone}</p> : null}
                    {menus.length > 0 ? <p>🏠{menus[0].store.saddress}</p> : null}
                </div>

                <h1>가게 메뉴 리스트</h1>
                <div className="menu-list">
                    {menus.map(menu => (
                        <div key={menu.menuId} className="menu-item" onClick={() => toggleModal(menu)}>
                            <img
                                src={menu.mimage}
                                alt="음식 썸네일"
                                onError={(e) => {
                                    e.target.onerror = null; // 이후 재시도 방지
                                    e.target.src = storeImage; // 기본 이미지 경로로 교체
                                }}
                            />
                            {/*  메뉴 이름 - 메뉴 소개 - 가격 순서로 작성함 */}
                            <h2>{menu.mname}</h2>
                            <p>{menu.mintro}</p>
                            <p>{formatNumberWithCommas(menu.mmoney)}원</p>
                        </div>
                    ))}
                </div>

                {/* 모달 내용 추가 */}
                {showModal && selectedMenu && (
                    <div className="menu-modal">
                        <img
                            src={selectedMenu.mimage}
                            alt="음식 썸네일"
                            onError={(e) => {
                                e.target.onerror = null; // 이후 재시도 방지
                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                            }}
                        />
                        <h2>{selectedMenu.mname}</h2>
                        <p>{selectedMenu.mintro}</p>
                        <p>{formatNumberWithCommas(selectedMenu.mmoney)}원</p>
                        {/* "담기" 버튼을 클릭하여 메뉴를 주문표에 추가 */}
                        {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                            <button>담기</button>
                        )}
                        <button onClick={() => setShowModal(false)}>닫기</button>
                    </div>
                )}

                <StoreDetailBar>
                    <StoreDetailBarHeader>
                        <StoreDetailBarHeaderText className="order">주문표</StoreDetailBarHeaderText>
                        {isAuthenticated && (
                            <StoreDetailBarHeaderIcon  onClick={createGroupOrder}>
                                <StoreDetailBarHeaderText2>그룹주문</StoreDetailBarHeaderText2>
                                <StoreDetailHeaderIconImage src={BoardShowImage3} alt="링크 아이콘 이미지"></StoreDetailHeaderIconImage>
                            </StoreDetailBarHeaderIcon>
                        )}
                    </StoreDetailBarHeader>

                    {groupOrderUrl && (
                        <StoreDetailSectionText1>그룹 주문 링크: {groupOrderUrl}</StoreDetailSectionText1>
                    )}
                    <div className="order-list"></div>
                    <StoreDetailFooter className="total-price">
                        <StoreDetailSectionText2>합계 : 원</StoreDetailSectionText2>
                    </StoreDetailFooter>
                </StoreDetailBar>
                <button>주문하기</button>

                <BoardMainFlexType>
                    <h1>게시판</h1>
                    <BoardMainHeader>
                        <BoardMainInputImageBox1>
                            <BoardMainInputImage1 src={NoticeImage} alt="돋보기 이미지"/>
                        </BoardMainInputImageBox1>
                        <BoardMainInputType1
                            type="text"
                            placeholder="제목을 검색해주세요."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                                <BoardMainTh>번호</BoardMainTh>
                                <BoardMainTh>제목</BoardMainTh>
                                <BoardMainTh>작성자</BoardMainTh>
                                <BoardMainTh>날짜</BoardMainTh>
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
                </BoardMainFlexType>

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
        </>
    );
}

export default StoreDetail;