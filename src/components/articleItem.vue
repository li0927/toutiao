<template>
  <div class="article-item">
    <van-cell>
      <div class="title van-multi-ellipsis--l2" slot="title">
        {{ artItem.title }}
      </div>
      <!-- <template> 内容 </template> -->
      <template #label>
        <div v-if="artItem.cover.images.length === 3" class="img_wrap">
          <div
            class="cover_item"
            v-for="(v, i) in artItem.cover.images"
            :key="i"
          >
            <van-image fit="cover" :src="v" />
          </div>
        </div>
        <span>{{ artItem.aut_name }}</span>
        <span>{{ artItem.comm_count }}评论</span>
        <span>{{ artItem.pubdate }}</span>
      </template>
      <van-image
        class="right_cover"
        v-if="artItem.cover.images.length === 1"
        fit="cover"
        :src="artItem.cover.images[0]"
      />
      <!-- <template #icon> 图标信息 </template> -->
      <!-- <template #extra> 额外信息 </template> -->
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    artItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  /deep/.title {
    font-size: 32px;
  }
  .van-cell__title {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .van-cell__label span {
      margin-right: 25px;
    }
    .img_wrap {
      display: flex;
      .cover_item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .van-image {
          width: 100%;
          height: 146px;
        }
      }
    }
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
    .right_cover {
      width: 100%;
      height: 132px;
    }
  }
}
</style>
