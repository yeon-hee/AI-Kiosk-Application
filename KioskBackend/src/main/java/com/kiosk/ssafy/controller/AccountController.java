package com.kiosk.ssafy.controller;

import com.kiosk.ssafy.model.dto.Account;
import com.kiosk.ssafy.model.dto.inter.AccountInfo;
import com.kiosk.ssafy.model.dto.inter.AccountName;
import com.kiosk.ssafy.model.service.AccountService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/account")
public class AccountController {

    static Logger logger = LoggerFactory.getLogger(AccountController.class);

    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/getName")
    @ApiOperation(value = "이메일로 이름 검색")
    public AccountName getName(@RequestParam String id){
        logger.info("find name");
        AccountName result = null;
        try {
            result = accountService.findNameById(id);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @GetMapping("/getAccountInfo")
    @ApiOperation(value = "이름으로 직원 조회")
    public List<Account> getAccountInfo(@RequestParam long placeId, @RequestParam String names){
        logger.info("find employees");
        List<Account> result = null;
        List<String> list = new ArrayList<>();
        try {
            StringTokenizer temp = new StringTokenizer(names, ",");
            while (temp.hasMoreTokens()){
                list.add(temp.nextToken());
            }
            result = accountService.findAccountInfo(list, placeId); // account 들어있는
            
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @GetMapping("/SendMessage")
    @ApiOperation(value = "호출된 직원에 메세지 전송")
    public Account SendMessage(@RequestParam long accountId){
        logger.info("send message");
        Account result = null;
        try {
            result = accountService.SendMessage(accountId);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }


}
