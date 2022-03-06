<template>
  <div>
    <div class="header">
      <span class="search-title">搜索用户数</span>
      <svg
        t="1646562967645"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2036"
        width="16"
        height="16"
      >
        <path
          d="M1024 512C1024 229.230208 794.769792 0 512 0 229.230208 0 0 229.230208 0 512 0 794.769792 229.230208 1024 512 1024 629.410831 1024 740.826187 984.331046 830.768465 912.686662 841.557579 904.092491 843.33693 888.379234 834.742758 877.590121 826.148587 866.801009 810.43533 865.021658 799.646219 873.615827 718.470035 938.277495 618.001779 974.048781 512 974.048781 256.817504 974.048781 49.951219 767.182496 49.951219 512 49.951219 256.817504 256.817504 49.951219 512 49.951219 767.182496 49.951219 974.048781 256.817504 974.048781 512 974.048781 599.492834 949.714859 683.336764 904.470807 755.960693 897.177109 767.668243 900.755245 783.071797 912.462793 790.365493 924.170342 797.659191 939.573897 794.081058 946.867595 782.373508 997.013826 701.880796 1024 608.898379 1024 512Z"
          p-id="2037"
          fill="#8a8a8a"
        />
        <path
          d="M499.512194 743.02439C499.512194 756.818039 510.694157 768 524.487806 768 538.281453 768 549.463415 756.818039 549.463415 743.02439L549.463415 424.585365C549.463415 410.791718 538.281453 399.609756 524.487806 399.609756 510.694157 399.609756 499.512194 410.791718 499.512194 424.585365L499.512194 743.02439Z"
          p-id="2038"
          fill="#8a8a8a"
        />
        <path
          d="M499.512194 318.439025C499.512194 332.232672 510.694157 343.414635 524.487806 343.414635 538.281453 343.414635 549.463415 332.232672 549.463415 318.439025L549.463415 274.731708C549.463415 260.938059 538.281453 249.756098 524.487806 249.756098 510.694157 249.756098 499.512194 260.938059 499.512194 274.731708L499.512194 318.439025Z"
          p-id="2039"
          fill="#8a8a8a"
        />
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <!-- 向上 -->
      <svg
        t="1646564339186"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6554"
        width="16"
        height="16"
      >
        <path
          d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z"
          p-id="6555"
          fill="#d81e06"
        />
      </svg>
      <!-- 向下 -->
      <svg
        t="1646564371976"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6848"
        width="16"
        height="16"
      >
        <path
          d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z"
          p-id="6849"
          fill="#1afa29"
        />
      </svg>
    </div>
    <div class="footer">
      <div ref="charts" class="charts" />
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
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
              color: "#6796F3",
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
                    color: "#6796F3", // 0% 处的颜色
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
.header {
  display: flex;
  align-content: center;
}
.search-title {
  margin-right: 20px;
  vertical-align: bottom;
}
.main {
  margin: 10px 0;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>
