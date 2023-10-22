// src/components/user/board/BoardShow.js

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function BoardShow() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoginArticle, setIsLoginArticle] = useState(false); // 사용자 로그인 아이디와 게시글 작성자 아이디 확인

    useEffect(() => {
        // 게시글 상세 정보를 가져오는 API 엔드포인트로 요청 보내기
        axios.get(`/board/${articleId}`)
            .then((response) => {
                setArticle(response.data);

            })
            .catch((error) => {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            });

        // 게시글 수정, 삭제 버튼을 게시글 작성자 본인만 이용할 수 있도록 함
        axios.get(`/board/check-login-Article/${articleId}`)
            .then(response => {
                if (response.data === 'loginArticle') {
                    setIsLoginArticle(true);
                } else {
                    setIsLoginArticle(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });
    }, [articleId]);

    const handleDelete = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            axios.post(`/board/${articleId}/delete`)
                .then((response) => {
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
            <Link to={`/board`}>
                <button type="button">이전 페이지 이동</button>
            </Link>
            <Link to={`/`}>
                <button type="button">메인 페이지 이동</button>
            </Link>
            {article ? (
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.user.username}</p>
                    <p>{new Date(article.createdAt).toLocaleTimeString('en-US', { hour12: false })}</p>
                    <p>{article.content}</p>

                    {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}
                    {isLoginArticle && (
                        <div>
                            <Link to={`/board/${articleId}/update`}>
                                <button type="button">게시글 수정</button>
                            </Link>
                            <button type="button" onClick={handleDelete}>게시글 삭제</button>
                        </div>
                    )}

                </div>
            ) : (
                <p>게시글을 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default BoardShow;

