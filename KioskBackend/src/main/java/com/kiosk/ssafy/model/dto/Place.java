package com.kiosk.ssafy.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String address;
    String phone;

    @JsonIgnore
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    Set<Account> accountSet = new HashSet<>();

}
