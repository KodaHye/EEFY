package com.eefy.homework.domain.homework.controller;

import com.eefy.homework.domain.homework.dto.request.AssignHomeworkToClassRequest;
import com.eefy.homework.domain.homework.dto.request.FinishMakingHomeworkRequest;
import com.eefy.homework.domain.homework.dto.request.MakeHomeworkQuestionRequest;
import com.eefy.homework.domain.homework.dto.request.MakeHomeworkRequest;
import com.eefy.homework.domain.homework.dto.request.SolveProblemRequest;
import com.eefy.homework.domain.homework.dto.request.ViewHomeworkRequest;
import com.eefy.homework.domain.homework.dto.response.AssignHomeworkToClassResponse;
import com.eefy.homework.domain.homework.dto.response.GetProblemResponse;
import com.eefy.homework.domain.homework.dto.response.HomeworkListResponse;
import com.eefy.homework.domain.homework.dto.response.MakeHomeworkQuestionResponse;
import com.eefy.homework.domain.homework.dto.response.MakeHomeworkResponse;
import com.eefy.homework.domain.homework.dto.response.SolveHomeworkResponse;
import com.eefy.homework.domain.homework.dto.response.SolveProblemResponse;
import com.eefy.homework.domain.homework.dto.response.ViewHomeworkResponse;
import com.eefy.homework.domain.homework.persistence.entity.enums.HomeworkType;
import com.eefy.homework.domain.homework.service.HomeworkService;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/homework")
public class HomeworkController {

    private final HomeworkService homeworkService;

    @Operation(summary = "만든 과제 확인하기")
    @GetMapping("/teacher/homework")
    public ResponseEntity<HomeworkListResponse> getHomeworkList(
        Pageable pageable,
        @RequestParam(required = false) HomeworkType homeworkType,
        @RequestParam(required = false) String searchWord,
        @RequestHeader("Member-Id") Integer memberId) {

        return new ResponseEntity<>(
            homeworkService.getHomeworkByTeacherId(memberId, pageable, homeworkType, searchWord),
            HttpStatus.OK
        );
    }

    @Operation(summary = "과제 만들기", description = "type: READING, WRITING, LISTENING, SPEAKING")
    @PostMapping("/make")
    public ResponseEntity<MakeHomeworkResponse> makeHomework(
        @RequestBody MakeHomeworkRequest makeHomeworkRequest,
        @RequestHeader("Member-Id") Integer memberId) {

        return new ResponseEntity<>(
            homeworkService.makeHomework(makeHomeworkRequest, memberId),
            HttpStatus.OK);
    }

    @Operation(summary = "과제 만들기 완료")
    @PutMapping("/make")
    public ResponseEntity<MakeHomeworkResponse> finishMakingHomework(
        @RequestHeader("Member-Id") Integer memberId,
        @RequestBody FinishMakingHomeworkRequest finishMakingHomeworkRequest
    ) {

        return new ResponseEntity<>(
            homeworkService.finishMakingHomework(
                memberId, finishMakingHomeworkRequest.getHomeworkId()),
            HttpStatus.OK
        );
    }


    @Operation(summary = "문제 만들고 과제에 할당하기", description = "field: CHOICE, VOICE, WRITE")
    @PostMapping(value = "/make/question", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<MakeHomeworkQuestionResponse> makeQuestion(
        @RequestPart MakeHomeworkQuestionRequest makeHomeworkQuestionRequest,
        @RequestPart(required = false) MultipartFile voiceFile,
        @RequestHeader("Member-Id") Integer memberId) throws IOException {

        return new ResponseEntity<>(
            homeworkService.makeQuestion(makeHomeworkQuestionRequest, memberId, voiceFile),
            HttpStatus.OK);
    }

    @Operation(summary = "과제를 클래스에 할당하기")
    @PostMapping("/assign/class")
    public ResponseEntity<AssignHomeworkToClassResponse> assignHomeworkToClass(
        @RequestBody AssignHomeworkToClassRequest assignHomeworkToClassRequest,
        @RequestHeader("Member-Id") Integer memberId) {

        return new ResponseEntity<>(
            homeworkService.assignHomeworkToClass(assignHomeworkToClassRequest, memberId),
            HttpStatus.OK);
    }

    @Operation(summary = "학생 아이디와 클래스를 기준으로 과제 불러오기, 클래스에 null 이면 전체 과제 조회")
    @GetMapping("/view")
    public ResponseEntity<ViewHomeworkResponse> viewHomework(
        ViewHomeworkRequest viewHomeworkRequest,
        Pageable pageable,
        @RequestParam(required = false) HomeworkType homeworkType,
        @RequestParam(required = false) String searchWord,
        @RequestHeader("Member-Id") Integer memberId) {

        return new ResponseEntity<>(
            homeworkService.viewHomeworkByStudentId(viewHomeworkRequest, memberId, pageable,
                homeworkType, searchWord),
            HttpStatus.OK);
    }

    @Operation(summary = "클래스에 할당된 아이디를 기준으로 문제들 불러오기")
    @GetMapping("/getProblem/{classHomeworkId}")
    public ResponseEntity<GetProblemResponse> getProblems(
        @PathVariable Integer classHomeworkId,
        @RequestHeader("Member-Id") Integer memberId
    ) {
        return new ResponseEntity<>(homeworkService.getProblem(classHomeworkId, memberId),
            HttpStatus.OK);
    }

    // 과제 문제를 제출하는 로직
    // 과제가 완료되는 로직
    @Operation(summary = "과제를 제출")
    @PostMapping(value = "/solve", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SolveProblemResponse> solveProblem(
        @RequestPart SolveProblemRequest solveProblemRequest,
        @RequestPart(required = false) MultipartFile voiceFile,
        @RequestHeader("Member-Id") Integer memberId
    ) throws IOException {
        return new ResponseEntity<>(
            homeworkService.solveProblem(solveProblemRequest, memberId, voiceFile),
            HttpStatus.OK);
    }

    @Operation(summary = "과제 채점")
    @GetMapping("/solve/{homeworkStudentId}")
    public ResponseEntity<SolveHomeworkResponse> solveHomework(
        @PathVariable Integer homeworkStudentId,
        @RequestHeader("Member-Id") Integer memberId
    ) {

        return new ResponseEntity<>(homeworkService.solveHomework(homeworkStudentId, memberId),
            HttpStatus.OK);
    }

}
