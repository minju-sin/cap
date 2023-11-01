package com.cap.controller;

/*
* 가게 카테고리별 목록 페이지 /store/?category={category}
* 가게 상세 페이지 /store/{sname}
*/

import com.cap.domain.delivery.Store;
import com.cap.domain.delivery.StoreRole;
import com.cap.repository.StoreRepository;
import com.cap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/store")
public class StoreController {

    @Autowired private StoreService storeService;
    @Autowired private StoreRepository storeRepository;

    //  가게 카테고리 별 페이지
    @GetMapping
    public List<Store> getStoresByCategory(@RequestParam("category") StoreRole category) {
        // StoreService에서 가게 카테고리에 해당하는 가게 리스트를 가져오는 메서드 구현
        List<Store> stores = storeService.getStoresByCategory(category);
        return stores;
    }

    // 가게 상세 페이지
    @GetMapping("/{storeId}")
    public Store getStoreDetails(@PathVariable Long storeId) {
        // StoreService를 사용하여 가게 상세 정보를 가져옴
        Store store = storeService.getStoreDetails(storeId);
        return store;
    }
}
