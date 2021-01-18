<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in searchSuggestion"
      :key="index"
      @click="onSearch(item)"
    >
      <template #title>
        <div v-html="highlight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      searchSuggestion: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (val) {
        getSearchSuggestion({ q: val }).then(({ data: { data: res } }) => {
          console.log(res.options)
          this.searchSuggestion = res.options
        })
      }, 500),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    highlight(str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(
        reg,
        `<span style="color: #3296fa;">${this.searchText}</span>`
      )
    },
    onSearch(val) {
      this.$emit('changeSearchText', val)
    }
  }
}
</script>

<style lang="less" scoped></style>
