<template>
  <el-form ref="form" :model="spuInfo" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="spuInfo.spuName" placeholder="SPU名称" />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
        <el-option
          v-for="tm in tradeMarkList"
          :key="tm.id"
          :label="tm.tmName"
          :value="tm.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        v-model="spuInfo.description"
        type="textarea"
        :rows="4"
        placeholder="SPU描述"
      />
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :file-list="spuImageList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        v-model="attrIdAndAttrName"
        :placeholder="`还有${unSelectSaleAttr.length}未选择`"
      >
        <el-option
          v-for="unSelect in unSelectSaleAttr"
          :key="unSelect.id"
          :label="unSelect.name"
          :value="`${unSelect.id}:${unSelect.name}`"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="!attrIdAndAttrName"
        @click="handleAddSaleAttr"
        >添加销售属性</el-button
      >
      <el-table
        :data="spuInfo.spuSaleAttrList"
        style="width: 100%; margin: 20px 0"
        border
      >
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column width="150px" prop="saleAttrName" label="属性名" />
        <el-table-column
          prop="spuSaleAttrValueList"
          label="属性值名称列表"
          width="width"
        >
          <template slot-scope="{ row, $index }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              style="margin: 0 20px"
              :disable-transitions="false"
              @close="handleClose(row, index)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              ref="saveTagInput"
              v-model="row.inputValue"
              class="input-new-tag"
              size="small"
              @blur="handleInputConfirm(row)"
              @keyup.native.enter="$event.target.blur"
            />
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="handleAddSaleAttrValue(row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150px">
          <template slot-scope="{ row, $index }">
            <!-- confirm事件绑定说明：本版本2.13.2(onConfirm或on-confirm: @onConfirm) 新版本2.15.6及以上(confirm: @confirm)-->
            <el-popconfirm
              :title="`确定要删除${row.saleAttrName}吗?`"
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
      <el-button type="primary" @click="handleAddSaleSpu">保存</el-button>
      <el-button @click="handleCanCel">取消</el-button>
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
      spuInfo: {
        category3Id: null,
        description: "",
        spuImageList: [
          /* {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          }, */
        ],
        spuName: "",
        tmId: "",
        spuSaleAttrList: [
          /* {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          }, */
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
      attrIdAndAttrName: "",
    };
  },
  computed: {
    unSelectSaleAttr() {
      const result = this.baseSaleAttrList.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((el) => {
          return item.name !== el.saleAttrName;
        });
      });
      return result;
    },
  },
  methods: {
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化spuForm的数据（修改spu）
    async initSpuData(spu) {
      // 获取spu信息
      const spuResult = await this.$API.spu.reqSpuInfo(spu.id);
      if (spuResult.code === 200) {
        this.spuInfo = spuResult.data;
      } else {
        this.$message.warning("获取SPU信息失败");
      }
      // 获取品牌信息列表
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data;
      } else {
        this.$message.warning("获取品牌信息失败");
      }
      // 获取SPU图片
      const spuImageListResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageListResult.code === 200) {
        const imageList = spuImageListResult.data;
        imageList.forEach((item) => {
          this.$set(item, "name", item.imgName);
          this.$set(item, "url", item.imgUrl);
        });
        this.spuImageList = imageList;
      } else {
        this.$$message.warning("获取SPU图片失败");
      }
      // 获取平台中全部的销售属性
      const baseSaleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleResult.code === 200) {
        this.baseSaleAttrList = baseSaleResult.data;
      } else {
        this.$$message.warning("获取平台销售属性失败");
      }
    },
    // 初始化spuForm的数据(添加spu)
    async getAddSpuData(category3Id) {
      // 获取品牌信息列表
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data;
      } else {
        this.$message.warning("获取品牌信息失败");
      }
      // 获取平台中全部的销售属性
      const baseSaleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleResult.code === 200) {
        this.baseSaleAttrList = baseSaleResult.data;
      } else {
        this.$$message.warning("获取平台销售属性失败");
      }
      this.$set(this.spuInfo, "category3Id", category3Id);
    },
    handleAddSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      const newSaleAttr = {
        baseSaleAttrId: baseSaleAttrId * 1,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spuInfo.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },

    handleAddSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },

    handleInputConfirm(row) {
      const { inputValue, baseSaleAttrId } = row;
      if (!inputValue.trim()) {
        this.$message.warning("请输入合法的属性值名称");
        return false;
      }
      const flag = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName === inputValue.trim()
      );
      if (flag) {
        this.$message.warning("属性值名称不能重复哦");
        return false;
      }
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      this.$set(row, "inputVisible", false);
    },
    handleDeleteAttrValue(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1);
    },
    async handleAddSaleSpu() {
      // 整理参数
      // => 整理SPU图片列表
      this.spuInfo.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      // => 整理售卖属性列表
      /* this.spuInfo.spuSaleAttrList.forEach((item) => {
        if (item.hasOwnProperty("inputValue")) {
          this.$delete(item, "inputValue");
        }
        if ("inputVisible" in item) {
          this.$delete(item, "inputVisible");
        }
      }); */
      const result = await this.$API.spu.reqAddUpdateSpu(this.spuInfo);
      const chart = this.spuInfo.id ? "修改" : "添加";
      if (result.code === 200) {
        this.$message.success(`${chart}SPU成功`);
        this.$emit("changeScene", { scene: 0, flag: chart });
        // 清除数据
        Object.assign(this._data, this.$options.data());
      } else {
        this.$message.warning(`${chart}SPU失败`);
      }
    },
    handleCanCel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      // 清理数据 组件实例this._data可以操作data中响应数据
      // this.$options可以获取配置对象；配置对象中的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
