import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GroupOrderDetail() {
    /* 주문 내역 */
    const [groupedOrders, setGroupedOrders] = useState({});
    const { groupOrderId } = useParams();
    const [storeInfo, setStoreInfo] = useState({ name: "", deliveryTip: 0 }); // 가게 정보 상태 변수
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);  //  주문 목록 전체 금액 상태 변수

    /* 호스트정보(이름 + 연락처) + 배달지 + 요청사항 */
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");


    // 가게 정보를 불러오는 함수
    const fetchStoreInfo = async () => {
        try {
            const response = await axios.get(`/order/store-info/${groupOrderId}`);
            setStoreInfo({
                name: response.data.name,
                deliveryTip: response.data.deliveryTip
            });
        } catch (error) {
            console.error('가게 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    //  배달지 + 요청사항 추가 처리하는 함수
    const handleSubmit = () => {
        axios.post(`/order/${groupOrderId}/update`, { deliveryAddress, detailAddress, specialInstructions })
            .then((response) => {
                // 추가 성공 시 주문 완료 메시지를 화면에 띄어주고 싶어
                Swal.fire({
                    title: '주문 완료',
                    icon: 'success',
                    confirmButtonText: '닫기'
                });
                window.location.href = '/';
                console.log('주문이 완료되었습니다.');
            })
            .catch((error) => {
                Swal.fire({
                    title: '주문 실패',
                    text: '다시 입력하세요!',
                    icon: 'error',
                    confirmButtonText: '닫기'
                });
                console.error('배달지 입력에 실패하였습니다. : ', error);
            });
    };

    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setDeliveryAddress(data.address);
            },
        }).open();
    };

    //  groupOrderId에서 userId 별로 그룹화하여 주문 내역 보여주는 함수
    const groupOrdersByUserId = (orders, deliveryTip) => {
        const grouped = orders.reduce((acc, order) => {
            const orderTotal = order.mmoney * order.quantity;
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    username: order.username,
                    orders: [order],
                    totalAmount: orderTotal
                };
            } else {
                acc[order.userId].orders.push(order);
                acc[order.userId].totalAmount += orderTotal;
            }
            return acc;
        }, {});

        // 사용자별로 나눈 배달팁 계산
        const userCount = Object.keys(grouped).length;
        const tipPerUser = deliveryTip / userCount;

        // 각 사용자의 총액에 배달팁을 더함
        Object.values(grouped).forEach(group => {
            group.totalAmount += tipPerUser;
        });

        return grouped;
    };

    // 주문 데이터를 groupOrderId 별로 불러오는 함수
    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`/order/items/${groupOrderId}`);
            const grouped = groupOrdersByUserId(response.data, storeInfo.deliveryTip);
            setGroupedOrders(grouped);
        } catch (error) {
            console.error('주문 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        // 호스트 이름을 가져와 상태에 저장
        axios
            .get("/get-user-name")
            .then((response) => {
                setUsername(response.data);
            })
            .catch((error) => {
                // 에러 처리
            });

        // 호스트 연락처 가져와 상태에 저장
        axios
            .get("/get-user-phone")
            .then((response) => {
                setPhone(response.data);
            })
            .catch((error) => {
                // 에러 처리
            });

        if (groupOrderId) {
            fetchStoreInfo().then(() => {
                fetchOrderItems();  // 주문 목록 불러오기
            });
        }
    }, [groupOrderId, storeInfo.deliveryTip, fetchOrderItems]);

    // groupedOrders가 변경될 때마다 전체 주문표의 총액 계산
    useEffect(() => {
        const total = Object.values(groupedOrders).reduce((sum, group) => {
            return sum + group.totalAmount;
        }, 0);
        setTotalOrderPrice(total);
    }, [groupedOrders]);

    return (
        <div>
            <h1>배달지 입력 페이지</h1>
            <p>배달지 + 요청사항 입력창이 보이고, 주문표를 옆에 보여준다.</p>
            <div className="order-list">
                <h2>주문 내역</h2>
                <p>가게 이름: {storeInfo.name}</p>
                {Object.entries(groupedOrders).map(([userId, group]) => (
                    <div key={userId}>
                        <h3>{group.username}</h3>
                        {group.orders.map((order, index) => (
                            <div key={index}>
                                <span>{order.mname} - 수량: {order.quantity}개 - 총액: {formatNumberWithCommas(order.mmoney * order.quantity)}원</span>
                            </div>
                        ))}
                        <p>{group.username}님의 주문 총액(배달팁 포함): {formatNumberWithCommas(group.totalAmount)}원</p>
                    </div>
                ))}
                <p>배달 팁: {formatNumberWithCommas(storeInfo.deliveryTip)}원</p>
                <p>전체 주문표 총액: {formatNumberWithCommas(totalOrderPrice)}원</p>
            </div>

            <div className="delivery-information">
                <h2>호스트(이름, 연락처) + 배달지 + 요청사항 </h2>
                <input type="text" value={username} readOnly />
                <input type="text" value={phone} readOnly />
                <input type="text" value={deliveryAddress} readOnly />
                <button type="button" onClick={openAddressSearch}>
                    검색
                </button>

                <input
                    placeholder=" 상세 주소"
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                />

                <input
                    placeholder="요청 사항"
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}> 주문하기 </button>
            </div>
        </div>
    );
}

export default GroupOrderDetail;
