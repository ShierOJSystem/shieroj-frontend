/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from './JudgeInfo';
import type { QuestionVO } from './QuestionVO';
import type { UserVO } from './UserVO';

export type QuestionSubmitVO = {
    createTime?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    questionId?: number;
    questionVO?: QuestionVO;
    submitCode?: string;
    submitLanguage?: string;
    submitState?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
