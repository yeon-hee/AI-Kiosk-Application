package com.web.ssafy.controller;

import com.web.ssafy.model.dto.Board;
import com.web.ssafy.model.service.BoardService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/board")
public class BoardController {

    static Logger logger = LoggerFactory.getLogger(BoardController.class);

    private BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService){
        this.boardService = boardService;
    }

    @GetMapping("/boardList")
    @ApiOperation(value = "공지사항 전체 검색")
    public List<Board> getBoardList(){
        logger.info("get board list");
        List<Board> result = null;
        try {
            result = boardService.getAll();
        }catch (RuntimeException e){
            logger.error(e.toString());
        }
        return result;
    }

    @PostMapping("registBoard")
    @ApiOperation(value = "공지사항 등록")
    public Board registBoard(@RequestBody Board board){
        logger.info("save board");
        Board result = null;
        try {
            result = boardService.save(board);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }
        return result;
    }
}
