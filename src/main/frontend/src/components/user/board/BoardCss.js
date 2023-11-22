import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';


export const BoardMainFlexType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  
`

export const BoardMainHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 50px;
`
export  const BoardMainInputType1= styled.input`
  width: 776px;
  height: 52px;
  border-radius: 0px 10px 10px 0px;
  background-color: #F2F2F2;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: black;
  margin-right: 40px;
`

export  const BoardMainInputType2= styled.input`
  width: 244px;
  height: 52px;
  border: 1px solid #BDBDBD;
  font-size: 16px;
  font-weight: 400;
  color: #BDBDBD;
  padding-left: 23px;
  margin-right: 40px;
`

export  const BoardMainButtonType1= styled.button`
  width: 94px;
  height: 52px;
  border-radius: 10px;
  background-color: #000000;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
`

export const BoardMainInputImageBox1=styled.div`
  width: 40px;
  height: 54px;
  background-color: #F2F2F2;
  border-radius: 10px 0px 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const BoardMainInputImage1 = styled.img`
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 24px;
  height: 24px;
`;

export const BoardMainTable1=styled.table`
  width: 1270px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-collapse: collapse;
`

export const BoardMainThead =styled.thead`
  color: black;
  font-weight: 500;
  font-size: 18px;
`

export const BoardMainTr=styled.tr`
  :hover {background-color: #F2D395;}
`

export const BoardMainTh=styled.th`

`
export const BoardMainTbody=styled.tbody`
  font-weight: 400;
  font-size: 16px;
  color: #4F4F4F;
`

export const BoardMainTd=styled.td`
  text-align: center;
  height: 50px;
  border-top: 2px solid #BDBDBD;
  
`

export const BoardMainLink=styled(Link)`
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  color: #4F4F4F;
`

export const WriteButton2 =styled.button`
  width: 180px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #F2F2F2;
  font-weight: 500;
  font-size: 16px;
  background-color: white;
  margin-bottom: 100px;
  cursor: pointer;
  position: relative;
  margin-top: 50px;
  text-align: right;
  padding-right: 15px;
  margin-left: 1100px
`

export const WriteImage3 = styled.img`
  margin: 0px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
  top: 12px;
  
`;

export const Body = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const BodyWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border: 1px solid rgba(0, 0, 0, 20%);
  width: 1200px;
  // height: 1847px;
  padding: 20px;
  box-shadow: 3px 3px 5px #bdbdbd;
  margin: 100px;
  background-color: white;
`;

export const BodyWrapper2 = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  border: 1px solid rgba(0, 0, 0, 20%);
  width: 1200px;
  // height: 1847px;
  padding: 20px;
  box-shadow: 3px 3px 5px #bdbdbd;
  margin: 100px;
  background-color: white;
  padding: 100px;
`;


export const HeaderFont = styled.p`
  font-weight: 700;
  font-size: 36px;
`;

export const SectionWriterPW_Wrapper = styled.div`
  width: 1040px;
  height: 92px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
`;

export const SectionWriterPW_Content_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const SectionWriterPW_Content_Input = styled.input`
  width: 486px;
  height: 52px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Section_Content_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Picture_Content_Wrapper = styled.div`
  width: 282px;
  display: flex;
  flex-direction: row;
  align-items: self-start;
  justify-content: space-between;
  margin-top: 10px;
`;

export const AddressMainOption = styled.div`
  margin-top: 10px;
`;

export const ErrorText_Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ErrorText = styled.span`
  color: red;
  font-weight: 300;
  font-size: 12px;
  margin-left: 10px;
`;

export const Star = styled.span`
  font-width: 200;
  color: #ffd600;
`;

export const FontOptionOne = styled.p`
  font-weight: 600;
  font-size: 16px;
  // margin-top: 50px;
  // margin-bottom: 0px;
`;

export const FontOptionTwo = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-shadow: 3px 3px 5px black;
`;

export const FontOptionThree = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

export const LabelOption = styled.label`
  font-weight: 500;
  font-size: 15px;
  margin-right: 10px;
`;

export const Content_Input_1 = styled.input`
  width: 996px;
  height: 52px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Content_Input_2 = styled.input`
  width: 996px;
  height: 45px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Content_Input_3 = styled.input`
  width: 77px;
  height: 52px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  margin-top: 20px;
`;

export const Content_Textarea_1 = styled.textarea`
  width: 996px;
  height: 480px;
  border: 1px solid #bdbdbd;
  font-size: 17px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Box_1 = styled.div`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  font-size: 12px;
  color: #4f4f4f;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Button_1 = styled.button`
  width: 124px;
  height: 52px;
  background-color: black;
  color: white;
  font-size: 16px;
  margin-left: 15px;
  font-weight: 600;
  cursor: pointer;
`;

export const Button_2 = styled.button`
  width: 179px;
  height: 52px;
  background-color: #ffd600;
  color: black;
  font-size: 16px;
  margin-left: 15px;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;
export const Input_1 = styled.input``;

export const ImgFont = styled.span`
  margin-left: 20px;
`;

export const TableFontType2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 16px;
  color: #4F4F4F;
`

export const TableFontType3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

export const TableImage1 = styled.img`
  margin: 0px;
  margin-right: 6px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 24px;
  height: 24px;
  //position: relative;
  //z-index: 0;
`;

export const TableImage3 = styled.img`
  margin: 0px;
  margin-right: 6px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 26px;
  height: 26px;
  position: relative;
`;

export const TableImage3Click = styled.img`
  margin: 0px;
  margin-right: 6px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 26px;
  height: 26px;
  position: relative;
  cursor: pointer;
`;

export const BoardShowTextImage1 = styled.img`
  margin: 0px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  position: absolute;
  right: -14px;
  bottom : 13px;
  z-index: 0;
`;

export const BoardShowTextType1 = styled.div`\
  width: 344px;
  height: 48px;
  font-weight: 500;
  font-size: 16px;
  color: white;
  position: absolute;
  right: 10px;
  bottom : 26px;
  z-index: 1;
  text-align: end;
`

export const BoardShowTextBoxText = styled.div`
  position: relative;

  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isVisible2 ? 0 : 1)};
