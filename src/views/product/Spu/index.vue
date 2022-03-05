<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="scene !== 0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- spu列表展示 -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!category3Id"
          @click="scene = 1"
          >添加SPU</el-button
        >
        <el-table :data="spuList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
            :index="table_index"
          />
          <el-table-column prop="spuName" label="spu名称" />
          <el-table-column prop="description" label="spu描述" />
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <hint-button
                title="添加sku"
                type="success"
                icon="el-icon-plus"
                size="mini"
                @click="scene = 2"
              />
              <hint-button
                title="修改spu"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="scene = 1"
              />
              <hint-button
                title="查看当前spu的sku列表"
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="handleDeleteTradeMark(row)"
              />
              <hint-button
                title="删除spu"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDeleteTradeMark(row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          :page-count="7"
          layout="prev, pager, next, jumper,->,sizes, total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <SpuForm v-show="scene === 1"></SpuForm>
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      spuList: [],
      page: 1,
      limit: 5,
      total: 0,
      scene: 0,
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取平台属性列表
        this.getSpuList();
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this;
      const result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code === 200) {
        this.spuList = result.data.records;
        this.total = result.data.total;
      } else {
        this.$message.warning("获取spu列表失败");
      }
    },
    table_index(index) {
      return (this.page - 1) * this.limit + index + 1;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getSpuList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSpuList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
