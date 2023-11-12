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
    // 모달창 내부에 수량을 관리할 상태 변수를 추가
    const [quantity, setQuantity] = useState(1);
    const [orders, setOrders] = useState([]); // 주문 목록 상태 변수
    const [totalPrice, setTotalPrice] = useState(0); // 주문 총 가격 상태 변수
    const [deliveryTip, setDeliveryTip] = useState(0); // 배달팁 상태 변수
    const [groupOrderId, setGroupOrderId] = useState(null); // groupOrderId 상태 추가

    // 수량 증가 함수
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // 수량 감소 함수
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // 주문 목록에 메뉴를 추가하는 함수
    const addToOrder = async (menu, quantity) => {
        if (!groupOrderId) {
            console.error('그룹 주문 ID가 없습니다.');
            return; // groupOrderId가 없으면 early return 처리
        }

        // 백엔드에 전송할 주문 데이터
        const orderData = {
            menuId: menu.menuId,
            quantity: quantity
        };

        try {
            // 백엔드에 주문 아이템 추가 요청
            await axios.post(`/order/add-item/${groupOrderId}`, orderData);

            // 성공적으로 추가된 경우, UI에 반영
            setOrders(currentOrders => [...currentOrders, {
                menuId: menu.menuId,
                mname: menu.mname,
                mmoney: menu.mmoney,
                quantity: quantity
            }]);

            // 총 가격 업데이트
            setTotalPrice(prevTotal => prevTotal + (menu.mmoney * quantity));

            // 주문이 처음 추가될 때만 배달팁을 적용
            if (orders.length === 0 && menus.length > 0) {
                setDeliveryTip(menus[0].store.stip);
            }

            // 모달창 닫기
            setShowModal(false);
        } catch (error) {
            // 오류 처리
            console.error('주문 아이템 추가 중 오류 발생:', error);
        }
    };

    // 주문 목록을 불러오는 함수
    const fetchOrderItems = async () => {
        if (groupOrderId) {
            try {
                const response = await axios.get(`/order/items/${groupOrderId}`);
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('주문 목록이 배열이 아닙니다, 받은 데이터:', response.data);
                }
            } catch (error) {
                console.error('주문 항목을 가져오는 중 오류가 발생했습니다:', error);
            }
        }
    };

    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
        setQuantity(1);
    };

    // 주문 목록을 사용자 ID별로 그룹화하는 함수
    const groupOrdersByUserId = (orders) => {
        return orders.reduce((acc, order) => {
            // 사용자 ID를 기준으로 그룹화
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    username: order.username,
                    orders: []
                };
            }
            acc[order.userId].orders.push(order);
            return acc;
        }, {});
    };

    // 그룹화된 주문 목록을 상태에 저장
    const [groupedOrders, setGroupedOrders] = useState({});

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

        //  groupOrderId 가져옴
        const fetchGroupOrderId = async () => {
            try {
                // 페이지 URL에서 groupOrderLink 추출 (실제 로직에 맞게 조정해야 함)
                const groupOrderLink = window.location.href;

                // 백엔드에 groupOrderLink를 이용해 groupOrderId 요청
                const response = await axios.get('/order/get-group-order-id', {
                    params: { groupOrderLink }
                });

                // 응답으로 받은 groupOrderId를 상태에 저장
                setGroupOrderId(response.data);
            } catch (error) {
                console.error('그룹 주문 ID를 가져오는 중 오류가 발생했습니다:', error);
                // 에러 핸들링 로직 추가
            }
        };

        fetchGroupOrderId(); // 함수 호출
    }, [storeId]);

    useEffect(() => {
        // ... (기존 useEffect 로직)
        fetchOrderItems(); // 주문 목록을 불러옵니다.
    }, [groupOrderId]);

    // 주문 목록 상태가 바뀔 때마다 주문 목록을 그룹화
    useEffect(() => {
        if (Array.isArray(orders)) {
            const grouped = groupOrdersByUserId(orders);
            setGroupedOrders(grouped);
        }
    }, [orders]);


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
                    <div className="quantity-selector">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    {isAuthenticated && (
                        <button onClick={() => addToOrder(selectedMenu, quantity)}>담기</button>
                    )}
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}

            <div>
                <h2 className="order">주문표</h2>
                <div className="order-list">
                    {Object.entries(groupedOrders).map(([userId, group]) => (
                        <div key={userId}>
                            <h3>{group.username} (User ID: {userId})</h3>
                            {group.orders.map((order, index) => (
                                <div key={index}>
                                    <span>{order.mname} - 수량: {order.quantity}개 - 총액: {formatNumberWithCommas(order.mmoney * order.quantity)}원</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button>주문하기</button>
            </div>
        </div>
        </>
    );
}

export default GroupOrderPage;
