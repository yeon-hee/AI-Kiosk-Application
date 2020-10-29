package com.web.ssafy.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/face")
public class FaceController {

    @RequestMapping(value = "/setFace", method = RequestMethod.PUT)
    public Object setFace(@RequestBody Object user) {
        
        String response = "";
        response = "Success";

        return response;
    }

}
