import {
    AddressMainOption, Box_1, Button_1, Button_2,
    Content_Input_1, Content_Input_2, Content_Input_3, Content_Textarea_1,
    ErrorText,
    ErrorText_Wrapper,
    FontOptionOne,
    HeaderFont, ImgFont, Input_1, LabelOption, Picture_Content_Wrapper,
    Section_Content_Wrapper
} from "../../admin/notice/NoticeDetailCss";
import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StyledNoticeDetail = ({ }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [title1, setTitle1] = useState("");
    const [section, setSection] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [errorSection, setErrorSection] = useState("");








    const handleSubmit = () => {
        const notice = { title, content };

        if (!title1) {
            setErrorTitle("* 제목이 입력되지 않았습니다.");
        } else {
            setErrorTitle("");
        }

        if (!section) {
            setErrorSection("* 내용이 입력되지 않았습니다.");
        } else {
            setErrorSection("");
        }
        if (title1 && section) {
            // 서버로 공지사항 데이터를 보내는 POST 요청
            axios.post('/notice/detail', notice)
                .then(response => {
                    // 공지사항 작성 성공 시 작업을 수행
                    console.log('공지사항이 작성되었습니다.');
                    Swal.fire({
                        title: '성공!',
                        text: '공지사항이 등록되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    });
                    window.location.href = "/notice"; // 게시판 페이지로 리다이렉트

                })
                .catch(error => {
                    // 오류 처리
                    console.error('공지사항 작성 중 오류가 발생했습니다:', error);
                    Swal.fire({
                        title: '오류!',
                        text: '공지사항 작성 중 오류가 발생했습니다',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                });
        }
    }

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

                <ErrorText_Wrapper>
                    <FontOptionOne>주소</FontOptionOne>
                    {/*<ErrorText>{errorAddress}</ErrorText>*/}
                </ErrorText_Wrapper>

                <AddressMainOption>
                    <Content_Input_3
                        placeholder="07250"
                        // onChange={addressOnChange}
                    ></Content_Input_3>
                    <Button_1>우편번호 검색</Button_1>
                </AddressMainOption>
                <Content_Input_1></Content_Input_1>
                <Content_Input_1></Content_Input_1>
                <ErrorText_Wrapper>
                    <FontOptionOne>유튜브</FontOptionOne>
                    {/*<ErrorText>{errorYoutubeLink}</ErrorText>*/}
                </ErrorText_Wrapper>

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

            <Button_2  onClick={handleSubmit}>작성</Button_2>
        </>
    );
};

export default StyledNoticeDetail;