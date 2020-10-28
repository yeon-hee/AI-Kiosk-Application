package com.web.ssafy.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String email;
    String password;
    String name;
    String phone;
    int authority;
    String photo;

    @ManyToOne
    @JoinColumn(name = "place_id")
    @JsonBackReference
    Place place;
}
