package com.kiosk.ssafy.model.service;

import com.kiosk.ssafy.model.dto.AccountName;
import com.kiosk.ssafy.model.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    AccountRepo accountRepo;

    public AccountName findNameById(String id){
        return accountRepo.findNameByEmail(id).get();
    }
}
