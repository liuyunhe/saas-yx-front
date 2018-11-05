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
                    <el-table-column label="序号" type="index" align="center">
                        <template slot-scope="scope">
                            {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="periodName" label="活动姓名" align="center"></el-table-column>
                    <el-table-column prop="achievementTypeName" label="活动类型" align="center"></el-table-column>
                    <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                    <el-table-column label="活动时间" align="center">
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
                    <el-form-item label="活动时间" prop="datetime">
                        <el-date-picker size="small"
                            v-model="dataForm.datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            :default-time="['00:00:00', '23:59:59']"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
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
                    <el-button type="text">返回</el-button>
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
                    <div></div>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="listRank">查询</el-button>
                        <el-button size="small" @click="resetRandForm">重置</el-button>
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
                            <el-button size="mini" @click="seeRankd(scope.$index, scope.row)">查看详情</el-button>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            business: 1, // 当前页面展示内容：1-业绩活动列表；2-业绩新增或修改form表单；3-业绩排行结果查询
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
                datetime: [{required:true, message:'请选择活动时间', trigger:'blur'}],
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
            tableRankList: []
        }
    },
    created() {
        this.list();
    },
    methods: {
        currentChange(pageNo) {
            // 分页pageNo变更监听
            this.list(event, pageNo);
        },
        sizeChange(pageSize) {
            // 分页pageSize变更监听
            this.list(event, null, pageSize);
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
            this.business = 3;
        },
        // 编辑
        confDetail(index, row) {
            this.getConfDetail(row.id);
        },

        // 根据业绩活动id查询详情配置
        getConfDetail(periodId) {
            this.$request.post('/lsh/seller-manager/achieve/configDetail', {periodId: periodId}, true, (res)=>{
                if (res.ok) {
                    this.business = 2;
                    this.dataForm = res.data || {};
                    this.dataForm.datetime = [this.dataForm.stimeStr, this.dataForm.stimeStr];
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
                    this.dataForm.stimeStr = this.dataForm.datetime[0];
                    this.dataForm.etimeStr = this.dataForm.datetime[1];
                    this.$request.post('/lsh/seller-manager/achieve/saveOrModify', this.dataForm, true, (res)=>{
                        if (res.ok) {
                            this.$message({type:'success', message:"数据保存成功！"});
                            this.business = 1;
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
                res = {"ok":true,"data":{"page":{"pageNo":1,"pageSize":10,"pageCount":1,"count":1,"start":0},"list":[{"id":1745,"orgId":"shankunzhongyan","periodId":7,"period":2,"periodName":"第二期","sellerId":3010761,"licenceNo":"140105116783","ownerName":"刘冬花","phoneNo":"18734561405","shopName":"丰泰烟酒商行","idx":1,"awardName":"店铺鼓励金","price":1000.0,"achieveNum":379,"openid":"oAbSR1JKQiMwM8ImSeyCRxD1C_h4","ctime":1530507921000,"payStatus":1,"payStatusName":"已发放","addrDetail":"正阳街","addrProvinceName":"山西省","addrCityName":"太原市","addrAreaName":"小店区"}]},"errorCode":0,"msg":null};
                if (res.ok) {
                    this.tableRankList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        resetRandForm() {
            this.rankForm = {
                pageNo: 1,
                pageSize: 10,
                periodId: "",
                rankSection: "",
                shopName: ""
            }
            this.listRank();
        }
    }
}
</script>

<style lang="scss" scoped>
    .space {position:relative;width:100%;height:20px;}
    .pl36 {padding-left:36px;}
    .form-note {font-size: 12px;color:#aaa;line-height:20px;}
    .el-input, .el-date-editor, .el-textarea {
        width: 600px;
    }
    .search-block {
        .el-input, .el-select {
            width: 200px;
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
