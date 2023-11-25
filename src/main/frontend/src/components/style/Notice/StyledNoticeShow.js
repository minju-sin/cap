import {
    BodyWrapper2,
    HeaderFont, NoticeShowButtonType, NoticeShowButtonType2, NoticeShowButtonType3,
    NoticeShowHeaderType,
    NoticeShowSectionType,
    NoticeShowType
} from "../../admin/notice/NoticeDetailCss";
import {TableFontType2, TableImage1, Tdtype1, Tdtype4} from "../../admin/notice/NoticeCss";
import ProImage2 from "../../images/MyPageImage.png";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StyledNoticeShow = ({ }) => {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState(null);
    const [isLoginNotice, setIsLoginNotice] = useState(false); // 사용자 로그인 아이디와 공지사항 작성자 아이디 확인

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
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

    //  게시글 삭제 함수
    const handleDelete = () => {
        Swal.fire({
            title: '게시글을 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/notice/${noticeId}/delete`)
                    .then((response) => {
                        window.location.href = '/notice';
                    })
                    .catch((error) => {
                        console.error('공지사항 삭제 중 오류가 발생했습니다:', error);
                    });
            }
        });
    };

    return (
        <>
            {notice ? (
                <BodyWrapper2>
                    <HeaderFont>공지사항</HeaderFont>
                    <TableFontType2>
                        <TableImage1 src={ProImage2} alt="프로필 아이콘 이미지"/>
                        <Tdtype1>{notice.user.username}</Tdtype1>
                    </TableFontType2>
                    <Tdtype4>{extractDate(notice.createdAt)} {new Date(notice.createdAt).toLocaleTimeString('en-US', { hour12: false })}</Tdtype4>
                    <NoticeShowType>
                        <NoticeShowHeaderType>{notice.title}</NoticeShowHeaderType>

                        <NoticeShowSectionType>{notice.content}</NoticeShowSectionType>

                    </NoticeShowType>
                </BodyWrapper2>
            ) : (
                <p>공지사항을 불러오는 중입니다...</p>
            )}

            {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}
            {isLoginNotice ? (
                <NoticeShowButtonType3>
                    <Link to={`/notice`}>
                        <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                    </Link>
                    <Link to={`/`}>
                        <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                    </Link>
                    <Link to={`/notice/${noticeId}/update`}>
                        <NoticeShowButtonType2 type="button">수정하기</NoticeShowButtonType2>
                    </Link>
                    <NoticeShowButtonType2 type="button" onClick={handleDelete}>삭제하기</NoticeShowButtonType2>
                </NoticeShowButtonType3>
            ):(
                <NoticeShowButtonType>
                    <Link to={`/notice`}>
                        <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                    </Link>
                    <Link to={`/`}>
                        <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                    </Link>
                </NoticeShowButtonType>
            )}
        </>
    );
};

export default StyledNoticeShow;
