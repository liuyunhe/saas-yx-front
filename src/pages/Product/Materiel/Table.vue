<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="materielForm">新建</el-button>
      </el-row>
      <div class="space"></div>
      <el-tabs type="border-card" @tab-click="changeTab">
        <el-tab-pane label="物料库">
          <!-- 数据查询条件 -->
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="筛选信息">
              <el-input size="small" v-model="form.keywords" :placeholder="materielName[metraFlag]+'名称'"></el-input>
            </el-form-item>
            <el-form-item label="供应商">
              <el-select size="small" v-model="supplierSel" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in supplierList" :key="item.supplierCode" :label="item.name" :value="item.supplierCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用状态">
              <el-select size="small" v-model="form.status" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in statusList" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <div></div>
            <el-form-item>
              <el-button size="small" type="primary" @click="listMateriel">查询</el-button>
              <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 数据表格 -->
          <el-table :data="materielDatas" style="width: 100%">
            <el-table-column label="序号" type="index" align="center">
              <template slot-scope="scope">
                {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="materielName[metraFlag]+'名称'" align="center" width="180"></el-table-column>
            <el-table-column label="礼品图片" align="center">
              <template slot-scope="scope">
                <img v-if="scope.row.pic" :src="scope.row.pic" />
              </template>
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
            <el-table-column prop="stock" :label="'剩余库存('+materielUnit[metraFlag]+')'" align="center"></el-table-column>
            <el-table-column prop="status" label="使用状态" align="center">
              <template slot-scope="scope">
                {{scope.row.status==1?"已启用":"已停用"}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="220">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status==1" size="mini" @click="materielForm(scope.$index, scope.row)">编辑</el-button>
                <el-button v-if="scope.row.status==1" size="mini" @click="handleAddPool(scope.$index, scope.row)">增库</el-button>
                <el-button v-if="scope.row.status==1" size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">停用</el-button>
                <el-button v-if="scope.row.status==0" size="mini" @click="modifyData(scope.row.id, 1)">启用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="space"></div>
          <!-- 分页组件 -->
          <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
            @size-change="sizeChange" @current-change="currentChange"
            :current-page="form.pageNo" :page-size="form.pageSize"
            :total="pagination.total">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="流水明细">
          <!-- 数据查询条件 -->
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="筛选信息">
              <el-input size="small" v-model="form.keywords" :placeholder="materielName[metraFlag]+'名称'"></el-input>
            </el-form-item>
            <el-form-item label="供应商">
              <el-select size="small" v-model="supplierSel" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in supplierList" :key="item.supplierCode" :label="item.name" :value="item.supplierCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="动作">
              <el-select size="small" v-model="form.operType" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(label, value) in operTypeList" :key="value" :label="label" :value="value"></el-option>
              </el-select>
            </el-form-item>
            <div></div>
            <el-form-item>
              <el-button size="small" type="primary" @click="listOperLog">查询</el-button>
              <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 数据表格 -->
          <el-table :data="operLogDatas" style="width: 100%">
            <el-table-column label="序号" type="index" align="center">
              <template slot-scope="scope">
                {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="poolName" :label="materielName[metraFlag]+'名称'" align="center" width="180"></el-table-column>
            <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
            <el-table-column prop="operName" label="动作" align="center"></el-table-column>
            <el-table-column prop="actName" label="活动名称" align="center"></el-table-column>
            <el-table-column prop="operNum" :label="'操作数量('+materielUnit[metraFlag]+')'" align="center"></el-table-column>
            <el-table-column label="操作时间" align="center" width="160">
              <template slot-scope="scope">
                {{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}
              </template>
            </el-table-column>
            <el-table-column prop="creatorName" label="操作人" align="center"></el-table-column>
          </el-table>
          <div class="space"></div>
          <!-- 分页组件 -->
          <el-pagination background layout="total, prev, pager, next, jumper"
            @size-change="sizeChange" @current-change="currentChange"
            :current-page="form.pageNo" :page-size="form.pageSize"
            :total="pagination.total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog title="增库" width="30%" :visible.sync="addPool.show">
      <el-form ref="addPool" label-width="100px">
        <el-form-item label="增加库存" prop="stock">
          <el-input size="small" type="number" v-model="addPool.num"></el-input>
        </el-form-item>
        <!-- 虚拟物料有此项内容 -->
        <el-form-item v-if="metraFlag=='virtual'" label="卡密文件">
          <el-upload size="small" class="upload-demo"
            action="/api/wiseqr/metra/import"
            :headers="headers"
            :data="addPool"
            :before-upload="handlerSourceFileBUpload"
            :on-success="handleSourceFileSuccess"
            :on-remove="handleSourceFileRemove"
            :file-list="sourceFiles">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传csv/excel文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addPool.show=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAddPool">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Config from '@/pages/Product/datas/conf'
export default {
  props: ['metraFlag'],
  data() {
    return {
      materielName: Config.materielName,
      materielUnit: Config.materielUnit,
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      tabIdx: 0, // 记录当前标签选项卡选中的下标
      supplierList: [],
      statusList: [],
      operTypeList: {}, // key:value形式的键值对集合
      supplierSel: '', // 供应商下拉选择
      form: {
        metraFlag: this.metraFlag,
        pageNo: 1,
        pageSize: 10,
        keywords: '', // 公共参数：关键字
        supplierArr: [], // 公共参数：供应商
        status: '', // 礼品库参数：操作动作
        operType: '' // 流水明细参数：操作动作
      },
      pagination: { // 分页
        total: 0
      },
      materielDatas: [], // 物料数据
      operLogDatas: [],  // 物料操作日志数据

      addPool: {
        show: false, // 增库弹框是否展示
        id: '', // 增库时，数据主键id值
        num: '', // 增库时，增库数量
        type: '',  // 虚拟物料增库时，记录物料类型
      },
      sourceFiles: [] // 卡密文件上传结果存储{name:'', sourceCode: ''}
    }
  },
  created() {
    this.listMateriel();
    this.getSuppliers();
    this.getStatus();
    this.getOperTypes();
  },
  watch: {
    // 供应商选择变化监听
    supplierSel(nval, oval) {
      if(nval!=oval) {
        this.form.supplierArr = [];
        if(nval) {
          this.form.supplierArr[0] = nval;
        }
      }
    }
  },
  methods: {
    currentChange(pageNo) {
      // 分页pageNo变更监听
      if(this.tabIdx==0) {
        this.listMateriel(event, pageNo);
      } else if(this.tabIdx==1) {
        this.listOperLog(event, pageNo);
      }
    },
    sizeChange(pageSize) {
      // 分页pageNo变更监听
      if(this.tabIdx==0) {
        this.listMateriel(event, null, pageSize);
      } else if(this.tabIdx==1) {
        this.listOperLog(event, null, pageSize);
      }
    },
    // 查询所有的供应商数据
    getSuppliers() {
      this.$request.post('/api/wiseqr/supplier/list', {pageSize:-1, status: 1}, true, (res)=>{
        if (res.ret == '200000') {
          this.supplierList = res.data.list||[];
        }
      });
    },
    // 查询所有数据状态
    getStatus() {
      this.$request.post('/api/wiseqr/dim/dataStatus', {}, false, (res)=>{
        if (res.ret == '200000') {
          this.statusList = res.data||[];
        }
      });
    },
    // 查询所有流水操作
    getOperTypes() {
      this.$request.post('/api/wiseqr/metra/operTypes', {}, false, (res)=>{
        if (res.ret == '200000') {
          this.operTypeList = res.data||{};
        }
      });
    },
    // 重置查询
    resetForm() {
      this.supplierSel = '';
      this.form = {
        metraFlag: this.metraFlag,
        pageNo: 1,
        pageSize: 10,
        keywords: '', // 公共参数：关键字
        supplierArr: [], // 公共参数：供应商
        status: '', // 数据状态
        operType: '' // 流水明细参数：操作动作
      }
      this.listMateriel();
    },
    // tab标签切换
    changeTab(tab) {
      this.tabIdx = tab.index;
      if(tab.index==0) {
        this.listMateriel();
      } else if(tab.index==1) {
        this.listOperLog();
      }
    },
    // 新增或修改物料表单
    materielForm(index, row) {
      //let _path = "/product/materiel/form?metraFlag="+this.metraFlag;
      //if( row&&row.id ) {
      //  _path += "&id="+row.id;
      //}
      //this.$router.push({path:_path});
      let materielId = "";
      if(row&&row.id) {
        materielId = row.id;
      }
      this.$emit('showForm', materielId);
    },
    // 查询礼品库列表数据
    listMateriel(_event, pageNo, pageSize) {
      let _pageNo = 1;
      if(pageNo) _pageNo = pageNo;
      this.form.pageNo = _pageNo;
      let _pageSize = 10;
      if(pageSize) _pageSize = pageSize;
      this.form.pageSize = _pageSize;
      
      this.$request.post('/api/wiseqr/metra/list', this.form, true, (res)=>{
        if (res.ret == '200000') {
          this.materielDatas = res.data.list || [];
          this.initPagination(res.data.page||{});
        }
      });
    },
    // 查询物料池流水列表数据
    listOperLog(_event, pageNo, pageSize) {
      if(pageNo) {
        this.form.pageNo = pageNo;
      } else {
        this.form.pageNo = 1;
      }
      if(pageSize) {
        this.form.pageSize = pageSize;
      } else {
        this.form.pageSize = 10;
      }
      this.$request.post('/api/wiseqr/metra/operList', this.form, true, (res)=>{
        if (res.ret == '200000') {
          this.operLogDatas = res.data.list || [];
          this.initPagination(res.data.page||{});
        }
      });
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(page) {
      if(page) {
        this.pagination.total = page.count;
      }
    },
    // 停用confirm弹框
    handleDelete(index, row) {
      this.$confirm('停用后，将不在提供使用，确认操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.modifyData(row.id, 0);// 确定停用
        }).catch(() => {/** 取消 */});
    },
    // 修改数据状态：status=1启用；status=0停用
    modifyData(id, status) {
      let params = {metraFlag:this.metraFlag, id:id, status:status}
      this.$request.post('/api/wiseqr/metra/modifyStatus', params, true, (res)=>{
        if (res.ret == '200000') {
          this.listMateriel();
          this.$message({type: 'success', message: '操作成功!'});
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 增库
    handleAddPool(index, row) {
      this.addPool.id = row.id;
      this.addPool.type = row.type;
      this.addPool.show = true;
    },
    // 卡密文件上传之前
    handlerSourceFileBUpload(file) {
      
    },
    // 卡密文件上传控制。成功之后的回调
    handleSourceFileSuccess(res, file) {
      if(res.ret==200000) {
        //sourceCode: "D248BAE8A6DE47168F2BA5C1B1E2B3EE"
        //sourceFile: "卡密.xlsx"
        //successCount: 2
        //successMsg: "成功解析入库2条数据！"
        this.$message({type:'success', message:res.data.successMsg});
        let obj = {name:res.data.sourceFile, sourceCode:res.data.sourceCode, count:res.data.successCount};
        this.sourceFiles.push(obj);
      } else {
        this.$message.error(res.message);
      }
    },
    // 卡密文件上传之后，删除文件
    handleSourceFileRemove(file, fileList) {
      this.sourceFiles = []; // 清空上传文件内容的引用
    },
    confirmAddPool() {
      if(!this.addPool.num) {
        this.$message.error("增库值不能为空且必须是大于0的整数！");
        return false;
      }
      let params = {metraFlag:this.metraFlag, id:this.addPool.id, increment:this.addPool.num};
      if(this.metraFlag=='virtual'&&this.addPool.type=='890') { // 虚拟物料增库
        if(this.sourceFiles.length==0) { // 卡券类型
          this.$message.error("卡密类型的物料必须上传卡密文件！");
          return false;
        }
        let obj = this.sourceFiles[0];
        const count = obj.count;
        if(count!=this.addPool.num) {// 卡密上传成功解析入库数与增库数不同
          this.$confirm('卡密上传成功解析入库数与增库数不同，确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            params.sourceCode = obj.sourceCode;
            params.sourceFile = obj.name;
            this.requestAddStore(params);
          }).catch(() => {
            //this.addPool.show = false;
          });
          return false;
        }
      }
      this.requestAddStore(params);
    },
    requestAddStore(params) {
      this.$request.post('/api/wiseqr/metra/addStore', params, true, (res)=>{
        if (res.ret == '200000') {
          this.addPool.id = '';
          this.addPool.num = '';
          this.addPool.type = '';
          this.addPool.show = false;
          this.listMateriel();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
}
</script>

<style scoped>
  .space {position:relative;width:100%;height:20px;}
  .el-input, .el-select, .el-upload-list {
    width: 200px;
  }
  .el-table img {
    width: 80px;
    height: 80px;
  }
</style>
