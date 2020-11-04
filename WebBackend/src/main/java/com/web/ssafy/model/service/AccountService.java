package com.web.ssafy.model.service;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Account> getById(long id) {
        return accountRepo.findById(id);
    }

    public List<Account> getAccountList() {
        return accountRepo.findAll();
    }
   
    public Account update(Account account) {
        Account before = this.getByEmail(account.getEmail());
        if (!account.getName().equals("")) before.setName(account.getName());
        if (!account.getEmail().equals("")) before.setEmail(account.getEmail());
        if (!account.getPhone().equals("")) before.setPhone(account.getPhone());
        before.setAuthority(account.getAuthority());

        return before;
    }

    public void delete(String email) {
        accountRepo.deleteByEmail(email);
    }

}
