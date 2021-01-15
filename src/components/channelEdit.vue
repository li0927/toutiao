<template>
  <div class="channel-edit">
    <van-cell>
      <template #title>
        <div class="title">我的频道</div>
      </template>
      <van-button round border class="edt-btn">编辑</van-button>
    </van-cell>
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item v-for="value in 6" :key="value">
        <template #text>
          <span>内容</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell>
      <template #title>
        <div class="title">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item v-for="value in 6" :key="value">
        <template #text>
          <span>内容</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {},
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
.channel-edit {
  margin: 95px 0;
  .van-cell::after {
    border-bottom: 0;
  }
  /deep/.title {
    font-size: 32px;
  }
  .edt-btn {
    height: 50px;
    width: 105px;
    color: #f86363;
    border-color: #f86363;
    font-size: 32px;
    padding: 0;
  }
  .van-grid-item {
    height: 85px;
    font-size: 26px;
    color: #222222;
    background-color: #f4f5f6;
  }
}
</style>
