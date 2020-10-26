package com.web.ssafy.controller;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.service.AccountService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/account")
public class AccountController {

    static Logger logger = LoggerFactory.getLogger(AccountController.class);

    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/accountInfo")
    @ApiOperation(value = "이메일로 이름 검색")
    public Account accountInfo(@RequestParam String email){
        logger.info("save account");
        Account result = null;
        try {
            result = accountService.getByEmail(email);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @PostMapping("/registAccount")
    @ApiOperation(value = "회원 등록")
    public Account registAccount(@RequestBody Account account){
        logger.info("save account");
        Account result = null;
        try {
            result = accountService.save(account);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @PutMapping("/update")
    @ApiOperation(value = "회원정보 수정")
    public Account update(@RequestBody Account account){
        logger.info("update account");
        Account result = null;
        try {
            result = accountService.update(account);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "회원 삭제")
    public int delete(@RequestParam String email){
        logger.info("delete account");

        try {
            accountService.delete(email);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return 1;
    }
}
