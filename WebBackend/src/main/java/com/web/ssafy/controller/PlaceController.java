package com.web.ssafy.controller;

import java.util.ArrayList;
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
    private AccountService accountService;

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
        List<Place> resultAll = null;
        List<Place> result = new ArrayList<>();
        try {
            resultAll = placeService.getAll();
            for(int i=0;i<resultAll.size();i++) {
                if(resultAll.get(i).getId() == 0) continue;
                else result.add(resultAll.get(i));
            }
        }catch (RuntimeException e){
            logger.error(e.toString());
        }
        return result;
    }

    @GetMapping("/placeByAuth")
    @ApiOperation(value = "영업점 전체 검색")
    public List<Place> getPlaceByAuth(@RequestParam String email, @RequestParam int authority){
        logger.info("get account list");
        List<Place> resultAll = new ArrayList<>();
        List<Place> result = new ArrayList<>();
        try {
            resultAll = placeService.getAll();
            if(authority == 1){ // 어드민
                for(int i = 0; i < resultAll.size(); i++) {
                    if (resultAll.get(i).getID() == 0) continue;
                    else result.add(resultAll.get(i));
                }
            }
            else { // 매니저, 회원
                Account account = accountService.getByEmail(email);
                long placeId = account.getPlace().getId();
                for(int i=0;i<resultAll.size();i++){
                    if(resultAll.get(i).getId() == placeId){
                        result.add(resultAll.get(i));
                    }
                }
            }
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
