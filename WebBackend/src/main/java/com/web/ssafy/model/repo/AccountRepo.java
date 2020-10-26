package com.web.ssafy.model.repo;

import com.web.ssafy.model.dto.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepo extends JpaRepository<Account, String> {


    Account findByEmail(String email);

    void deleteByEmail(String email);
}
