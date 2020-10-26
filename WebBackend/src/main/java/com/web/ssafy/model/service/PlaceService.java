package com.web.ssafy.model.service;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.dto.Place;
import com.web.ssafy.model.repo.AccountRepo;
import com.web.ssafy.model.repo.PlaceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PlaceService {

    @Autowired
    PlaceRepo placeRepo;

    public Place save(Place account) {
        return null;
    }

    public Place getByEmail(String email) {
        return null;
    }

    public Place update(Account account) {
        return null;
    }

    public void delete(String email) {
    }

}
