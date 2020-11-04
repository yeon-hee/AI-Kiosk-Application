package com.web.ssafy.controller;

import com.web.ssafy.model.dto.EnterLogs;
import com.web.ssafy.model.dto.inter.getLogs;
import com.web.ssafy.model.service.LogService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

    @GetMapping("/getLogList")
    @ApiOperation(value = "로그 전체 불러오기")
    public List<getLogs> getLogList(@RequestParam String placeName){
        logger.info("save log");
        List<getLogs> resultAll = null;
        List<getLogs> result = new ArrayList<>();
        try {
            resultAll = logService.getLogList();
            for(int i=0;i<resultAll.size();i++){
                System.out.println(resultAll.get(i).getPlaceName());
                if(resultAll.get(i).getPlaceName().equals(placeName)){
                    result.add(resultAll.get(i));
                }
            }
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }
}
