<script lang="ts" setup></script>

<template>
  <div class="notify">
    <div class="notifyHeader">
      <div class="notifyHeaderLft">消息</div>
      <div class="notifyHeaderRight">清除未读</div>
    </div>
    <div class="notifyBody">
      <div class="bodyItem">
        <div class="bodyItemAvtor"><van-icon name="user-o" /></div>
        <van-cell-group>
          <van-cell title="张清北" value="3分钟前" label="建议先用药物控制" />
        </van-cell-group>
      </div>
      <div class="bodyItem">
        <div class="bodyItemAvtor"><van-icon name="user-o" /></div>
        <van-cell-group>
          <van-cell title="张清北" value="3分钟前" label="建议先用药物控制" />
        </van-cell-group>
      </div>
      <div class="bodyItem">
        <div class="bodyItemAvtor"><van-icon name="user-o" /></div>
        <van-cell-group>
          <van-cell title="张清北" value="3分钟前" label="建议先用药物控制" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notify {
  padding: 5px;
  .notifyHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .notifyHeaderLft {
      font-size: 20px;
      font-weight: 700;
    }
    .notifyHeaderRight {
      color: #c3c3c5;
    }
  }
  // 身体
  .notifyBody {
    margin-top: 10px;
    .bodyItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bodyItemAvtor {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        ::v-deep .van-icon {
          font-size: 30px;
        }
      }
      ::v-deep() {
        .van-cell-group {
          .van-cell__title {
            width: 230px;
          }
        }
      }
    }
  }
}
</style>
