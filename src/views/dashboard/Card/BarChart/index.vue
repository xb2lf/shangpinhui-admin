<template>
  <div ref="echarts" class="charts" />
</template>

<script>
import echarts from "echarts";
export default {
  name: "BarChart",
  mounted() {
    this.initBarChart();
  },
  methods: {
    initBarChart() {
      // 初始化echarts实例
      const BarCharts = echarts.init(this.$refs.echarts);
      // 配置数据
      BarCharts.setOption({
        xAxis: {
          show: false,
          type: "category",
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: "bar",
            data: [10, 7, 33, 12, 48, 9, 29, 10, 44, 33, 22, 8],
            color: "#5271CB",
          },
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        tooltip: {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
