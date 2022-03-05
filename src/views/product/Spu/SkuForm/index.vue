<template>
  <el-form ref="form" :model="skuInfo" label-width="80px">
    <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
    <el-form-item label="SKU名称">
      <el-input v-model="skuInfo.skuName" placeholder="SKU名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuInfo.price" type="number" placeholder="价格(元)" />
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input
        v-model="skuInfo.skuDesc"
        type="textarea"
        :rows="4"
        placeholder="规格描述"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item
          v-for="attrInfo in attrInfoList"
          :key="attrInfo.id"
          :label="attrInfo.attrName"
        >
          <el-select
            v-model="attrInfo.attrIdAndValueId"
            placeholder="请选择"
            style="margin-bottom: 20px"
          >
            <el-option
              v-for="val in attrInfo.attrValueList"
              :key="val.id"
              :label="val.valueName"
              :value="`${attrInfo.id}:${val.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item
          v-for="saleAttr in spuSaleAttrList"
          :key="saleAttr.id"
          :label="saleAttr.saleAttrName"
        >
          <el-select
            v-model="saleAttr.attrIdAndValueId"
            placeholder="请选择"
            value=""
          >
            <el-option
              v-for="attrValue in saleAttr.spuSaleAttrValueList"
              :key="attrValue.id"
              :label="attrValue.saleAttrValueName"
              :value="`${saleAttr.id}:${attrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table
        :data="spuImageList"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        >>
        <el-table-column type="selection" width="80px" />
        <el-table-column prop="imgUrl" label="图片" width="width">
          <template slot-scope="{ row, $index }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.imgUrl"
              :fit="'fill'"
            />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" width="width" />
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button
              v-if="row.isDefault === 0"
              type="primary"
              size="mini"
              @click="handleChangeDefault(row)"
              >设为默认</el-button
            >
            <el-button v-else type="success" plain size="mini">默认</el-button>
            <!-- <el-tag v-else type="success">默认</el-tag> -->
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        category3Id: null,
        spuId: 0,
        tmId: 0,
        skuName: "",
        price: null,
        weight: "",
        skuDesc: "",
        skuAttrValueList: [
          /* {
            attrId: 0,
            valueId: 0,
          }, */
        ],
        skuDefaultImg: "",
        skuImageList: [
          /* {
            id: 0,
            imgName: "",
            imgUrl: "",
            isDefault: "",
            skuId: 0,
            spuImgId: 0,
          }, */
        ],
        skuSaleAttrValueList: [
          /* {
            saleAttrId: 0,
            saleAttrValueId: 0,
          }, */
        ],
      },
      spuName: "",
      imageList: [],
    };
  },
  methods: {
    async getSkuData(category1Id, category2Id, row) {
      const { category3Id, id, tmId, spuName } = row;
      // 获取图片列表
      const imageResult = await this.$API.spu.reqSpuImageList(id);
      if (imageResult.code === 200) {
        const list = imageResult.data;
        list.forEach((item) => this.$set(item, "isDefault", 0));
        this.spuImageList = list;
      } else {
        this.$message.warning("获取图片列表失败");
      }
      // 获取售卖属性
      const saleAttrResult = await this.$API.spu.reqSpuSaleAttrList(id);
      if (saleAttrResult.code === 200) {
        this.spuSaleAttrList = saleAttrResult.data;
      } else {
        this.$message.warning("获取售卖属性失败");
      }
      // 获取平台属性
      const attrInfoResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (attrInfoResult.code === 200) {
        this.attrInfoList = attrInfoResult.data;
      } else {
        this.$message.warning("获取平台属性失败");
      }
      // 收集来自父组件的数据
      this.spu = row;
      this.$set(this.skuInfo, "category3Id", category3Id);
      this.$set(this.skuInfo, "spuId", id);
      this.$set(this.skuInfo, "tmId", tmId);
    },
    handleSelectionChange(val) {
      this.imageList = val;
    },
    handleChangeDefault(row) {
      this.spuImageList.forEach((el) => (el.isDefault = 0));
      row.isDefault = 1;
      this.$set(this.skuInfo, "skuDefaultImg", row.imgUrl);
    },
    handleCancel() {
      this.$emit("changeScenes", 0);
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    async handleSave() {
      const { attrInfoList, spuSaleAttrList, imageList, skuInfo } = this;
      // 整理平台属性
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      // 整理图片列表
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // 发起请求
      const result = await this.$API.spu.reqAddUpdateSkuInfo(skuInfo);
      const chart = skuInfo.id ? "修改" : "添加";
      if (result.code === 200) {
        this.$message.success(`${chart}SKU成功`);
        this.$emit("changeScenes", 0);
        // 清除数据
        Object.assign(this._data, this.$options.data());
      } else {
        this.$message.warning(`${chart}SKU失败`);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
