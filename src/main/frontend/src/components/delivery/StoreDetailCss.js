import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StoreDetailBar = styled.div`
  box-sizing: border-box;
  width: 330px;
  //padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border: 1px solid black;
  border-radius: 0px 0px 10px 10px;
  background-color: white;
`

export const StoreDetailBarHeader= styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #E49400;
  border-radius: 10px 10px 0px 0px;
`
export const StoreDetailBarHeaderText = styled.div`
  color: white;
  margin-left: 20px;
  font-weight: 600;
  font-size: 17px;
`
export const StoreDetailBarHeaderText2 = styled.div`
  color: white;
  margin-right: 3px;
  font-weight: 400;
  font-size: 14px;
`
export const StoreDetailBarHeaderIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const StoreDetailHeaderIconImage = styled.img`
  margin: 0px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 26px;
  height: 26px;
  margin-right: 20px;
`;

export const StoreDetailSectionText1 = styled.div`
  margin: 10px;
  font-size: 12px;
  font-weight: 500;
  color: darkgrey;
`;

export const StoreDetailSectionText2 = styled.div`
  margin: 10px;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export const StoreDetailFooter = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color :  #BDBDBD;
  border-radius: 0px 0px 10px 10px;
  text-align: end;
`;