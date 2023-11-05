package com.cap.controller;

import com.cap.service.GroupOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class GroupOrderController {

    private final GroupOrderService groupOrderService;

    @Autowired
    public GroupOrderController(GroupOrderService groupOrderService) {
        this.groupOrderService = groupOrderService;
    }

    // 'storeId'를 경로 변수로 사용하여 그룹 주문 링크를 생성합니다.
    @PostMapping("/create-group-order/{storeId}")
    public ResponseEntity<String> createGroupOrderLink(@PathVariable Long storeId) {
        try {
            
            String groupOrderLink = groupOrderService.generateGroupOrderLink(storeId);
            return ResponseEntity.ok(groupOrderLink);
        } catch (Exception e) {
            // 오류 처리 로직을 적절히 구현합니다.
            return ResponseEntity.badRequest().body("그룹 주문 링크 생성에 실패했습니다.");
        }
    }
}
