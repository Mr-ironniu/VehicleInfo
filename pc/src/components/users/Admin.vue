<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
	
	<el-card style="height: 100px;">
		<div class="search_div">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="账户">
							<el-input v-model="searchForm.user"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户名">
							<el-input v-model="searchForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆品牌">
							<el-input v-model="searchForm.vehicleBrand"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button-group>
							<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
							<el-button type="primary" icon="el-icon-refresh" @click="reload">刷新</el-button>
							<el-button type="primary" icon="el-icon-delete" @click="deleteMore">删除</el-button>
						</el-button-group>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</el-card>
	
    <el-card>
      <el-table :data="userlist"  stripe style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
		<el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
		<el-table-column prop="user" label="账户"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="type" label="用户类型"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
		<el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column label="操作">
          <!-- 编辑用户 -->
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              size="mini"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              @click="deleteUser(scope.row.id)"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNumber"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editUserForm"
        :rules="editUserFormRules"
        ref="editUserFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
		<el-form-item label="账户" prop="user">
			<el-input v-model="editUserForm.user" disabled></el-input>
		</el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-input v-model="editUserForm.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
		<el-form-item label="省份" prop="province">
			<el-input v-model="editUserForm.province"></el-input>
		</el-form-item>
		<el-form-item label="城市" prop="city">
			<el-input v-model="editUserForm.city"></el-input>
		</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userDataPost, editUserData, delUserData } from '../../api/axios'
import { Loading } from 'element-ui'

export default {
  data() {
    // 自定义邮箱校验规则
    var checkEmail = (rule, value, cb) => {
      const regEail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (regEail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    // 自定义手机号校验规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
		queryInfo: {
			type: "2",
			pageSize: 10,
			pageNumber: 1
		},
		userlist: [],
		total: 0,
		dialogVisible: false,
		editDialogVisible: false,
		editUserForm: {},
		editUserFormRules: {
			name: [
				{ required: true, message: "请输入姓名", trigger: "blur" },
			],
			phone: [
				{ required: true, message: "请输入手机", trigger: "blur" },
				{ validator: checkMobile, trigger: "blur" }
			],
			province: [
				{ required: true, message: "请输入省份", trigger: "blur" },
			],
			city: [
				{ required: true, message: "请输入城市", trigger: "blur" },
			]
		},
		searchForm: {
			type: "2"
		},
		multipleSelection: [],
		loading: true
    };
  },
  methods: {
    async getAdminList() {
		this.loading = true
		userDataPost(this.queryInfo).then((res) => {
			this.loading = false
			this.userlist = res.rows
			this.total = res.total
		})
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getAdminList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNumber = newPage;
      this.getAdminList();
    },
    async showEditDialog(id) {
		for (let i = 0; i < this.userlist.length; i++) {
			if (this.userlist[i].id === id) {
				this.editUserForm = this.userlist[i]
				this.editDialogVisible = true;
				break;
			}
		}
    },
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields();
    },
    editUser() {
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return;
		editUserData(this.editUserForm).then(res => {
			console.log(res)
			if (res.flag === 1) {
				this.$message.success("修改成功！");
				this.editDialogVisible = false;
			} else {
				this.$message.error("修改失败！");
			}
			this.getAdminList();
		})
      });
    },
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
			delUserData(id).then(res => {
				if (res.flag === 1) {
					this.$message({
						type: "success",
						message: res.msg
					});
				} else {
					this.$message.error(res.msg)
				}
				this.getAdminList()
			})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
	search() {
		userDataPost(this.searchForm).then((res) => {
			console.log(res)
			this.userlist = res.rows
			this.total = res.total
		})
	},
	handleSelectionChange(val) {
		this.multipleSelection = val;
	},
	deleteMore() {
		const idArr = []
		this.multipleSelection.forEach((item) => {
			idArr.push(item.id)
		})
		this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(async () => {
			delUserData(idArr.toString()).then(res => {
				if (res.flag === 1) {
					this.$message({
						type: "success",
						message: res.msg
					});
				} else {
					this.$message.error(res.msg)
				}
				this.getUserList()
			})
		}).catch(() => {
			this.$message({
				type: "info",
				message: "已取消删除"
			});
		})
	},
	reload() {
		this.getAdminList()
	}
  },
  created() {
    this.getAdminList();
  }
};
</script>

<style lang="less" scoped></style>
