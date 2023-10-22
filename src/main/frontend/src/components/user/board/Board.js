// src/components/user/board/Board.js
/*
* 게시판 페이지
* 작성된 게시글을 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않음
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Board() {
    const [articles, setArticles] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태

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
        // Split the datetime string and get the date part (index 0)
        return datetime.split('T')[0];
    };

    return (
        <div>
            <h1>게시판 페이지</h1>
            <Link to={`/`}>
                <button type="button">이전페이지</button>
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
                {articles.map((article, index) => (
                    <tr key={article.id}>
                        <td>{index + 1}</td>
                        <td>
                            {/* 해당 게시글의 상세 페이지로 이동 */}
                            <Link to={`/board/${article.id}`}>{article.title}</Link>
                        </td>
                        <td>{article.user.username}</td>
                        <td>{extractDate(article.createdAt)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                <Link to="/boardDetail">
                    <button>글쓰기</button>
                </Link>
            )}
        </div>
    );
}

export default Board;
