package com.cap.service;

import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class GroupOrderService {

    // 실제 로직에 따라 저장소나 다른 방식을 통해 링크를 생성할 수 있습니다.
    public String generateGroupOrderLink(Long storeId) {
        // 여기서는 단순한 예시로 UUID를 사용해 임의의 링크를 생성합니다.
        return "http://localhost:3000/group-order/" + UUID.randomUUID().toString() + "?storeId=" + storeId;
    }
}
