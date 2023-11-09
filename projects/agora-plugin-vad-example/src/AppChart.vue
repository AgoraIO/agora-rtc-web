<template>
  <div id="app-chart">
    <canvas ref="vadResult"></canvas>

    <div class="chart-operations">
      <ElButton v-if="!isChartCreated" @click="createChart" type="primary"
        >Create Chart</ElButton
      >
      <ElButton @click="isDrawingPaused = !isDrawingPaused" type="primary">{{
        isDrawingPaused ? "Draw" : "Pause"
      }}</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";

import { onMounted, ref } from "vue";

const vadResult = ref<HTMLCanvasElement>();

const data: number[] = [];

let vadChart: any = null;
const pointNum = 1000;
const labels = Array.from(Array(pointNum).keys());

const isDrawingPaused = ref(true);
const isChartCreated = ref(false);

async function createChart() {
  if (!vadResult.value) {
    return;
  }

  const Chart = (await import("chart.js/auto")).default;

  isChartCreated.value = true;

  vadChart = new Chart(vadResult.value, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# VAD",
          data,
          borderColor: "rgb(102, 156, 246)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      // @ts-ignore
      animations: false,
      // responsive: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  // @ts-ignore
  window["vadChart"] = vadChart;
}

onMounted(() => {
  if (!vadResult.value) {
    throw new Error("no vad canvas");
  }
});

let isDrawing = false;
function addData(n: number) {
  // if (n > 99.99) {
  //   console.warn(`当前可能有人声，概率为: ${n}%`);
  // }

  if (!vadChart || isDrawing || isDrawingPaused.value) {
    return;
  }

  isDrawing = true;

  if (data.length >= pointNum) {
    data.shift();
  }
  data.push(n);
  vadChart.update();

  setTimeout(() => (isDrawing = false), 50);
}

defineExpose({
  addData,
});
</script>

<style lang="less">
#app-chart {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 80%;
  height: 60%;
  text-align: center;

  > canvas {
    margin: 0 auto;
  }
}
</style>
