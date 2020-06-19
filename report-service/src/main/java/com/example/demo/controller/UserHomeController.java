package com.example.demo.controller;

import com.example.demo.domain.Report;
import com.example.demo.domain.User;
import com.example.demo.domain.enums.ReportStatus;
import com.example.demo.dto.ReportDTO;
import com.example.demo.dto.ReportForUserReportTableDTO;
import com.example.demo.exceptions.InvalidUserException;
import com.example.demo.exceptions.UnknownReportError;
import com.example.demo.exceptions.UnknownUserException;
import com.example.demo.service.service.OwnerService;
import com.example.demo.service.service.ReportService;
import com.example.demo.service.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping("user")
public class UserHomeController {

    private final UserService userService;
    private final ReportService reportService;
    private  final OwnerService ownerService;

    public UserHomeController(UserService userService, ReportService reportService, OwnerService ownerService) {
        this.userService = userService;
        this.reportService = reportService;
        this.ownerService = ownerService;
    }

    @ExceptionHandler(UnknownReportError.class)
    public String handleUnknownReportError() {
        log.warn("Requested invalid report");
        return "redirect:/error";
    }

    @ExceptionHandler(UnknownUserException.class)
    public String handleUnknownUserException() {
        log.warn("Requested unknown user");
        return "redirect:/error";
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("reports")
    public List<ReportForUserReportTableDTO> getHome(Principal principal) throws UnknownUserException {
        User user = userService.getByEmail(principal.getName());
        return reportService.getAllByUserForUserTable(user) ;
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("/add")
    public String postAdd(@RequestBody ReportDTO report, Principal principal) throws UnknownUserException {
        User user = userService.getByEmail(principal.getName());
        ownerService.save(reportService.getFromDTO(report), user);
        return "success";
    }

    @GetMapping(value = "/update/{report_id}")
    public Report updateReport(@PathVariable String report_id, Principal principal)
            throws UnknownReportError, UnknownUserException {
        Report report = reportService.getById(Long.parseLong(report_id)).orElseThrow(UnknownReportError::new);
        User user = userService.getByEmail(principal.getName());
        if(user.getReportsOwned().stream().noneMatch(reportt -> reportt.getId().equals(report.getId()))
                || !report.getStatus().equals(ReportStatus.NOT_ACCEPTED)){
            log.warn("user is not allowed to update report");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unable to update this report");
        }
        return report;
    }

    @PostMapping(value = "/update/{report_id}")
    public String updateReportPost(@RequestBody ReportDTO reportToUpdate, @PathVariable String report_id, Principal principal)
            throws UnknownReportError, UnknownUserException {
        Report report = reportService.getById(Long.parseLong(report_id)).orElseThrow(UnknownReportError::new);
        User user = userService.getByEmail(principal.getName());
        if(user.getReportsOwned().stream().noneMatch(reportt -> reportt.getId().equals(report.getId()))
                || !report.getStatus().equals(ReportStatus.NOT_ACCEPTED)){
            log.warn("user is not allowed to update report");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unable to update this report");
        }
        ownerService.update(report, reportToUpdate);
        return "success";
    }

    @PostMapping(value = "/change/{report_id}")
    public String changeReportPost(@PathVariable String report_id, Principal principal)
            throws UnknownReportError, UnknownUserException {
        Report reportToUpdate = reportService.getById(Long.parseLong(report_id)).orElseThrow(UnknownReportError::new);
        User user = userService.getByEmail(principal.getName());
        if(user.getReportsOwned().stream().noneMatch(reportt -> reportt.getId().equals(reportToUpdate.getId()))
                || !reportToUpdate.getStatus().equals(ReportStatus.NOT_ACCEPTED)){
            log.warn("user is not allowed to change inspector of this report");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unable to change inspector");
        }
        ownerService.changeInspector(reportToUpdate);
        return "success";
    }
}
