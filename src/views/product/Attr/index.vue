<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!category3Id"
          @click="handleAddAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
            :index="table_index"
          />
          <el-table-column prop="attrName" label="属性名称" width="150px" />
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                type="success"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="handleUpdateAttr(row)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDeleteTradeMark(row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" :model="attrInfo" label-width="80px">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="handleAddAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          :data="attrInfo.attrValueList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column width="width" prop="valueName" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="`input-${$index}`"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="handleShowValue(row)"
                @keyup.native.enter="$event.target.blur"
              />
              <span
                v-else
                style="display: block"
                @click="handleSwitchEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- confirm事件绑定说明：本版本2.13.2(onConfirm或on-confirm: @onConfirm) 新版本2.15.6及以上(confirm: @confirm)-->
              <el-popconfirm
                :title="`确定要删除${row.valueName}吗?`"
                @onConfirm="handleDeleteAttrValue($index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="!attrInfo.attrValueList.length"
          @click="handleSaveAttr"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      page: 1,
      limit: 5,
      isShowTable: true,
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
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
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      const result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 200) {
        this.attrList = result.data;
      } else {
        this.$message.warning("获取平台属性列表失败");
      }
    },
    table_index(index) {
      return (this.page - 1) * this.limit + index + 1;
    },
    handleAddAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    handleAddAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      const index = this.attrInfo.attrValueList.length - 1;
      this.$nextTick(() => {
        this.$refs[`input-${index}`].focus();
      });
    },
    handleUpdateAttr(attr) {
      this.isShowTable = false;
      // 由于数据格式复杂，则此处赋值时需要深拷贝
      this.attrInfo.attrValueList.forEach((item) =>
        this.$set(item, "flag", false)
      );
      this.attrInfo = cloneDeep(attr);
    },
    handleShowValue(row) {
      if (row.valueName.trim() === "") {
        this.$message.warning("请输入一个合法的属性值");
        return false;
      }
      // 新增的属性值不能与已有的属性值重复
      const isRepetition = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      if (isRepetition) {
        this.$message.warning("属性值不能重复哦");
        return false;
      }
      row.flag = false;
    },
    handleSwitchEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[`input-${index}`].focus();
      });
    },
    handleDeleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    async handleSaveAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            this.$delete(item, "flag");
            return true;
          }
        }
      );
      const result = await this.$API.attr.reqSetAttr(this.attrInfo);
      if (result.code === 200) {
        this.$message.success("保存成功");
        this.isShowTable = true;
        this.getAttrList();
      } else {
        this.$message.warning("保存失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
