package capstone.imageedit.login.domain.member;

import capstone.imageedit.util.Aes256Converter;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@DynamicUpdate
public class Member {
    // @Builder

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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getStack() {
        return stack;
    }

    public void setStack(String stack) {
        this.stack = stack;
    }

    // public Member(String loginId, String password, String name) {
    // this.loginId = loginId;
    // this.password = password;
    // this.name = name;
    // }

    @Id
    private String loginId;

    @Column
    @Convert(converter = Aes256Converter.class)
    private String password;

    @Column
    private String name;

    @Column
    private String path;

    @Column
    @Lob
    private String stack;
    // @Type(type="json")
    // @Column(columnDefinition = "json")
    // private String json;

    // @NotNull
    // private LocalDateTime createDate;

    @Builder
    public Member(String loginId, String password, String name, String path, String stack) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.path = path;
        this.stack = stack;
    }

}
