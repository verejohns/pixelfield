<template>
  <div class="overlay-board">
    <div v-for="rowIdx in 8" :key="`row_${rowIdx}`" class="overlay-board__row">
      <div
        v-for="(column, colIdx) in getColumns(rowIdx)"
        :key="`row_${rowIdx}_col_${colIdx}`"
        class="overlay-board__col"
        :class="{ occupied: column.type }"
        @click="clickHandler(column.type)"
      >
        <img
          v-if="column.type === 'Q' && isWhite"
          src="~/assets/images/pieces/wQ.png"
        />
        <img
          v-else-if="column.type === 'Q' && !isWhite"
          src="~/assets/images/pieces/bQ.png"
        />
        <img
          v-else-if="column.type === 'K' && isWhite"
          src="~/assets/images/pieces/wN.png"
        />
        <img
          v-else-if="column.type === 'K' && !isWhite"
          src="~/assets/images/pieces/bN.png"
        />
        <img
          v-else-if="column.type === 'R' && isWhite"
          src="~/assets/images/pieces/wR.png"
        />
        <img
          v-else-if="column.type === 'R' && !isWhite"
          src="~/assets/images/pieces/bR.png"
        />
        <img
          v-else-if="column.type === 'B' && isWhite"
          src="~/assets/images/pieces/wB.png"
        />
        <img
          v-else-if="column.type === 'B' && !isWhite"
          src="~/assets/images/pieces/bB.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OverlayBoard",
  props: {
    col: {
      type: Number,
      required: true,
    },
    isTop: {
      type: Boolean,
      required: true,
    },
    isWhite: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getColumns(rowIdx) {
      const cols = [
        { type: null },
        { type: null },
        { type: null },
        { type: null },
        { type: null },
        { type: null },
        { type: null },
        { type: null },
      ];

      if (this.isTop) {
        if (rowIdx === this.col) {
          cols[0].type = "Q";
          cols[1].type = "K";
          cols[2].type = "R";
          cols[3].type = "B";
        }
      } else if (rowIdx === this.col) {
        cols[4].type = "B";
        cols[5].type = "R";
        cols[6].type = "K";
        cols[7].type = "Q";
      }
      return cols;
    },
    clickHandler(type) {
      if (type) this.$emit("select", type);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/overlay-board";
</style>
