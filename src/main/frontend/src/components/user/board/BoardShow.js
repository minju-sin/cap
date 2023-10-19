// src/components/user/board/BoardShow.js

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function BoardShow() {
    const { articleId } = useParams(); // URL에서 articleId를 가져옴
    const [article, setArticle] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // 게시글 상세 정보를 가져오는 API 엔드포인트로 요청 보내기
        axios.get(`/board/${articleId}`)
            .then((response) => {
                setArticle(response.data); // 가져온 데이터를 상태에 저장
            })
            .catch((error) => {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            });

    }, [articleId]);

    // 게시글 삭제
    const handleDelete = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            // 게시글 삭제 API 호출
            axios.post(`/board/${articleId}/delete`)
                .then((response) => {
                    // 삭제 성공 시, 다른 페이지로 리다이렉트
                    window.location.href = '/board';
                })
                .catch((error) => {
                    console.error('게시글 삭제 중 오류가 발생했습니다:', error);
                });
        }
    };

    return (
        <div>
            <h1>게시글 상세 페이지</h1>
            {article ? (
                <div>
                    {/*제목*/}
                    <h2>{article.title}</h2>
                    {/*작성자*/}
                    <p>{article.user.username}</p>
                    {/*작성일*/}
                    <p>{new Date(article.createdAt).toLocaleTimeString('en-US', { hour12: false })}</p>
                    {/*내용*/}
                    <p>{article.content}</p>

                    <div>
                            <button type="button">게시글 수정</button>
                            <button type="button" onClick={handleDelete}>게시글 삭제</button>
                    </div>
                </div>
            ) : (
                // 로딩 화면을 보여줌
                <p>게시글을 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default BoardShow;
