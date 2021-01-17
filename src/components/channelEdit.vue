<template>
  <div class="channel-edit">
    <van-cell>
      <template #title>
        <div class="title">我的频道</div>
      </template>
      <van-button
        round
        border
        class="edt-btn"
        @click="isShowDel = !isShowDel"
        >{{ isShowDel ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid
      :column-num="4"
      :gutter="10"
      class="grid_wrap"
      direction="horizontal"
    >
      <van-grid-item
        v-for="(val, index) in myChannels"
        :key="index"
        class="my-channel"
      >
        <template #icon>
          <van-icon
            name="clear"
            class="del-channel"
            v-if="isShowDel && !fixedChannels.includes(val.id)"
            @click="onDelChannel(val, index)"
          />
        </template>
        <template #text>
          <span
            @click="uptActive(val, index)"
            :class="index === active ? 'selceted' : ''"
            >{{ val.name }}</span
          >
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell>
      <template #title>
        <div class="title">频道推荐</div>
      </template>
    </van-cell>
    <van-grid
      :column-num="4"
      :gutter="10"
      class="grid_wrap"
      direction="horizontal"
    >
      <van-grid-item v-for="(val, index) in recoChannels" :key="index">
        <template #text>
          <div class="reco-content">
            <van-icon name="plus" @click="onAddChannel(val)" />
            <span>{{ val.name }}</span>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addMyChannels, delMyChannels } from '@/api/channel.js'
import { setItem } from '@/plugins/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      requred: true,
      default() {
        return []
      }
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isShowDel: false,
      fixedChannels: [0],
      allChannels: []
    }
  },
  computed: {
    recoChannels() {
      return this.allChannels.filter((cha) => {
        if (!this.myChannels) return true
        return !this.myChannels.some((v) => {
          return cha.id === v.id
        })
      })
    },
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.getChannelList()
  },
  mounted() {},
  methods: {
    getChannelList() {
      getAllChannels().then(({ data: { data: res } }) => {
        console.log(res.channels)
        this.allChannels = res.channels
      })
    },
    uptActive(val, index) {
      console.log(val)
      this.$emit('uptActiveInd', index)
    },
    // 换个先后位置？？？
    onAddChannel(val) {
      console.log(val)
      this.$emit('addChannel', val)
      if (this.user) {
        addMyChannels({
          channels: [{ id: val.id, seq: this.myChannels.length }]
        })
      } else {
        setItem('my-channels', this.myChannels, false)
      }
    },
    onDelChannel(val, index) {
      if (index < this.active) {
        this.$emit('uptActiveInd', this.active - 1)
      } else if (index === this.active) {
        this.$emit('uptActiveInd', 0)
      }
      this.$emit('delChannel', val)
      if (this.user) {
        delMyChannels(val.id)
      } else {
        setItem('my-channels', this.myChannels, false)
      }
    },
    showInd(index) {
      console.log(index)
    }
  }
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
    border: none;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      border-radius: 15px;
      font-size: 30px;
      padding: 0;
      .selceted {
        color: #f86363;
      }
    }
    /deep/.reco-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /deep/.van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/.van-grid-item__content::after,
  .van-grid-item__content--surround::after {
    border-width: 0;
  }
  .grid_wrap {
    padding-top: 35px;
    padding-bottom: 70px;
  }
  /deep/.my-channel {
    position: relative;
    .del-channel {
      position: absolute;
      top: 0;
      right: 0;
      color: pink;
    }
  }
}
</style>
