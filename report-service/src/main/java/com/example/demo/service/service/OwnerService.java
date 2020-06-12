package com.example.demo.service.service;

import com.example.demo.domain.Report;
import com.example.demo.domain.User;
import com.example.demo.domain.enums.ReportStatus;
import com.example.demo.domain.enums.Role;
import com.example.demo.dto.ReportDTO;
import com.example.demo.repository.ArchiveRepository;
import com.example.demo.repository.ReportsRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OwnerService {

    private final ReportsRepository reportsRepository;
    private final UserRepository userRepository;
    private final ArchiveRepository archiveRepository;

    public OwnerService(ReportsRepository reportsRepository, UserRepository userRepository, ArchiveRepository archiveRepository) {
        this.reportsRepository = reportsRepository;
        this.userRepository = userRepository;
        this.archiveRepository = archiveRepository;
    }

    public void update(Report report, ReportDTO reportDTO) {
        report.setName(reportDTO.getName());
        report.setDescription(reportDTO.getDescription());
        report.setStatus(ReportStatus.QUEUE);
        reportsRepository.save(report);
    }
    @Transactional
    public void changeInspector(Report report) {
        List<User> inspectors = report.getInspectors();
        Long inspectorId = archiveRepository.findDistinctFirstByReport(report)
                .orElseThrow(RuntimeException::new).getInspectorDecision().getId();
        List<User> newInspectors = inspectors.stream()
                .filter(inspector -> !inspector.getId().equals(inspectorId))
                .collect(Collectors.toList());
        report.setStatus(ReportStatus.QUEUE);
        report.setInspectors(getRandomElements(newInspectors));
        reportsRepository.save(report);
    }

    public void save(Report report, User owner) {
        report.setStatus(ReportStatus.QUEUE);
        report.setOwner(owner);
        List<User> inspectors = getInspectors();
        report.setInspectors(getRandomElements(inspectors));
        reportsRepository.save(report);
    }

    private static List<User> getRandomElements(List<User> list) {
        Collections.shuffle(list);
        int listSizeIndex = list.size();
        return list.subList(0, listSizeIndex);
    }


    private List<User> getInspectors() {
        return userRepository.findAllByRole(Role.ROLE_INSPECTOR).orElse(new ArrayList<>());
    }
}
