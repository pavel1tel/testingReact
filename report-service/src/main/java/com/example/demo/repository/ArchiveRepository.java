package com.example.demo.repository;


import com.example.demo.domain.Archive;
import com.example.demo.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArchiveRepository extends JpaRepository<Archive,Long> {
    Optional<Archive> findDistinctFirstByReport(Report report);
}
