package com.web.ssafy.model.service;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AccountService {

    @Autowired
    AccountRepo accountRepo;

    public Account save(Account account) {
        return accountRepo.save(account);
    }

    public Account getByEmail(String email) {
        return accountRepo.findByEmail(email);
    }

    public Account update(Account account) {
        Account before = this.getByEmail(account.getEmail());
        if (!account.getPassword().equals("")) before.setPassword(account.getPassword());
        if (!account.getPhone().equals("")) before.setPhone(account.getPhone());
        if (!account.getName().equals("")) before.setName(account.getName());

        return before;
    }

    public void delete(String email) {
        accountRepo.deleteByEmail(email);
    }

}
