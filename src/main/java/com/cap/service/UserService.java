package com.cap.service;

import com.cap.domain.User;
import com.cap.repository.ArticleRepository;
import com.cap.repository.GroupOrderRepository;
import com.cap.repository.OrderItemRepository;
import com.cap.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private ArticleRepository articleRepository;
    @Autowired private GroupOrderRepository groupOrderRepository;
    @Autowired private OrderItemRepository orderItemRepository;

    // 회원 정보 수정 서비스
    public User updateUserProfile(User updatedUser) {
        // 업데이트할 사용자 정보를 가져오거나 새로운 사용자 정보를 생성
        User user = userRepository.findById(updatedUser.getUserId()).orElse(new User());

        // 업데이트할 필드 설정
        user.setDepartment(updatedUser.getDepartment());
        user.setPassword(updatedUser.getPassword());
        user.setPhone(updatedUser.getPhone());
        user.setAddress(updatedUser.getAddress());
        user.setDetailsAddress(updatedUser.getDetailsAddress());

        // 사용자 정보 업데이트
        User updatedUserInfo = userRepository.save(user);

        return updatedUserInfo;
    }

    // 탈퇴 서비스
    @Transactional
    public boolean deleteUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                // 먼저 해당 사용자와 관련된 Article 레코드를 삭제
                articleRepository.deleteByUser(user);

                // todo:그룹주문에서 호스트와 참가자도 같은거 있으면 삭제 - 호스트와 겹치면 해당하는 GroupOrder 레코드 삭제
                //groupOrderRepository.deleteByUser(user);

                // 주문내역에서 해당 사용자와 관련된 OrderItem 레코드 삭제
                orderItemRepository.deleteByUser(user);
                // DB에서 사용자 삭제
                userRepository.delete(user);

                // 세션 만료
                session.invalidate();
                return true;
            }
        }

        return false;
    }

}
