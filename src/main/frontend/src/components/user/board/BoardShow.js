// src/components/user/board/BoardShow.js
/*
* 게시글 상세 페이지
* 작성자 본인만 수정, 삭제 가능하도록 구현함
*/
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

    // 주문 링크 클릭을 처리하는 함수
    const handleJoinGroupOrder = (event) => {
        event.preventDefault(); //  링크 이동을 막는 함수
        axios.post(`/order/join`, { orderLink: article.orderLink })
            .then(response => {
                // 성공 응답을 받았을 때 링크로 이동합니다.
                window.location.href = article.orderLink;
                // 백엔드가 어떤 종류의 응답 메시지를 보낸다고 가정합니다.
                alert(response.data.message || '그룹 주문에 참가했습니다!');
            })
            .catch(error => {
                if (error.response) {
                    // 요청은 이루어졌지만 서버가 2xx 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.error('Error response:', error.response.data);
                    // 에러 메시지를 알림으로 표시합니다.
                    alert(error.response.data.message || '참가자 수가 최대라 참여할 수 없습니다.');
                } else if (error.request) {
                    // 요청은 이루어졌지만 응답을 받지 못했습니다.
                    console.error('Error request:', error.request);
                    alert('서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.');
                } else {
                    // 요청을 설정하는 과정에서 오류가 발생했습니다.
                    console.error('Error message:', error.message);
                    alert('요청 중 오류가 발생했습니다.');
                }
            });
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
                    {/* 제목, 작성자, 작성일, 그룹주문링크, 위치, 내용 순서로 나열 */}
                    <h2>{article.title}</h2>
                    <p>{article.user.username}</p>
                    <p>{new Date(article.createdAt).toLocaleTimeString('en-US', { hour12: false })}</p>
                    <p>
                        주문 링크:
                        <a href={article.orderLink} onClick={(event) => handleJoinGroupOrder(event)} rel="noopener noreferrer">
                            {article.orderLink}
                        </a>
                    </p>
                    <p>{article.address}</p>

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

