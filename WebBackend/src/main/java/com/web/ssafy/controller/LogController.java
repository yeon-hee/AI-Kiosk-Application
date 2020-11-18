package com.web.ssafy.controller;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.dto.EnterLogs;
import com.web.ssafy.model.dto.inter.getLogs;
import com.web.ssafy.model.service.AccountService;
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

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.*;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/log")
public class LogController {
    static Logger logger = LoggerFactory.getLogger(LogController.class);

    private LogService logService;
    
    @Autowired
    private AccountService accountService;

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping("/getLogList")
    @ApiOperation(value = "로그 전체 불러오기")
    public List<getLogs> getLogList(@RequestParam String email, @RequestParam String placeName) {
        logger.info("save log");
        List<getLogs> resultAll = null;
        List<getLogs> result = new ArrayList<>();
        try {
            resultAll = logService.getLogList();
            Account account = accountService.getByEmail(email);
            int authority = account.getAuthority();
            if(authority == 3){ // 회원일때만 - 이름같은거 
                String name = account.getName();
                for (int i = 0; i < resultAll.size(); i++) {
                    if (resultAll.get(i).getPlaceName().equals(placeName) && 
                            resultAll.get(i).getAccountName().equals(name)) {
                        result.add(resultAll.get(i));
                    }
                }
            }
            else { // 매니저, 어드민
                for (int i = 0; i < resultAll.size(); i++) {
                    if (resultAll.get(i).getPlaceName().equals(placeName)) {
                        result.add(resultAll.get(i));
                    }
                }
            }
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }

        return result;
    }

    @GetMapping("/getLogPeriod")
    @ApiOperation(value = "기간 내 로그 불러오기")
    public List<getLogs> getLogPeriod(@RequestParam String email, @RequestParam String placeName, @RequestParam String startDate,
            @RequestParam String endDate) {
        logger.info("save log from time");
        List<getLogs> resultAll = null;
        List<getLogs> result = new ArrayList<>();
        try {
            resultAll = logService.getLogList();
            Account account = accountService.getByEmail(email);
            int authority = account.getAuthority();

            if(authority == 3){ // 회원일때만 - 이름같은거 
                String name = account.getName();
                for (int i = 0; i < resultAll.size(); i++) {
                    if (resultAll.get(i).getPlaceName().equals(placeName) && 
                    resultAll.get(i).getAccountName().equals(name)) {
                        Date startTime = Date.valueOf(startDate);
                        Date endTime = Date.valueOf(endDate);
                        String logTime = resultAll.get(i).getTime().toString().split(" ")[0];
                        Date time = Date.valueOf(logTime);
                        if(startTime.getTime()<=time.getTime() && time.getTime() <= endTime.getTime()){
                            result.add(resultAll.get(i));
                        }
                    }
                }
            }
            else {
                for (int i = 0; i < resultAll.size(); i++) {
                    if (resultAll.get(i).getPlaceName().equals(placeName)) {
                        Date startTime = Date.valueOf(startDate);
                        Date endTime = Date.valueOf(endDate);
                        String logTime = resultAll.get(i).getTime().toString().split(" ")[0];
                        Date time = Date.valueOf(logTime);
                        if(startTime.getTime()<=time.getTime() && time.getTime() <= endTime.getTime()){
                            result.add(resultAll.get(i));
                        }
                    }
                }
            }
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }
}
