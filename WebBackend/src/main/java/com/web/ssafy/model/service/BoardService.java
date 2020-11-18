package com.web.ssafy.model.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.web.ssafy.model.dto.Board;
import com.web.ssafy.model.repo.BoardRepo;

@Service
public class BoardService {
    private BoardRepo boardRepo;

    @Autowired
    public BoardService(BoardRepo boardRepo){
        this.boardRepo = boardRepo;
    }

    public List<Board> getAll(){
        return boardRepo.findAll();
    }
    
    public Board save(Board board){
        return boardRepo.save(board);
    }
}

