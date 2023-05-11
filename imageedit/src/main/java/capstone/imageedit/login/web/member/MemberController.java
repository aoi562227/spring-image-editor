package capstone.imageedit.login.web.member;

import capstone.imageedit.login.domain.member.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


//@RequiredArgsConstructor
@RestController
@Slf4j
//@ResponseBody
//@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

//    @ResponseBody
    @PostMapping("/signUp")
    public String signUp(@RequestBody Member member) {
//        MemberDto member = new MemberDto(req.get("loginId"), req.get("password"), req.get("name"));
//        System.out.println("req = " + req);
//        System.out.println((member.toString()));

//        log.info(member.getLoginId());
//        log.info(member.getPassword());
//        log.info(member.getName());
        return memberService.join(member);
    }
}


