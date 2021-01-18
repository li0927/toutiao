<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultShow = false"
      />
    </form>
    <div class="space">123</div>
    <search-result
      v-if="isSearchResultShow"
      :searchText="searchText"
    ></search-result>
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @changeSearchText="onSearch"
    ></search-suggestion>
    <search-history
      v-else
      :searchHistory="searchHistory"
      @del="onDel"
      @delAll="onDelAll"
      @goSearch="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/components/searchHistory'
import SearchSuggestion from '@/components/searchSuggestion'
import SearchResult from '@/components/searchResult'
// import SearchHistory from '../../components/searchHistory.vue'
// import SearchSuggestion from '../../components/searchSuggestion.vue'
import { setItem, getItem } from '@/plugins/storage.js'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isSearchResultShow: false,
      searchHistory: getItem('toutiao_search_history') || []
    }
  },
  computed: {},
  watch: {
    searchHistory(val) {
      setItem('toutiao_search_history', val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // goSearch(val) {
    //   this.searchText = val
    //   this.onSearch(val)
    // },
    onSearch(val) {
      //   console.log(val)
      this.searchText = val
      // this.searchHistory = this.searchHistory.length
      //   ? this.searchHistory.push(val)
      //   : [val]
      if (!this.searchHistory.length) {
        this.searchHistory = [val]
      } else if (this.searchHistory.indexOf(val) === -1) {
        console.log(!this.searchHistory.indexOf(val))
        this.searchHistory.push(val)
      }
      this.isSearchResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    onDel(index) {
      this.searchHistory.splice(index, 1)
    },
    onDelAll() {
      this.searchHistory = []
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-search {
  background-color: #3296fa;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  .van-search__action {
    color: #fff;
  }
}
.space {
  height: 104px;
  width: 100%;
}
</style>
