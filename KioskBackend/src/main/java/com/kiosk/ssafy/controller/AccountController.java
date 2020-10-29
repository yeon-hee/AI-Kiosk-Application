package com.kiosk.ssafy.controller;

import com.kiosk.ssafy.model.dto.inter.AccountName;
import com.kiosk.ssafy.model.service.AccountService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


}
