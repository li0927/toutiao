<template>
  <div class="article-list">
    <!-- 在初始化的时候会触发load事件，loading会自己变成true,如果接收的数据不足以铺满全屏，又再会触发 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSucText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(item, i) in list"
          :key="i"
          :title="item.title"
          :artItem="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getRecoArticles } from '@/api/articles.js'
import ArticleItem from './articleItem.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: Object
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isLoading: false,
      refreshSucText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束 this.loading = false
      // 数据全部加载完成 this.finished = true
      getRecoArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp ? this.timestamp : Date.now(),
        with_top: 1
      })
        .then(({ data: { data: res } }) => {
          console.log(res)
          this.list.push(...res.results)
          this.loading = false
          if (res.results.length) {
            this.timestamp = res.pre_timestamp
          } else {
            console.log(1)
            this.finished = true
          }
          // 因为catch可以是链式调用，即可以捕捉到前面抛出的异常，所以这里人为设置随机异常来让显示加载失败
          // if (Math.random() > 0.5) {
          //   JSON.parse('asdfgh')
          // }
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
      //   this.loading = false
    },
    onRefresh() {
      getRecoArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
        .then(({ data: { data: res } }) => {
          console.log(res)
          this.list.unshift(...res.results)
          // this.loading = false
          // if (res.results) {
          //   this.timestamp = res.pre_timestamp
          // } else {
          //   this.finished = true
          // }
          if (Math.random() > 0.1) {
            JSON.parse('asdfgh')
          }
          this.isLoading = false
          this.refreshSucText = `刷新成功，本次更新了${res.results.length}条数据!`
        })
        .catch(() => {
          this.refreshSucText = '刷新失败!'
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 移动端vh和vw分别相当于布局布局视口高宽的百分之一,是响应式的,给元素设置一个高度，滚动式就可以被浏览器检测到，否则会默认是body在滚动
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
