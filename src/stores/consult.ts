import type { ConsutType } from '@/enums'
import type { CounsultIllness, PartialConsultParams } from './../typs/consult.d'
import { ref } from 'vue'
// 极速问诊
import { defineStore } from 'pinia'
export const useConsultStore = defineStore(
  'consult',
  () => {
    //问诊的所有信息
    const consult = ref<PartialConsultParams>({})
    //修改就诊类型1找医生 2极速问诊 3开药问诊
    const setType = (type: ConsutType) => {
      consult.value.type = type
    }
    //修改是否是3甲医院
    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type
    }
    //修改科室
    const setDepId = (id: string) => {
      consult.value.depId = id
    }
    //修改病情描述
    const setIllnessDesc = (illness: CounsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    //修改患者
    const setPatient = (id: string) => {
      consult.value.patientId = id
    }
    //修改优惠卷
    const setCoupon = (id: string) => {
      consult.value.couponId = id
    }
    //清空信息
    const clear = () => {
      consult.value = {}
    }

    return {
      consult,
      setType,
      setIllnessType,
      setDepId,
      setIllnessDesc,
      setPatient,
      setCoupon,
      clear
    }
  },
  {
    persist: true
  }
)
