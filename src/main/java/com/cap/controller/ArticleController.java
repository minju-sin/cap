package com.cap.controller;

import com.cap.domain.Article;
import com.cap.domain.User;
import com.cap.repository.ArticleRepository;
import com.cap.service.ArticleService;
import jakarta.servlet.http.HttpSession;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/*
* 게시판 페이지 /board
* 게시글 작성 페이지 /board/detail
* 게시글 상세 페이지    /board/{articleId}
* 게시글 수정    /board/{articleId}/update
* 게시글 삭제    /board/{articleId}/delete
*/

@RestController
@RequestMapping("/board")
public class ArticleController {

    @Autowired private ArticleService articleService;
    @Autowired private ArticleRepository articleRepository;

    // 게시판 페이지
    @GetMapping
    public List<Article> getArticles() {
        // 게시글 목록을 서비스를 통해 가져옵니다.
        List<Article> articles = articleService.getAllArticles();
        return articles;
    }


    //  게시글 작성 페이지
    @GetMapping("/detail")
    public Map<String, String> Article(){
        Map<String, String> response = new HashMap<>();
        response.put("article", "게시글 작성 페이지");

        return response;
    }


    //  게시글 저장 처리
    @PostMapping("/detail")
    public ResponseEntity<String> createArticle(@RequestBody Article article, HttpSession session) {
        // 세션에서 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");

        if (loggedInUser != null) {
            // 게시글에 사용자 정보 설정
            article.setUser(loggedInUser);

            // 현재 날짜와 시간을 설정
            article.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            // 게시글을 데이터베이스에 저장
            articleRepository.save(article);

            return ResponseEntity.ok("게시글이 작성되었습니다.");
        } else {
            // 로그인되지 않은 경우 로그인 페이지로 리디렉션
            return ResponseEntity.ok("로그인이 필요합니다.");
        }
    }


    // 게시글 상세 페이지
    @GetMapping("/{articleId}")
    public ResponseEntity<Article> getArticleDetail(@PathVariable Long articleId) {
        // articleId를 사용하여 게시물 데이터베이스에서 게시물을 찾음
        Article article = articleService.getArticleById(articleId);

        if (article != null) {
            return ResponseEntity.ok(article);
        } else {
            // 게시물을 찾을 수 없는 경우, 에러 반환
            return ResponseEntity.notFound().build();
        }
    }


    // 게시글 삭제 처리
    @PostMapping("/{articleId}/delete")
    public ResponseEntity<String> deleteArticle(@PathVariable Long articleId, HttpSession session) {
        // 게시글 삭제 서비스 호출
        boolean deleted = false;

        // 현재 세션에서 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");

        if (loggedInUser != null) {
            // 로그인한 사용자의 아이디와 게시글 작성자의 아이디 비교
            Article article = articleRepository.findById(articleId).orElse(null);
            if (article != null && article.getUser().getUserId().equals(loggedInUser.getUserId())) {
                // 게시글 삭제 서비스 호출
                deleted = articleService.deleteArticle(articleId);
            }
        }

        if (deleted) {
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("게시글 삭제 중 오류가 발생했습니다.");
        }
    }


}
