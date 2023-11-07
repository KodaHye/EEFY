package com.eefy.studyclass.domain.studyclass.persistence.mysql;

import com.eefy.studyclass.domain.studyclass.persistence.entity.Participate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipateRepository extends JpaRepository<Participate, Integer> {

    List<Participate> findByMemberId(Integer teacherId);

    List<Participate> findByMemberIdAndStudyClassId(Integer teacherId, Integer classId);
}