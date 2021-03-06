package com.kiosk.ssafy.controller;

import com.kiosk.ssafy.model.dto.Account;
import com.kiosk.ssafy.model.dto.EnterLogs;
import com.kiosk.ssafy.model.service.AccountService;
import com.kiosk.ssafy.model.service.LogService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/log")
public class LogController {
    static Logger logger = LoggerFactory.getLogger(LogController.class);

    private LogService logService;
    private AccountService accountService;

    @Autowired
    public LogController(LogService logService, AccountService accountService) {
        this.logService = logService;
        this.accountService = accountService;
    }

    @PostMapping("/saveLog")
    @ApiOperation(value = "로그 저장")
    public EnterLogs saveLog(@RequestBody EnterLogs enterLogs){
        logger.info("save log");
        EnterLogs result = null;
        try {
            Account account = accountService.findByEmail(enterLogs.getAccountEmail());
            enterLogs.setId(account.getId());
            enterLogs.setAccountName(account.getName());
            result = logService.save(enterLogs);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }
}
