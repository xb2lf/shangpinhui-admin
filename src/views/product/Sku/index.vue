<template>
  <div>
    <el-table :data="skuList" style="width: 100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        :index="table_index"
      />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column prop="skuDefaultImg" label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <el-image
            style="width: 80px; height: 80px"
            :src="row.skuDefaultImg"
            :fit="'fit'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80" />
      <el-table-column prop="price" label="价格(元)" width="80" />
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{ row, $index }">
          <hint-button
            v-if="row.isSale === 1"
            title="下架sku"
            type="success"
            icon="el-icon-bottom"
            size="mini"
            @click="handleCancelSale(row)"
          />
          <hint-button
            v-else
            title="上架sku"
            type="info"
            icon="el-icon-top"
            size="mini"
            @click="handleSale(row)"
          />
          <hint-button
            title="修改sku"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdateSku(row)"
          />
          <hint-button
            title="查看当前sku详情"
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="handleShowSkuDetail(row)"
          />
          <el-popconfirm
            :title="`确定要删除${row.skuName}吗?`"
            @onConfirm="handleDeleteSku(row)"
          >
            <hint-button
              slot="reference"
              title="删除sku"
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
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col></el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">重量</el-col>
        <el-col :span="16">{{ skuInfo.weight }}KG</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" type="success" style="margin-right:10px">{{ attr.attrId }}-{{ attr.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <el-image
                :src="item.imgUrl"
                :fit="'fit'"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      skuList: [],
      page: 1,
      limit: 5,
      total: 0,
      drawer: false,
      direction: 'rtl',
      skuInfo: {}
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    async getSkuList() {
      const result = await this.$API.sku.reqSkuList(this.page, this.limit)
      if (result.code === 200) {
        this.skuList = result.data.records || []
        this.total = result.data.total || 0
      } else {
        this.$message.warning('获取SKU列表失败')
      }
    },
    table_index(index) {
      return (this.page - 1) * this.limit + index + 1
    },
    handleSizeChange(val) {
      this.limit = val
      this.getSkuList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSkuList()
    },
    async handleSale(row) {
      const result = await this.$API.sku.reqSale(row.id)
      if (result.code === 200) {
        this.$message.success('上架SKU成功')
        this.getSkuList()
      } else {
        this.$message.warning('上架SKU失败')
      }
    },
    async handleCancelSale(row) {
      const result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        this.$message.success('下架SKU成功')
        this.getSkuList()
      } else {
        this.$message.warning('下架SKU失败')
      }
    },
    handleUpdateSku(row) {
      this.$message.info('正在开发中...')
    },
    async handleShowSkuDetail(row) {
      this.drawer = true
      const result = await this.$API.sku.reqSKuById(row.id)
      if (result.code === 200) {
        this.skuInfo = result.data
      } else {
        this.$message.warning('获取SKU详情失败')
      }
    },
    async handleDeleteSku(row) {
      const result = await this.$API.sku.reqDeleteSku(row.id)
      if (result.code === 200) {
        this.$message.success('删除SKU成功')
        this.page = this.skuList.length > 1 ? this.page : this.page - 1
        this.getSkuList()
      } else {
        this.$message.warning('删除SKU失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    font-weight: 700;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
   ::v-deep .el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>
