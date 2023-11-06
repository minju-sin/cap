package com.cap.domain.delivery;


import com.cap.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class GroupOrder {
    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 그룹주문 id

    @ManyToOne(fetch = FetchType.LAZY)  // 가게와 다대일 관계
    @JoinColumn(name = "storeId")    //  외래키 storeId와 관련을 맺음
    private Store store;    //  가게


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizerId")
    private User organizer; // 그룹 주문을 생성한 사용자 (호스트)


    @ManyToMany(fetch = FetchType.LAZY) // 참가자와 다대다 관계
    @JoinTable(
            name = "group_order_participants",
            joinColumns = @JoinColumn(name = "group_order_id"),
            inverseJoinColumns = @JoinColumn(name = "userId")
    )
    private Set<User> participants = new HashSet<>(); // 그룹 주문 참가자 목록

    //private List<OrderItem> orderItems; // 주문된 항목 목록
    //private OrderStatus status;

    public void addParticipant(User user) {
        participants.add(user);
        // 선택적으로 참가자 수가 제한을 초과하지 않는지 확인할 수 있습니다.
    }


    public GroupOrder(Long id, Store store, Set<User> participants){
        this.id = id;
        this.store = store;
        this.participants = participants;
    }
}
