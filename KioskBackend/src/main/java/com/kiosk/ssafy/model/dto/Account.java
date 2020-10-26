package com.kiosk.ssafy.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Account {
    @Id
    String email;

    String password;
    String name;
    String phone;
    boolean isManager;
    String photo;

    @ManyToOne
    @JoinColumn(name = "place_id")
    @JsonBackReference
    Place place;

}
