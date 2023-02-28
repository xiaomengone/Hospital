// 用户token
import type { User } from '@/typs/user'
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore(
  'user',
  () => {
    //用户信息
    const user = ref<User>()
    //修改用户信息
    const setUser = (u: User) => {
      user.value = u
    }
    //删除
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
