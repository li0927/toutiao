<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      getSearchResult({
        q: this.searchText,
        page: this.page,
        per_page: this.per_page
      })
        .then(({ data: { data: res } }) => {
          console.log(res.results)
          this.list.push(...res.results)
          this.loading = false
          if (res.results.length) {
            this.page++
          } else {
            this.finished = true
          }
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }

      //     // 加载状态结束
      //     this.loading = false

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
// .van-list {
//   margin-top: 104px;
// }
</style>
