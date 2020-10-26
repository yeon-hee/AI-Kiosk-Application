package com.kiosk.ssafy.model.repo;

import com.kiosk.ssafy.model.dto.Account;
import com.kiosk.ssafy.model.dto.AccountName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, String> {

    Optional<AccountName> findNameByEmail(String id);

}
