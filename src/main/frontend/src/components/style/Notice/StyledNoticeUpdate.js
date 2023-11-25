import {
    AddressMainOption, Box_1, Button_1, Button_2,
    Content_Input_1, Content_Input_2, Content_Input_3, Content_Textarea_1,
    ErrorText,
    ErrorText_Wrapper,
    FontOptionOne,
    HeaderFont, ImgFont, Input_1, LabelOption, Picture_Content_Wrapper,
    Section_Content_Wrapper
} from "../../admin/notice/NoticeDetailCss";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";

const StyledNoticeDetail = ({ }) => {
    const [title1, setTitle1] = useState("");
    const [section, setSection] = useState("");

    const [errorTitle, setErrorTitle] = useState("");
    const [errorSection, setErrorSection] = useState("");

    function titleOnChange(event) {
        const value = event.target.value;
        setTitle1(value);
        if (event.target.value !== "") {
            setErrorTitle("");
        }
    }
    function sectionOnChange(event) {
        const value = event.target.value;
        setSection(value);
        if (event.target.value !== "") {
            setErrorSection("");
        }
    }

    const { noticeId } = useParams(); // URL에서 noticeId를 가져옴
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // 공지사항 수정을 위한 초기 데이터 로딩
        axios.get(`/notice/${noticeId}`)
            .then((response) => {
                const noticeData = response.data;
                setTitle(noticeData.title);
                setContent(noticeData.content);
            })
            .catch((error) => {
                console.error('공지사항 데이터를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [noticeId]);

    //  공지사항 수정
    const handleSubmit = () => {
        if (!title1) {
            setErrorTitle("* 제목이 수정 또는 입력되지 않았습니다.");
        } else {
            setErrorTitle("");
        }

        if (!section) {
            setErrorSection("* 내용이 수정 또는 입력되지 않았습니다.");
        } else {
            setErrorSection("");
        }

        if (title1 || section) {
            Swal.fire({
                title: '수정 성공!',
                text: '공지사항 수정하였습니다.',
                icon: 'success',
                confirmButtonText: '확인'
            });
            // 수정된 공지사항 내용을 서버에 보내고 저장하는 로직
            axios.post(`/notice/${noticeId}/update`, { title, content })
                .then((response) => {
                    // 수정 성공 시, 다른 페이지로 리다이렉트 또는 알림 처리
                    window.location.href = '/notice';
                    Swal.fire({
                        title: '수정 성공!',
                        text: '공지사항이 수정되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    });
                    console.log('공지사항이 수정되었습니다.');
                })
                .catch((error) => {
                    console.error('공지사항 수정 중 오류가 발생했습니다:', error);
                    Swal.fire({
                        title: '수정 실패!',
                        text: '공지사항 수정 중 오류가 발생했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                });
        };
    }

    return (
        <>
            <HeaderFont>공지사항</HeaderFont>
            <Section_Content_Wrapper>
                <ErrorText_Wrapper>
                    <FontOptionOne>제목</FontOptionOne>
                    <ErrorText>{errorTitle}</ErrorText>
                </ErrorText_Wrapper>

                <Content_Input_1
                    placeholder="제목을 작성해주세요."
                    type="text"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                        // 다른 이벤트 핸들러 호출
                        titleOnChange(e);
                    }}
                ></Content_Input_1>

                <ErrorText_Wrapper>
                    <FontOptionOne>내용</FontOptionOne>
                    <ErrorText>{errorSection}</ErrorText>
                </ErrorText_Wrapper>

                <Content_Textarea_1
                    placeholder="내용을 작성해주세요."
                    value={content}
                    onChange={e => {
                        setContent(e.target.value);
                        // 다른 이벤트 핸들러 호출
                        sectionOnChange(e);
                    }}

                ></Content_Textarea_1>


                <FontOptionOne>유튜브</FontOptionOne>
                {/*<ErrorText>{errorYoutubeLink}</ErrorText>*/}

                <Content_Input_2
                    placeholder="링크를 복사해주세요."
                    // onChange={youtubeLinkOnChange}
                ></Content_Input_2>

                <FontOptionOne>사진 첨부</FontOptionOne>
                <Picture_Content_Wrapper>
                    <Box_1>
                        <ImgFont>Upload</ImgFont>
                    </Box_1>
                    <Box_1>
                        <ImgFont>Upload</ImgFont>
                    </Box_1>
                    <Box_1>
                        <ImgFont>Upload</ImgFont>
                    </Box_1>
                </Picture_Content_Wrapper>

                <FontOptionOne>메인 설정</FontOptionOne>
                <AddressMainOption>
                    <Input_1 type="radio"></Input_1>
                    <LabelOption>유튜브</LabelOption>

                    <Input_1 type="radio"></Input_1>
                    <LabelOption>사진</LabelOption>
                </AddressMainOption>
            </Section_Content_Wrapper>

            <Button_2  onClick={handleSubmit}>수정</Button_2>
        </>
    );
};

export default StyledNoticeDetail;