package com.web.ssafy.model.dto.inter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.ssafy.model.dto.Account;

import java.sql.Timestamp;

public interface getLogs {
    Timestamp getTime();

    Long getPlace();

    @JsonIgnore
    Account getAccount();

    default Long getAccountId(){
        return getAccount().getId();
    }
}
