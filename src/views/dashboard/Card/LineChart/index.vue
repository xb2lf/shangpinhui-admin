<template>
  <div ref="charts" class="charts" />
</template>

<script>
import echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    this.initLineChart();
  },
  methods: {
    initLineChart() {
      // 初始化echarts实例
      const lineCharts = echarts.init(this.$refs.charts);
      // 配置数据
      lineCharts.setOption({
        xAxis: {
          show: false,
          type: "category",
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: "line",
            data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              color: "#906FE1",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#906FE1", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
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
