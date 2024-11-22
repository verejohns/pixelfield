<template>
  <Loading v-if="loading" class="loading" :show-background="false" />
  <div v-else class="board">
    <div class="board__title mobile">
      <div ref="q" class="board__title__item">
        {{ currentQuestion.description }}
      </div>
    </div>
    <div v-show="showChessBoard" class="board__containers">
      <div class="board__container" :class="{ 'no-borders': !showChessBoard }">
        <div id="board"></div>
        <div v-if="preventControl" class="prevent-control"></div>
        <div
          v-if="enabledVirtualBoard"
          class="virtual-board"
          :class="config.orientation === 'black' ? 'virtual-board__rotate' : ''"
          :style="{
            width: `${virtualBoardWidth}px`,
            height: `${virtualBoardHeight}px`,
          }"
        >
          <div
            v-for="row in rows"
            :key="`row_${row}`"
            class="virtual-board__row"
          >
            <div
              v-for="col in cols"
              :key="`row_${row}_col_${col}`"
              :class="{
                'virtual-board__col': true,
                'view-active': selected(row, col),
                'view-click-trought': isClickTrought(row, col),
              }"
              @click="toggle(row, col)"
            ></div>
          </div>
        </div>
        <div
          v-if="enabledVirtualInactiveBoard"
          class="virtual-board view-inactive"
          :style="{
            width: `${virtualBoardWidth}px`,
            height: `${virtualBoardHeight}px`,
          }"
        >
          <div
            v-for="row in rows"
            :key="`row_${row}`"
            class="virtual-board__row"
          >
            <div
              v-for="col in cols"
              :key="`row_${row}_col_${col}`"
              :class="{
                'virtual-board__col': true,
                'view-active': selectedInactive(row, col),
              }"
            ></div>
          </div>
        </div>
        <OverlayBoard
          v-if="showOverlayBoard"
          :col="overlayCol"
          :is-top="true"
          :is-white="overlasIsWhite"
          @select="overlaySelect"
        />
      </div>
    </div>
    <div class="board__status" :class="{ single: !showChessBoard }">
      <InfoPanel
        v-if="duration !== null"
        :number="$store.state.tests.iterator + 1"
        :count="questions.length"
        :duration="duration"
        :points="getTotalPoints"
        @end="finishTest"
      />
      <Question
        :question="currentQuestion"
        :clear="clear"
        @next-status="nextStatus"
      />
      <div v-if="isTestCompetition && lives !== null">
        <TestControlPanel
          :option="option"
          :next-icon="nextIcon"
          :option-name="optionName"
          :step="step"
          :last-question="isLastQuestionForButton"
          :lives="lives"
          @end-button-click="finishTest"
        />
      </div>
      <div v-else>
        <ControlPanel
          :option="option"
          :next-icon="nextIcon"
          :option-name="optionName"
          :filled="
            currentQuestion.type === 'comment' && !isLastQuestionForButton
          "
          :step="step"
          :last-question="isLastQuestionForButton"
          @previous-button-click="previousQuestion"
          @end-button-click="finishTest"
          @next-button-click="nextQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chess from "chess.js";
