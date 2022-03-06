<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span style="margin-right: 10px"
                >周同比&nbsp;&nbsp;56.67%
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
              </span>
              <span
                >日同比&nbsp;&nbsp;19.96%
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
              </span>
            </template>
            <template slot="footer">
              <span>日销售额￥&nbsp;&nbsp;12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量&nbsp;&nbsp;12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转化率65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span style="margin-right: 10px"
                >周同比&nbsp;&nbsp;12%
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
                  /></svg
              ></span>
              <span
                >日同比&nbsp;&nbsp;11%<svg
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
                  /></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ProgressChart from "./ProgressChart";
export default {
  name: "Card",
  components: { Detail, LineChart, BarChart, ProgressChart },
};
</script>

<style lang="scss" scoped></style>
