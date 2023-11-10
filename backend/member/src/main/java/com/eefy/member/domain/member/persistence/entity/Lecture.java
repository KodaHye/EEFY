package com.eefy.member.domain.member.persistence.entity;

import com.eefy.member.global.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Lecture extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "memberId")
    private Member member;

    @Column(nullable = false)
    private Integer classId;

    @Column(nullable = false, length = 2000)
    private String filePath;

    @Column(nullable = false, length = 400)
    private String title;

    @Column(nullable = false, length = 2000)
    private String content;

    @Builder
    public Lecture(Integer id, Member member, Integer classId, String filePath, String title, String content) {
        this.id = id;
        this.member = member;
        this.classId = classId;
        this.filePath = filePath;
        this.title = title;
        this.content = content;
    }
}