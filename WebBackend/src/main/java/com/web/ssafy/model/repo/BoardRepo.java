package com.web.ssafy.model.repo;
import com.web.ssafy.model.dto.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepo extends JpaRepository<Board, Integer> {
    
}
