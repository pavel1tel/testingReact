package com.example.demo.controller;

import com.example.demo.domain.Report;
import com.example.demo.domain.User;
import com.example.demo.domain.enums.ReportStatus;
import com.example.demo.dto.DeclineReasonDTO;
import com.example.demo.dto.ReportForInspectorReportTableDTO;
import com.example.demo.exceptions.InvalidUserException;
import com.example.demo.exceptions.UnknownReportError;
import com.example.demo.exceptions.UnknownUserException;
import com.example.demo.repository.ReportsRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.service.InspectorService;
import com.example.demo.service.service.ReportService;
import com.example.demo.service.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("insp")
@CrossOrigin
public class InspHomeController {

    private final ReportService reportService;
    private final InspectorService inspectorService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ReportsRepository reportsRepository;

    public InspHomeController(ReportService reportService, InspectorService inspectorService, UserService userService, UserRepository userRepository, ReportsRepository reportsRepository) {
        this.reportService = reportService;
        this.inspectorService = inspectorService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.reportsRepository = reportsRepository;
    }

    @ExceptionHandler(InvalidUserException.class)
    public String handleInvalidUserException() {
        log.warn("Requested invalid user");
        return "redirect:/error";
    }

    @ExceptionHandler(UnknownReportError.class)
    public String handleUnknownReportError() {
        log.warn("Requested invalid report");
        return "redirect:/error";
    }

    @PreAuthorize("hasAuthority('ROLE_INSPECTOR')")
    @GetMapping("reports")
    public @ResponseBody
    List<ReportForInspectorReportTableDTO> getHome(Principal principal)
            throws UnknownUserException {
        User user = userService.getByEmail(principal.getName());
        System.out.println(reportService.getAllByInspectorAndStatusForTable(user, ReportStatus.QUEUE));
        return reportService.getAllByInspectorAndStatusForTable(user, ReportStatus.QUEUE);
    }

    @PreAuthorize("hasAuthority('ROLE_INSPECTOR')")
    @PostMapping(value = "/decline/{report_id}")
    public String declineReportPost(@RequestBody DeclineReasonDTO reportReason,
                                    @PathVariable String report_id, Principal principal)
            throws UnknownReportError, UnknownUserException {
        Report reportToDecline = reportService.getById(Long.parseLong(report_id)).orElseThrow(UnknownReportError::new);
        User inspector = userService.getByEmail(principal.getName());
        if (inspector.getReportsInspected().stream().noneMatch(report -> report.getId().equals(reportToDecline.getId()))
                || !reportToDecline.getStatus().equals(ReportStatus.QUEUE)) {
            log.warn("inspector is not allowed to decline this report");
            return "redirect:/error";
        }
        reportToDecline.setDeclineReason(reportReason.getDeclineReason());
        reportToDecline.setStatus(ReportStatus.NOT_ACCEPTED);
        inspectorService.declineReport(reportToDecline, reportReason.getDeclineReason(), inspector);
        return "success";
    }

    @PreAuthorize("hasAuthority('ROLE_INSPECTOR')")
    @PostMapping(value = "/accept/{report_id}")
    public String acceptReport(@PathVariable String report_id, Principal principal)
            throws UnknownReportError, UnknownUserException {
        User inspector = userService.getByEmail(principal.getName());
        Report reportToAccept = reportService.getById(Long.parseLong(report_id)).orElseThrow(UnknownReportError::new);
        if (inspector.getReportsInspected().stream().noneMatch(report -> report.getId().equals(reportToAccept.getId()))
                || !reportToAccept.getStatus().equals(ReportStatus.QUEUE)) {
            log.warn("inspector is not allowed to accept this report");
            return "redirect:/error";
        }
        reportToAccept.setStatus(ReportStatus.ACCEPTED);
        reportToAccept.setInspectors(new ArrayList<>());
        inspectorService.acceptReport(reportToAccept, inspector);
        return "redirect:/inspHome";
    }
}
