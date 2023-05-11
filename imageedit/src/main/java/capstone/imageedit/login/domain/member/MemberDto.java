package capstone.imageedit.login.domain.member;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Data
public class MemberDto {
    private String loginId;
    private String password;
    private String name;
}
