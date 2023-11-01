package com.cap.service;

import com.cap.domain.delivery.Store;
import com.cap.domain.delivery.StoreRole;
import com.cap.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {
    @Autowired private StoreRepository storeRepository;

    public List<Store> getStoresByCategory(StoreRole category) {
        // StoreRepository를 사용하여 해당 카테고리에 해당하는 가게 리스트 가져옴
        return storeRepository.findByStore(category);
    }

    // 가게 상세 정보 가져오기
    public Store getStoreDetails(Long storeId) {
        // StoreRepository를 사용하여 가게 상세 정보 가져옴
        return storeRepository.findById(storeId).orElse(null);
    }
}
