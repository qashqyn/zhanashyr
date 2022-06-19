package com.project.demo.repos;

import com.project.demo.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface EventsRepo extends JpaRepository<Event, Long> {
    List<Event> findAllByUserId(Long userId);
    List<Event> findAllByFondId(Long fondId);
}
