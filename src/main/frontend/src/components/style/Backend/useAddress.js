// 카카오 주소 API
import {useState} from "react";

const useAddress = () => {
    const [setAddress] = useState('');

    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setAddress(data.address);
            },
        }).open();
    };

    return { setAddress };
};

export default useAddress;
