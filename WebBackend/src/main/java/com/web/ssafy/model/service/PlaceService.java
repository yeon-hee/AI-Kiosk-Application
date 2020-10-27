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

    public Place save(Place place) {
        return placeRepo.save(place);
    }

    public Place getById(Long id) {
        return placeRepo.findById(id).get();
    }

    public Place update(Place place) {
        Place before = this.getById(place.getId());
        if (!before.getName().equals("")) before.setName(place.getName());
        if (!before.getAddress().equals("")) before.setAddress(place.getAddress());
        if (!before.getPhone().equals("")) before.setPhone(place.getPhone());
        return before;
    }

    public void delete(Long id) {
        placeRepo.deleteById(id);
    }

}
