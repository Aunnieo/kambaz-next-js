import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import quizzesData from "../../../Database/quizzes.json";

interface QuizAttempt {
  userId: string;
  attemptNumber: number;
  submittedAt: string;
  answers: Record<string, any>;
  score: number;
}


export interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  title: string;
  text?: string;
  points: number;
  options: { id: string; text: string; correct: boolean }[];
  blanks: string[];
  answer?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  course: string;

  quizType: string;
  published: boolean;

  description?: string;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;

  hasTimeLimit?: boolean;
  timeLimit: number;

  multipleAttempts: boolean;
  attemptLimit?: number;

  showCorrectAnswers?: string;
  accessCode?: string;

  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockAfterAnswering?: boolean;

  availableFrom: string | null;
  availableUntil: string | null;
  dueDate: string | null;

  points: number;
  questions: number;

  questionsList: Question[];
  attempts?: QuizAttempt[];
}

interface QuizState {
  quizzes: Quiz[];
}


const initialState: QuizState = {
  quizzes: (quizzesData as Quiz[]).map(q => ({
    ...q,
    questionsList: q.questionsList ?? [],
    attempts: [],
  })),
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<{ cid: string } | Quiz>) => {
      let newQuiz: Quiz;

      if ("cid" in action.payload) {
        newQuiz = {
          id: Date.now().toString(),
          title: "New Quiz",
          course: action.payload.cid,
          quizType: "Graded Quiz",
          published: false,
          description: "",
          assignmentGroup: "Quizzes",
          shuffleAnswers: false,
          hasTimeLimit: false,
          timeLimit: 20,
          multipleAttempts: false,
          attemptLimit: 1,
          showCorrectAnswers: "",
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockAfterAnswering: false,
          availableFrom: null,
          availableUntil: null,
          dueDate: null,
          points: 0,
          questions: 0,
          questionsList: [],
        };
      } else {
        newQuiz = {
          ...action.payload,
          id: Date.now().toString(),
          questionsList: action.payload.questionsList ?? [],
        };
      }

      state.quizzes.push(newQuiz);
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(q => q.id !== action.payload);
    },

    togglePublish: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map(q =>
        q.id === action.payload ? { ...q, published: !q.published } : q
      );
    },

    updateQuiz: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Quiz> }>
    ) => {
      state.quizzes = state.quizzes.map(q =>
        q.id === action.payload.id
          ? { ...q, ...action.payload.updates }
          : q
      );
    },

    submitQuizAttempt: (
      state,
      action: PayloadAction<{
        quizId: string;
        userId: string;
        answers: Record<string, any>;
        score: number;
      }>
    ) => {
      const quiz = state.quizzes.find(q => q.id === action.payload.quizId);
      if (!quiz) return;

      const attempts = quiz.attempts ?? [];
      const userAttempts = attempts.filter(
        a => a.userId === action.payload.userId
      );

      if (!quiz.multipleAttempts && userAttempts.length >= 1) return;
      if (
        quiz.multipleAttempts &&
        quiz.attemptLimit &&
        userAttempts.length >= quiz.attemptLimit
      ) return;

      quiz.attempts = [
        ...attempts,
        {
          userId: action.payload.userId,
          attemptNumber: userAttempts.length + 1,
          submittedAt: new Date().toISOString(),
          answers: action.payload.answers,
          score: action.payload.score,
        },
      ];
    },

  },
});


export const { addQuiz, deleteQuiz, togglePublish, updateQuiz, submitQuizAttempt, } =
  quizSlice.actions;

export default quizSlice.reducer;
