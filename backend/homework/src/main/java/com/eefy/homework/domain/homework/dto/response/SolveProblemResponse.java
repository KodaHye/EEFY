package com.eefy.homework.domain.homework.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SolveProblemResponse {

    private Integer homeworkStudentQuestionId;
    private String  sttText;
    private Integer score;
}
