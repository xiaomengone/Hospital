<script setup lang="ts">
import { getDocrPage } from '@/services/consult'
import type { rowsArray } from '@/typs/consult'
import DoctorCard from '@/views/Home/components/DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const { width } = useWindowSize()
const current = ref(1)
const pageSize = ref(5)

const list = ref<rowsArray>([])
onMounted(async () => {
  const res = await getDocrPage({
    current: current.value,
    pageSize: pageSize.value
  })
  list.value = res.data.rows
})
</script>

<template>
  <!--推荐医生的大模块 -->
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe
        indicator-color="transparent"
        loop:false
        show-indicators:false
        :width="(150 / 375) * width"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <DoctorCard :item="item"></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
