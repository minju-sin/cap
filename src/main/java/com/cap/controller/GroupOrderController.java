package com.cap.controller;

import com.cap.domain.delivery.GroupOrder;
import com.cap.domain.User;
import com.cap.domain.delivery.Store;
import com.cap.repository.GroupOrderRepository;
import com.cap.repository.StoreRepository;
import com.cap.service.GroupOrderService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;


@RestController
@RequestMapping("/order")
public class GroupOrderController {

    @Autowired private GroupOrderService groupOrderService;
    @Autowired private GroupOrderRepository groupOrderRepository;
    @Autowired private StoreRepository storeRepository;


    // 'storeId'를 경로 변수로 사용하여 그룹 주문 링크를 생성합니다.
    //  그룹 주문 링크 생성한 사용자 -> 호스트
    @PostMapping("/create-group-order/{storeId}")
    public ResponseEntity<String> createGroupOrderLink(@PathVariable Long storeId, HttpSession session) {
        try {
            // 그룹 주문 링크 생성
            String groupOrderLink = groupOrderService.generateGroupOrderLink(storeId);

            // 그룹 주문 엔티티 생성
            GroupOrder groupOrder = new GroupOrder();

            // 현재 로그인한 사용자 정보 가져오기
            User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴
            if (loggedInUser == null) {
                return ResponseEntity.badRequest().body("로그인한 사용자 정보를 가져올 수 없습니다.");
            }

            // 가게 정보 가져오기
            Store store = storeRepository.findById(storeId).orElse(null);
            if (store == null) {
                return ResponseEntity.badRequest().body("해당 가게 정보를 찾을 수 없습니다.");
            }


            groupOrder.setOrganizer(loggedInUser);  // 사용자 정보를 이용하여 그룹 주문의 호스트로 설정
            groupOrder.setStore(store); // 가게 정보 저장
            groupOrder.setGroupOrderLink(groupOrderLink);

            // 그룹 주문 엔티티를 저장합니다.
            groupOrderRepository.save(groupOrder);

            // 생성된 그룹 주문 링크 반환
            return ResponseEntity.ok(groupOrderLink);
        } catch (Exception e) {
            // 오류 처리 로직을 적절히 구현
            return ResponseEntity.badRequest().body("그룹 주문 링크 생성에 실패했습니다.");
        }
    }


    //  그룹주문 참가자 저장 처리
    // 게시판에 있는 그룹주문 링크 클릭 -> 게시글에 저장된 링크 주소와 groupOrder.groupOrderLink가 동일한지 확인
    //        -> 동일 하다면 해당 링크 주소의 그룹 아이디 가져옴
    // 링크를 통한 그룹 주문 참가 처리
    @PostMapping("/join")
    public ResponseEntity<?> joinGroupOrder(@RequestBody Map<String, String> payload, HttpSession session) {
        String orderLink = payload.get("orderLink");
        GroupOrder groupOrder = groupOrderService.findByGroupOrderLink(orderLink);

        // 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴
        if (loggedInUser == null) {
            return ResponseEntity.badRequest().body("로그인한 사용자 정보를 가져올 수 없습니다.");
        }

        if (groupOrder != null) {

            groupOrder.addParticipant(loggedInUser);
            groupOrderRepository.save(groupOrder);
            return ResponseEntity.ok("그룹 주문에 참가하셨습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 링크의 그룹 주문을 찾을 수 없습니다.");
        }
    }

}
