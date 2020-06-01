package com.example.demo.domain;

import com.example.demo.domain.enums.ReportStatus;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "archive")
public class Archive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User inspectorDecision;

    @ManyToOne
    private Report report;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="decline_reason")
    private String declineReason;

    @Enumerated(EnumType.STRING)
    private ReportStatus status;

    @CreationTimestamp
    @Column(name = "created", nullable = false)
    private LocalDate created;

    @UpdateTimestamp
    @Column(name = "updated", nullable = false)
    private LocalDate updated;
}
