<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="model" placeholder="SPU名称" />
    </el-form-item>
    <el-form-item label="label">
      <el-select v-model="model" placeholder="请选择品牌">
        <el-option label="label" value="value" />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        v-model="model"
        type="textarea"
        autosize
        :rows="4"
        placeholder="SPU描述"
      />
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select v-model="model" placeholder="还有3未选择">
        <el-option label="label" value="value" />
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
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
        <el-table-column width="width" prop="valueName" label="属性名" />
        <el-table-column
          prop="attrValueList"
          label="属性值名称列表"
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
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="!attrInfo.attrValueList.length"
        @click="handleSaveAttr"
        >保存</el-button
      >
      <el-button @click="isShowTable = true">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
