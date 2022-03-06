<template>
  <el-card>
    <div slot="header" class="search-card-header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more" style="cursor: pointer" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineChart />
        </el-col>
        <el-col :span="12">
          <LineChart />
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :default-sort="{ prop: 'num', order: 'ascending' }"
      >
        <el-table-column
          type="index"
          label="排名"
          width="80"
          align="center"
          :index="table_index"
        />
        <el-table-column prop="keyword" label="搜索关键字" />
        <el-table-column prop="num" label="用户数" sortable />
        <el-table-column prop="upnnum" label="周涨幅" sortable />
      </el-table>
      <el-pagination
        style="margin-top: 20px; text-align: center"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        :page-count="7"
        layout="prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script>
import LineChart from "./LineChart";
export default {
  name: "Search",
  components: { LineChart },
  data() {
    return {
      tableData: [],
      page: 1,
      limit: 5,
      total: 0,
    };
  },
  methods: {
    table_index(index) {
      return (this.page - 1) * this.limit + index + 1;
    },
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-card-header {
  border-bottom: 2px solid #e4e7ed;
}
.search-header {
  height: 36px;
  display: flex;
  justify-content: space-between;
}
</style>
