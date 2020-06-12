package com.example.demo.service.service;


import com.example.demo.domain.Report;
import com.example.demo.domain.User;
import com.example.demo.domain.enums.ReportStatus;
import com.example.demo.dto.ReportDTO;
import com.example.demo.dto.ReportForInspectorReportTableDTO;
import com.example.demo.dto.ReportForUserReportTableDTO;
import com.example.demo.repository.ReportsRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportsRepository reportsRepository;
    private final ModelMapper modelMapper;

    public ReportService(ReportsRepository reportsRepository, ModelMapper modelMapper) {
        this.reportsRepository = reportsRepository;
        this.modelMapper = modelMapper;
    }

    public List<ReportForUserReportTableDTO> getAllByUserForUserTable(User user) {
        List<Report> reports = reportsRepository.findByOwner(user);
        Type pageType = new TypeToken<List<ReportForInspectorReportTableDTO>>() {}.getType();
        return modelMapper.map(reports, pageType);
    }



    public List<ReportForInspectorReportTableDTO> getAllByInspectorAndStatusForTable(User user, ReportStatus status) {
        List<Report> reports = reportsRepository.findAllByInspectorsAndStatus(user, status);
        Type pageType = new TypeToken<List<ReportForInspectorReportTableDTO>>() {}.getType();
        return modelMapper.map(reports, pageType);
    }

    public Report getFromDTO(ReportDTO reportDTO) {
        return modelMapper.map(reportDTO, Report.class);
    }

    public Optional<Report> getById(long id) {
        return reportsRepository.findById(id);
    }

}
