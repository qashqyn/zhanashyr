package com.project.demo.repos;

import com.project.demo.entities.Fond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface FondsRepo extends JpaRepository<Fond, Long> {
    @Query(value = "select * from fonds " +
            "where location in ?2 and " +
            "(" +
                "lower(title) like lower(concat('%', ?1, '%')) or " +
                "lower(description) like lower(concat('%', ?1, '%')) " +
            ")", nativeQuery = true)
    public List<Fond> searchNew(String search, List<String> location);
}