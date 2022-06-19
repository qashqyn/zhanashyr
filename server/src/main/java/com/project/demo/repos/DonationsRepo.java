package com.project.demo.repos;

import com.project.demo.entities.Donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface DonationsRepo extends JpaRepository<Donations, Long> {
    List<Donations> findAllByUserId(Long userId);
    List<Donations> findAllByFondId(Long fondId);
    List<Donations> findAllByEventId(Long eventId);
}
