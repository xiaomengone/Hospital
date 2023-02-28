<script lang="ts" setup>
import knowledgeList from '@/views/Home/components/KnowledgeList.vue'
</script>

<template>
  <div class="article">
    <div class="search">
      <div class="searchLeft">健康百科</div>
      <div class="searchRight">
        <van-search placeholder="请输入搜索关键词" shape="round" />
      </div>
    </div>
    <!-- 热门话题 -->
    <div class="hotTopic">
      <p class="hotTopicText">热门话题</p>
      <van-grid>
        <van-grid-item icon="smile-o" text="健康饮食" />
        <van-grid-item icon="contact" text="母婴" />
        <van-grid-item icon="photo-o" text="减值" />
        <van-grid-item icon="photo-o" text="运动" />
      </van-grid>
      <van-grid>
        <van-grid-item icon="friends-o" text="慢性病" />
        <van-grid-item icon="good-job-o" text="儿童健康" />
        <van-grid-item icon="photo-o" text="心理健康" />
        <van-grid-item icon="photo-o" text="医学常识" />
      </van-grid>
    </div>
    <!-- //推荐 -->
    <van-tabs>
      <van-tab title="推荐"
        ><knowledgeList type="food"></knowledgeList
      ></van-tab>
      <van-tab title="关注">
        <knowledgeList type="like"></knowledgeList
      ></van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.article {
  .search {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4fa4f3;
    color: white;
    font-size: 20px;
    ::v-deep .van-search {
      background: #4fa4f3;
    }
    .searchLeft {
      padding-left: 10px;
    }
  }
  .hotTopic {
    .hotTopicText {
      padding-left: 10px;
      font-size: 20px;
      font-weight: 700;
      margin-top: 15px;
    }
  }
}
</style>
