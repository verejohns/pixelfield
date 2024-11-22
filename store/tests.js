import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  testId: -1,
  questions: [],
  iterator: 0,
  answers: [],
  resultId: 0,
  testDetails: null,
});

export const mutations = {
  setResultId(state, resultId) {
    state.resultId = resultId;
  },
  setQuestions(state, { testId, questions }) {
    state.questions = questions;
    state.iterator = 0;
    state.testId = testId;
    state.answers = [];
  },
  setQuestionIterator(state, { val }) {
    state.iterator = val;
  },
  setAnswers(state, { answers }) {
    state.answers = answers;
  },
  nextQuestion(state) {
    if (state.iterator < state.questions.length - 1) {
      state.iterator++;
    }
  },
  previousQuestion(state) {
    if (state.iterator + 1 === state.questions.length) {
      state.answers.pop();
    }
    if (state.iterator > 0) {
      state.iterator--;
    }
  },
  startNewAnswer(state, startTime) {
    if (state.iterator >= state.answers.length) {
      state.answers.push({
        startedAt: startTime,
        finishedAt: null,
        value: "",
        move: "",
        fen: "",
      });
    }
  },
  finishAnswer(state, finishTime) {
    state.answers[state.iterator].finishedAt = finishTime;
  },
  setAnswerValue(state, value) {
    state.answers[state.iterator].value = value;
  },
  setTestDetails(state, testDetails) {
    state.testDetails = testDetails;
  },
  setTestId(state, testId) {
    state.testId = testId;
  },
  setAnswerMove(state, move) {
    state.answers[state.iterator].move = move;
  },
  setAnswerFen(state, fen) {
    state.answers[state.iterator].fen = fen;
  },
  cleanAnswers(state) {
    state.answers = [];
  },
  clean(state) {
    state.answers = [];
    state.iterator = 0;
  },
};

export const actions = {
  async fetchQuestions(context, { testId, competitionId = 0 }) {
    let query = "";
    if (competitionId !== 0) {
      query = `?competition_id=` + Number(competitionId);
    }
    const response = await this.$axios.$get(
      `/api/chess/tests/${testId}/questions/${query}`
    );
    context.commit("setQuestions", {
      testId,
      questions: convertSnakeToCamel(response).results,
    });
  },

  async startTest(context, { testId, competitionId, trainingPlanId }) {
    let payload = {};
    if (competitionId) {
      payload = { competition_id: Number(competitionId) };
    }
    if (trainingPlanId) {
      payload = { training_item_id: Number(trainingPlanId) };
    }
    const result = await this.$axios.$post(
      `/api/chess/tests/${testId}/result/`,
      payload
    );
    context.commit("setTestDetails", result);
    return result;
  },
  async sendAnswer(context, { testId, questionId, payload }) {
    if (payload.finished_at === null) {
      const date = new Date().toISOString().substring(0, 19).replace("T", " ");
      payload.finished_at = date;
    }
    return await this.$axios.$post(
      `/api/chess/tests/${testId}/questions/${questionId}/answer/`,
      payload
    );
  },
  async finishTest(context, { testId, trainingPlanId, competitionId }) {
    const response = await this.$axios.$post(
      `/api/chess/tests/${testId}/result/`,
      {
        training_item_id: Number(trainingPlanId),
        competition_id: Number(competitionId),
      }
    );

    context.commit("setResultId", convertSnakeToCamel(response).id);
  },
};

export const getters = {
  resultId(state) {
    if (state.testDetails === null) {
      return null;
    }
    return state.testDetails.id;
  },
  currentQuestion(state) {
    return state.questions[state.iterator];
  },
  currentAnswer(state) {
    console.log("state.iterator", state.iterator, state.answers);
    return state.answers[state.iterator];
  },
  testDetails(state) {
    return state.testDetails;
  },
  isLastQuestion(state) {
    return state.questions.length <= state.answers.length;
  },
  isLastQuestionForButton(state) {
    console.log(state.questions.length);
    console.log(state.answers.length);
    console.log(state.answers.length === state.questions.length);
    return state.questions.length === state.answers.length;
  },
};
