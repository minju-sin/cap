// src/components/admin/notice/NoticeShow.js

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function NoticeShow() {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState(null);
    const [isLoginNotice, setIsLoginNotice] = useState(false); // 사용자 로그인 아이디와 공지사항 작성자 아이디 확인

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

