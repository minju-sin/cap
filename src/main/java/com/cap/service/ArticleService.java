package com.cap.service;

import com.cap.domain.Article;
import com.cap.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired private ArticleRepository articleRepository;

    // 게시글 목록 불러오는 서비스
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public void createArticle(Article article) {
        // 게시글 데이터를 데이터베이스에 저장
        articleRepository.save(article);
    }



}
