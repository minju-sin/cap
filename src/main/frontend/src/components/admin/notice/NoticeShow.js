// src/components/admin/notice/NoticeShow.js
/* 공지사항 상세 페이지
* 관리자만 수정, 삭제 버튼 생성됨
*/

// src/components/admin/notice/NoticeShow.js
/* 공지사항 상세 페이지
* 관리자만 수정, 삭제 버튼 생성됨
*/

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
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
import {
    AddressMainOption,
    BodyWrapper,
    BodyWrapper2,
    Box_1,
    Button_1,
    Button_2,
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
    NoticeShowButtonType,
    NoticeShowButtonType2, NoticeShowButtonType3,
    NoticeShowHeaderType,
    NoticeShowSectionType,
    NoticeShowType,
    Picture_Content_Wrapper,
    Section_Content_Wrapper,
} from "./NoticeDetailCss";
import exampleImage from "../../images/HomeHeaderImage.jpg";
import proImage1 from "../../images/main_pro.png";
import proButtonImage from "../../images/main_pro_button.png";
import proButtonImageClick from "../../images/pro_img_click.png";
import proImage from "../../images/myPro_Image.png"
import logoutImage from "../../images/logout_Image.png"
import facebookImage from "../../images/facebookImage.png"
import instagramImage from "../../images/Instagram.png"
import youtubeImage from "../../images/Youtube.png"
import {TableFontType2, TableFontType4, TableImage1, Tdtype1, Tdtype3, Tdtype4} from "./NoticeCss";
import ProImage2 from "../../images/MyPageImage.png";
import Notice from "./Notice";

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
        if (window.confirm("공지사항을 삭제하시겠습니까?")) {
            axios.post(`/notice/${noticeId}/delete`)
                .then((response) => {
                    window.location.href = '/notice';
                })
                .catch((error) => {
                    console.error('공지사항 삭제 중 오류가 발생했습니다:', error);
                });
        }
    };

    return (
        <div>
            <h1>공지사항 상세 페이지</h1>
            <Link to={`/notice`}>
                <button type="button">이전 페이지 이동</button>
            </Link>
            <Link to={`/`}>
                <button type="button">메인 페이지 이동</button>
            </Link>
            {notice ? (
                <div>
                    <h2>{notice.title}</h2>
                    <p>{notice.user.username}</p>
                    <p>{new Date(notice.createdAt).toLocaleTimeString('en-US', { hour12: false })}</p>
                    <p>{notice.content}</p>

                    {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}
                    {isLoginNotice && (
                        <div>
                            <Link to={`/notice/${noticeId}/update`}>
                                <button type="button">공지사항 수정</button>
                            </Link>
                            <button type="button" onClick={handleDelete}>공지사항 삭제</button>
                        </div>
                    )}

                </div>
            ) : (
                <p>공지사항을 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default NoticeShow;

