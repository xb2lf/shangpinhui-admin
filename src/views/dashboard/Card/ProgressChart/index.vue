<template>
  <div ref="echarts" class="charts" />
</template>

<script>
import echarts from "echarts";
export default {
  name: "ProgressChart",
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
          min: 0,
          max: 100,
        },
        yAxis: {
          show: false,
          type: "category",
        },
        series: [
          {
            type: "bar",
            data: [78],
            color: "#98C02A",
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              color: "#eeeeee",
            },
            label: {
              show: true,
              formatter: "|",
              position: "right",
            },
          },
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
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
