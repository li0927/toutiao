<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-show="isShowClose" class="delOperation">
        <span @click="goDelAll">全部删除</span>
        <span @click="isShowClose = false">完成</span>
      </div>
      <van-icon
        name="delete-o"
        @click="isShowClose = true"
        v-show="!isShowClose"
      />
    </van-cell>
    <van-cell
      :title="val"
      v-for="(val, i) in searchHistory"
      :key="i"
      @click="goHandle(val, i)"
    >
      <van-icon name="close" v-show="isShowClose" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowClose: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // goDel(index) {
    //   this.$emit('del', index)
    // },
    goDelAll() {
      this.$emit('delAll')
    },
    goHandle(val, index) {
      if (this.isShowClose) {
        this.$emit('del', index)
      } else {
        this.$emit('goSearch', val)
      }
      if (this.searchHistory.length) {
        this.isShowClose = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.delOperation {
  span {
    margin-right: 15px;
  }
}
</style>
