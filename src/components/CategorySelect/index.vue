<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          v-model="cForm.category1Id"
          placeholder="请选择"
          :disabled="show"
          @change="handleChangeCategory1"
        >
          <el-option
            v-for="item in list1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="cForm.category2Id"
          placeholder="请选择"
          :disabled="show"
          @change="handleCHangeCategory2"
        >
          <el-option
            v-for="item in list2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="cForm.category3Id"
          placeholder="请选择"
          :disabled="show"
          @change="handleChangeCategory3"
        >
          <el-option
            v-for="item in list3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategort1List();
  },
  methods: {
    async getCategort1List() {
      const result = await this.$API.attr.reqcategory1List();
      if (result.code === 200) {
        this.list1 = result.data;
      } else {
        this.$message.warning("获取一级分类列表失败");
      }
    },
    async handleChangeCategory1(id) {
      // 清除二级和三级的数据
      this.list2 = [];
      this.list3 = [];
      this.$set(this.cForm, "category2Id", "");
      this.$set(this.cForm, "category3Id", "");
      this.$emit("getCategoryId", { categoryId: id, level: 1 });
      const result = await this.$API.attr.reqcategory2List(id);
      if (result.code === 200) {
        this.list2 = result.data;
      } else {
        this.$message.warning("获取二级分类列表失败");
      }
    },
    async handleCHangeCategory2(id) {
      // 清除三级的数据
      this.list3 = [];
      this.$set(this.cForm, "category3Id", "");
      this.$emit("getCategoryId", { categoryId: id, level: 2 });
      const result = await this.$API.attr.reqcategory3List(id);
      if (result.code === 200) {
        this.list3 = result.data;
      } else {
        this.$message.warning("获取三级分类列表失败");
      }
    },
    handleChangeCategory3(id) {
      this.$emit("getCategoryId", { categoryId: id, level: 3 });
    },
  },
};
</script>

<style lang="scss" scoped></style>
