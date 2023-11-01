// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios.get('/check-auth')
            .then(response => {
                if (response.data === 'authenticated') {
                    setIsAuthenticated(true);

                    // 사용자 ID를 가져와 상태에 저장
                    axios.get('/get-user-id')
                        .then(response => {
                            setUserId(response.data);
                        })
                        .catch(error => {
                            // 에러 처리
                        });
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                // 요청 실패 처리
            });
    }, []);

    // 로그아웃
    const handleLogout = () => {
        // 서버의 /logout 엔드포인트로 GET 요청을 보내 로그아웃을 수행
        axios.get('/logout')
            .then(response => {
                // 로그아웃 성공 시 클라이언트 상태 초기화 및 원하는 작업 수행
                setIsAuthenticated(false);
                setUserId('');
            })
            .catch(error => {
                // 오류 처리
                console.error('로그아웃 중 오류가 발생했습니다:', error);
            });
    };


    return (
        <div>
            <h1>메인 화면</h1>
            {isAuthenticated ? (
                <div>
                    <p>로그인 후 메인 화면</p>
                    <p>{userId}님 환영합니다!</p>
                    {userId === 'admin' ? (
                        // 관리자 메인 화면 페이지
                        <Link to="/management">사용자 관리</Link>
                    ) : (
                        // 사용자 메인 화면 페이지
                        <Link to="/profile">마이페이지</Link>
                    )}
                    <br />
                    <Link to="/" onClick={handleLogout}>로그아웃</Link>
                    <br />
                    <Link to="/board">게시판</Link>
                    <br />
                    <Link to="/notice">공지사항</Link>
                    <div>
                        <h1>음식 카테고리</h1>
                        <ul>
                            <li>
                                <Link to="/store/category/KOREAN">한식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/JAPANESE">일식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/CHINESE">중식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/NIGHT">야식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/CHICKEN">치킨</Link>
                            </li>
                            <li>
                                <Link to="/store/category/PIZZA">피자</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div>
                    <p>로그인 전 메인 화면</p>
                    <Link to="/login">로그인</Link>
                    <br />
                    <Link to="/signup">회원가입</Link>
                    <br />
                    <Link to="/board">게시판</Link>
                    <br />
                    <Link to="/notice">공지사항</Link>
                    <div>
                        <h1>음식 카테고리</h1>
                        <ul>
                            <li>
                                <Link to="/store/category/KOREAN">한식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/JAPANESE">일식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/CHINESE">중식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/NIGHT">야식</Link>
                            </li>
                            <li>
                                <Link to="/store/category/CHICKEN">치킨</Link>
                            </li>
                            <li>
                                <Link to="/store/category/PIZZA">피자</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
