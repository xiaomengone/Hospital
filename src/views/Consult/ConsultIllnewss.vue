<script setup lang="ts">
import { ConsultTime } from '@/enums'
import { uploadImage } from '@/services/consult'
import 'vant/es/toast/style'
import type { CounsultIllness } from '@/typs/consult'
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from 'vant/lib/uploader/types'
import { computed, ref } from 'vue'
import { showToast } from 'vant'
import { useConsultStore } from '@/stores/consult'
import { useRouter } from 'vue-router'

const form = ref<CounsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
//时间选择
const illnessTimeOptions = [
  { label: '一周内', value: ConsultTime.week },
  { label: '一月内', value: ConsultTime.mounth },
  { label: '半年内', value: ConsultTime.halfYear },
  { label: '半年以上', value: ConsultTime.more }
]
//是否去过医院
const consultFlagOption = [
  { label: '就诊过', value: 1 },
  { label: '没就诊', value: 0 }
]
//上传的图片
const afterRead: UploaderAfterRead = async (file) => {
  if (Array.isArray(file)) return
  if (!file.file) return
  file.status = 'uploading'
  file.message = '上传中...'
  try {
    const res = await uploadImage(file.file)
    file.status = 'done'
    //展示图片
    file.url = res.data.url
    form.value.pictures?.push(res.data)
    console.log(res)
  } catch (e) {
    file.status = 'failed'
    file.message = '上传失败'
  }
}
const fileList = ref([])
const onDeleteImg = (file: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter(
    (pic) => pic.url !== file.url
  )
}
//保存数据相关逻辑
const disabled = computed(() => {
  return !(
    form.value.illnessDesc &&
    form.value.illnessTime &&
    form.value.consultFlag !== undefined
  )
})
const store = useConsultStore()
const router = useRouter()
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请输入病情时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否就诊过')
  //保存数据

  store.setIllnessDesc(form.value)
  router.push('/user/patient?ischange=1')
}
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <RadioBtn
          :options="illnessTimeOptions"
          v-model="form.illnessTime"
        ></RadioBtn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <RadioBtn
          :options="consultFlagOption"
          v-model="form.consultFlag"
        ></RadioBtn>
      </div>
      <div class="illness-img">
        <van-uploader
          :after-read="afterRead"
          multiple
          max-count="9"
          :max-size="5 * 1024 * 1024"
          upload-icon="upgrade"
          upload-text="上传图片"
          v-model="fileList"
          @delete="onDeleteImg"
        />
        <p class="tip">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
      <van-button @click="next" :class="{ disabled }" type="primary" block round
        >下一步</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
  ::v-deep .van-icon-cross {
    color: pink;
  }
}
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
