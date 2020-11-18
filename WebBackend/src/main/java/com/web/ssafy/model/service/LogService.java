package com.web.ssafy.model.service;

import com.web.ssafy.model.dto.EnterLogs;
import com.web.ssafy.model.dto.inter.getLogs;
import com.web.ssafy.model.repo.LogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogService {

    private LogRepo logRepo;

    @Autowired
    public LogService(LogRepo logRepo) {
        this.logRepo = logRepo;
    }

    public List<getLogs> getLogList(){
        return logRepo.findAllByOrderByTimeDesc();
    }
}
