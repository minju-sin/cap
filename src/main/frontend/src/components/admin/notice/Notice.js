// src/components/admin/notice/Notice.js

/*
* 공지사항 페이지
* 작성된 공지사항 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후 관리자만  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않음
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Notice() {
    const [notices, setNotices] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태

    useEffect(() => {
        axios.get('/notice')
            .then(response => {
                setNotices(response.data);
            })
            .catch(error => {
                console.error('공지사항 목록을 가져오는 중 오류가 발생했습니다:', error);
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

    return (
        <div>
            <h1>공지사항 페이지</h1>
            <Link to={`/`}>
                <button type="button">이전페이지(메인페이지로 이동)</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>순번</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {notices.map((notice, index) => (
                    <tr key={notice.id}>
                        <td>{index + 1}</td>
                        <td>
                            {/* 해당 게시글의 상세 페이지로 이동 */}
                            <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                        </td>
                        <td>{notice.user.username}</td>
                        <td>{extractDate(notice.createdAt)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                <Link to="/noticeDetail">
                    <button>글쓰기</button>
                </Link>
            )}
        </div>
    );
}

export default Notice;
