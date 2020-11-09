package com.web.ssafy.controller;

import com.web.ssafy.model.dto.Account;
import com.web.ssafy.model.dto.Place;
import com.web.ssafy.model.service.AccountService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/account")
public class AccountController {

    static Logger logger = LoggerFactory.getLogger(AccountController.class);

    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/getAccountList")
    @ApiOperation(value = "회원 전체 조회")
    public List<Account> getList() throws Exception {
        logger.info("login account");
        List<Account> result = null;
        try {
            result = accountService.getAccountList();
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }
        return result;
    }

    @GetMapping("/getPlaceAccount")
    @ApiOperation(value = "해당 지점 회원 조회")
    public List<Account> getPlaceAccount(@RequestParam int place) throws Exception {
        logger.info("place account");
        List<Account> resultAll = null;
        List<Account> result = new ArrayList<>();

        try {
            //resultAll = accountService.findAllByOrderByAuthorityAsc(); // 권한 오름차순으로 받아오기
            resultAll = accountService.getAccountList(); // 전체 회원 리스트
            for (int i = 0; i < resultAll.size(); i++) {
                Place placeInfo = resultAll.get(i).getPlace();
                if (placeInfo.getId() == place) {
                    result.add(resultAll.get(i));
                }
            }
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }
        return result;
    }

    @GetMapping("/login")
    @ApiOperation(value = "로그인")
    public Account login(@RequestParam String email, @RequestParam String password) throws Exception {
        logger.info("login account");
        Account result = null;
        try {
            result = accountService.getByEmail(email);
            if (result == null)
                throw new Exception("해당 회원이 존재하지 않습니다.");
            System.out.println(result.getPassword());
            if (!result.getPassword().equals(password)) {
                throw new Exception("비밀번호가 일치하지 않습니다.");
            }
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }
        return result;
    }

    @GetMapping("/getAccountById")
    @ApiOperation(value = "아이디로 이름 검색")
    public Account accountInfo(@RequestParam long id) {
        logger.info("get account by id");
        Optional<Account> result = null;
        Account answer = null;
        try {
            result = accountService.getById(id);
            answer = result.get();
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }
        return answer;
    }

    @GetMapping("/accountInfo")
    @ApiOperation(value = "이메일로 이름 검색")
    public Account accountInfo(@RequestParam String email) {
        logger.info("save account");
        Account result = null;
        try {
            result = accountService.getByEmail(email);
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }
        return result;
    }

    @PostMapping("/registAccount")
    @ApiOperation(value = "회원 등록")
    public Account registAccount(@RequestBody Account account) {
        logger.info("save account");
        Account result = null;
        try {
            StringBuilder token = new StringBuilder();
            String key = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^*";
            Random random = new Random();
            for (int i = 0; i < 10; i++) {
                int index = random.nextInt(key.length());

                token.append(key.charAt(index));
            }
            account.setPassword(token.toString());
            result = accountService.save(account);
            String subject = "회원가입 인증 메일"; // 메일 제목
            String message = "환영합니다! 임시비밀번호 : " + token; // 메일 내용

            // SMTP 서버 설정
            final String host = "smtp.gmail.com"; // 사용할 smtp host, naver라면 smtp.naver.com
            final String accountId = "a508whoami";
            final String accountPwd = "admin123!";
            final int port = 465; // SMTP 포트

            String receiver = account.getEmail(); // 받는사람 이메일
            String sender = "ssafy@muticampus.com"; // 보내는사람 이메일

            // Property 정보 생성
            Properties props = System.getProperties();
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.port", port);
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.ssl.enable", "true");
            props.put("mail.smtp.ssl.trust", host);

            // 사용자 인증
            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                    return new javax.mail.PasswordAuthentication(accountId, accountPwd);
                }
            });
            session.setDebug(true);

            Message mimeMessage = new MimeMessage(session); //MimeMesage 생성

            try {
                mimeMessage.setFrom(new InternetAddress(sender));
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(receiver));

                // Message Setting
                mimeMessage.setSubject(subject);
                mimeMessage.setText(message);
                Transport.send(mimeMessage); // Transfer

            } catch (MessagingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } // 보내는 EMAIL (정확히 적어야 SMTP 서버에서 인증 실패되지 않음)

        } catch (RuntimeException e) {
            logger.error(e.toString());
        }

        return result;
    }

    @PutMapping("/update")
    @ApiOperation(value = "회원정보 수정")
    public Account update(@RequestBody Account account) {
        logger.info("update account");
        Account result = null;
        try {
            result = accountService.update(account);
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }

        return result;
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "회원 삭제")
    public int delete(@RequestParam String email) {
        logger.info("delete account");

        try {
            accountService.delete(email);
        } catch (RuntimeException e) {
            logger.error(e.toString());
        }

        return 1;
    }
}
