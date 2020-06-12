package com.example.demo.dto;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class DeclineReasonDTO {
    @NotNull
    private String declineReason;
}
