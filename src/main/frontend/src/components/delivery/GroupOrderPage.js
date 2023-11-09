import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리 import

// 스타일 태그 내의 CSS - 모달창 디자인 
const modalStyle = `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1040;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            background-color: white;
            padding: 20px;
            z-index: 1050;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal h2 {
            margin-top: 0;
            color: #333;
            font-size: 1.5rem;
        }
        
        .menu-modal p {
            color: #666;
            font-size: 1rem;
        }
        
        .menu-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .menu-modal button:hover {
            background-color: #0056b3;
        }
        
        .menu-modal .close-button {
            background-color: #6c757d;
        }
        
        .menu-modal .close-button:hover {
            background-color: #545b62;
        }
        
        @media (max-width: 768px) {
            .menu-modal {
                width: 80%;
                padding: 10px;
            }
        }
        
        @media (max-width: 480px) {
            .menu-modal {
                width: 90%;
                padding: 5px;
            }
        }
    `;

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GroupOrderPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태
    const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보 (모달창으로 보여줌)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const storeId = queryParams.get('storeId'); // 쿼리 파라미터에서 storeId를 가져옴
    const [menus, setMenus] = useState([]);

    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
    };

    useEffect(() => {
        //  가게 메뉴 불러오기
        axios.get(`/store/${storeId}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('가게 메뉴를 불러오는 중 오류가 발생했습니다:', error);
            });

        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios.get('/check-auth')
            .then(response => {
                if (response.data === 'authenticated') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });
    }, [storeId]);


    return (
        <>
        <style>{modalStyle}</style>
        <div>
            <h1>그룹 주문 페이지</h1>
            <p>여기서 호스트와 참가자가 같이 주문을 할 수 있도록 함</p>
            <div>
                <h1>가게 정보</h1>
                {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                    배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                {menus.length > 0 ? <p>{menus[0].store.sname}</p> : null}
                {menus.length > 0 ? <p>⭐{menus[0].store.sgrade}</p> : null}
                {menus.length > 0 ? <p>{formatNumberWithCommas(menus[0].store.sreview)}</p> : null}
                {menus.length > 0 ? <p>💰{formatNumberWithCommas(menus[0].store.sorderMinimum)}원</p> : null}
                {menus.length > 0 ? <p>💲{formatNumberWithCommas(menus[0].store.stip)}원</p> : null}
                {menus.length > 0 ? <p>⏰{menus[0].store.stime}</p> : null}
                {menus.length > 0 ? <p>{menus[0].store.sopen}</p> : null}
                {menus.length > 0 ? <p>☎️{menus[0].store.sphone}</p> : null}
                {menus.length > 0 ? <p>🏠{menus[0].store.saddress}</p> : null}
            </div>

            <h1>가게 메뉴 리스트</h1>
            <div className="menu-list">
                {menus.map(menu => (
                    <div key={menu.menuId} className="menu-item" onClick={() => toggleModal(menu)}>

                        {/*  메뉴 이름 - 메뉴 소개 - 가격 순서로 작성함 */}
                        <h2>{menu.mname}</h2>
                        <p>{menu.mintro}</p>
                        <p>{formatNumberWithCommas(menu.mmoney)}원</p>
                    </div>
                ))}
            </div>

            {/* 모달 내용 추가 */}
            {showModal && selectedMenu && (
                <div className="menu-modal">
                    <h2>{selectedMenu.mname}</h2>
                    <p>{selectedMenu.mintro}</p>
                    <p>{formatNumberWithCommas(selectedMenu.mmoney)}원</p>
                    {/* "담기" 버튼을 클릭하여 메뉴를 주문표에 추가 */}
                    {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                        <button>담기</button>
                    )}
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}

            <div>
                <h2 className="order">주문표</h2>
                <div className="order-list"></div>
                <div className="total-price">
                    <span>총 주문 가격: 원</span>
                </div>
                <button>주문하기</button>
            </div>
        </div>
        </>
    );
}

export default GroupOrderPage;
