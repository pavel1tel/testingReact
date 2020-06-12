package com.example.demo.repository;

import com.example.demo.domain.Report;
import com.example.demo.domain.User;
import com.example.demo.domain.enums.ReportStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportsRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByName(String name);
    //@Query("select r from Report r where owner = ?1 and name like %?2%")
    List<Report> findByOwner(User user);
    //@Query("select r from Report r join User u where u = ?1 and r.status = ?2 and r.name like %?3%")
    List<Report> findAllByInspectorsAndStatus(User inspector, ReportStatus status);
}
