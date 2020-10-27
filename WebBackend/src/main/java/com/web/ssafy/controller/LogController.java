package com.web.ssafy.controller;

import com.web.ssafy.model.dto.EnterLogs;
import com.web.ssafy.model.dto.inter.getLogs;
import com.web.ssafy.model.service.LogService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/log")
public class LogController {
    static Logger logger = LoggerFactory.getLogger(LogController.class);

    private LogService logService;

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    @PostMapping("/getLogList")
    @ApiOperation(value = "로그 전체 불러오기")
    public List<getLogs> getLogList(){
        logger.info("save log");
        List<getLogs> result = null;
        try {
            result = logService.getLogList();
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }
}
