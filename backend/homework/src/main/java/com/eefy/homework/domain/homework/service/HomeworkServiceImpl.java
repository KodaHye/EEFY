package com.eefy.homework.domain.homework.service;

import com.eefy.homework.domain.homework.AiServerRestClient;
import com.eefy.homework.domain.homework.dto.ChoiceDto;
import com.eefy.homework.domain.homework.dto.HomeworkQuestionDto;
import com.eefy.homework.domain.homework.dto.HomeworkStudentDto;
import com.eefy.homework.domain.homework.dto.HomeworkStudentQuestionDto;
import com.eefy.homework.domain.homework.dto.QuestionCountDto;
import com.eefy.homework.domain.homework.dto.request.AssignHomeworkToClassRequest;
import com.eefy.homework.domain.homework.dto.request.MakeHomeworkQuestionRequest;
import com.eefy.homework.domain.homework.dto.request.MakeHomeworkRequest;
import com.eefy.homework.domain.homework.dto.request.SolveProblemRequest;
import com.eefy.homework.domain.homework.dto.request.ViewHomeworkRequest;
import com.eefy.homework.domain.homework.dto.response.AssignHomeworkToClassResponse;
import com.eefy.homework.domain.homework.dto.response.GetProblemResponse;
import com.eefy.homework.domain.homework.dto.response.HomeworkQuestionResponse;
import com.eefy.homework.domain.homework.dto.response.MakeHomeworkQuestionResponse;
import com.eefy.homework.domain.homework.dto.response.MakeHomeworkResponse;
import com.eefy.homework.domain.homework.dto.response.SolveHomeworkResponse;
import com.eefy.homework.domain.homework.dto.response.SolveProblemResponse;
import com.eefy.homework.domain.homework.dto.response.ViewHomeworkResponse;
import com.eefy.homework.domain.homework.exception.HomeworkNotFoundException;
import com.eefy.homework.domain.homework.persistence.entity.Choice;
import com.eefy.homework.domain.homework.persistence.entity.ClassHomework;
import com.eefy.homework.domain.homework.persistence.entity.Homework;
import com.eefy.homework.domain.homework.persistence.entity.HomeworkQuestion;
import com.eefy.homework.domain.homework.persistence.entity.HomeworkStudent;
import com.eefy.homework.domain.homework.persistence.entity.HomeworkStudentQuestion;
import com.eefy.homework.domain.homework.persistence.entity.enums.HomeworkQuestionType;
import com.eefy.homework.domain.homework.repository.ChoiceRepository;
import com.eefy.homework.domain.homework.repository.ClassHomeworkRepository;
import com.eefy.homework.domain.homework.repository.HomeworkCustomRepository;
import com.eefy.homework.domain.homework.repository.HomeworkQuestionRepository;
import com.eefy.homework.domain.homework.repository.HomeworkRepository;
import com.eefy.homework.domain.homework.repository.HomeworkStudentQuestionRepository;
import com.eefy.homework.domain.homework.repository.HomeworkStudentRepository;
import com.eefy.homework.global.S3Uploader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class HomeworkServiceImpl implements HomeworkService {

    private final ModelMapper modelMapper;
    private final AiServerRestClient aiServerRestClient;
    private final S3Uploader s3Uploader;

    private final HomeworkRepository homeworkRepository;
    private final HomeworkQuestionRepository homeworkQuestionRepository;
    private final ChoiceRepository choiceRepository;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final HomeworkStudentRepository homeworkStudentRepository;
    private final HomeworkCustomRepository homeworkCustomRepository;
    private final HomeworkStudentQuestionRepository homeworkStudentQuestionRepository;

    @Value("${cloud.aws.s3.voiceDir}")
    private String voicePath;
    private static final List<Integer> dummyStudentId = List.of(1, 2, 3, 4, 5, 6, 7);

    @Override
    public MakeHomeworkResponse makeHomework(MakeHomeworkRequest makeHomeworkRequest,
        Integer memberId) {
        // todo:강사가 유효한 사용자인지 검증
        Homework homework =
            Homework.of(memberId, makeHomeworkRequest.getTitle(),
                makeHomeworkRequest.getContent(), makeHomeworkRequest.getType());

        homeworkRepository.save(homework);

        return MakeHomeworkResponse.builder()
            .homeworkId(homework.getId())
            .build();
    }

    @Override
    @Transactional
    public MakeHomeworkQuestionResponse makeQuestion(
        MakeHomeworkQuestionRequest makeHomeworkQuestionRequest, Integer memberId,
        MultipartFile voiceFile) throws IOException {

        // todo: 강사가 유효한 사용자인지 검증

        Homework homework = validateHomework(makeHomeworkQuestionRequest.getHomeworkId());
        String filePath = s3Uploader.upload(voiceFile, voicePath);
        HomeworkQuestion homeworkQuestion = saveHomeworkQuestion(makeHomeworkQuestionRequest,
            homework, filePath);
        saveChoice(makeHomeworkQuestionRequest, homeworkQuestion);

        return new MakeHomeworkQuestionResponse(homework.getId());
    }

    @Override
    @Transactional
    public AssignHomeworkToClassResponse assignHomeworkToClass(
        AssignHomeworkToClassRequest assignHomeworkToClassRequest, Integer memberId) {
        // todo: 강사가 유효한 사용자인지 검증
        // todo: 클래스가 유요한지 검사

        Homework homework = validateHomework(assignHomeworkToClassRequest.getHomeworkId());

        ClassHomework classHomework = ClassHomework.of(homework,
            assignHomeworkToClassRequest.getClassId(),
            assignHomeworkToClassRequest.getDueDate());

        classHomeworkRepository.save(classHomework);

        // todo: 실제 클래스의 사용자 받아오는 restApi 작성
        for (Integer studentId : dummyStudentId) {
            homeworkStudentRepository.save(HomeworkStudent.from(studentId, classHomework));
        }

        return new AssignHomeworkToClassResponse(classHomework.getId());
    }

    @Override
    public ViewHomeworkResponse viewHomeworkByStudentId(ViewHomeworkRequest viewHomeworkRequest,
        Integer memberId) {
        List<HomeworkStudentDto> homeworkStudentDtos = homeworkCustomRepository.viewHomeworkByStudentId(
            viewHomeworkRequest.getClassId(), memberId);
        List<QuestionCountDto> solvedHomeworkProblemCount = homeworkCustomRepository.getSolvedHomeworkProblemCount(
            viewHomeworkRequest.getClassId(),
            memberId);
        List<QuestionCountDto> homeworkProblemCount = homeworkCustomRepository.getHomeworkProblemCount(
            viewHomeworkRequest.getClassId(), memberId);

        insertTotalCount(homeworkStudentDtos, homeworkProblemCount);
        insertSolvedCount(homeworkStudentDtos, solvedHomeworkProblemCount);
        return new ViewHomeworkResponse(homeworkStudentDtos);
    }

    private void insertTotalCount(List<HomeworkStudentDto> homeworkStudentDtos,
        List<QuestionCountDto> homeworkProblemCount) {
        for (HomeworkStudentDto homeworkStudentDto : homeworkStudentDtos) {
            for (QuestionCountDto questionCountDto : homeworkProblemCount) {
                if (questionCountDto.getHomeworkStudentId()
                    .equals(homeworkStudentDto.getHomeworkStudentId())) {
                    homeworkStudentDto.setTotalCount(questionCountDto.getCount());
                }
            }
        }
    }

    private void insertSolvedCount(List<HomeworkStudentDto> homeworkStudentDtos,
        List<QuestionCountDto> homeworkProblemCount) {
        for (HomeworkStudentDto homeworkStudentDto : homeworkStudentDtos) {
            for (QuestionCountDto questionCountDto : homeworkProblemCount) {
                if (questionCountDto.getHomeworkStudentId()
                    .equals(homeworkStudentDto.getHomeworkStudentId())) {
                    homeworkStudentDto.setSolvedCount(questionCountDto.getCount());
                }
            }
        }
    }

    @Override
    @Transactional
    public GetProblemResponse getProblem(Integer classHomeworkId, Integer memberId) {
        List<HomeworkQuestion> problem = homeworkCustomRepository.getProblem(classHomeworkId);
        HomeworkStudent homeworkStudent = validateHomeworkStudent(classHomeworkId, memberId);

        List<HomeworkQuestionResponse> homeworkQuestionResponses = getHomeworkQuestionWithChoice(problem);
        List<HomeworkStudentQuestionDto> homeworkStudentQuestionDtos = getHomeworkStudentQuestionDtos(
            problem, homeworkStudent);
        return new GetProblemResponse(homeworkQuestionResponses, homeworkStudentQuestionDtos);
    }

    @Override
    @Transactional
    public SolveProblemResponse solveProblem(SolveProblemRequest solveProblemRequest,
        Integer memberId) {

        HomeworkStudent homeworkStudent = validateHomeworkStudent(
            solveProblemRequest.getHomeworkStudentId());
        HomeworkQuestion homeworkQuestion = validateHomeworkQuestion(
            solveProblemRequest.getHomeworkQuestionId());

        HomeworkStudentQuestion homeworkStudentQuestion = HomeworkStudentQuestion.from(
            homeworkQuestion,
            homeworkStudent, solveProblemRequest.getSubmitAnswer(),
            solveProblemRequest.getFilePath());

        homeworkStudentQuestionRepository.save(homeworkStudentQuestion);
        return new SolveProblemResponse(homeworkStudentQuestion.getId());
    }

    @Override
    @Transactional
    public SolveHomeworkResponse solveHomework(Integer homeworkStudentId, Integer memberId) {
        HomeworkStudent homeworkStudent = validateHomeworkStudent(homeworkStudentId);

        List<HomeworkStudentQuestion> homeworkStudentQuestions =
            validateHomeworkStudentQuestionByHomeworkStudent(homeworkStudent);
        List<HomeworkQuestion> homeworkQuestions = validateHomeworkQuestionByHomework(
            homeworkStudentQuestions.get(0).getHomeworkQuestion().getHomework());

        if (homeworkQuestions.size() != homeworkStudentQuestions.size()) {
            throw new RuntimeException("문제를 다 안풀었습니다.");
        }

        int index = 0;
        for (HomeworkStudentQuestion homeworkStudentQuestion : homeworkStudentQuestions) {
            if (homeworkQuestions.get(index).getType().equals(HomeworkQuestionType.VOICE)) {
                String score = aiServerRestClient.getAnnounceScore(
                    homeworkStudentQuestion.getFilePath());
                homeworkStudentQuestion.updateScore(Integer.parseInt(score) * 20);
            } else {
                updateChoiceAndWriteProblemScore(homeworkQuestions.get(index),
                    homeworkStudentQuestion);
            }
            index++;
        }

        homeworkStudent.updateDoneDate();
        return new SolveHomeworkResponse(homeworkStudentId);
    }

    private void updateChoiceAndWriteProblemScore(HomeworkQuestion homeworkQuestion,
        HomeworkStudentQuestion homeworkStudentQuestion) {
        if (homeworkQuestion.getAnswer()
            .equals(homeworkStudentQuestion.getSubmitAnswer())) {
            homeworkStudentQuestion.updateScore(100);
        } else {
            homeworkStudentQuestion.updateScore(0);
        }
    }

    private List<HomeworkQuestion> validateHomeworkQuestionByHomework(Homework homework) {
        return homeworkQuestionRepository.findByHomeworkOrderById(homework);
    }

    private List<HomeworkStudentQuestion> validateHomeworkStudentQuestionByHomeworkStudent(
        HomeworkStudent homeworkStudent) {
        return homeworkStudentQuestionRepository.findByHomeworkStudentOrderByHomeworkQuestion(
            homeworkStudent);
    }

    private HomeworkStudent validateHomeworkStudent(Integer homeworkStudentId) {
        // todo: 커스텀 익셉션
        return homeworkStudentRepository.findById(homeworkStudentId)
            .orElseThrow(() -> new RuntimeException("해당하는 homeworkStudent 를 찾을 수 없습니다."));
    }

    private HomeworkQuestion validateHomeworkQuestion(Integer homeworkQuestionId) {
        // todo: 커스텀 익셉션
        return homeworkQuestionRepository.findById(homeworkQuestionId)
            .orElseThrow(() -> new RuntimeException("해당하는 homeworkQuestion 을 찾을 수 없습니다."));
    }

    private HomeworkQuestion saveHomeworkQuestion(
        MakeHomeworkQuestionRequest makeHomeworkQuestionRequest, Homework homework, String filePath) {
        HomeworkQuestion homeworkQuestion = HomeworkQuestion.of(homework,
            makeHomeworkQuestionRequest.getTitle(),
            makeHomeworkQuestionRequest.getContent(), filePath,
            makeHomeworkQuestionRequest.getField(), makeHomeworkQuestionRequest.getAnswer());

        homeworkQuestionRepository.save(homeworkQuestion);
        return homeworkQuestion;
    }

    private void saveChoice(MakeHomeworkQuestionRequest makeHomeworkQuestionRequest,
        HomeworkQuestion homeworkQuestion) {
        // todo: batch를 사용한 쿼리 최적화 필요
        if (makeHomeworkQuestionRequest.getChoiceRequests() == null) {
            return;
        }

        makeHomeworkQuestionRequest.getChoiceRequests()
            .forEach((v) ->
                choiceRepository.save(Choice.of(homeworkQuestion, v.getContent(), v.getNumber())));
    }

    private Homework validateHomework(Integer homeworkId) {
        return homeworkRepository.findById(homeworkId)
            .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));
    }


    private List<HomeworkStudentQuestionDto> getHomeworkStudentQuestionDtos(
        List<HomeworkQuestion> problem, HomeworkStudent homeworkStudent) {
        List<HomeworkStudentQuestionDto> homeworkStudentQuestionDtos = new ArrayList<>();
        for (HomeworkQuestion homeworkQuestionResponse : problem) {
            HomeworkStudentQuestion questionSolved = homeworkStudent.isQuestionSolved(
                homeworkQuestionResponse.getId());

            if (questionSolved == null) {
                homeworkStudentQuestionDtos.add(null);
            } else {
                HomeworkStudentQuestionDto map = modelMapper.map(questionSolved,
                    HomeworkStudentQuestionDto.class);

                homeworkStudentQuestionDtos.add(map);
            }
        }
        return homeworkStudentQuestionDtos;
    }

    private List<HomeworkQuestionResponse> getHomeworkQuestionWithChoice(
        List<HomeworkQuestion> problem) {
        List<HomeworkQuestionResponse> homeworkQuestionResponses = new ArrayList<>();
        for (HomeworkQuestion homeworkQuestion : problem) {
            List<ChoiceDto> choiceDtos = homeworkQuestion.getChoices().stream()
                .map(this::mapChoiceToDto)
                .collect(Collectors.toList());

            homeworkQuestionResponses.add(
                HomeworkQuestionResponse.of(mapHomeworkQuestionToDto(homeworkQuestion), choiceDtos));
        }
        return homeworkQuestionResponses;
    }

    private HomeworkStudent validateHomeworkStudent(Integer classHomeworkId, Integer memberId) {
        return homeworkStudentRepository.findByClassHomeworkIdAndMemberId(classHomeworkId, memberId)
            .orElseThrow(() -> new RuntimeException("홈워크 스튜던트 없음"));
    }

    private HomeworkQuestionDto mapHomeworkQuestionToDto(HomeworkQuestion homeworkQuestion) {
        return modelMapper.map(homeworkQuestion, HomeworkQuestionDto.class);
    }

    private ChoiceDto mapChoiceToDto(Choice choice) {
        return modelMapper.map(choice, ChoiceDto.class);
    }

}