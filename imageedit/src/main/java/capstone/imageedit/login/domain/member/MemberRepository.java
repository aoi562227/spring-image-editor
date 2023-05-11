package capstone.imageedit.login.domain.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//public class MemberRepository{
//    @PersistenceContext
//    EntityManager em;
//
//    public void save(MemberDto member) {
//        em.persist(member);
//    }
//
//    public Member findOne(String loginId) {
//        return em.find(Member.class, loginId);
//    }
//}
public interface MemberRepository extends JpaRepository<Member,String> {
    public List<Member> findMemberByLoginId(String loginId);
}



//@Repository
//public class MemberRepository {
//
//    @PersistenceContext
//    EntityManager em;
//    EntityTransaction transaction = em.getTransaction();
//
//    public void save(MemberDto member) {
//        em.persist(member);
//        log.info("저장");
//        transaction.commit();
//    }
//
//    public Member findOne(String id) {
//        return em.find(Member.class, id);
//    }
//
//    public List<Member> findByLoginId(String loginId) {
//    log.info("findbyLoginid에서 loginId = ");
//    log.info(loginId);
//    return em.createQuery("select m from Member m where m.loginId = :loginId", Member.class)
//            .setParameter("loginId", loginId)
//            .getResultList();
//    }
//
//
//}
