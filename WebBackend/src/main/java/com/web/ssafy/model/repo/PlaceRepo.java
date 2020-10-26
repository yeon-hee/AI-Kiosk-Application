package com.web.ssafy.model.repo;

import com.web.ssafy.model.dto.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepo extends JpaRepository<Place, Long> {
}
