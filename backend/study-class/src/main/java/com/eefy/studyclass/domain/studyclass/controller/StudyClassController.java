package com.eefy.studyclass.domain.studyclass.controller;

import com.eefy.studyclass.domain.lecture.dto.request.NoteInfoRequest;
import com.eefy.studyclass.domain.lecture.service.LectureService;
import com.eefy.studyclass.domain.studyclass.dto.request.*;
import com.eefy.studyclass.domain.studyclass.dto.response.*;
import com.eefy.studyclass.domain.studyclass.service.StudyClassService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/study-class")
@RequiredArgsConstructor
public class StudyClassController {

    private final StudyClassService studyClassService;

    @Operation(summary = "강의 목록 조회", description = "강사: 자신이 생성한 강의 목록 조회 \n 학생: 자신이 수강하는 강의 목록 조회")
    @GetMapping("")
    public ResponseEntity<StudyClassListResponse> getStudyClassList(@PageableDefault(sort = {"startDate"}) Pageable pageable,
                                                                    @RequestHeader("Member-Id") Integer memberId) {

        return ResponseEntity.ok(studyClassService.getStudyClassList(pageable, memberId));
    }

    @Operation(summary = "강의 정보 조회", description = "해당 ID에 대한 클래스 정보 조회")
    @GetMapping("/{studyClassId}")
    public ResponseEntity<StudyClassResponse> getStudyInfo(@PathVariable Integer studyClassId) {
        return ResponseEntity.ok(studyClassService.getStudyClassInfo(studyClassId));
    }

    @Operation(summary = "강의 생성", description = "TEACHER ROLE을 가진 사용자가 강의 생성")
    @PostMapping("/tutor")
    public ResponseEntity<Void> createStudyClass(@RequestHeader("Member-Id") Integer memberId,
                                                 @RequestBody StudyClassCreateRequest studyClassCreateRequest) {
        studyClassService.createStudyClass(memberId, studyClassCreateRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "강의 정보 수정", description = "TEACHER ROLE을 가진 사용자가 자신이 생성한 강의에 한하여 강의 정보 수정")
    @PutMapping("/tutor")
    public ResponseEntity<Void> modifyStudyClass(@RequestHeader("Member-Id") Integer memberId,
                                                 @RequestBody StudyClassModifyRequest studyClassModifyRequest) {

        studyClassService.modifyStudyClass(studyClassModifyRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "강의 참여 학생 목록 조회", description = "TEACHER 권한 사용자가 자신의 강의를 수강하는 학생 목록 조회")
    @GetMapping("/member")
    public ResponseEntity<List<SearchStudentResponse>> searchStudentList(@RequestHeader("Member-Id") Integer teacherId,
                                                                         @RequestParam("classId") Integer classId) {

        return ResponseEntity.ok(studyClassService.searchStudentList(teacherId, classId));
    }

    
    @Operation(summary = "강의 회원 초대", description = "TEACHER 권한 사용자가 자신의 강좌에 학생 추가")
    @PostMapping("/tutor/member")
    public ResponseEntity<Void> inviteMember(@RequestHeader("Member-Id") Integer memberId,
                                             @RequestBody InviteMemberRequest inviteMemberRequest) {

        studyClassService.inviteMember(memberId, inviteMemberRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "강의 회원 초대 삭제", description = "TEACHER 권한 사용자가 자신의 강좌에 추가했던 학생을 삭제")
    @DeleteMapping("/tutor/member")
    public ResponseEntity<Void> disInviteMember(@RequestHeader("Member-Id") Integer memberId,
                                                @RequestBody InviteMemberRequest disInviteMemberRequest) {

        studyClassService.disInviteMember(memberId, disInviteMemberRequest);
        return ResponseEntity.ok().build();
    }


    @Operation(summary = "과제 등록", description = "TEACHER 권한 사용자가 자신이 작성했던 과제를 기반으로 클래스에 과제 등록")
    @PostMapping("/tutor/homework")
    public ResponseEntity<Void> enrollHomwork(@RequestHeader("Member-Id") Integer teacherId,
                                              @RequestBody EnrollHomeworkRequest enrollHomeworkRequest) {

        studyClassService.enrollHomework(teacherId, enrollHomeworkRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notice")
    public ResponseEntity<List<NoticeListResponse>> getNoticeList(@RequestHeader("Member-Id") Integer memberId,
                                                                  @RequestParam("classId") Integer classId) {
        return ResponseEntity.ok(studyClassService.getNoticeList(classId));
    }

    @DeleteMapping("/tutor/notice/{noticeId}")
    public ResponseEntity<Void> deleteNotice(@RequestHeader("Member-Id") Integer memberId,
                                             @PathVariable Integer noticeId) {
        studyClassService.deleteNotice(memberId, noticeId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/tutor/notice")
    public ResponseEntity<NoticeIdResponse> createNotice(@RequestHeader("Member-Id") Integer teacherId,
                                                         @RequestBody NoticeCreateRequest noticeRequest) {
        return ResponseEntity.ok(studyClassService.createNotice(teacherId, noticeRequest));
    }

    @PutMapping("/tutor/notice")
    public ResponseEntity<Void> modifyNotice(@RequestHeader("Member-Id") Integer teacherId,
                                             @RequestBody NoticeModifyRequest noticeRequest) {
        studyClassService.modifyNotice(teacherId, noticeRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notice/{noticeId}")
    public ResponseEntity<NoticeResponse> getNotice(@RequestHeader("Member-Id") Integer memberId,
                                                    @PathVariable Integer noticeId) {
        return ResponseEntity.ok(studyClassService.getNoticeInfo(noticeId));
    }
}
