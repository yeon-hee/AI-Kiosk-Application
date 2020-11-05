package com.kiosk.ssafy.model.service;

import com.kiosk.ssafy.model.dto.Account;
import com.kiosk.ssafy.model.dto.inter.AccountInfo;
import com.kiosk.ssafy.model.dto.inter.AccountName;
import com.kiosk.ssafy.model.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    AccountRepo accountRepo;

    public AccountName findNameById(String id) {
        return accountRepo.findNameByEmail(id).get();
    }

    public List<Account> findAccountInfo(List<String> nameList, long placeId) {

        List<Account> result = new ArrayList<>();

        for (String name : nameList) {
            List<Account> account = accountRepo.findAccountByName(name);
            for (Account person : account) {
                if (person.getPlace().getId() == placeId) {
                    result.add(person);
                }
            }
            if (result.size() != 0)
                return result;
        }
        return null;
    }

    public Account SendMessage(long accountId) {

        Optional<Account> isAccount = accountRepo.findById(accountId);
        if(isAccount.isPresent()){
            Account account = isAccount.get();
            return account;
        }
     
        return null;
    }

}
