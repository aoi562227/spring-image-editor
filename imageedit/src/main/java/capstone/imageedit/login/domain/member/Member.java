package capstone.imageedit.login.domain.member;

import capstone.imageedit.util.Aes256Converter;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Member {
//    @Builder

    public Member() {
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //    public Member(String loginId, String password, String name) {
//        this.loginId = loginId;
//        this.password = password;
//        this.name = name;
//    }

    @Id
    private String loginId;
    @Convert(converter = Aes256Converter.class)
    private String password;
    private String name;



//    @NotNull
//    private LocalDateTime createDate;

    @Builder
    public Member(String loginId, String password, String name) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
    }







}
