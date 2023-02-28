<script lang="ts" setup>
import router from '@/router'

//返回按钮
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }
  if (history.state?.back) {
    history.back()
  } else {
    router.push('/')
  }
}
//头部右边功能按钮
const emit = defineEmits<{
  (e: 'onClickRight'): void
}>()
const onClickRight = () => {
  emit('onClickRight')
}
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()
</script>

<template>
  <van-nav-bar
    :title="title"
    left-text=""
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<style scoped lang="scss">
::v-deep {
  .an-icon-arrow-left {
    font-size: 60px;
    color: var(--cp-text1);
  }
  .van-nav-bar__text {
    font-size: 15px;
    color: var(--cp-primaty);
  }
}
</style>
