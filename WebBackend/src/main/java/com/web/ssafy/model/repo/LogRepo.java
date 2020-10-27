package com.web.ssafy.model.repo;

import com.web.ssafy.model.dto.EnterLogs;
import com.web.ssafy.model.dto.inter.getLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepo extends JpaRepository<EnterLogs, Long> {
    List<getLogs> findAllByOrderByTime();
}