`


export const TableImage4 = styled.img`
  margin: 0px;
  margin-right: 6px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 26px;
  height: 26px;
`;

export  const Tdtype1=styled.td`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`
export  const Tdtype4=styled.td`
  text-align: start;
  margin: 0px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 16px;
  color: #828282;
  width: 1200px;
  padding-bottom: 20px;
  border-bottom: 1px solid #BDBDBD;
`

export const BoardShowType=styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
`

export const BoardShowHeaderType=styled.div`
  font-weight: 700;
  font-size: 36px;
  color: black;
  margin-top: 50px;
  margin-bottom:100px;
`

export const BoardShowSectionType=styled.div`
  font-weight: 400;
  font-size: 16px;
  color: black;
 margin-bottom: 100px; 
`

export const BoardShowSectionType2=styled.div`
  font-weight: 400;
  font-size: 16px;
  color: black;
  margin-bottom: 100px; 
  background-color: goldenrod;
  border-radius: 5px;
  color: white;
`

export const BoardShowSectionType3=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 80px;
  
  margin-bottom: 100px; 
  background-color: #e49400;
  border-radius: 5px;
`

export const AType1= styled.a`
  font-weight: 700;
  font-size: 24px;
  color: white;
  text-decoration: none;
`

export const BoardShowA=styled.a`
  margin-left: 85%;
`

export const KakaoMapDiv= styled.div`
  width: 500px;
  height: 400px;
`


export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    const LiType=styled.li`
      display: inline-block;
      margin-right: 20px;
    `

    return (
        <nav>
            <ul>
                {pageNumbers.map((number) => (
                    <LiType key={number}>
                        <a onClick={() => paginate(number)} href="#">
                            {number}
                        </a>
                    </LiType>
                ))}
            </ul>
        </nav>
    );
};

// export const KakaoMapPage = () => {
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=ebbe23daba6a836a93fe27e86edb7706';
//         document.head.appendChild(script);
//
//         script.onload = () => {
//             // Kakao 지도 API 로딩이 완료된 후에 실행되는 부분
//             const container = document.getElementById('map');
//             const options = {
//                 center: new window.kakao.maps.LatLng(33.450701, 126.570667),
//                 level: 3
//             };
//
//             // 지도 생성 및 객체 리턴
//             const map = new window.kakao.maps.Map(container, options);
//         };
//     }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 함
//
//     return (
//         <>
//             <div id="map" style={{ width: '500px', height: '400px' }}></div>
//         </>
//     );
// };
