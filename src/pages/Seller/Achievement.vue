<template>
    <div>
        <!-- 业绩活动列表页内容 -->
        <div v-show="business==1">
            <el-card>
                <el-row>
                    <el-button size="small" type="primary" @click="business=2">新建</el-button>
                </el-row>
                <div class="space"></div>
                <!-- 数据查询条件 -->
                <el-form :inline="true" :model="form" class="search-block">
                    <el-form-item label="活动名称">
                        <el-input size="small" v-model="form.periodName" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select size="small" v-model="form.status" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待上线" value="2"></el-option>
                            <el-option label="进行中" value="1"></el-option>
                            <el-option label="已结束" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动类型">
                        <el-select size="small" v-model="form.achievementType" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="累计排行榜" value="1"></el-option>
                            <el-option label="拉新排行榜" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <div></div>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="list">查询</el-button>
                        <el-button size="small" @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div class="space"></div>
            <el-card>
                <!-- 数据表格 -->
                <el-table :data="tableList" style="width: 100%">
                    <el-table-column label="序号" type="index" align="center" width="80px">
                        <template slot-scope="scope">
                            {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="periodName" label="活动姓名" align="center"></el-table-column>
                    <el-table-column prop="achievementTypeName" label="活动类型" align="center"></el-table-column>
                    <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                    <el-table-column label="活动时间" align="center" width="300px">
                        <template slot-scope="scope">
                            {{scope.row.stimeStr}} -- {{scope.row.etimeStr}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="seeRank(scope.$index, scope.row)">查看排名</el-button>
                            <el-button size="mini" @click="confDetail(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="space"></div>
                <!-- 分页组件 -->
                <el-pagination background layout="total, prev, pager, next, jumper"
                    @size-change="sizeChange" @current-change="currentChange"
                    :current-page="form.pageNo" :page-size="form.pageSize"
                    :total="pagination.total">
                </el-pagination>
            </el-card>
        </div>

        <!-- 业绩活动表单内容 -->
        <div v-show="business==2">
            <el-card>
                <el-form :model="dataForm" :rules="dataRules" ref="dataForm" label-width="140px">
                    <el-form-item label="活动名称" prop="periodName">
                        <el-input size="small" v-model="dataForm.periodName"></el-input>
                    </el-form-item>
                    <el-form-item label="活动类型" prop="achievementType">
                        <el-radio size="small" v-model="dataForm.achievementType" :label="1">累计排行榜</el-radio>
                        <el-radio size="small" v-model="dataForm.achievementType" :label="2">拉新排行榜</el-radio>
                        <p class="form-note">
                            提示：累积排行榜为零售户在活动时间内所有店铺粉丝的扫烟包量；<br>
                            <span class="pl36">拉新排行榜为零售户在活动时间内新增粉丝的扫码烟包量，不含活动之前粉丝的扫码烟包数。</span>
                        </p>
                    </el-form-item>
                    <el-form-item label="活动时间" prop="stimeStr">
                        <!--<el-date-picker size="small"
                            v-model="dataForm.datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>-->
                        <el-date-picker v-model="dataForm.stimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期"></el-date-picker>
                        至
                        <el-date-picker v-model="dataForm.etimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动规则" prop="ruleHtml">
                        <el-input size="small" type="textarea" :rows="10" v-model="dataForm.ruleHtml" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="微信消息模板ID" prop="templateId">
                        <el-input size="small" v-model="dataForm.templateId"></el-input>
                        <p class="form-note">
                            提示：微信消息模板ID为对应公众号给零售户发送消息模板的ID，通过后台向零售户发送微信模板消息，公号必须添加此模板。<br>
                            <span class="pl36">模板ID举例：cmtrt_o4nyw5XZXxuCLUstPtNei2DzvYk-4uGZX5ldo</span>
                        </p>
                    </el-form-item>
                    <el-form-item label="奖品设置">
                        <el-button size="small" type="primary" @click="addAwardItem">增加奖项</el-button>
                        <el-button size="small" @click="removeAwardItem">删除奖项</el-button>
                        <table class="award-table" border="1">
                            <thead>
                                <td>名次</td>
                                <td>奖品名称</td>
                                <td>市场价（元）</td>
                            </thead>
                            <tr v-for="item in dataForm.awards" :key="item.key">
                                <td>
                                    <input type="hidden" v-model="item.id"/>
                                    <input type="number" class="one-cell-two" v-model="item.rankStart"/>
                                    -
                                    <input type="number" class="one-cell-two" v-model="item.rankEnd"/>
                                </td>
                                <td>
                                    <input type="text" v-model="item.awardName"/>
                                </td>
                                <td>
                                    <input type="number" v-model="item.awardPrice"/>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                    <div class="space"></div>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="submitForm('dataForm')">确定</el-button>
                        <el-button size="small" @click="cancelForm">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>

        <!-- 业绩排行结果查询 -->
        <div v-show="business==3">
            <el-card>
                <el-row>
                    <el-button type="text" @click="goTable">返回</el-button>
                </el-row>
                <div class="space"></div>
                <!-- 数据查询条件 -->
                <el-form :inline="true" :model="rankForm" class="search-block">
                    <el-form-item label="名次">
                        <el-select size="small" v-model="rankForm.rankSection" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in awardConfList" :key="item.id" :label="item.rankStart+'-'+item.rankEnd" :value="item.rankStart+'-'+item.rankEnd"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input size="small" v-model="rankForm.shopName" placeholder="请输入门店名称"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="listRank">查询</el-button>
                        <el-button size="small" @click="resetRandForm(true)">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="openTplMsg">发送模板消息</el-button>
                        <el-button size="small" :type="canPay?'primary':''" :disabled="!canPay" @click="sendRankPay">派发现金奖励</el-button>
                        <el-button size="small" :type="canExport?'primary':''" :disabled="!canExport" @click="exportDatas">导出中奖名单</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div class="space"></div>
            <el-card>
                <!-- 数据表格 -->
                <el-table :data="tableRankList" style="width: 100%">
                    <el-table-column label="序号" type="index" align="center">
                        <template slot-scope="scope">
                            {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="idx" label="名次" align="center"></el-table-column>
                    <el-table-column prop="shopName" label="门店名称" align="center" width="180"></el-table-column>
                    <el-table-column prop="ownerName" label="联系人" align="center" width="100"></el-table-column>
                    <el-table-column prop="phoneNo" label="联系人电话" align="center" width="120"></el-table-column>
                    <el-table-column prop="licenceNo" label="许可证号" align="center" width="120"></el-table-column>
                    <el-table-column label="门店地区" align="center" width="200">
                        <template slot-scope="scope">
                            {{scope.row.addrProvinceName}}{{scope.row.addrCityName}}{{scope.row.addrAreaName}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="addrDetail" label="门店地址" align="center"></el-table-column>
                    <el-table-column prop="achieveNum" label="扫码业绩" align="center" width="150"></el-table-column>
                    <el-table-column prop="awardName" label="奖品" align="center" width="120"></el-table-column>
                    <el-table-column label="市场价" align="center">
                        <template slot-scope="scope">
                            ￥ {{scope.row.price}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="payStatusName" label="派奖状态" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="seeSellerDetail(scope.$index, scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="space"></div>
                <!-- 分页组件 -->
                <el-pagination background layout="total, prev, pager, next, jumper"
                    @size-change="sizeChange" @current-change="currentChange"
                    :current-page="form.pageNo" :page-size="form.pageSize"
                    :total="pagination.total">
                </el-pagination>
            </el-card>
        </div>

        <el-dialog center title="模板消息编辑" :visible.sync="tplMsgForm.show" width="60%" @closed="resetTplMsgForm">
            <div>
                <el-form class="tplM-msg-block" :rules="tplMsgRules" ref="tplMsgForm"  :model="tplMsgForm" label-width="100px">
                    <el-form-item label="头部内容" prop="first">
                        <el-input size="small" type="textarea" v-model="tplMsgForm.first" placeholder="请输入顶部描述"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称" prop="keyword1">
                        <el-input size="small" v-model="tplMsgForm.keyword1" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="完成时间" prop="keyword2">
                        <!--<el-date-picker v-model="tplMsgForm.sendTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
                        <el-input size="small" v-model="tplMsgForm.keyword2" placeholder="例如：2019年01月01日-2019年01月31日"></el-input>
                    </el-form-item>
                    <el-form-item label="底部内容" prop="remark">
                        <el-input size="small" type="textarea" v-model="tplMsgForm.remark" placeholder="请输入底部描述"></el-input>
                    </el-form-item>
                    <el-form-item label="发送范围" prop="sendScope">
                        <el-radio v-model="tplMsgForm.sendScope" :label="1">所有零售户</el-radio>
                        <el-radio v-model="tplMsgForm.sendScope" :label="2">中奖零售户</el-radio>
                    </el-form-item>
                    <el-form-item label="链接地址">
                        <el-input size="small" v-model="tplMsgForm.templateUrl" placeholder="请输入此消息跳转链接。如无跳转功能，此项为空"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="confirmSendMsg('tplMsgForm')">确 定</el-button>
                <el-button size="small" @click="resetTplMsgForm">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        var validDatetime = (rule, value, callback) => {
            if( !this.dataForm.stimeStr || !this.dataForm.etimeStr ) {
                callback(new Error('活动时间不能为空！'));
            } else if( this.dataForm.stimeStr >= this.dataForm.etimeStr ) {
                callback(new Error('活动开始时间必须小于活动结束时间！'));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            business: 1, // 当前页面展示内容：1-业绩活动列表；2-业绩新增或修改form表单；3-业绩排行结果查询
            requesting: true, // 是否发送接口请求中
            form: {
                pageNo: 1,
                pageSize: 10,
                periodName: "",
                status: "",
                achievementType: ""
            },
            pagination: {
                total: 0
            },
            tableList: [],

            dataForm: {
                id: "",
                periodName: "",
                achievementType: 1,
                ruleHtml: "",
                datetime: [],
                stimeStr: "",
                etimeStr: "",
                templateId: "",
                topNum: "100",
                awards: []
            },
            dataRules: {
                periodName: [{required:true, message:'请输入活动名称', trigger:'blur'}],
                achievementType: [{required:true, message:'请选择活动类型', trigger:'blur'}],
                periodName: [{required:true, message:'请输入活动名称', trigger:'blur'}],
                ruleHtml: [{required:true, message:'请输入活动规则', trigger:'blur'}],
                //datetime: [{required:true, message:'请选择活动时间', trigger:'blur'}],
                stimeStr: [{required:true, validator:validDatetime, trigger:'blur'}],
                etimeStr: [{required:true, validator:validDatetime, trigger:'blur'}],
                templateId: [{required:true, message:'请输入微信消息模板ID', trigger:'blur'}]
            },

            awardConfList: [], // 某期活动配置中的奖项
            rankForm: {
                pageNo: 1,
                pageSize: 10,
                periodId: "",
                rankSection: "",
                shopName: ""
            },
            canPay: false, // 是否允许派发奖励
            canExport: true, // 是否允许导出
            tableRankList: [],

            // 推送消息模板表单
            tplMsgForm: {
                show: false,
                first: '',
                keyword1: '',
                keyword2: '',
                remark: '',
                templateUrl: '',
                sendScope: 2
            },
            tplMsgRules: {
                sendScope: [{required:true, message:'发送范围不能为空', trigger:'blur'}],
                first: [{required:true, message:'头部内容不能为空', trigger:'blur'}],
                keyword1: [{required:true, message:'活动名称不能为空', trigger:'blur'}],
                keyword2: [{required:true, message:'完成时间不能为空', trigger:'blur'}],
                remark: [{required:true, message:'底部内容不能为空', trigger:'blur'}]
            },
            sendMsg: false // 监听发送消息模板状态
        }
    },
    created() {
        this.list();
    },
    methods: {
        currentChange(pageNo) {
            // 分页pageNo变更监听
            if(this.business==1) {
                this.list(event, pageNo);
            } else if(this.business==3) {
                this.listRank(event, pageNo);
            }
        },
        sizeChange(pageSize) {
            // 分页pageSize变更监听\
            if(this.business==1) {
                this.list(event, null, pageSize);
            } else if(this.business==3) {
                this.listRank(event, null, pageSize);
            }
        },
        // page = {"pageCount":总页数, "count":总数据条数}
        initPagination(page) {
            if(page) {
                this.pagination.total = page.count;
            }
        },
        // 重置查询
        resetForm() {
            this.form = {
                pageNo: 1,
                pageSize: 10,
                periodName: "",
                status: "",
                achievementType: ""
            };
            this.list();
        },
        // 查询礼品库列表数据
        list(_event, pageNo, pageSize) {
            let _pageNo = 1;
            if(pageNo) _pageNo = pageNo;
            this.form.pageNo = _pageNo;
            let _pageSize = 10;
            if(pageSize) _pageSize = pageSize;
            this.form.pageSize = _pageSize;

            this.loading = true;
            this.$request.post('/lsh/seller-manager/achieve/queryList', this.form, true, (res)=>{
                this.loading = false;
                if (res.ok) {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 查看排名
        seeRank(index, row) {
            this.rankForm.periodId = row.id;
            this.periodAwardList();
            this.listRank();
            this.judgePay();
            this.business = 3;
        },
        // 编辑
        confDetail(index, row) {
            this.getConfDetail(row.id);
        },
        seeSellerDetail(index, row) {
            this.$router.push({
                path:'/seller/mgr/sellerDetail?sellerId='+row.sellerId
            })
        },
        goTable() {
            this.list();
            this.business = 1;
            this.resetRandForm(false);
        },
        // 根据业绩活动id查询详情配置
        getConfDetail(periodId) {
            this.$request.post('/lsh/seller-manager/achieve/configDetail', {periodId: periodId}, true, (res)=>{
                if (res.ok) {
                    this.business = 2;
                    this.dataForm = res.data || {};
                    this.$set(this.dataForm, 'datetime', [this.dataForm.stimeStr, this.dataForm.etimeStr]);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 动态增加一行奖项配置
        addAwardItem() {
            // 目前只支持红包类型。所以awardType默认写死为3
            let awardItem = {id:"",periodId:"",awardType:3,rankStart:"",rankEnd:"",awardName:"",awardPrice:""};
            awardItem.key = new Date().Format("yyyyMMddhhmmssS") + Math.random();
            this.dataForm.awards.push( awardItem );
        },
        // 从末尾删除一行奖项配置
        removeAwardItem() {
            let awards = this.dataForm.awards;
            if(awards.length>0) {
                awards.splice(awards.length-1, 1);
            }
        },
        // 活动表单提交
        submitForm(form) {
            let awards = this.dataForm.awards;
            if(awards.length==0) {
                this.$message.error("奖项设置内容不能为空！");
                return false;
            }
            for(let i=0;i<awards.length;i++) {
                let item = awards[i];
                if(!item.rankStart||!item.rankEnd||item.rankStart<1||item.rankEnd<1) {
                    this.$message.error("第"+(i+1)+"行奖项设置中名次不能为空并且必须大于0！");
                    return false;
                }
                if(!item.awardName) {
                    this.$message.error("第"+(i+1)+"行奖项设置中奖项名称不能为空！");
                    return false;
                }
                if(!item.awardPrice||item.awardPrice<=0) {
                    this.$message.error("第"+(i+1)+"行奖项设置中市场价不能为空并且必须大于0！");
                    return false;
                }
                item.periodId = this.dataForm.id;
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    //this.dataForm.stimeStr = this.dataForm.datetime[0];
                    //this.dataForm.etimeStr = this.dataForm.datetime[1];
                    this.$request.post('/lsh/seller-manager/achieve/saveOrModify', this.dataForm, true, (res)=>{
                        if (res.ok) {
                            this.$message({type:'success', message:"数据保存成功！"});
                            this.business = 1;
                            this.list();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        },
        // 活动表单取消清空
        cancelForm() {
            this.dataForm = {
                id: "",
                periodName: "",
                achievementType: 1,
                ruleHtml: "",
                datetime: [],
                stimeStr: "",
                etimeStr: "",
                templateId: "",
                topNum: "100",
                awards: []
            }
            this.business = 1;
            this.$refs['dataForm'].clearValidate();
        },
        // 查询某个活动内的奖励设置
        periodAwardList() {
            this.$request.post('/lsh/seller-manager/achieve/queryAwardList', {periodId: this.rankForm.periodId}, true, (res)=>{
                if (res.ok) {
                    this.awardConfList = res.data || [];
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 查询业绩排行列表数据
        listRank(_event, pageNo, pageSize) {
            let _pageNo = 1;
            if(pageNo) _pageNo = pageNo;
            this.rankForm.pageNo = _pageNo;
            let _pageSize = 10;
            if(pageSize) _pageSize = pageSize;
            this.rankForm.pageSize = _pageSize;

            this.loading = true;
            this.$request.post('/lsh/seller-manager/achieve/periodResultList', this.rankForm, true, (res)=>{
                this.loading = false;
                if (res.ok) {
                    this.tableRankList = res.data.list || [];
                    this.canExport = this.tableRankList.length==0?false:true;
                    this.initPagination(res.data.page||{});
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        resetRandForm(refreshListRank) {
            let periodId = this.rankForm.periodId
            this.rankForm = {
                pageNo: 1,
                pageSize: 10,
                periodId: periodId,
                rankSection: "",
                shopName: ""
            }
            if(refreshListRank===true) {
                this.listRank();
            }
        },
        // 导出业绩活动排行数据
        exportDatas() {
            let url = "/lsh/seller-manager/achieve/exportPeriodResult";
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
            for(let attr in this.rankForm) {
                formData.append(attr, this.rankForm[attr]);
            }
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
            xhr.open('POST', url, true);
            xhr.responseType = "blob";
            xhr.responseType = "arraybuffer"
            xhr.setRequestHeader("token", sessionStorage.getItem('access_token'));
            xhr.setRequestHeader("loginId", sessionStorage.getItem('access_loginId'));
            xhr.onload = function(res) {
                if (this.status == 200) {
                    let blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
                    let respHeader = xhr.getResponseHeader("Content-Disposition");
                    let fileName = decodeURI(respHeader.match(/filename=(.*?)(;|$)/)[1]);
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, fileName);
                    } else {
                        let link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileName;
                        link.click();
                        window.URL.revokeObjectURL(link.href);
                    }
                }
            }
            xhr.send(formData);
        },
        // 判断当前周期活动是否允许派发奖励
        judgePay() {
            this.$request.post('/lsh/seller-manager/achieve/judgePay', {periodId:this.rankForm.periodId}, true, (res)=>{
                if (res.ok) {// 允许操作派发
                    this.canPay = true;
                } else {// 不允许操作派发
                    this.canPay = false;
                }
            });
        },
        // 派发奖项
        sendRankPay() {
            if (!this.canPay) {
                this.$message.error('暂不允许派发现金奖励！');
                return false;
            }
            this.$confirm('确认要进行派发奖项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.canPay = false;
                this.$request.post('/lsh/seller-manager/achieve/payAchievement', {periodId: this.rankForm.periodId}, true, (res)=>{
                    if (res.ok) {
                        this.canPay = false;
                        this.listRank();
                        this.$message({type:'success', message:"操作成功！"});
                    } else {
                        this.canPay = true;
                        this.$message.error(res.msg);
                    }
                });
            }).catch(() => {});
        },
        openTplMsg() {
            this.tplMsgForm.show = true;
        },
        resetTplMsgForm() {
            this.tplMsgForm = {
                show: false,
                show: false,
                first: '',
                keyword1: '',
                keyword2: '',
                remark: '',
                templateUrl: '',
                sendScope: 2
            };
            this.$refs['tplMsgForm'].clearValidate();
        },
        confirmSendMsg(form) {
            if (this.sendMsg) {
                this.$message.error('发送模板消息请求已发出，请勿重复操作！');
                return false;
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.sendMsg = true;
                    let params = {
                        wxTemplateParams: {
                            first: this.tplMsgForm.first,
                            keyword1: this.tplMsgForm.keyword1,
                            keyword2: this.tplMsgForm.keyword2,
                            remark: this.tplMsgForm.remark,
                            templateUrl: this.tplMsgForm.templateUrl
                        },
                        achieveParams: {
                            sendScope: this.tplMsgForm.sendScope,
                            periodId: this.rankForm.periodId
                        }
                    }
                    this.$request.post('/lsh/seller-manager/achieve/sendWechatTemplate', params, true, (res)=>{
                        this.sendMsg = false;
                        if (res.ok) {
                            this.tplMsgForm.show = false;
                            this.$message({type:'success', message: res.data});
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .space {position:relative;width:100%;height:20px;}
    .pl36 {padding-left:36px;}
    .form-note {font-size: 12px;color:#aaa;line-height:20px;}
    .el-input, .el-textarea {
        width: 600px;
    }
    .el-date-editor {
        width: 288px;
    }
    .search-block {
        .el-input, .el-select {
            width: 200px;
        }
    }
    .tplM-msg-bloc {
        width: 100%;
        .el-input, .el-textarea {
            width: 80%;
        }
    }
    .award-table {
        margin-top: 10px;
        width: 600px;
        text-align: center;
        border-color:#ebeef5;
        border-collapse: collapse;
        color: #707478;
        thead {
            background: #ebeef5;
        }
        td {
            width: 33%;
            input {
                color: #888;
                outline:none;
                text-align: center;
                width: 90%;
                height: 24px;
                padding: 0 5px;
                border: none;
                background:transparent;
            }
            input::focus {
                outline:none;
                background-color: transparent;
            }
            input::selection{background:transparent;}
            input::-moz-selection{background:transparent;}
            input.one-cell-two {
                width: 35%;
            }
        }
    }
</style>
