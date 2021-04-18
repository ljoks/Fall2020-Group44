export interface Folder {
  Questions: Question[];
  name: string;
  id?: number;
}

export interface Question {
  title: string;
  question: string;
  type: string;
  QuestionOptions: QuestionOption[];
  folderId: number | null;
  average?: number;
  total?: number;
  id?: number;
  responseCount?: number;
  isClosed?: boolean;
  progress?: number;
}

// this is poorly named, but it is done to match the backend
// a QuestionOption is an answer. isAnswer determines if the answer is
// correct.
export interface QuestionOption {
  id?: number;
  questionId?: number;
  text: string;
  isAnswer: boolean;
  responseCount?: number;
}

export interface BasicSessionInfo {
  id: number;
  name: string;
  SessionGrades: SessionGradesInfo[];
}

export interface SessionGradesInfo {
  avgPoints: number;
  maxPoints: number;
}

export interface Session extends BasicSessionInfo {
  average: number;
  total: number;
  date: string;
  questions: Question;
}

export interface QuestionInfo {
  text: string;
  answers: string[];
  correctIndex: number;
}

export interface FolderAndQuestionResponse {
  folders: Folder[];
  questions: Question[];
}

export interface CourseGradesResponse {
  classAverage: ClassAverageInfo;
  students: StudentSessionInfo[];
  sessions: BasicSessionInfo[];
}

export interface SessionGradesResponse {
  students: StudentQuestionInfo[];
  questions: QuestionGradeInfo[];
}

export interface QuestionGradeInfo {
  id: number;
  title: string;
  SessionQuestion: SessionQuestion;
}

export interface SessionQuestion {
  questionId: number;
  sessionId: number;
}

export interface ClassAverageInfo {
  points: number;
  maxPoints: number;
}

export interface StudentSessionInfo {
  name: string;
  total: number;
  canvasId: number;
  SessionGrades: Grade[];
}

export interface StudentQuestionInfo {
  name: string;
  canvasId: number;
  QuestionGrades: Grade[];
}

export interface Grade {
  id: number;
  points: number;
  maxPoints: number;
}
