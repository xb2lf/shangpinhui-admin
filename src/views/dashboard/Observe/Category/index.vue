<template>
  <el-card>
    <div slot="header" class="category-card-header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group
          v-model="radio"
          size="medium"
          class="category-radio-group"
        >
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
    </div>
    <div>
      <div ref="charts" class="charts" />
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio: "全部渠道",
    };
  },
  mounted() {
    this.initLineChart();
  },
  methods: {
    initLineChart() {
      // 初始化echarts实例
      const mychart = echarts.init(this.$refs.charts);
      // 配置数据
      mychart.setOption({
        title: {
          text: "搜索引擎",
          subtext: 1048,
          text: 1048,
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        color: ["#5271CB", "#8EC271", "#FFC653", "#FA7466", "#6DBAE0"],
        series: [
          {
            name: "销售额类别占比图",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outsize",
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 484, name: "联盟广告" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 300, name: "视频广告" },
            ],
          },
        ],
      });
      // 绑定事件

      mychart.on("mouseover", (params) => {
        // 获取鼠标移上去那条数据
        const { name, value } = params.data;
        // 重新设置标题
        mychart.setOption({
          title: {
            text: name,
            subtext: value,
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-card-header {
  border-bottom: 2px solid #e4e7ed;
}
.category-header {
  height: 36px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.category-radio-group {
  position: absolute;
  bottom: 10px;
  right: 0;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>
