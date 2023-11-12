package com.eefy.studyclass.domain.studyclass.service;

import com.eefy.studyclass.domain.member.exception.validator.MemberValidator;
import com.eefy.studyclass.domain.member.persistence.entity.Member;
import com.eefy.studyclass.domain.member.service.MemberServiceImpl;
import com.eefy.studyclass.domain.studyclass.dto.request.*;
import com.eefy.studyclass.domain.studyclass.dto.response.*;
import com.eefy.studyclass.domain.studyclass.exception.validator.StudyClassValidator;
import com.eefy.studyclass.domain.studyclass.persistence.entity.*;
import com.eefy.studyclass.domain.studyclass.persistence.mysql.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class StudyClassServiceImpl implements StudyClassService {

    private final StudyClassRepository studyClassRepository;
    private final ParticipateRepository participateRepository;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final NoticeRepository noticeRepository;
    private final MemberServiceImpl memberService;
    private final StudyClassValidator studyClassValidator;
    private final MemberValidator memberValidator;

    @Override
    public StudyClassListResponse getStudyClassList(Pageable pageable, Integer memberId) {
        List<StudyClass> studyClassList = null;

        Member member = memberService.getMemberInfo(memberId, memberId);

        if(member.getRole().equals("TEACHER")) {
            studyClassList = studyClassRepository.findByMemberId(pageable, memberId);
        }

        if(member.getRole().equals("STUDENT")) {
            studyClassList = studyClassRepository.findByStudentId(pageable, memberId);
        }

        List<StudyClassResponse> studyClassResponseList = studyClassList.stream().map(studyClass -> {
            Member teacher = memberService.getMemberInfo(memberId, studyClass.getMemberId());
            return StudyClassResponse.of(studyClass, teacher);
        }).collect(Collectors.toList());

        return new StudyClassListResponse(studyClassResponseList, studyClassResponseList.size());
    }

    @Override
    public void createStudyClass(Integer memberId, StudyClassCreateRequest studyClassCreateRequest) {

        log.info("==================== create study class ==================== ");
        studyClassValidator.checkUserRoleCreateStudyClass(memberService.getMemberInfo(memberId, memberId));

        StudyClass studyClass = StudyClass.builder()
                .memberId(memberId)
                .title(studyClassCreateRequest.getTitle())
                .content(studyClassCreateRequest.getContent())
                .startDate(studyClassCreateRequest.getStartDate())
                .type(studyClassCreateRequest.getType())
                .build();

        studyClassRepository.save(studyClass);
    }

    @Override
    public void modifyStudyClass(StudyClassModifyRequest studyClassModifyRequest) {
        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(studyClassModifyRequest.getId()));

        studyClass.updateStudyClassInfo(studyClassModifyRequest);
    }

    @Override
    public List<SearchStudentResponse> searchStudentList(Integer teacherId, Integer classId) {

        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(classId));

        studyClassValidator.checkAuthorityStudyClass(studyClass, teacherId);

        List<Participate> byMemberIdAndClassId = participateRepository.findByStudyClassId(classId);

        return getSearchStudentList(teacherId, byMemberIdAndClassId);
    }

    @Override
    public List<SearchStudentResponse> getSearchStudentList(Integer teacherId, List<Participate> participateList) {

        List<SearchStudentResponse> result = participateList.stream().map(m -> {
            Member member = memberService.getMemberInfo(teacherId, m.getMemberId());

            return SearchStudentResponse.builder()
                    .memberId(member.getMemberId())
                    .name(member.getName())
                    .nickname(member.getNickname())
                    .email(member.getEmail())
                    .profileImagePath(member.getProfileImagePath())
                    .phoneNumber(member.getPhoneNumber()).build();
        }).collect(Collectors.toList());

        return result;
    }

    @Override
    public void inviteMember(Integer memberId, InviteMemberRequest inviteMemberRequest) {
        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(inviteMemberRequest.getClassId()));

        memberValidator.checkUserRoleInviteOrDisinviteMember(memberService.getMemberInfo(memberId, memberId),
                studyClassRepository.findByIdAndMemberId(inviteMemberRequest.getClassId(), memberId));

        for (StudyClassStudentRequest studentRequest: inviteMemberRequest.getMemberList()) {

            studyClassValidator.alreadyJoinStudyClass(participateRepository.findByMemberIdAndStudyClassId(studentRequest.getMemberId(), inviteMemberRequest.getClassId()));

            Participate participate = Participate.builder()
                    .memberId(studentRequest.getMemberId())
                    .studyClass(studyClass).build();
            participateRepository.save(participate);
        }
    }

    @Override
    public void disInviteMember(Integer memberId, InviteMemberRequest disInviteMemberRequest) {
        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(disInviteMemberRequest.getClassId()));

        memberValidator.checkUserRoleInviteOrDisinviteMember(memberService.getMemberInfo(memberId, memberId),
                studyClassRepository.findByIdAndMemberId(studyClass.getId(), memberId));

        for (StudyClassStudentRequest studentRequest: disInviteMemberRequest.getMemberList()) {

            Participate participate = studyClassValidator.alreadyUnJoinStudyClass(participateRepository.findByMemberIdAndStudyClassId(studentRequest.getMemberId(), disInviteMemberRequest.getClassId()));

            participateRepository.delete(participate);
        }
    }

    @Override
    public void enrollHomework(Integer teacherId, EnrollHomeworkRequest enrollHomeworkRequest) {
        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(enrollHomeworkRequest.getClassId()));

        studyClassValidator.checkUserRoleEnrollHomework(teacherId, studyClass);

        ClassHomework classHomework = ClassHomework.builder()
                .homeworkId(enrollHomeworkRequest.getHomeworkId())
                .studyClass(studyClass).build();

        classHomeworkRepository.save(classHomework);
    }

    @Override
    public NoticeIdResponse createNotice(Integer teacherId, NoticeCreateRequest noticeRequest) {
        studyClassValidator.checkUserRole(memberService.getMemberInfo(teacherId, teacherId));

        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(noticeRequest.getClassId()));

        studyClassValidator.checkAuthorityStudyClass(studyClass, teacherId);

        Notice notice = Notice.builder()
                .memberId(teacherId)
                .studyClass(studyClass)
                .title(noticeRequest.getTitle())
                .content(noticeRequest.getContent())
                .hit(0)
                .build();

        return NoticeIdResponse.builder()
                .id(noticeRepository.save(notice).getId()).build();
    }

    @Override
    public List<NoticeListResponse> getNoticeList(Integer classId) {
        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(classId));

        return noticeRepository.findByStudyClassIdOrderByCreatedAtDesc(studyClass.getId()).stream().map(notice -> new NoticeListResponse(notice)).collect(Collectors.toList());
    }

    @Override
    public NoticeResponse getNoticeInfo(Integer noticeId) {
        Notice notice = studyClassValidator.existNoticeById(noticeRepository.findById(noticeId));

        Member member = memberService.getMemberInfo(notice.getMemberId(), notice.getMemberId());

        noticeRepository.updateHit(noticeId);

        return new NoticeResponse(notice, member);
    }

    @Override
    public void modifyNotice(Integer teacherId, NoticeModifyRequest noticeModifyRequest) {
        Notice notice = studyClassValidator.existNoticeById(noticeRepository.findById(noticeModifyRequest.getId()));
        studyClassValidator.checkAuthorityNotice(notice, teacherId);

        notice.updateNoticeInfo(noticeModifyRequest);
    }

    @Override
    public void deleteNotice(Integer teacherId, Integer noticeId) {
        Member member = memberService.getMemberInfo(teacherId, teacherId);
        Notice notice = studyClassValidator.existNoticeById(noticeRepository.findById(noticeId));

        studyClassValidator.checkAuthorityNotice(notice, member.getMemberId());
        noticeRepository.delete(notice);
    }

    @Override
    public StudyClassResponse getStudyClassInfo(Integer studyClassId) {
        StudyClass studyClass = studyClassValidator.existsStudyClassByClassId(studyClassRepository.findById(studyClassId));

        Member teacher = memberService.getMemberInfo(studyClass.getMemberId(), studyClass.getMemberId());

        return StudyClassResponse.of(studyClass, teacher);
    }
}