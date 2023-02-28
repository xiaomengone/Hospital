import { ref } from 'vue'
import { followTarget } from './../services/consult'
import type { FollowType } from './../typs/consult.d'

export const useFollow = (type: FollowType = 'doc') => {
  // 关注逻辑
  const loading = ref(false)
  //item使用了ts的类型兼容，定义的少但是传的多也是可以的
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followTarget(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }
  return { loading, follow }
}
