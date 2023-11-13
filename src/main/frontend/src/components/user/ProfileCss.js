import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const MyPageFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
 
  `
export  const MyPageFlex_2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-right: 2px #FFFFFF solid;
  padding-right:100px;
  padding-bottom: 250px;
`
export const MyPageFlex_3 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-right: 20%;
`
export const MypageFont =styled.div`
  margin-top: 80px;
  margin-bottom: 70px;
  font-size: 24px;
  font-weight: 700;
`

export const MypageFont2=styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`

export const MypageFont3=styled.div`
  font-size: 18px;
  font-weight: 500;
  color:#828282 ;
`

export const MypageFont4=styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color:#4F4F4F ;
`

export const MypageChangeFlex=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  margin-bottom: 20px;
`

export const LinkButtonFont1 = styled(Link)`
  text-decoration: none;
`;

export const HomeImageCss = styled.img`
 width: 30px;
 height: 20px;
   margin: 0px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  margin-right: 5px;
`;

export  const MainPageFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 50px;
`

export  const MyPageInputType = styled.input`
  width: 800px;
  height: 52px;
  background-color: white;
  border: none;
  color:#BDBDBD;
  font-size: 16px;
  font-weight: 400;
`

export  const MyPageInputType2 = styled.input`
  width: 700px;
  height: 52px;
  background-color: white;
  border: none;
  color:#BDBDBD;
  font-size: 16px;
  font-weight: 400;
`


export const FromStyle = styled.form`
  
`

export const ButtonType1 = styled.button`
  width: 80px;
  margin-left: 5px;
  height: 52px;
  background-color: #E49300;
  border: none;
  font-weight: 700;
  color: white;
`

export const ButtonType2 = styled.button`
  width: 80px;
  height: 40px;
  margin-right: 5px;
  margin-bottom: 30px;
  background-color: #E49300;
  border: none;
  font-weight: 700;
  color: white;
`

export  const ButtonFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
