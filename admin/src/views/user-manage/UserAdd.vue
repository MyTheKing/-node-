<!--
 * @作者: kerwin
 * @公众号: 大前端私房菜
-->
<template>
    <div>
        <el-page-header
            content="添加用户"
            icon=""
            title="用户管理"
        />

        <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item
                label="用户名"
                prop="username"
            >
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item
                label="密码"
                prop="password"
            >
                <el-input
                    v-model="userForm.password"
                    type="password"
                />
            </el-form-item>

            <el-form-item
                label="角色"
                prop="role"
            >
                <el-select
                    v-model="userForm.role"
                    class="m-2"
                    placeholder="Select"
                    style="width:100%"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item
                label="个人简介"
                prop="introduction"
            >
                <el-input
                    v-model="userForm.introduction"
                    type="textarea"
                />
            </el-form-item>

            <el-form-item
                label="头像"
                prop="avatar"
            >
                <Upload
                    :avatar="userForm.avatar"
                    @kerwinchange="handleChange"
                />
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm()"
                >添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload";
import upload from '@/util/upload'
import {useRouter} from 'vue-router'
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //1 是管理员 ,2编辑
  introduction: "",
  avatar: "",
  file: null,
  gender:0 //保密
});

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }]
});

const options = [
  {
    label: "管理员",
    value: 1
  },
  {
    label: "编辑",
    value: 2
  }
];

//每次选择完图片之后的回调
const handleChange = file => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const router = useRouter()
const submitForm = ()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            //提交数据到后端
            // console.log(userForm)
            await upload("/adminapi/user/add",userForm)

            router.push(`/user-manage/userlist`)
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
