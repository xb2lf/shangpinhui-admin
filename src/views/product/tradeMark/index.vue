<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="handleShowDialog"
      >添加</el-button
    >
    <el-table :data="pageList" style="width: 100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
        :index="table_index"
      />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDeleteTradeMark(row)"
            >删除</el-button
          >
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
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogVisible"
    >
      <el-form ref="ruleForm" :model="tmForm" style="width: 80%" :rules="rules">
        <el-form-item
          prop="tmName"
          label="品牌名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item
          prop="logoUrl"
          label="品牌LOGO"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :drag="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    var validateTmName = (rule, value, callback) => {
      // 自定义校验规则
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称2-10位"));
      } else {
        callback();
      }
    };
    return {
      pageList: [],
      page: 1,
      limit: 5,
      total: 0,
      dialogVisible: false,
      formLabelWidth: "100px",
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        // 品牌名称的验证规则
        // require:必须要校验字段（前面五角星有关系）  message 提示信息    trigger:用户行为设置（事件的设置:blur、change）
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          /* { min: 2, max: 10, message: "品牌名称2-10位", trigger: "change" }, */
          // 自定义校验规则
          { validator: validateTmName, trigger: "change" },
        ],
        // 品牌的logo验证规则
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList() {
      const result = await this.$API.trademark.reqTradeMarkList(
        this.page,
        this.limit
      );
      if (result.code === 200) {
        this.pageList = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getPageList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getPageList();
    },
    table_index(index) {
      return (this.page - 1) * this.limit + index + 1;
    },
    handleShowDialog() {
      this.dialogVisible = true;
      this.$set(this.tmForm, "tmName", "");
      this.$set(this.tmForm, "logoUrl", "");
    },
    handleUpdateTradeMark(row) {
      this.dialogVisible = true;
      this.tmForm = { ...row };
    },
    handleDeleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击确定按钮的时候会出发
          // 向服务器发请求
          const result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          // 如果删除成功
          if (result.code === 200) {
            this.$$message.success("删除成功!");
            // 再次获取品牌列表数据
            this.page = this.pageList.length > 1 ? this.page : this.page - 1;
            this.getPageList();
          } else {
            this.$message.warning("删除失败");
          }
        })
        .catch(() => {
          // 当用户点击取消按钮的时候会触发
          this.$message.info("已取消删除");
        });
    },
    handleAvatarSuccess(res, file) {
      this.$set(this.tmForm, "logoUrl", res.data);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAddOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogVisible = false;
          const result = await this.$API.trademark.reqAddUpdateTradeMark(
            this.tmForm
          );
          const word = this.tmForm.id ? "修改" : "添加";
          this.page = this.tmForm.id ? this.page : 1;
          if (result.code === 200) {
            this.$message.success(`${word}品牌成功`);
            this.getPageList();
          } else {
            this.$message.warning(`${word}品牌失败`);
          }
        } else {
          this.$message.error("error submit");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
