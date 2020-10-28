package com.web.ssafy.controller;

import java.util.List;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.dto.Place;
import com.web.ssafy.model.service.AccountService;
import com.web.ssafy.model.service.PlaceService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/place")
public class PlaceController {

    static Logger logger = LoggerFactory.getLogger(PlaceController.class);

    private PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping("/placeInfo")
    @ApiOperation(value = "영업점 상세 검색")
    public Place accountInfo(@RequestParam Long id){
        logger.info("save account");
        Place result = null;
        try {
            result = placeService.getById(id);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @GetMapping("/placeList")
    @ApiOperation(value = "영업점 전체 검색")
    public List<Place> getAccountList(){
        logger.info("get account list");
        List<Place> result = null;
        try {
            result = placeService.getAll();
        }catch (RuntimeException e){
            logger.error(e.toString());
        }
        return result;
    }

    @PostMapping("/registPlace")
    @ApiOperation(value = "영업점 등록")
    public Place registPlace(@RequestBody Place place){
        logger.info("save account");
        Place result = null;
        try {
            result = placeService.save(place);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @PutMapping("/update")
    @ApiOperation(value = "영업점 수정")
    public Place update(@RequestBody Place place){
        logger.info("update account");
        Place result = null;
        try {
            result = placeService.update(place);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return result;
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "영업점 삭제")
    public int delete(@RequestParam Long id){
        logger.info("delete account");

        try {
            placeService.delete(id);
        }catch (RuntimeException e){
            logger.error(e.toString());
        }

        return 1;
    }
}
