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

    public static final int MAX_PARTICIPANTS = 4;

    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 그룹주문 id

    @ManyToOne(fetch = FetchType.LAZY)  // 가게와 다대일 관계
    @JoinColumn(name = "storeId")    //  외래키 storeId와 관련을 맺음
    private Store store;    //  가게

    @Column(nullable = false)
    private String groupOrderLink; // 그룹 주문 링크를 저장할 필드

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

    @Column(name = "max_participants")
    public static int maxParticipants = MAX_PARTICIPANTS; // 최대 참가자 수 설정 (호스트 제외)

    public boolean addParticipant(User user) {
        if (participants.size() < maxParticipants) {
            participants.add(user);
            return true;
        } else {
            return false;
        }
    }

    public GroupOrder(Long id, Store store, String groupOrderLink, User organizer, Set<User> participants, int maxParticipants){
        this.id = id;
        this.store = store;
        this.groupOrderLink = groupOrderLink;
        this.organizer = organizer;
        this.participants = participants != null ? participants : new HashSet<>();
        this.maxParticipants = maxParticipants;
    }


    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }
}
