import { useState } from "react";
import {
    Body,
    BodyWrapper,
    HeaderFont,
    SectionWriterPW_Wrapper,
    SectionWriterPW_Content_Wrapper,
    SectionWriterPW_Content_Input,
    Section_Content_Wrapper,
    Picture_Content_Wrapper,
    AddressMainOption,
    Star,
    FontOptionOne,
    FontOptionTwo,
    FontOptionThree,
    LabelOption,
    Content_Input_1,
    Content_Input_2,
    Content_Input_3,
    ImgFont,
    Content_Textarea_1,
    Button_1,
    Button_2,
    Box_1,
    Input_1,
    ErrorText,
    ErrorText_Wrapper,
} from "../components/test2Css";

export default function BorderNew() {
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [section, setSection] = useState("");
    const [address, setAddress] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    const [errorWriter, setErrorWriter] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [errorSection, setErrorSection] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [errorYoutubeLink, setErrorYoutubeLink] = useState("");

    function writerOnChange(event) {
        const value = event.target.value;
        setWriter(value);
        if (event.target.value !== "") {
            setErrorWriter("");
        }
    }
    function passwordOnChange(event) {
        const value = event.target.value;
        setPassword(value);
        if (event.target.value !== "") {
            setErrorPassword("");
        }
    }
    function titleOnChange(event) {
        const value = event.target.value;
        setTitle(value);
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
    function addressOnChange(event) {
        const value = event.target.value;
        setAddress(value);
        if (event.target.value !== "") {
            setErrorAddress("");
        }
    }
    function youtubeLinkOnChange(event) {
        const value = event.target.value;
        setYoutubeLink(value);
        if (event.target.value !== "") {
            setErrorYoutubeLink("");
        }
    }

    function Upload() {
        if (!writer) {
            setErrorWriter("* 이름이 입력되지 않았습니다.");
        } else {
            setErrorWriter("");
        }
        if (!password) {
            setErrorPassword("* 비밀번호가 입력되지 않았습니다.");
        } else {
            setErrorPassword("");
        }

        if (!title) {
            setErrorTitle("* 제목이 입력되지 않았습니다.");
        } else {
            setErrorTitle("");
        }

        if (!section) {
            setErrorSection("* 내용이 입력되지 않았습니다.");
        } else {
            setErrorSection("");
        }

        if (!address) {
            setErrorAddress("* 주소가 입력되지 않았습니다.");
        } else {
            setErrorAddress("");
        }

        if (!youtubeLink) {
            setErrorYoutubeLink("* 유튜브 주소가 입력되지 않았습니다.");
        } else {
            setErrorYoutubeLink("");
        }

        if (writer && password && title && section && address && youtubeLink) {
            alert("게시글이 등록되었습니다.");
        }
    }

    return (
        <Body>
            <title>boards_new</title>
            {/* <div>HEAD</div>
      <div>MENU</div> */}
            <BodyWrapper>
                <HeaderFont>게시물 등록</HeaderFont>

                <SectionWriterPW_Wrapper>
                    <SectionWriterPW_Content_Wrapper>
                        <ErrorText_Wrapper>
                            <FontOptionTwo>
                                작성자 <Star>*</Star>
                            </FontOptionTwo>
                            <ErrorText>{errorWriter}</ErrorText>
                        </ErrorText_Wrapper>

                        <SectionWriterPW_Content_Input
                            placeholder=" 이름을 적어주세요."
                            onChange={writerOnChange}
                        ></SectionWriterPW_Content_Input>
                    </SectionWriterPW_Content_Wrapper>

                    <SectionWriterPW_Content_Wrapper>
                        <ErrorText_Wrapper>
                            <FontOptionThree>비밀번호</FontOptionThree>
                            <ErrorText>{errorPassword}</ErrorText>
                        </ErrorText_Wrapper>

                        <SectionWriterPW_Content_Input
                            placeholder=" 비밀번호를 입력해주세요."
                            onChange={passwordOnChange}
                        ></SectionWriterPW_Content_Input>
                    </SectionWriterPW_Content_Wrapper>
                </SectionWriterPW_Wrapper>

                <Section_Content_Wrapper>
                    <ErrorText_Wrapper>
                        <FontOptionOne>제목</FontOptionOne>
                        <ErrorText>{errorTitle}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Input_1
                        placeholder="제목을 작성해주세요."
                        onChange={titleOnChange}
                    ></Content_Input_1>
                    <ErrorText_Wrapper>
                        <FontOptionOne>내용</FontOptionOne>
                        <ErrorText>{errorSection}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Textarea_1
                        placeholder="내용을 작성해주세요."
                        onChange={sectionOnChange}
                    ></Content_Textarea_1>
                    <ErrorText_Wrapper>
                        <FontOptionOne>주소</FontOptionOne>
                        <ErrorText>{errorAddress}</ErrorText>
                    </ErrorText_Wrapper>

                    <AddressMainOption>
                        <Content_Input_3
                            placeholder="07250"
                            onChange={addressOnChange}
                        ></Content_Input_3>
                        <Button_1>우편번호 검색</Button_1>
                    </AddressMainOption>
                    <Content_Input_1></Content_Input_1>
                    <Content_Input_1></Content_Input_1>
                    <ErrorText_Wrapper>
                        <FontOptionOne>유튜브</FontOptionOne>
                        <ErrorText>{errorYoutubeLink}</ErrorText>
                    </ErrorText_Wrapper>

                    <Content_Input_2
                        placeholder="링크를 복사해주세요."
                        onChange={youtubeLinkOnChange}
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

                <Button_2 onClick={Upload}>등록하기</Button_2>
            </BodyWrapper>
        </Body>
    );
}
