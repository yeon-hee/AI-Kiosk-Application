package com.kiosk.ssafy.model.repo;

import com.kiosk.ssafy.model.dto.Account;
import com.kiosk.ssafy.model.dto.EnterLogs;
import com.kiosk.ssafy.model.dto.inter.AccountName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogRepo extends JpaRepository<EnterLogs, Long> {

}
