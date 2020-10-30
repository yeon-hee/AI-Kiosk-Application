package com.kiosk.ssafy.model.service;

import com.kiosk.ssafy.model.dto.inter.AccountInfo;
import com.kiosk.ssafy.model.dto.inter.AccountName;
import com.kiosk.ssafy.model.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    AccountRepo accountRepo;

    public AccountName findNameById(String id) {
        return accountRepo.findNameByEmail(id).get();
    }

    public List<AccountInfo> findAccountInfo(List<String> nameList) {
        for (String name : nameList) {
            List<AccountInfo> temp = accountRepo.findAccountInfoByName(name);
            if(temp.size() != 0) return temp;
        }
        return null;
    }
}
