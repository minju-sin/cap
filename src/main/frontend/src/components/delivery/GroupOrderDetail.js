/*
//  src/components/delivery/GroupOrderDetail.js
* 배달지 입력 페이지
* 방장만 입력할 수 있는 페이지이다.
* 모든 사용자가 결제를 성공하면 방장이 배달지 입력 버튼을 눌러 이 페이지로 이동한다.
* 배달지 입력을 성공하면 주문이 된다.
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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

import exampleImage from "../images/HomeHeaderImage.jpg";
import menuImage1 from "../images/ChickenPicture.jpg";
import menuImage2 from "../images/KoreanPicture.png";
import menuImage3 from "../images/Late-night snack picture.jpg";
import menuImage4 from "../images/PizzaPicture.jpg";
import menuImage5 from "../images/SolarEclipsePicture.jpg";
import menuImage6 from "../images/ChinesePicture.jpg";
import proImage1 from "../images/main_pro.png";
import proButtonImage from "../images/main_pro_button.png";
import proButtonImageClick from "../images/pro_img_click.png";
import proImage from "../images/myPro_Image.png"
import logoutImage from "../images/logout_Image.png"
import facebookImage from "../images/facebookImage.png"
import instagramImage from "../images/Instagram.png"
import youtubeImage from "../images/Youtube.png"
import {
    StoreDetailBody,
    StoreDetailStore,
    StoreDetailStoreHeader,
    StoreDetailStoreImage1, StoreDetailStoreText1, StoreDetailStoreText2,
    StoreDetailStoreTitle, StoreDetailStoreTitle2
} from "./StoreDetailCss";
import {
    GroupOrderBar,
    GroupOrderBar2,
    GroupOrderBar3,
    GroupOrderBar4,
    GroupOrderBarButtonType1,
    GroupOrderBarButtonType2,
    GroupOrderBarHeader1,
    GroupOrderBarHeader2,
    GroupOrderBarHeader3,
    GroupOrderBarHr,
    GroupOrderBarSection1,
    GroupOrderBarSection2,
    GroupOrderDetailBox1, GroupOrderDetailButton1, GroupOrderDetailButton2,
    GroupOrderDetailHostBox, GroupOrderDetailHostBox1_1,
    GroupOrderDetailHostBox2, GroupOrderDetailHostBox3, GroupOrderDetailHostBox3_1,
    GroupOrderDetailInput, GroupOrderDetailInput2, GroupOrderDetailInput3,
    GroupOrderDetailText1,
    GroupOrderDetailText2,
    GroupOrderDetailText2_1,
    GroupOrderDetailText3,
    GroupOrderDetailText4,
    GroupOrderDetailText5,
    GroupOrderDetailText6,
    GroupOrderDetailText7, GroupOrderDetailText8,
    GroupOrderDetailTitle,
    GroupOrderDetailTitle2,
    GroupOrderPageMenu,
    GroupOrderPageMenuImage1
} from "./GroupOrderPageCss"
import {HomeImageCss, LinkButtonFont1, MainPageFlex, MypageFont3} from "../user/ProfileCss";
import HomeImage from "../images/HomeImage.png";

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GroupOrderDetail() {
    /* 주문 내역 */
    const [groupedOrders, setGroupedOrders] = useState({});
    const { groupOrderId } = useParams();
    const [storeInfo, setStoreInfo] = useState({ name: "", deliveryTip: 0 , simage: ""}); // 가게 정보 상태 변수
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);  //  주문 목록 전체 금액 상태 변수

    /* 호스트정보(이름 + 연락처) + 배달지 + 요청사항 */
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);
    const [menus, setMenus] = useState([]);
    // 가게 정보를 불러오는 함수
    const fetchStoreInfo = async () => {
        try {
            const response = await axios.get(`/order/store-info/${groupOrderId}`);
            setStoreInfo({
                name: response.data.name,
                deliveryTip: response.data.deliveryTip,
                simage: response.data.simage
            });
        } catch (error) {
            console.error('가게 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
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

    //  배달지 + 요청사항 추가 처리하는 함수
    const handleSubmit = () => {
        axios.post(`/order/${groupOrderId}/update`, { deliveryAddress, detailAddress, specialInstructions })
            .then((response) => {
                // 추가 성공 시 주문 완료 메시지를 화면에 띄어주고 싶어
                Swal.fire({
                    title: '주문 완료',
                    icon: 'success',
                    confirmButtonText: '닫기'
                });
                window.location.href = '/';
                console.log('주문이 완료되었습니다.');
            })
            .catch((error) => {
                Swal.fire({
                    title: '주문 실패',
                    text: '다시 입력하세요!',
                    icon: 'error',
                    confirmButtonText: '닫기'
                });
                console.error('배달지 입력에 실패하였습니다. : ', error);
            });
    };

    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setDeliveryAddress(data.address);
            },
        }).open();
    };

    //  groupOrderId에서 userId 별로 그룹화하여 주문 내역 보여주는 함수
    const groupOrdersByUserId = (orders, deliveryTip) => {
        const grouped = orders.reduce((acc, order) => {
            const orderTotal = order.mmoney * order.quantity;
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    username: order.username,
                    orders: [order],
                    totalAmount: orderTotal
                };
            } else {
                acc[order.userId].orders.push(order);
                acc[order.userId].totalAmount += orderTotal;
            }
            return acc;
        }, {});

        // 사용자별로 나눈 배달팁 계산
        const userCount = Object.keys(grouped).length;
        const tipPerUser = deliveryTip / userCount;

        // 각 사용자의 총액에 배달팁을 더함
        Object.values(grouped).forEach(group => {
            group.totalAmount += tipPerUser;
        });

        return grouped;
    };

    // 주문 데이터를 groupOrderId 별로 불러오는 함수
    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`/order/items/${groupOrderId}`);
            const grouped = groupOrdersByUserId(response.data, storeInfo.deliveryTip);
            setGroupedOrders(grouped);
        } catch (error) {
            console.error('주문 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        // 호스트 이름을 가져와 상태에 저장
        axios
            .get("/get-user-name")
            .then((response) => {
                setUsername(response.data);
            })
            .catch((error) => {
                // 에러 처리
            });

        // 호스트 연락처 가져와 상태에 저장
        axios
            .get("/get-user-phone")
            .then((response) => {
                setPhone(response.data);
            })
            .catch((error) => {
                // 에러 처리
            });

        if (groupOrderId) {
            fetchStoreInfo().then(() => {
                fetchOrderItems();  // 주문 목록 불러오기
            });
        }
    }, [groupOrderId, storeInfo.deliveryTip, fetchOrderItems]);

    // groupedOrders가 변경될 때마다 전체 주문표의 총액 계산
    useEffect(() => {
        const total = Object.values(groupedOrders).reduce((sum, group) => {
            return sum + group.totalAmount;
        }, 0);
        setTotalOrderPrice(total);
    }, [groupedOrders]);

    return (
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
            <GroupOrderBar4>
                <StoreDetailBody>
                    <StoreDetailStore>
                        <GroupOrderBarHeader3>
                            <GroupOrderDetailText1>주문 내역</GroupOrderDetailText1>
                        </GroupOrderBarHeader3>
                        {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                        배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                        {menus.length > 0 ? <StoreDetailStoreHeader>{menus[0].store.sname}</StoreDetailStoreHeader> : null}
                        <StoreDetailStoreTitle>
                            <StoreDetailStoreImage1
                                src={storeInfo.simage}
                                alt="가게 썸네일"
                                onError={(e) => {
                                    e.target.onerror = null; // 이후 재시도 방지
                                    e.target.src = storeImage; // 기본 이미지 경로로 교체
                                }}
                            />
                            <StoreDetailStoreTitle2>
                                <GroupOrderDetailText2>{storeInfo.name}</GroupOrderDetailText2>
                                <GroupOrderDetailTitle className="order-list">
                                    {Object.entries(groupedOrders).map(([userId, group]) => (
                                        <div key={userId}>
                                            <GroupOrderDetailText2_1>{group.username}</GroupOrderDetailText2_1>
                                            {group.orders.map((order, index) => (
                                                <div key={index}>
                                                    {/*<GroupOrderPageMenuImage1*/}
                                                    {/*    src={order.mimage}*/}
                                                    {/*    alt="음식 썸네일"*/}
                                                    {/*    onError={(e) => {*/}
                                                    {/*        e.target.onerror = null; // 이후 재시도 방지*/}
                                                    {/*        e.target.src = storeImage; // 기본 이미지 경로로 교체*/}
                                                    {/*    }}*/}
                                                    {/*/>*/}
                                                    <GroupOrderDetailText3>{order.mname} - 수량: {order.quantity}개 - 총액: <GroupOrderDetailText5>{formatNumberWithCommas(order.mmoney * order.quantity)}원</GroupOrderDetailText5></GroupOrderDetailText3>
                                                </div>
                                            ))}
                                            <GroupOrderDetailText4>{group.username}님의 주문 총액(배달팁 포함): <GroupOrderDetailText5>{formatNumberWithCommas(group.totalAmount)}원</GroupOrderDetailText5></GroupOrderDetailText4>
                                        </div>
                                    ))}
                                </GroupOrderDetailTitle>
                                <GroupOrderDetailTitle2>
                                    <GroupOrderDetailText6>배달 팁: {formatNumberWithCommas(storeInfo.deliveryTip)}원</GroupOrderDetailText6>
                                    <GroupOrderDetailText7>전체 주문표 총액: {formatNumberWithCommas(totalOrderPrice)}원</GroupOrderDetailText7>
                                </GroupOrderDetailTitle2>
                            </StoreDetailStoreTitle2>
                        </StoreDetailStoreTitle>
                    </StoreDetailStore>
                </StoreDetailBody>
            </GroupOrderBar4>

            <GroupOrderDetailBox1 className="delivery-information">
                <GroupOrderDetailHostBox1_1>호스트 정보</GroupOrderDetailHostBox1_1>
                <GroupOrderDetailHostBox3>
                    <GroupOrderDetailText8>이름</GroupOrderDetailText8>
                    <GroupOrderDetailInput type="text" value={username} readOnly />
                    <GroupOrderDetailText8>번호</GroupOrderDetailText8>
                    <GroupOrderDetailInput type="text" value={phone} readOnly />
                </GroupOrderDetailHostBox3>

                <GroupOrderDetailHostBox>배달 정보</GroupOrderDetailHostBox>
                <GroupOrderDetailHostBox3>
                    <GroupOrderDetailText8>주소</GroupOrderDetailText8>
                    <GroupOrderDetailHostBox2>
                        <GroupOrderDetailInput2 type="text" value={deliveryAddress} readOnly />
                        <GroupOrderDetailButton1 type="button" onClick={openAddressSearch}>
                            도로명 검색
                        </GroupOrderDetailButton1>
                    </GroupOrderDetailHostBox2>
                    <GroupOrderDetailInput
                        placeholder=" 상세 주소"
                        type="text"
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                </GroupOrderDetailHostBox3>

                <GroupOrderDetailHostBox>주문시 요청사항</GroupOrderDetailHostBox>
                <GroupOrderDetailHostBox3_1>
                    <GroupOrderDetailInput3
                        placeholder=" 요청 사항"
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                </GroupOrderDetailHostBox3_1>
            </GroupOrderDetailBox1>
            <GroupOrderDetailButton2 type="submit" onClick={handleSubmit}> 주문하기 </GroupOrderDetailButton2>

            <LinkButtonFont1 to={`/`}>
                <MainPageFlex>
                    <HomeImageCss src={HomeImage} alt="홈 이미지"/>
                    <MypageFont3>메인 홈페이지</MypageFont3>
                </MainPageFlex>
            </LinkButtonFont1>

            <Footer>
                <Footer1>
                    <FooterText>MatNaMo</FooterText>
                    <FooterText2>이성민(팀장) : 프로젝트 총괄 기획, 웹 퍼블리셔, 프론트엔드</FooterText2>
                    <FooterText2>우가현(팀원) : 웹 퍼블리셔</FooterText2>
                    <FooterText2>신민주(팀원) : 백엔드, DB설계</FooterText2>
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

export default GroupOrderDetail;
