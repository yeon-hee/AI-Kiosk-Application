package com.web.ssafy.model.dto.inter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.ssafy.model.dto.Account;

import java.sql.Timestamp;

public interface getLogs {
    Timestamp getTime();
    String getAccountEmail();
    String getAccountName();
    String getPlaceName();
}
