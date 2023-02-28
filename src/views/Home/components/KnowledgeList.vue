<script setup lang="ts">
import { getKnowlegePage } from '@/services/consult'
import type {
  consultQuery,
  consultRowsArray,
  knoledgeType
} from '@/typs/consult'
import { ref } from 'vue'
import KnowledgeCard from '@/views/Home/components/KnoledgeCard.vue'

const props = defineProps<{ type: knoledgeType }>()
const list = ref<consultRowsArray>([])
const loading = ref(false)
const finished = ref(false)
const params = ref<consultQuery>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  const res = await getKnowlegePage(params.value)
  list.value.push(...res.data.rows)
  loading.value = false
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></KnowledgeCard>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
