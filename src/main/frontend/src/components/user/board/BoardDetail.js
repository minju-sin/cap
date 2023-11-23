//  src/components/user/board/BoardDetail.js
/*
* 게시글 작성 페이지
*/

import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
    HomeLogoImage
} from "../../HomeCss";

import {
    AddressMainOption, BodyWrapper,
    Box_1,
    Button_1, Button_2,
    Content_Input_1,
    Content_Input_2,
    Content_Input_3,
    Content_Textarea_1,
    ErrorText,
    ErrorText_Wrapper,
    FontOptionOne,
    HeaderFont,
    ImgFont,
    Input_1,
    LabelOption,
    Picture_Content_Wrapper,
    Section_Content_Wrapper,
} from "../../admin/notice/NoticeDetailCss";

import exampleImage from "../../images/HomeHeaderImage.jpg";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png"
import logoutImage from "../../images/logout_Image.png"
import Swal from "sweetalert2";
import StyledFooter from "../../style/StyledFooter";


function BoardDetail() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [orderLink, setOrderLink] = useState('');
    const [address, setAddress] = useState('');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);

    const [title1, setTitle1] = useState("");
    const [section, setSection] = useState("");

    const [errorTitle, setErrorTitle] = useState("");
    const [errorSection, setErrorSection] = useState("");

    function titleOnChange(event) {
        const value = event.target.value;
        setTitle1(value);
        if (event.target.value !== "") {
            setErrorTitle("");
        }
    }
    function sectionOnChange(event) {
        const value = event.target.value;
        setSection(value);
        if (event.target.value !== "") {
            setErrorSection("");
        }
    }

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


    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setAddress(data.address);
            },
        }).open();
    };

    const handleSubmit = () => {
        const article = { title, content, orderLink, address};

        if (!title1) {
            setErrorTitle("* 제목이 입력되지 않았습니다.");
            Swal.fire({
                title: '작성 실패',
                text: '제목을 입력하세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
        } else {
            setErrorTitle("");
        }

        if (!section) {
            setErrorSection("* 내용이 입력되지 않았습니다.");
            Swal.fire({
                title: '작성 실패',
                text: '내용을 입력하세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
        } else {
            setErrorSection("");
        }
        if (title1 && section) {
            // 서버로 게시글 데이터를 보내는 POST 요청
            axios.post('/board/detail', article)
                .then(response => {
                    // 게시글 작성 성공 시 작업을 수행
                    console.log('게시글이 작성되었습니다.');
                    Swal.fire({
                        title: '성공!',
                        text: '게시글이 등록되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    });
                    window.location.href = "/board"; // 게시판 페이지로 리다이렉트

                })
                .catch(error => {
                    // 오류 처리
                    console.error('게시글 작성 중 오류가 발생했습니다:', error);
                    Swal.fire({
                        title: '오류!',
                        text: '게시글 작성 중 오류가 발생했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                });
        }
    }

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

            <BodyWrapper>
                <HeaderFont>게시글 등록</HeaderFont>
                <Section_Content_Wrapper>
                    <ErrorText_Wrapper>
                        <FontOptionOne>제목</FontOptionOne>
                        <ErrorText>{errorTitle}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Input_1
                        placeholder="제목을 작성해주세요."
                        type="text"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                            // 다른 이벤트 핸들러 호출
                            titleOnChange(e);
                        }}
                    ></Content_Input_1>

                    <ErrorText_Wrapper>
                        <FontOptionOne>내용</FontOptionOne>
                        <ErrorText>{errorSection}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Textarea_1
                        placeholder="내용을 작성해주세요."
                        value={content}
                        onChange={e => {
                            setContent(e.target.value)
                            // 다른 이벤트 핸들러 호출
                            sectionOnChange(e);
                        }}

                    ></Content_Textarea_1>

                    <ErrorText_Wrapper>
                        <FontOptionOne>주소</FontOptionOne>
                        {/*<ErrorText>{errorAddress}</ErrorText>*/}
                    </ErrorText_Wrapper>

                    <AddressMainOption>
                        <Content_Input_3
                            placeholder="07250"
                            // onChange={addressOnChange}
                        ></Content_Input_3>
                        <Button_1 onClick={openAddressSearch}>
                            도로명 검색
                        </Button_1>
                    </AddressMainOption>

                    <Content_Input_1 type="text" placeholder="주소" value={address} readOnly></Content_Input_1>
                    <Content_Input_1 placeholder="상세 주소"></Content_Input_1>
                    <ErrorText_Wrapper>
                        <FontOptionOne>그룹 주문</FontOptionOne>
                        {/*<ErrorText>{errorYoutubeLink}</ErrorText>*/}
                    </ErrorText_Wrapper>

                    <Content_Input_2
                        placeholder="그룹주문 링크를 작성해주세요."
                        value={orderLink}
                        onChange={e => setOrderLink(e.target.value)}
                        // onChange={youtubeLinkOnChange}
                    ></Content_Input_2>

                    <FontOptionOne>사진 첨부</FontOptionOne>
                    <Picture_Content_Wrapper>
                        <Box_1>
                            <ImgFont>Upload</ImgFont>
                        </Box_1>
                        <Box_1>
                            <ImgFont>Upload</ImgFont>
                        </Box_1>
                        <Box_1>
                            <ImgFont>Upload</ImgFont>
                        </Box_1>
                    </Picture_Content_Wrapper>

                    <FontOptionOne>메인 설정</FontOptionOne>
                    <AddressMainOption>
                        <Input_1 type="radio"></Input_1>
                        <LabelOption>유튜브</LabelOption>

                        <Input_1 type="radio"></Input_1>
                        <LabelOption>사진</LabelOption>
                    </AddressMainOption>
                </Section_Content_Wrapper>

                <Button_2  onClick={handleSubmit}>등록하기</Button_2>
            </BodyWrapper>

            <StyledFooter/>
        </HomeBody>
    );
}

export default BoardDetail;
