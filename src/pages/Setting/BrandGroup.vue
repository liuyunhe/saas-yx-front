<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-col class="mb20">
         <el-button type="primary" @click="addItem" style="margin-right: 20px">新建规格</el-button> 已关联规格销区不支持重复设置（示例：若对已设置的石家庄销区删减/增加关联规格，需把已设置的石家庄销区先剔除，重新创建）
      </el-col>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>规格设置：</span>
        </div>
        <el-form>
          <el-form-item v-for="(item,index) in  list" label="销区：" :key="index">
            <el-select v-model="item.myZoneCodes" multiple collapse-tags filterable placeholder="请选择销区">
              <el-option v-for="i in item.saleZone" :key="i.id" :disabled="item.otherZoneCodes.indexOf(i.zoneCode) > -1" :label="i.zoneName" :value="i.zoneCode">
              </el-option>
            </el-select>
            <span style="margin-left: 20px">关联品牌规格：</span>
            <el-select v-model="item.groupInfo.brandCode" multiple collapse-tags filterable placeholder="请选择" @change="getBrandSonList(item.groupInfo.brandCode)">
              <el-option v-for="item in brandList" :key="item.id" :disabled="item.disabled" :label="item.name" :value="item.brandCode">
              </el-option>
            </el-select>
            <el-select style="width: 250px" v-model="item.snList" multiple collapse-tags filterable placeholder="请选择">
              <el-option v-for="item in brandSonList" :disabled="item.disabled" :key="item.id" :label="item.allName" :value="item.sn">
              </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 20px" v-if="item.groupInfo.id" @click="handleUpdateItem(item)">修改</el-button>
            <el-button type="primary" style="margin-left: 20px" v-if="!item.groupInfo.id" @click="handleSaveItem(item)">保存</el-button>

            <el-button type="danger" @click="handleDeleteItem(item,index)">删除</el-button>
            <div style="margin-top: 15px">已选销区：
              <span v-for="(j,k) in item.myZoneCodes " :key="k" v-if="showZoneName" style="margin-right: 10px">{{ getZoneName(j) }}{{ k+1 == item.myZoneCodes.length ? " 。 " : " 、 " }}</span>
            </div>
            <div>已选规格：
              <span v-for="(l,m) in item.snList" :key="m" v-if="showSNName" style="margin-right: 10px"> {{ getSNName(l) }}{{ m+1 == item.snList.length ? " 。 " : " 、 " }}</span>
            </div>
          </el-form-item>

        </el-form>
      </el-card>

    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading:true,
        list:[],
        saleZone:[],
        brandList:[],
        brandSonList:[],
        showZoneName:false,
        showSNName:false,
      }
    },
    created() {
      this.getInfo()
      this.getBrandList()
    },
    methods: {
      getZoneName(j){
        let item = this.saleZone.find(i=>{
          if(i && i.zoneCode){
            return i.zoneCode == j
          }
        })
        return item.zoneName ? item.zoneName :  ''
      },
      getSNName(j){
        let item = this.brandSonList.find(i=>{
          if(i && i.sn){
            return i.sn == j
          }
        })
        return item.allName ? item.allName :  ''
      },
      addItem(){
        const item = {
          "otherZoneCodes": [], //其它记录选择的销区.
          "snList": [],//选择的sn
          "groupInfo": { //记录信息,代表了一组销区和sn对应关系.
            "id": null,
            "brandCode": "brandCode1", //品牌code
          },
          "myZoneCodes": [] //当前记录选择的销区.
        }
        if(this.list.length>0){
          this.list.forEach(i => {
            item.otherZoneCodes.push(...i.myZoneCodes)
          })
        }
        item.saleZone = [...this.saleZone]
        this.list.push(item)
      },
      getInfo() {
        this.$request.post('/api/actSaleBrandGroup/list', {}, true, res => {
          if (res.code == '200') {
            this.list = res.data || []
            this.list.map(item => {
              item.groupInfo.brandCode = item.groupInfo.brandCode.split(",")
              this.getBrandSonList(item.groupInfo.brandCode)
            })
            this.getSaleZone()
            return
          }
          this.$message.error(res.msg)
        })
      },
      getSaleZone() {
        this.$request.post('/api/saleZone/listNoQ ', {}, true, (res)=>{
          if (res.code == '200') {
            this.saleZone = res.data||[];
            this.list.forEach(item => {
              item.saleZone = [...res.data]
            })
            this.showZoneName = true
            this.loading = false
          }
        });
      },
      getBrandList() {
        this.$request.post('/api/wiseqr/prod/listBrand', {
          pageSize: '-1'
        }, true, res => {
          if (res.ret === '200000') {
            this.brandList = res.data.list
            return
          }
          this.$message.error(res.message)
        })
      },
      // 获取子品牌列表
      getBrandSonList(brandCode) {
        this.$request.post(
          '/api/wiseqr/prod/list', {
            status: "1",
            brandCodeArr: brandCode,
            pageSize: '-1'
          },
          true,
          res => {
            if (res.ret === '200000') {
              this.brandSonList = res.data.list
              this.showSNName = true
              return
            }
            this.$message.error(res.message)
          }
        )
      },
      handleSaveItem(item){
        let params = {
          "brandCode": item.groupInfo.brandCode.toString(), //品牌code
          "saleZoneList": item.myZoneCodes,//销区列表
          "snList": item.snList
        }
        console.log(params)
        if(params.saleZoneList.length == 0){
          this.$message.error('请选择销区！')
          return
        }
        if(!params.brandCode){
          this.$message.error('请选择品牌！')
          return
        }
        if(params.snList.length == 0){
          this.$message.error('请选择规格！')
          return
        }
        this.$request.post('/api/actSaleBrandGroup/add', params, true, res => {
          if (res.code == '200') {
            this.$message.success('保存成功！')
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
        })
      },
      handleUpdateItem(item){
        let params = {
          "id": item.groupInfo.id,
          "brandCode": item.groupInfo.brandCode.toString(), //品牌code
          "saleZoneList": item.myZoneCodes,//销区列表
          "snList": item.snList
        }
        console.log(params)
        if(params.saleZoneList.length == 0){
          this.$message.error('请选择销区！')
          return
        }
        if(!params.brandCode){
          this.$message.error('请选择品牌！')
          return
        }
        if(params.snList.length == 0){
          this.$message.error('请选择规格！')
          return
        }
        this.$request.post('/api/actSaleBrandGroup/update', params, true, res => {
          if (res.code == '200') {
            this.$message.success('更新成功！')
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
        })
      },
      async handleDeleteItem(item,index){
        const confirmResult = await this.$confirm('您确定删除此项？', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        if(item.groupInfo.id){
          let params = {
            id: item.groupInfo.id,
          }
          this.$request.post('/api/actSaleBrandGroup/delete', params, false, res => {
            if (res.code == '200') {
              this.$message.success('删除成功！')
              this.getInfo()
              return
            }
            this.$message.error(res.msg)
          })
        }else {
          this.list.splice(index,1)
        }

      }
    }
  };
</script>
<style lang="scss" scoped>

</style>
