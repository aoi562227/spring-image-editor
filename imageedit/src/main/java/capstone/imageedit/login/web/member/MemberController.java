package capstone.imageedit.login.web.member;

import capstone.imageedit.login.domain.member.Member;
import capstone.imageedit.login.domain.member.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


//@RequiredArgsConstructor
@RestController
@Slf4j
//@ResponseBody
//@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;

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

    @PostMapping("/login")
    @ResponseBody
    public Member login(@RequestBody Member member) throws Exception {
        return memberService.login(member);
    }

    //@PostMapping("/upload")
    @ResponseBody
    @RequestMapping(value="/upload", method=RequestMethod.POST, consumes="multipart/form-data")
    public String upload(MultipartHttpServletRequest req) throws Exception {
        return memberService.uploadService(req);
    }

    @PostMapping("/download")
    @ResponseBody
    public Member download(@RequestBody Member member) {
        return memberService.downloadService(member);
    }
}


