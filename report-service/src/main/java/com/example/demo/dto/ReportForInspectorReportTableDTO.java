package com.example.demo.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class ReportForInspectorReportTableDTO {
    @NotNull
    private Long id;
    @NotNull
    private String Name;
    @NotNull
    private LocalDate created;
    @NotNull
    private LocalDate updated;
    @NotNull
    private String description;
}
