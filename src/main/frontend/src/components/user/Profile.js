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

import myPageImage from "../images/MyPageImage.png"
import HomeImage from "../images/HomeImage.png"
import StyledHeaderHome from "../style/Header/StyledHeaderHome";
import StyledFooter from "../style/StyledFooter";
import StyledLoginAfter from "../style/Header/StyledLoginAfter";
import StyledHeaderAfter from "../style/Header/StyledHeaderAfter";
import StyledArrow from "../style/StyledArrow";

function Profile() {
    const [ setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [isBoxVisible, setBoxVisibility] = useState(true);


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
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

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
                                    <ButtonType1 type="button" onClick={openAddressSearch}>검색</ButtonType1>
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

            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>

    );
}

export default Profile;
