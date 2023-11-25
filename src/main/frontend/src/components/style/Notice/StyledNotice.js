import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    NoticeCssBody, NoticeFontType1,
    TableFontType1, TableFontType2, TableImage1, TableImage2, TableLinkType,
    TableType1, TbodyDivType1,
    TbodyType,
    TdContents,
    Tdtype1, Tdtype2, Tdtype3,
    TheadType1,
    ThType1,
    TrType1, WriteButton, WriteImage2
} from "../../admin/notice/NoticeCss.js"

import ProImage from "../../images/MyPageImage.png";
import NoticeImage from "../../images/NoticeImage.png";
import NoticeImage2 from "../../images/NoticeImage2.png";

const StyledNotice = ({ }) => {
    const [notices, setNotices] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // 사용자 로그인 상태

    useEffect(() => {
        axios.get('/notice')
            .then(response => {
                setNotices(response.data);
            })
            .catch(error => {
                console.error('공지사항 목록을 가져오는 중 오류가 발생했습니다:', error);
            });

        // 서버로 사용자가 "admin"인지 확인을 위한 요청 보내기
        axios.get('/check-admin')
            .then(response => {
                if (response.data === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(error => {
                console.error('사용자 권한 확인 중 오류가 발생했습니다:', error);
            });
    }, []);

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
    };

    return (
        <>
            <NoticeCssBody>
                <NoticeFontType1>공지사항</NoticeFontType1>
                <Link to={`/`}>
                    {/*<button type="button">이전페이지(메인페이지로 이동)</button>*/}
                </Link>

                <TableType1>
                    <TheadType1>
                        <TrType1>
                            <ThType1>순번</ThType1>
                        </TrType1>
                    </TheadType1>
                    <TbodyDivType1>
                        <TbodyType>
                            {notices.map((notice, index) => (
                                <TrType1 key={notice.id}>
                                    <Tdtype2>{index + 1}</Tdtype2>
                                    <TdContents>
                                        <Tdtype1>
                                            {/* 해당 게시글의 상세 페이지로 이동 */}
                                            <TableLinkType to={`/notice/${notice.id}`}>{notice.title}</TableLinkType>
                                        </Tdtype1>
                                        <TableFontType1>
                                            <Tdtype1>{extractDate(notice.createdAt)}</Tdtype1>
                                        </TableFontType1>
                                        <TableFontType2>
                                            <TableImage1 src={ProImage} alt="프로필 아이콘 이미지"/>
                                            <Tdtype1>{notice.user.username}</Tdtype1>
                                        </TableFontType2>
                                    </TdContents>
                                    <Tdtype3> <TableImage2 src={NoticeImage} alt="돋보기 이미지"/>공지사항 필독</Tdtype3>
                                </TrType1>
                            ))}
                        </TbodyType>
                    </TbodyDivType1>
                </TableType1>

                {isAdmin && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                    <Link to="/noticeDetail">
                        <WriteButton><WriteImage2 src={NoticeImage2} alt="프로필 아이콘 이미지"/>공지사항 작성하기</WriteButton>
                    </Link>
                )}
            </NoticeCssBody>
        </>
    );
};

export default StyledNotice;
