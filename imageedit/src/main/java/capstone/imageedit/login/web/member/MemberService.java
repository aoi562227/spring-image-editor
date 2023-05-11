package capstone.imageedit.login.web.member;

import capstone.imageedit.login.domain.member.Member;
import capstone.imageedit.login.domain.member.MemberRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public String join(Member member) {
//        Member member = new Member(dto.getLoginId(),dto.getPassword(),dto.getName());
        if (validateDuplicateMember(member)) {
            memberRepository.save(member);
            log.info("join 성공");
            return "성공";
        } else {
            return "이미 존재하는 회원입니다";
        }


    }


    private boolean validateDuplicateMember(Member member) {
        List<Member> findMember =
                memberRepository.findMemberByLoginId(member.getLoginId());
        if (!findMember.isEmpty()) {
            log.info("회원 중복");
            return false;
        } else {
            log.info("회원중복 아님 validate 성공");
            return true;
        }
    }

//    public Member findOne(String loginId) {
//        return memberRepository.findOne(loginId);
//    }


}