import Question from "~/components/tests/Question";
import ControlPanel from "~/components/tests/ControlPanel";
import InfoPanel from "~/components/tests/InfoPanel";
import TestControlPanel from "~/components/tests/TestControlPanel.vue";
import OverlayBoard from "~/components/tests/OverlayBoard.vue";
export default {
  name: "TestsBoard",
  components: {
    InfoPanel,
    OverlayBoard,
    Question,
    TestControlPanel,
    ControlPanel,
  },
  auth: false,
  data() {
    return {
      loading: true,
      isStudy: false,
      enabledVirtualBoard: false,
      enabledVirtualInactiveBoard: false,
      virtualBoardUserEnabled: true,
      virtualBoardWidth: 400,
      virtualBoardHeight: 400,
      rows: ["a", "b", "c", "d", "e", "f", "g", "h"],
      cols: ["8", "7", "6", "5", "4", "3", "2", "1"],
      selectedFields: [],
      selectedFieldsInactive: [],
      config: {
        draggable: true,
        orientation: "white",
        position: "start",
        onDragStart: this.onDragStart,
        onSnapEnd: this.onSnapEnd,
        onDrop: this.onDrop,
      },
      board: null,
      game: null,
      updatedFen: null,
      lastFen: null,
      resultId: null,
      duration: null,
      option: 0,
      nextIcon: "arrow-right-circle",
      optionName: "",
      clear: false,
      preventControl: false,
      step: 0,
      lives: 3,
      selectedPosition: null,
      selectedColor: "w",
      selectedPiece: null,
      overlayBoard: false,
      overlayCol: null,
      overlayPromotion: null,
      overlayMove: {},
      overlasIsWhite: true,
      arrows: [],
      arrowEndpoints: {
        curvature: 0,
        thickness: 5,
        color: "yellow",
        endpoint: {
          type: "arrowHeadFilled",
          size: 0.75,
        },
      },
      totalPoints: 0,
      lastQuestionPoints: 0,
      doActionsIteration: 0,
    };
  },
  async fetch() {
    let response = null;
    const test = this.$route.query.test;
    if (test !== undefined) {
      const testId = localStorage.getItem("testId");
      const questions = localStorage.getItem("questions");
      const resultId = localStorage.getItem("resultId");
      const answers = localStorage.getItem("answers");
      if (
        questions !== null &&
        resultId !== null &&
        testId !== null &&
        answers !== null &&
        test === testId
      ) {
        console.log("answers", JSON.parse(answers));
        this.$store.commit("tests/setQuestions", {
          testId: test,
          questions: JSON.parse(questions),
        });
        this.resultId = parseInt(resultId);
        this.duration = parseInt(localStorage.getItem("duration"));
        this.lives = parseInt(localStorage.getItem("lives"));
        this.$store.commit("tests/setAnswers", {
          answers: JSON.parse(answers),
        });
        this.step = parseInt(localStorage.getItem("iterator") ?? "0");
        this.$store.commit("tests/setQuestionIterator", { val: this.step });
      } else {
        await this.$store.dispatch("tests/fetchQuestions", {
          testId: test,
          competitionId: this.$route.query.competition
            ? this.$route.query.competition
            : 0,
        });
        const payload = {
          testId: test,
        };
        if (this.isTestCompetition) {
          payload.competitionId = this.$route.query.competition;
        } else if (this.$route.query.isFinalTest) {
          payload.trainingPlanId = this.$route.query.themeId;
        }
        response = await this.$store.dispatch("tests/startTest", payload);
        localStorage.setItem("testId", test);
        localStorage.setItem("questions", JSON.stringify(this.questions));
        localStorage.setItem("resultId", response.id);
        localStorage.setItem("duration", response.test_time ?? 0);
        localStorage.setItem("lives", response.lives ?? 0);
        this.resultId = response.id;
        this.duration = response.test_time;
        this.lives = response.lives;
      }
      this.loading = false;
      this.init();
    }
  },
  fetchOnServer: false,
  computed: {
    getTotalPoints() {
      return this.isTestCompetition && this.lives !== null
        ? this.totalPoints
        : null;
    },
    isTestCompetition() {
      return this.$route.query.competition && this.$route.query.test;
    },
    isChessToSchool() {
      return this.isTestCompetition && this.lives === null;
    },
    showChessBoard() {
      return this.currentQuestion.type !== "sorting";
    },
    showOverlayBoard() {
      return this.overlayBoard;
    },
    questions() {
      return this.$store.state.tests.questions;
    },
    currentQuestion() {
      return this.$store.getters["tests/currentQuestion"];
    },
    currentAnswer() {
      return this.$store.getters["tests/currentAnswer"];
    },
    selected() {
      return (row, col) => {
        const field = `${row}${col}`;
        return this.selectedFields.includes(field);
      };
    },
    selectedInactive() {
      return (row, col) => {
        const field = `${row}${col}`;
        return this.selectedFieldsInactive.includes(field);
      };
    },
    isLastQuestion() {
      return this.$store.getters["tests/isLastQuestion"];
    },
    isLastQuestionForButton() {
      console.log(
        "isLastQuestionForButton",
        this.$store.getters["tests/isLastQuestionForButton"]
      );
      return this.$store.getters["tests/isLastQuestionForButton"];
    },
    normalizeFen() {
      return (fen) => {
        if (fen === null || fen === "") {
          return fen;
        }
        return fen.slice(-1) === "0" ? fen.replace(/.$/, "1") : fen;
      };
    },
    normalizeCol() {
      return (col, isWhite) => {
        console.log("normalizeCol", col, isWhite);
        if (isWhite) {
          return col;
        }
        switch (col) {
          case 1:
            return 8;
          case 2:
            return 7;
          case 3:
            return 6;
          case 4:
            return 5;
          case 5:
            return 4;
          case 6:
            return 3;
          case 7:
            return 2;
          case 8:
            return 1;
        }
      };
    },
    isClickTrought() {
      return (row, col) => {
        if (!this.game) {
          return false;
        }
        const position = this.game.get(`${row}${col}`);
        if (position === null) {
          return false;
        }
        return this.isMove && this.selectedColor === position.color;
      };
    },
    isMove() {
      return ["correct_move", "move_and_result"].includes(
        this.currentQuestion.type
      );
    },
  },
  watch: {
    currentQuestion(val) {
      console.log("Q changed", this.currentQuestion);
      // MYC-704 - disable resize
      // this.setQTwoLine();
    },
    loading(val) {
      console.log("loading", this.currentQuestion);
      // MYC-704 - disable resize
      // this.setQTwoLine();
    },
  },
  beforeUnmount() {
    if (this.arrows.length >= 0) {
      for (let i = 0; i < this.arrows.length; i++) {
        this.arrows[i].remove();
      }
      this.arrows = [];
    }
  },
  mounted() {
    const arrowLine = require("arrow-line");
    window.arrowLine = arrowLine;
    if (
      Object.keys(this.$route.query).includes("study") &&
      this.$route.query.study !== "undefined"
    ) {
      this.isStudy = true;
    }
    this.handleKeyPresses();
  },
  beforeMount() {
    window.addEventListener("resize", this.myEventHandler);
  },
  created() {
    this.$store.commit("tests/clean");
  },
  beforeDestroy() {
    this.unhandleKeyPresses();
  },
  deactivated() {
    this.unhandleKeyPresses();
  },
  methods: {
    setQTwoLine() {
      if (this.$refs.q) {
        this.processTwoLines();
      }
      setTimeout(() => {
        if (this.$refs.q) {
          this.processTwoLines();
        }
      }, 100);
    },
    processTwoLines() {
      const Q = this.$refs.q;
      Q.style.color = "white";
      if (Q) {
        let size = 17;
        do {
          Q.style.fontSize = `${size}px`;
          size--;
        } while (Q.offsetHeight > 46);
      }
      Q.style.color = "#24282A";
    },
    handleKeyPresses() {
      window.addEventListener("keydown", this.keyPresses);
    },
    unhandleKeyPresses() {
      window.removeEventListener("keydown", this.keyPresses);
      if (this.arrows.length >= 0) {
        for (let i = 0; i < this.arrows.length; i++) {
          this.arrows[i].remove();
        }
        this.arrows = [];
      }
    },
    keyPresses(e) {
      if (
        e.code === "ArrowRight" &&
        (!this.isTestCompetition || this.isChessToSchool)
      ) {
        if (!this.isLastQuestion) {
          this.nextQuestion(true);
        }
      } else if (
        e.code === "ArrowLeft" &&
        (!this.isTestCompetition || this.isChessToSchool)
      ) {
        this.previousQuestion();
      }
    },
    init() {
      this.enableVirtualBoard();
      this.$store.commit("tests/startNewAnswer", this.getCurrentDateTime());
      setTimeout(() => {
        this.setBoard(this.currentQuestion.fenString);
        if (document.getElementById("board")) {
          const rect = document.getElementById("board").getBoundingClientRect();
          this.virtualBoardWidth = rect.width;
          this.virtualBoardHeight = rect.height;
        }
      }, 500);
    },
    preventBehavior(e) {
      e.preventDefault();
    },
    onDragStart(source, piece, position, orientation) {
      if (this.game.game_over()) return false;
      if (
        (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (this.game.turn() === "b" && piece.search(/^w/) !== -1)
      ) {
        return false;
      }

      const result = this.onMouseoverSquare(source, true);

      this.overlasIsWhite = this.game.turn() === "w";

      if (
        result &&
        (this.selectedPosition === null || this.selectedPosition !== source)
      ) {
        this.removeGreySquares();
        this.onMouseoverSquare(source, false);
        this.selectedPosition = source;
        this.selectedPiece = piece;
        this.selectedFields = [];
        this.enabledVirtualBoard = true;
      } else {
        this.selectedPosition = null;
        this.removeGreySquares();
      }
    },
    onSnapEnd() {
      this.board.position(this.game.fen());
    },
    removeGreySquares() {
      const items = document.querySelectorAll(".square-55d63");
      for (let i = 0; i < items.length; i++) {
        items[i].style.background = "";
      }
    },
    greySquare(square) {
      const $square = document.querySelector(`.square-${square}`);
      let background = "rgba(240, 217, 181, 1)";
      if ($square.className.includes("black-3c85d")) {
        background = "rgba(181, 136, 99, 1)";
      }
      const showMoves = !this.$auth.loggedIn || this.$auth.user.show_moves;
      if ($square.getElementsByTagName("img").length > 0) {
        if (showMoves) {
          $square.style.background = `radial-gradient(${background} 0%, ${background} 79%, rgba(20,85,0,0.3) 80%)`;
        }
      } else if (showMoves) {
        $square.style.background = `radial-gradient(rgba(20,85,30,0.5) 19%, ${background} 20%)`;
      }
    },
    greenSquare(square) {
      const $square = document.querySelector(`.square-${square}`);
      $square.style.background = "rgba(20,85,30,0.5)";
    },
    onMouseoverSquare(square, dryrun) {
      console.log("square", square);
      // get list of possible moves for this square
      const moves = this.game.moves({
        square,
        verbose: true,
      });
      // exit if there are no moves available for this square
      if (moves.length === 0) return false;
      if (!dryrun) {
        this.selectedColor = this.game.get(square).color;
        // highlight the possible squares for this piece
        for (let i = 0; i < moves.length; i++) {
          this.greySquare(moves[i].to);
          // console.log("moves[i].to", moves[i].to);
        }
        // highlight the square they moused over
        this.greenSquare(square);
      }
      return true;
    },
    onMouseoutSquare(square, piece) {
      this.removeGreySquares();
    },
    nextStatus(option, nextIcon, optionName) {
      console.log("nextStatus", option, nextIcon, optionName);
      if (this.isTestCompetition && !this.isChessToSchool) {
        setTimeout(() => {
          this.nextQuestion();
        }, 500);
      } else {
        this.option = option;
        this.nextIcon = nextIcon;
        this.optionName = optionName;
        if (this.optionName.includes("move")) {
          if (this.option) {
            this.preventControl = true;
            this.removeGreySquares();
          } else {
            this.preventControl = false;
            this.enabledVirtualBoard = false;
            this.enabledVirtualInactiveBoard = false;
            this.config.position = this.currentQuestion.fenString;
            this.game = Chess(this.normalizeFen(this.config.position));
            let orientation = "white";
            console.log("game", this.game.game_over(), this.game.turn());
            if (this.isMove && this.game.turn() === "b" && !this.isStudy) {
              orientation = "black";
            }
            this.config.orientation = orientation;
            if (document.getElementById("board") !== null) {
              this.board = ChessBoard("board", this.config);
              document
                .getElementById("board")
                .addEventListener("touchmove", this.preventBehavior, {
                  passive: false,
                });
            }
          }
        } else {
          this.preventControl = false;
          if (this.optionName === "fieldmarketing" && !this.option) {
            this.selectedFields = [];
          }
        }
      }
    },
    setBoard(position, originalPosition) {
      window.chess = Chess;
      this.game = Chess(this.normalizeFen(position));
      console.log(this.game.game_over());
      let orientation = "white";
      console.log("currentQuestion.type", this.currentQuestion.type);
      if (this.isMove && this.game.turn() === "b" && !this.isStudy) {
        orientation = "black";
      }
      console.log("originalPosition", originalPosition);
      if (originalPosition && !this.isStudy) {
        console.log("originalPosition", "YES");
        this.game = Chess(this.normalizeFen(originalPosition));
        if (this.isMove && this.game.turn() === "b") {
          console.log("originalPosition", "black");
          orientation = "black";
        } else {
          console.log("originalPosition", "white");
          orientation = "white";
        }
      }
      console.log("orientation", orientation);
      this.config.orientation = orientation;
      this.config.position = position;
      this.config.draggable = this.isBoardDraggable();
      if (document.getElementById("board") !== null) {
        this.board = ChessBoard("board", this.config);
        document
          .getElementById("board")
          .addEventListener("touchmove", this.preventBehavior, {
            passive: false,
          });
        window.addEventListener("resize", this.board.resize);
        this.setActions();
      }
    },
    setActions() {
      const actions = [];
      this.selectedFieldsInactive = [];
      if (
        this.currentQuestion.actions &&
        this.currentQuestion.actions.value &&
        this.currentQuestion.actions.value !== "-"
      ) {
        actions.push(...this.currentQuestion.actions.value.split(" "));
      }
      this.doActions(actions);
    },
    async doActions(actions) {
      const iteration = this.doActionsIteration;
      const regexHighlight = /^[a-h][1-8]$/;
      const regexArrow = /^([a-h][1-8])-([a-h][1-8])$/;
      const regexMove = /^(\w)([a-h][1-8])-([a-h][1-8])$/;
      const regexWait = /^\d+$/gm;

      for (const key in actions) {
        const action = actions[key];

        if (iteration !== this.doActionsIteration) {
          return;
        }

        if (regexWait.exec(action) !== null) {
          await new Promise((resolve) => setTimeout(resolve, parseInt(action)));
        }

        if (iteration !== this.doActionsIteration) {
          return;
        }

        if (regexHighlight.exec(action) !== null) {
          this.selectedFieldsInactive.push(action);
          this.enabledVirtualInactiveBoard = true;
          this.virtualBoardUserEnabled = false;
        }

        const matchArrow = regexArrow.exec(action);
        if (matchArrow !== null) {
          console.log("arrow!");
          const sourceElements = document.getElementsByClassName(
            `square-${matchArrow[1]}`
          );
          const destElements = document.getElementsByClassName(
            `square-${matchArrow[2]}`
          );
          if (sourceElements.length > 0 && destElements.length > 0) {
            const sourceBox = sourceElements[0].getBoundingClientRect();
            const destBox = destElements[0].getBoundingClientRect();
            const arrow = arrowLine(
              {
                x: sourceBox.x + sourceBox.width / 2,
                y: sourceBox.y + sourceBox.height / 2 + window.scrollY,
              },
              {
                x: destBox.x + destBox.width / 2,
                y: destBox.y + destBox.height / 2 + window.scrollY,
              },
              this.arrowEndpoints
            );
            this.arrows.push(arrow);
          }
        }

        const matchMove = regexMove.exec(action);
        if (matchMove !== null) {
          if (iteration !== this.doActionsIteration) {
            return;
          }
          this.game.move({ from: matchMove[2], to: matchMove[3] });
          setTimeout(() => {
            if (iteration !== this.doActionsIteration) {
              return;
            }
            this.board.position(this.game.fen());
            this.updatedFen = this.game.fen();
            this.lastFen = this.currentQuestion.fenString;
            document
              .querySelector(`.square-${matchMove[2]}`)
              .classList.add("highlight-played");
            document
              .querySelector(`.square-${matchMove[3]}`)
              .classList.add("highlight-played");
          }, 300);
        }
      }
    },
    isBoardDraggable() {
      const type = this.currentQuestion.type;
      return (
        type !== "comment" &&
        type !== "number" &&
        type !== "field_marking" &&
        type !== "multiple_choices" &&
        type !== "sorting"
      );
    },
    getCurrentDateTime() {
      return new Date().toISOString().substring(0, 19).replace("T", " ");
    },
    convertPiece(piece) {
      switch (piece[1]) {
        case "P":
          return "p"; // pěšák
        case "R":
          return "V"; // věž
        case "N":
          return "J"; // Jezdec/kůň
        case "B":
          return "S"; // střelec
        case "Q":
          return "D"; // dáma
        case "K":
          return "K"; // král
      }
    },
    getMove(piece, source, target) {
      const shortPiece = this.convertPiece(piece);
      return `${shortPiece}${source}-${target}`;
    },
    overlaySelect(type) {
      this.overlayBoard = false;
      this.overlayCol = null;
      this.overlayPromotion = type.toLowerCase();
      this.onDrop(
        this.overlayMove.source,
        this.overlayMove.target,
        this.overlayMove.piece
      );
      // this.overlayResolve(type);
      this.overlayMove = null;
    },
    onDrop(source, target, piece, newPos, oldPos, orientation) {
      const fen = this.game.fen();
      // see if the move is legal
      let col = null;
      let promotion = "q";

      console.log("S", source, "T", target, "SP", this.selectedPosition);

      if (this.overlayPromotion === null) {
        const regex = /^[wb]P$/;
        const isPawn = regex.exec(piece) !== null;
        if (isPawn) {
          const regexTarget = /^([a-h])(\d$)/;
          const match = regexTarget.exec(target);
          if (match !== null && (match[2] === "1" || match[2] === "8")) {
            col = match[1];
          }
        }

        if (col) {
          const move = this.game.move({
            from: source,
            to: target,
            promotion,
          });
          if (move === null) {
            return false;
          }
          this.overlayCol = col.charCodeAt(0) - 96;
          this.overlayBoard = true;
          this.overlayMove = { source, target, piece };
          this.board.position(oldPos, false);
          this.removeGreySquares();
          this.selectedPosition = null;
          this.game = Chess(this.normalizeFen(fen));
          let orientation = "white";
          console.log("game", this.game.game_over(), this.game.turn());
          if (this.isMove && this.game.turn() === "b" && !this.isStudy) {
            orientation = "black";
          }
          this.overlasIsWhite = this.game.turn() === "w";
          this.overlayCol = this.normalizeCol(
            this.overlayCol,
            this.overlasIsWhite
          );
          this.config.orientation = orientation;
          this.board = ChessBoard("board", this.config);

          return "snapback";
        }
      } else {
        promotion = this.overlayPromotion;

        if (promotion === "k") {
          promotion = "n";
        }
      }

      const move = this.game.move({
        from: source,
        to: target,
        promotion,
      });
      // illegal move
      let value;
      if (move !== null) {
        if (this.overlayPromotion) {
          this.board.position(this.game.fen());
          this.overlayPromotion = null;
        }
        this.removeGreySquares();

        document
          .querySelectorAll(".highlight-played")
          .forEach((item) => item.classList.remove("highlight-played"));

        document
          .querySelector(`.square-${source}`)
          .classList.add("highlight-played");
        document
          .querySelector(`.square-${target}`)
          .classList.add("highlight-played");

        switch (this.currentQuestion.type) {
          case "correct_move":
            value = this.getMove(piece, source, target);
            if (move && move.promotion) {
              value = value += this.convertPiece(
                ` ${move.promotion.toUpperCase()}`
              );
            }
            this.$store.commit("tests/setAnswerValue", value);
            this.$store.commit("tests/setAnswerFen", this.game.fen());
            this.selectedPosition = null;
            break;
          case "move_and_result":
            value = this.getMove(piece, source, target);
            if (move && move.promotion) {
              value = value += this.convertPiece(
                ` ${move.promotion.toUpperCase()}`
              );
            }
            this.$store.commit("tests/setAnswerMove", value);
            this.$store.commit("tests/setAnswerFen", this.game.fen());
            this.selectedPosition = null;
            break;
        }
        return true;
      }
      return false;
    },
    sendAnswer() {
      console.log("current answer", this.currentAnswer);
      this.$store
        .dispatch("tests/sendAnswer", {
          testId: this.$route.query.test,
          questionId: this.currentQuestion.id,
          payload: {
            started_at:
              this.currentAnswer.startedAt ?? this.getCurrentDateTime(),
            finished_at:
              this.currentAnswer.finishedAt ?? this.getCurrentDateTime(),
            result_id: this.resultId,
            answer: {
              value: this.currentAnswer.value ?? "",
              move:
                this.currentAnswer.move !== ""
                  ? this.currentAnswer.move
                  : undefined,
            },
          },
        })
        .then((result) => {
          if (this.isTestCompetition) {
            if (!result.is_success) {
              if (this.lives) {
                this.lives--;
                if (this.lives <= 0) {
                  this.finishTest();
                }
              }
            } else if (this.lastQuestionPoints) {
              this.totalPoints += this.lastQuestionPoints;
            }
          }
        });
    },
    async sendAnswerAsync() {
      console.log("current answer", this.currentAnswer);
      return await this.$store.dispatch("tests/sendAnswer", {
        testId: this.$route.query.test,
        questionId: this.currentQuestion.id,
        payload: {
          started_at: this.currentAnswer.startedAt ?? this.getCurrentDateTime(),
          finished_at:
            this.currentAnswer.finishedAt ?? this.getCurrentDateTime(),
          result_id: this.resultId,
          answer: {
            value: this.currentAnswer.value ?? "",
            move:
              this.currentAnswer.move !== ""
                ? this.currentAnswer.move
                : undefined,
          },
        },
      });
    },
    async nextQuestion(doNext) {
      this.selectedFields = [];
      this.doActionsIteration++;
      this.step++;
      this.option = 0;
      this.nextIcon = "arrow-right-circle";
      this.clear = !this.clear;
      if (this.overlayBoard) {
        this.nextStatus(0, this.nextIcon, this.optionName);
        this.overlayBoard = false;
      }
      if (this.arrows.length >= 0) {
        for (let i = 0; i < this.arrows.length; i++) {
          this.arrows[i].remove();
        }
        this.arrows = [];
      }
      if (this.isLastQuestion) {
        await this.sendAnswerAsync();
      } else {
        this.sendAnswer();
      }
      // this.sendAnswer();
      this.$store.commit("tests/finishAnswer", this.getCurrentDateTime());

      this.preventControl = false;
      this.option = 0;
      if (doNext !== false) {
        if (this.isLastQuestion) {
          this.finishTest();
        } else {
          this.$store.commit("tests/nextQuestion");
          localStorage.setItem("iterator", this.$store.state.tests.iterator);
          localStorage.setItem(
            "answers",
            JSON.stringify(this.$store.state.tests.answers)
          );
          setTimeout(() => {
            if (this.currentAnswer.fen && this.currentAnswer.value) {
              this.setBoard(
                this.currentAnswer.fen,
                this.currentQuestion.fenString
              );
            } else if (
              this.lastFen === this.currentQuestion.fenString &&
              this.updatedFen !== null &&
              !this.currentQuestion.diagramSet
            ) {
              this.setBoard(this.updatedFen);
              this.updatedFen = null;
              this.lastFen = null;
            } else {
              this.setBoard(this.currentQuestion.fenString);
            }
            this.lastQuestionPoints = this.currentQuestion.points;
          }, 50);
          this.$store.commit("tests/startNewAnswer", this.getCurrentDateTime());
          this.enableVirtualBoard();
        }
      }
    },
    previousQuestion() {
      this.selectedFields = [];
      this.doActionsIteration++;
      this.step--;
      if (this.overlayBoard) {
        this.nextStatus(0, this.nextIcon, this.optionName);
        this.overlayBoard = false;
      }
      this.$store.commit("tests/previousQuestion");
      localStorage.setItem("iterator", this.$store.state.tests.iterator);
      localStorage.setItem(
        "answers",
        JSON.stringify(this.$store.state.tests.answers)
      );
      if (this.currentAnswer.fen && this.currentAnswer.value) {
        setTimeout(
          () =>
            this.setBoard(
              this.currentAnswer.fen,
              this.currentQuestion.fenString
            ),
          50
        );
      } else {
        setTimeout(() => this.setBoard(this.currentQuestion.fenString), 50);
      }
      this.enableVirtualBoard();
      if (this.arrows.length >= 0) {
        for (let i = 0; i < this.arrows.length; i++) {
          this.arrows[i].remove();
        }
        this.arrows = [];
      }
    },
    async finishTest() {
      const query = this.$route.query;
      this.loading = true;
      localStorage.removeItem("testId");
      localStorage.removeItem("questions");
      localStorage.removeItem("resultId");
      localStorage.removeItem("duration");
      localStorage.removeItem("iterator");
      localStorage.removeItem("answers");
      if (query.themeId && !query.isFinalTest && query.planId) {
        await this.nextQuestion(false);
        console.log("answer list", this.$store.state.tests.answers);
        console.log("current answer", this.currentAnswer);
        this.$router.push(
          `/tests/result?themeId=${query.themeId}&planId=${query.planId}`
        );
        return;
      }
      this.$store.dispatch("user/fetchUserInformation");

      if (!this.isTestCompetition) {
        await this.nextQuestion(false);
      } else if (this.isChessToSchool) {
        await this.nextQuestion(false);
        this.$router.push(
          `/tests/result?competitionId=${this.$route.query.competition}`
        );
        return;
      } else {
        this.$router.push(
          `/tests/result?competitionId=${this.$route.query.competition}`
        );
        return;
      }
      setTimeout(
        () => {
          let category = "";
          let serie = "";
          let id = "";
          let finalTrainingPlanTest = "";
          if (query.category) {
            category = "&category=" + query.category;
          }
          if (query.serie) {
            serie = "?serie=" + query.serie;
          }
          if (query.id) {
            id = "&id=" + query.id;
          }
          if (query.isFinalTest) {
            this.$store.dispatch(
              "trainingPlans/toggleCompletedTask",
              query.themeId
            );
            this.$store.dispatch("tests/postTrainingPlan", {
              testId: Number(query.test),
              trainingPlanId: Number(query.themeId),
            });
            let param = "&";
            if (!serie) {
              param = "?";
            }
            finalTrainingPlanTest = `${param}finalTest=${true}&planId=${
              query.planId
            }`;
          }
          if (this.isStudy) {
            this.$router.push(
              `/study/result${serie}${category}${id}${finalTrainingPlanTest}`
            );
          } else {
            this.$router.push(
              `/tests/result${serie}${category}${id}${finalTrainingPlanTest}`
            );
          }
        },
        this.isTestCompetition ? 0 : 300
      );
      setTimeout(() => {
        this.$store.commit("tests/cleanAnswers");
      }, 3000);
    },
    enableVirtualBoard() {
      this.enabledVirtualBoard = this.currentQuestion.type === "field_marking";
      if (this.enabledVirtualBoard && this.currentAnswer) {
        this.selectedFields =
          this.currentAnswer.value !== "" ? [...this.currentAnswer.value] : [];
      }
    },
    toggle(row, col) {
      const field = `${row}${col}`;
      if (this.selectedPosition === field) {
        // deselect piece
        this.enabledVirtualBoard = false;
        this.selectedPosition = null;
        this.removeGreySquares();
      } else if (this.selectedPosition !== null) {
        // some row-col which is != current piece

        const selectedPosition = this.selectedPosition;
        if (this.onDrop(this.selectedPosition, field, this.selectedPiece)) {
          // piece can move there

          this.board.move(`${selectedPosition}-${field}`);
          this.enabledVirtualBoard = false;
          this.selectedPosition = null;
        }
      } else {
        if (this.selected(row, col)) {
          this.selectedFields = this.selectedFields.filter((f) => f !== field);
        } else {
          this.selectedFields.push(field);
        }
        this.$store.commit("tests/setAnswerValue", [...this.selectedFields]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
