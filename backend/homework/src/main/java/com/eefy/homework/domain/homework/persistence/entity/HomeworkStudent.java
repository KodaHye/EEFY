package com.eefy.homework.domain.homework.persistence.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class HomeworkStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "homework_student_id")
    private Integer id;

    @Column(nullable = false)
    private Integer memberId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_homework_id")
    private ClassHomework classHomework;

    @Column(nullable = true)
    private LocalDateTime doneDate;

    @Column(nullable = false)
    private Integer progressRate = 0;

    public HomeworkStudent(Integer memberId, ClassHomework classHomework, Integer progressRate) {
        this.memberId = memberId;
        this.classHomework = classHomework;
        this.progressRate = progressRate;
    }

    public static HomeworkStudent from(Integer memberId, ClassHomework classHomework) {
        return new HomeworkStudent(memberId, classHomework, 0);
    }
}