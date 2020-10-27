package com.kiosk.ssafy.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class EnterLogs {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @JsonIgnore
    @Column(columnDefinition = "Timestamp default CURRENT_TIME()", insertable = false)
    Timestamp time;

    Long place;

    @ManyToOne
    @JoinColumn(name = "account_id")
    Account account;
}
