package com.kiosk.ssafy.model.service;

import com.kiosk.ssafy.model.dto.EnterLogs;
import com.kiosk.ssafy.model.repo.LogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService {

    private LogRepo logRepo;

    @Autowired
    public LogService(LogRepo logRepo) {
        this.logRepo = logRepo;
    }

    public EnterLogs save(EnterLogs enterLogs){
        return logRepo.save(enterLogs);
    }
}
