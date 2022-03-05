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
          @click="handleAddSpu"
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
                @click="handleAddSku(row)"
              />
              <hint-button
                title="修改spu"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="handleUpdateSpu(row)"
              />
              <hint-button
                title="查看当前spu的sku列表"
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="handleShowSkuList(row)"
              />
              <el-popconfirm
                :title="`确定要删除${row.spuName}吗?`"
                @onConfirm="handleDeleteSpu(row)"
              >
                <hint-button
                  slot="reference"
                  title="删除spu"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popconfirm>
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
      <SpuForm v-show="scene === 1" ref="spu" @changeScene="changeScene" />
      <SkuForm v-show="scene === 2" ref="sku" @changeScenes="changeScenes" />
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的列表`"
      :visible.sync="dialogTableVisible"
      :before-close="handleDialogClose"
    >
      <el-table v-loading="loading" :data="skuList" style="width: 100%">
        <el-table-column prop="skuName" label="名称" width="width" />
        <el-table-column prop="price" label="价格" width="width" />
        <el-table-column prop="weight" label="重量" width="width" />
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.skuDefaultImg"
              :fit="'fill'"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      dialogTableVisible: false,
      skuList: [],
      spu: {},
      loading: true,
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
    handleAddSpu() {
      this.scene = 1;
      this.$refs.spu.getAddSpuData(this.category3Id);
    },
    handleUpdateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    async handleDeleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code === 200) {
        this.$message.success("删除SPU成功");
        this.page = this.spuList.length > 1 ? this.page : this.page - 1;
        this.getSpuList();
      } else {
        this.$message.warning("删除SPu失败");
      }
    },
    async handleShowSkuList(row) {
      this.dialogTableVisible = true;
      this.spu = row;
      const result = await this.$API.spu.reqSkuList(row.id);
      if (result.code === 200) {
        this.skuList = result.data;
        this.loading = false;
      } else {
        this.$$message.warning("获取SKU列表失败");
      }
    },
    handleAddSku(row) {
      this.scene = 2;
      this.$refs.sku.getSkuData(this.category1Id, this.category2Id, row);
    },
    changeScene({ scene, flag }) {
      this.scene = scene;
      this.page = flag === "修改" ? this.page : 1;
      this.getSpuList();
    },
    changeScenes(scene) {
      this.scene = scene;
    },
    handleDialogClose(done) {
      this.loading = true;
      this.skuList = [];
      done();
    },
  },
};
</script>

<style lang="scss" scoped></style>
