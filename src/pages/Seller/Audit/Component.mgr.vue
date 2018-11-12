<template>
    <div class="audit-mgr">
        <!-- 审核管理 -->
        <div class="list" v-show="!detail">
            <el-card>
                <!-- 数据查询条件 -->
                <el-form :inline="true" :model="form" class="search-block">
                    <el-form-item label="审核状态">
                        <el-select size="small" v-model="form.audStatus" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(name, value) in audStatusList" :key="value" :value="value" :label="name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键词">
                        <el-input size="small" placeholder="请输入关键词" v-model="form.keywords" class="input-with-select">
                            <el-select v-model="form.keyType" slot="prepend" placeholder="请选择">
                                <el-option v-for="(name, value) in keyTypeList" :key="value" :value="value" :label="name"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="申请时间">
                        <div class="block">
                            <el-date-picker size="small"
                                v-model="form.dates"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="位置" class="pl30">
                        <el-select size="small" v-model="form.province" placeholder="请选择" @change="regionChange(1)">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="item in provinceList" :key="item.code" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                        <el-select size="small" v-model="form.city" placeholder="请选择" @change="regionChange(2)">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="item in cityList" :key="item.code" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                        <el-select size="small" v-model="form.district" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="item in districtList" :key="item.code" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <div></div>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="list">查询</el-button>
                        <el-button size="small" @click="resetForm">重置</el-button>
                        <el-button size="small" type="primary" @click="exportDatas">导出</el-button>
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
                    <el-table-column prop="shopName" label="门店名称" align="center"></el-table-column>
                    <el-table-column prop="ownerName" label="联系人姓名" align="center"></el-table-column>
                    <el-table-column prop="phoneNo" label="联系人电话" align="center" width="110"></el-table-column>
                    <el-table-column label="位置" align="center">
                        <template slot-scope="scope">
                            {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.districtName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="申请时间" align="center" width="180">
                        <template slot-scope="scope">
                            <span v-if="step==1">{{new Date(scope.row.step.s1ApplyTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                            <span v-if="step==2">{{new Date(scope.row.step.s2ApplyTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="分数" align="center">
                        <template slot-scope="scope">
                            <span v-if="step==1">{{scope.row.step.s1Score}}</span>
                            <span v-if="step==2">{{scope.row.step.s2Score}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="step==2" label="总分数" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.step.totalScore}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="step==1">{{scope.row.step.s1StatusName}}</span>
                            <span v-if="step==2">{{scope.row.step.s2StatusName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="seeDetail(scope.$index, scope.row)">查看详情</el-button>
                            <el-button size="mini" type="text" v-if="(step==1&&scope.row.step.s1Status==1)||(step==2&&scope.row.step.s2Status==1)" @click="audit(scope.$index, scope.row, 2, '审核通过')">审核通过</el-button>
                            <el-button size="mini" type="text" v-if="(step==1&&scope.row.step.s1Status==1)||(step==2&&scope.row.step.s2Status==1)" @click="audit(scope.$index, scope.row, 3, '请输入不通过理由')">审核不通过</el-button>
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
            <el-dialog center :title="auditForm.title" :visible.sync="auditForm.show" width="30%">
                <div>
                    <el-form class="search-block">
                        <el-input v-model="auditForm.id" type="hidden"></el-input>
                        <el-form-item label="得分" v-show="auditForm.audStatus==2">
                            <el-input-number size="small" type="number" v-model="auditForm.score" controls-position="right" :min="0" :max="maxScore" class="audit-score"></el-input-number>
                        </el-form-item>
                        <el-form-item label="" v-show="auditForm.audStatus==3">
                            <el-input size="small" type="textarea" :rows="5" v-model="auditForm.note" placeholder="请输入不超过50字的内容"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" type="primary" @click="auditFormConfirm">确 定</el-button>
                    <el-button size="small" @click="auditForm.show=false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    
        <div class="detail" v-show="detail">
            <el-card>
                <table width="100%" border=0 class="detail-info-table">
                    <tr>
                        <td width="35%">
                            <label>初次申请时间：</label>
                            <span v-if="detailForm.step.s1ApplyTime">{{new Date(detailForm.step.s1ApplyTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </td>
                        <td width="35%">
                            <label>初审时间：</label>
                            <span v-if="detailForm.step.s1AudTime">{{new Date(detailForm.step.s1AudTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </td>
                        <td colspan="2">
                            <label>得分：</label>
                            <span>{{detailForm.step.s1Score}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>联系人姓名：</label>
                            <span>{{detailForm.ownerName}}</span>
                        </td>
                        <td>
                            <label>联系人微信：</label>
                            <span>{{detailForm.nickname}}</span>
                        </td>
                        <td rowspan="3" valign="top" width="130px">
                            <label class="multi-span">烟草许可证照片：</label>
                        </td>
                        <td rowspan="4" valign="middle">
                            <el-popover placement="right" trigger="click">
                                <img class="popover-img" :src="detailForm.licenceImg" />
                                <img class="licence-img" slot="reference" :src="detailForm.licenceImg" />
                            </el-popover>
                        </td>
                    </tr>
                    <tr>
                         <td>
                            <label>联系人电话：</label>
                            <span>{{detailForm.phoneNo}}</span>
                        </td>
                        <td>
                            <label>门店名称：</label>
                            <span>{{detailForm.shopName}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>位置：</label>
                            <span>{{detailForm.provinceName}}{{detailForm.cityName}}{{detailForm.districtName}}</span>
                        </td>
                        <td>
                            <label>烟草专卖证号：</label>
                            <span>{{detailForm.licenceNo}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>详细地址：</label>
                            <span>{{detailForm.detail}}</span>
                        </td>
                        <td>
                            <label>业态：</label>
                            <span>{{detailForm.commercialName}}</span>
                        </td>
                    </tr>
                </table>
            </el-card>
            <div class="space10"></div>
            <el-card v-if="step==2">
                <table width="100%" border=0 class="detail-info-table detail-step2">
                    <tr>
                        <td width="35%">
                            <label>二次申请时间：</label>
                            <span v-if="detailForm.step.s2ApplyTime">{{new Date(detailForm.step.s2ApplyTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </td>
                        <td width="35%">
                            <label>终审时间：</label>
                            <span v-if="detailForm.step.s2AudTime">{{new Date(detailForm.step.s2AudTime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </td>
                        <td>
                            <label>得分：</label>
                            <span>{{detailForm.step.s2Score}}</span>
                        </td>
                    </tr>
                    <tr height="180">
                        <td colspan="3">
                            <label class="img-label">店面照片：</label>
                            <div>
                                <el-popover placement="top-start" trigger="click" v-for="item in detailForm.imgs" :key="item.id">
                                    <img class="popover-img" :src="item.imgUrl" />
                                    <img v-if="item.type==1" slot="reference"  :src="item.imgUrl" />
                                </el-popover>
                            </div>
                        </td>
                    </tr>
                    <tr height="180">
                        <td colspan="3">
                            <label class="img-label">陈列照片：</label>
                            <div>
                                <el-popover placement="top-start" trigger="click" v-for="item in detailForm.imgs" :key="item.id">
                                    <img class="popover-img" :src="item.imgUrl" />
                                    <img v-if="item.type==2" slot="reference"  :src="item.imgUrl" />
                                </el-popover>
                            </div>
                        </td>
                    </tr>
                    <tr height="180">
                        <td colspan="3">
                            <label class="img-label">烟品订单照片：</label>
                            <div>
                                <el-popover placement="top-start" trigger="click" v-for="item in detailForm.imgs" :key="item.id">
                                    <img class="popover-img" :src="item.imgUrl" />
                                    <img v-if="item.type==3" slot="reference"  :src="item.imgUrl" />
                                </el-popover>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-card>
            <div class="space10"></div>
            <el-card>
                <el-form class="detail-audit-block" :model="auditForm" :rules="detailAuditRules" ref="auditForm" label-width="100px">
                    <el-input v-model="auditForm.id" type="hidden"></el-input>
                    <el-form-item label="审核状态" prop="audStatus">
                        <el-radio v-model="auditForm.audStatus" :label="2" :disabled="auditForm.hisAudit">审核通过</el-radio>
                        <el-radio v-model="auditForm.audStatus" :label="3" :disabled="auditForm.hisAudit">审核不通过</el-radio>
                    </el-form-item>
                    <el-form-item label="" prop="note" v-show="auditForm.audStatus==3">
                        <el-input size="small" type="textarea" :rows="5" v-model="auditForm.note" :disabled="auditForm.hisAudit" placeholder="请输入不超过50字的内容"></el-input>
                    </el-form-item>
                    <el-form-item label="得分" prop="score" v-show="auditForm.audStatus==2">
                        <el-input-number size="small" type="number" v-model="auditForm.score" controls-position="right" :min="0" :max="maxScore" class="audit-score"></el-input-number>
                    </el-form-item>
                    <div></div>
                    <el-form-item>
                        <el-button size="small" v-if="!auditForm.hisAudit||auditForm.audStatus==2" type="primary" @click="saveAudit('auditForm', 1)">保存</el-button>
                        <el-button size="small" @click="saveAudit('auditForm', 2)">退出</el-button>
                        <el-button size="small" v-if="!auditForm.hisAudit||auditForm.audStatus==2" type="primary" @click="saveAudit('auditForm', 3)">保存并退出</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    props: ['step'],
    data() {
        var checNote = (rule, value, callback) => {
            if(!value) return callback(new Error('审核不通过时理由不能为空！'));
            if(value.length>50) return callback(new Error('审核不通过时理由不能超过50个字！'));
            callback();
        };
        return {
            detail: false, // 标识当前页内容是否为详情
            loading: false,
            audStatusList: {
                1: "未审核",
                2: "审核通过",
                3: "审核不通过"
            },
            keyTypeList: {
                2: "联系人姓名",
                1: "门店名称",
                3: "手机号",
                4: "专卖许可证"
            },
            form: {
                pageNo: 1,
                pageSize: 10,
                step: this.step,
                audStatus: "1",
                province: "",
                city: "",
                district: "",
                keyType: "2",
                keywords: "",
                stime: "",
                etime: "",
                dates: []
            },
            pagination: {
                total: 0
            },
            provinceList: [],
            cityList: [],
            districtList: [],
            tableList: [],
            
            auditForm: {
                hisAudit: false, // 标识当前数据是否历史审核过
                show: false,
                title: "",
                step: this.step,
                id: "", // 零售户数据主键id
                audStatus: "", //审核结果：2-通过；3-不通过
                score: "", // 得分值
                note: "" // 审核不通过理由，不超过50个字
            },
            detailForm: {
                id: "",
                ownerName: "",
                phoneNo: "",
                licenceNo: "",
                shopName: "",
                licenceImg: "",
                province: "",
                city: "",
                district: "",
                provinceName: "",
                cityName: "",
                districtName: "",
                detail: "",
                openid: "",
                nickname: "",
                step: {},
                imgs: []
            },
            detailAuditRules: {
                audStatus: [{required:true, message:'审核状态不能为空！', trigger:'blur' }],
                note: [{required:true, validator: checNote, trigger:'blur' }],
                score: [{required:true, message:'审核状态不能为空！', trigger:'blur' }]
            },
            maxScore: 20, // 审批得分最大值。第一步最大20，第二步最大30
        }
    },
    created() {
        console.log(this.step);
        if( this.step==2 ) this.maxScore = 30;
        this.getRegions(1);
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
        // 根据父编码查询地域信息
        getRegions(level, pcode) {
            if(level==1) pcode = "";
            this.$request.post('/api/saotx/dim/regionByPCode', {parentCode: pcode}, true, (res)=>{
                if (res.ret==200000) {
                    if(level==1) {
                        this.provinceList = res.data || [];
                    } else if(level==2) {
                        this.cityList = res.data || [];
                    } else if(level==3) {
                        this.districtList = res.data || [];
                    }
                }
            });
        },
        regionChange(level) {
            if(level==1) {// 省份变化
                this.form.city = "";
                this.form.district = "";
                this.getRegions(2, this.form.province);
            } else if(level==2) {// 城市变化
                this.form.district = "";
                this.getRegions(3, this.form.city);
            }
        },
        // 重置查询
        resetForm() {
            this.form = {
                pageNo: 1,
                pageSize: 10,
                step: this.step,
                audStatus: "1",
                province: "",
                city: "",
                district: "",
                keyType: "2",
                keywords: "",
                stime: "",
                etime: "",
                dates: []
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

            if(this.form.dates&&this.form.dates.length==2) {
                this.form.stime = this.form.dates[0]+" 00:00:00";
                this.form.etime = this.form.dates[1]+" 23:59:59";
            }

            this.loading = true;
            this.$request.post('/api/saotx/seller/list', this.form, true, (res)=>{
                this.loading = false;
                if (res.ret==200000) {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        exportDatas() {
            let url = "/api/saotx/seller/export";
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
            //formData = Object.assign({}, formData, this.form);
            for(let attr in this.form) {
                formData.append(attr, this.form[attr]);
            }
            formData.pageNo = 1;
            formData.pageSize = -1;// 不分页

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
        audit(index, row, result, title) {
            this.auditForm.id = row.id;
            this.auditForm.audStatus = result;
            this.auditForm.title = title;
            this.auditForm.show = true;
        },
        auditFormConfirm() {
            if(this.auditForm.audStatus==3&&this.auditForm.note&&this.auditForm.note.length>50) {
                this.$message.error("审核不通过的理由不能超过50个字！");
                return false;
            }
            let _this = this;
            _this.$request.post('/api/saotx/seller/audit', _this.auditForm, true, (res)=>{
                if (res.ret==200000) {
                    _this.auditForm.show = false;
                    _this.$message({type:'success', message:"审核操作成功！"});
                    _this.list(null, _this.form.pageNo, _this.form.pageSize);
                } else {
                    _this.$message.error(res.message);
                }
            });
        },
        // 重置审核表单内容
        resetAuditForm() {
            this.auditForm.hisAudit = false;
            this.auditForm.id = "";
            this.auditForm.audStatus = "";
            this.auditForm.score = "";
            this.auditForm.note = "";
            this.detail = false;
            this.list(null, this.form.pageNo, this.form.pageSize);
        },
        // 列表数据查看详情
        seeDetail(index, row) {
            let _this = this;
            _this.$request.post('/api/saotx/seller/detail', {id: row.id}, true, (res)=>{
                if (res.ret==200000) {
                    _this.detailForm = res.data||{};
                    _this.auditForm.id = _this.detailForm.id;
                    if(_this.auditForm.step==1) {
                        _this.auditForm.note = _this.detailForm.step.s1Note||"";
                        _this.auditForm.score = _this.detailForm.step.s1Score||"";
                        _this.auditForm.audStatus = _this.detailForm.step.s1Status||"";
                    } else if(_this.auditForm.step==2) {
                        _this.auditForm.note = _this.detailForm.step.s2Note||"";
                        _this.auditForm.score = _this.detailForm.step.s2Score||"";
                        _this.auditForm.audStatus = _this.detailForm.step.s2Status||"";
                    }
                    if(_this.auditForm.audStatus==2||_this.auditForm.audStatus==3) {// 已做过审核
                        _this.auditForm.hisAudit = true;
                    } else {
                        _this.auditForm.audStatus = 2;// 默认选中审核通过
                    }
                    _this.detail = true;
                } else {
                    _this.$message.error(res.message);
                }
            });
        },
        // 详情页中审核表单
        // flag表示操作类型：1-只保存；2-退出；3-保存并退出
        saveAudit(formName, flag) {
            if(flag==2) {
                this.resetAuditForm();
                return false;
            }
            this.$refs[formName].validate((valid) => {
                let validResult = false;
                if(this.auditForm.audStatus==2&&this.auditForm.score) validResult = true;// 审核通过，并且有得分值，则校验OK
                if(this.auditForm.audStatus==3&&this.auditForm.note&&this.auditForm.note.length<=50) validResult = true;// 审核通过，并且有得分值，则校验OK
                
                if (validResult) {
                    let apiUrl = "/api/saotx/seller/audit";// 未审核时
                    if(this.auditForm.hisAudit) {
                        apiUrl = "/api/saotx/seller/mscore";// 已审核时
                    }
                    this.$request.post(apiUrl, this.auditForm, true, (res)=>{
                        if (res.ret==200000) {
                            if(flag==3) {
                                this.resetAuditForm();
                            }
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .space10 {position:relative;width:100%;height:10px;}
    .space {position:relative;width:100%;height:20px;}
    .pl30 {padding-left:30px;}
    .el-date-editor {
        width: 400px;
    }
    .input-with-select {
        width: 300px;
        .el-select {
            width: 120px;
        }
    }
    .search-block {
        width: 100%;
        .audit-score {
            width: 80%;
        }
    }
    .detail-info-table {
        tr {
            height: 40px;
            line-height: 40px;
            .licence-img {
                margin-top: 15px;
                min-width: 80px;
                max-height: 180px;
            }
        }
    }
    .detail-step2 {
        tr td {
            label.img-label {
                display: inline-block;
                padding: 0 10px;
                width: 100px;
                text-align: right;
            }
            div {
                padding-left: 150px;
                margin-top: -20px;
                img {
                    max-width: 150px;
                    max-height: 150px;
                    margin-right: 15px;
                }
            }
        }
    }
    .el-popover {
        img.popover-img {
            max-height: 400px;
        }
    }
</style>
