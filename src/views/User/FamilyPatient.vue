<script setup lang="ts">
import Validator from 'id-validator'
import { showToast, showConfirmDialog, showSuccessToast } from 'vant'
import 'vant/es/dialog/style'
import 'vant/es/dialog/style'
import {
  addPatient,
  delPatient,
  editPatient,
  getPatientList
} from '@/services/user'
import RadioBtn from '@/components/RadioBtn.vue'
import type { Patient } from '@/typs/user'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores/consult'

const list = ref<Patient[]>([])

const getList = async () => {
  const res = await getPatientList()
  list.value = res.data
}
onMounted(async () => {
  getList()
})
//弹框中表单数据,设置默认数据
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
//点击加号时右侧的弹出框,编辑也是此按钮
let show = ref(false)
const showTime = (item?: Patient) => {
  if (item) {
    //回显
    const { id, idCard, name, gender, defaultFlag } = item
    patient.value = { id, idCard, name, gender, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  show.value = true
}
const patient = ref<Patient>({ ...initPatient })
//复选框
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
//男女选项
const options = [
  { label: '女', value: 0 },
  { label: '男', value: 1 }
]
//保存按钮
const submit = async () => {
  if (!patient.value.name) return showToast('请输入姓名')
  if (!patient.value.idCard) return showToast('请输入身份证号')
  //校验身份证号
  const validate = new Validator()
  if (!validate.isValid(patient.value.idCard)) {
    return showToast('身份证号不合法')
  }
  const info = validate.getInfo(patient.value.idCard)
  if (info.sex !== patient.value.gender) return showToast('性别与身份证不符')
  //添加患者
  if (patient.value.id) {
    await editPatient(patient.value)
    show.value = false
    getList()
    showSuccessToast('修改成功')
  } else {
    await addPatient(patient.value)
    show.value = false
    getList()
    showSuccessToast('添加成功')
  }
}
//删除患者
const deletePatient = async () => {
  await showConfirmDialog({
    title: '标题',
    message: '确定删除吗。'
  })
  await delPatient(patient.value.id as string)
  show.value = false
  getList()
  showSuccessToast('删除成功')
}

//显示家庭档案或者患者
const route = useRoute()
const isChange = computed(() => {
  return route.query.ischange === '1'
})

//保存选择患者的id
const patientId = ref<string>()
const selectPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}
//底部下一步按钮
const store = useConsultStore()
const router = useRouter()
const next = () => {
  if (!patientId.value) return showToast('请选择一个患者')
  store.setPatient(patientId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部显示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in list"
        :key="item.id"
        @click="selectPatient(item)"
        :class="{ selected: patientId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6})(?:\d+)(.{2})$/, '$1**********$2')
          }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <SvgIcon name="user-edit" @click="showTime(item)" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" v-if="list.length < 6" @click="showTime()">
        <SvgIcon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 底部按钮 -->
    <div class="patient-next" v-if="isChange">
      <van-button type="primary" round block @click="next">下一步</van-button>
    </div>
    <!-- 右侧弹出层 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :title="patient.id ? '编辑患者' : '添加患者'"
        :back="
          () => {
            return (show = false)
          }
        "
        right-text="保存"
        @click-right="submit"
      ></cp-nav-bar>
      <van-form autocomplete="off" ref="form">
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <RadioBtn :options="options" v-model="patient.gender"></RadioBtn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox :icon-size="18" round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="deletePatient"
          >删除</van-action-bar-button
        >
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  ::v-deep() {
    .van-popup {
      width: 80%;
      height: 100%;
    }
  }
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 150px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>
