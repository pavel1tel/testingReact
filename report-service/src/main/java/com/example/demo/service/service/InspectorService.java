package com.example.demo.service.service;


import com.example.demo.domain.Archive;
import com.example.demo.domain.Report;
import com.example.demo.domain.User;
import com.example.demo.domain.enums.ReportStatus;
import com.example.demo.dto.DeclineReasonDTO;
import com.example.demo.repository.ArchiveRepository;
import com.example.demo.repository.ReportsRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class InspectorService {

    private final ReportsRepository reportsRepository;
    private final ArchiveRepository archiveRepository;

    public InspectorService(ReportsRepository reportsRepository, ArchiveRepository archiveRepository) {
        this.reportsRepository = reportsRepository;
        this.archiveRepository = archiveRepository;
    }

    @Transactional
    public void acceptReport(Report report, User inspector) {
        archiveRepository.save(createArchive(report, inspector));
        reportsRepository.save(report);
    }
    //todo
    @Transactional
    public void declineReport(Report reportToDecline, String reportReason, User inspector) {
        archiveRepository.save(createArchive(reportToDecline, reportReason, inspector));
        reportsRepository.save(reportToDecline);
    }

    private Archive createArchive(Report reportToDecline, String reportReason, User inspector){
        return Archive.builder()
                .report(reportToDecline)
                .inspectorDecision(inspector)
                .name(reportToDecline.getName())
                .description(reportToDecline.getDescription())
                .declineReason(reportReason)
                .status(ReportStatus.NOT_ACCEPTED)
                .build();
    }

    private Archive createArchive(Report reportToDecline, User inspector){
        return Archive.builder()
                .report(reportToDecline)
                .inspectorDecision(inspector)
                .name(reportToDecline.getName())
                .description(reportToDecline.getDescription())
                .status(ReportStatus.NOT_ACCEPTED)
                .build();
    }
}
