package capstone.imageedit.login.web.member;

//import capstone.imageedit.config.WebSecurityConfig;
import capstone.imageedit.login.domain.member.Member;
import capstone.imageedit.login.domain.member.MemberRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.sql.Blob;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.IOException;
import java.util.List;
@Service
@Transactional
@Slf4j
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
//    @Autowired
//    WebSecurityConfig webSecurityConfig;


    public String join(Member member) {
        if (validateDuplicateMember(member)) {


//            String encodedPassword = webSecurityConfig.getPasswordEncoder().encode(member.getPassword());
//            Member newMember = Member
//                    .builder()
//                    .loginId(member.getLoginId())
//                    .password(encodedPassword)
//                    .name(member.getName()).build();
//            memberRepository.save(newMember);
            memberRepository.save(member);
            log.info("join 성공");
            return "성공";
        } else {
            return "이미 존재하는 회원입니다";
        }
    }

    public Member login(Member member) throws Exception{

        Member memberByLoginId = memberRepository.findMemberByLoginId(member.getLoginId());
        if (member.getPassword().equals(memberByLoginId.getPassword())) {
            log.info("로그인 성공");
            return memberByLoginId;
        }
        return member;
    }


    private boolean validateDuplicateMember(Member member) {
        Member findMember =
                memberRepository.findMemberByLoginId(member.getLoginId());
        if (findMember!=null) {
            log.info("회원 중복");
            return false;
        } else {
            log.info("회원중복 아님 validate 성공");
            return true;
        }
    }
    private Blob convertFileToBlob(File file) throws Exception {
        Blob blob = null;
        FileInputStream inputStream = null;
      
        try {
            byte[] byteArray = new byte[(int) file.length()];
            inputStream = new FileInputStream(file);
            inputStream.read(byteArray);
       
            blob = new javax.sql.rowset.serial.SerialBlob(byteArray); 
       
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (Exception e) {
                inputStream = null;
            } finally {
                inputStream = null;
            }
        }
      
        return blob;
    }
    public File multipartToFile(MultipartFile mfile) throws IllegalStateException, IOException {
        File file = new File(mfile.getOriginalFilename());
        mfile.transferTo(file);
        return file;
    }
    /*
    public String uploadService(String loginId, String blobs, String stack) {
        Member member = memberRepository.findMemberByLoginId(loginId);
        if (!validateDuplicateMember(member)) {
            member.setBlob(blobs);
            member.setStack(stack);
            memberRepository.save(member);
            return "성공";
        } else return "실패";
    }
    */
    public String uploadService(MultipartHttpServletRequest req) throws Exception{
        String loginId = req.getParameter("loginId");

        //MultipartFile blobFile = req.getFile("blobs");
        //Blob blobs = convertFileToBlob(multipartToFile(blobFile)); // MultipartFile -> File -> Blob

        String stack = req.getParameter("stack");

        log.info(loginId);
        //log.info(blobs);
        log.info(stack);

        Member member = memberRepository.findMemberByLoginId(loginId);
        if (!validateDuplicateMember(member)) {
            //member.setBlob(blobs);
            member.setStack(stack);
            memberRepository.save(member);
            return "성공";
        } else return "실패";
    }

    public Member downloadService(Member member) {
        if (!validateDuplicateMember(member)) {
            Member findMember = memberRepository.findMemberByLoginId(member.getLoginId());
            log.info("불러오기 성공");
            return findMember;
        } else {
            log.info("불러오기 실패");
            return null;
        }
    }

//    public Member findOne(String loginId) {
//        return memberRepository.findOne(loginId);
//    }


}

