<template>
  <div class="chart">
    <h1 id="title">Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
#title {
  background-color: aquamarine;
  text-align: center;
  font-size: 24px;
  font-style: italic;
  font-family: Verdana;
  padding: 10px;
}
</style>
