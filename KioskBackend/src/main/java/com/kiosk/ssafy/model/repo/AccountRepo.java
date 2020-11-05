package com.kiosk.ssafy.model.repo;

import com.kiosk.ssafy.model.dto.Account;
import com.kiosk.ssafy.model.dto.inter.AccountInfo;
import com.kiosk.ssafy.model.dto.inter.AccountName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Long> {

    Optional<AccountName> findNameByEmail(String id);

    List<AccountInfo> findAccountInfoByName(String name);

    List<Account> findAccountByName(String name);

    Account findByName(String name);
}
