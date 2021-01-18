<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <template #title>
        <van-button round icon="search" class="search" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable>
      <van-tab
        :title="v.name"
        v-for="(v, index) in userChannelList"
        :key="v.id"
        @click="refreshActive(index)"
      >
        <article-list class="article" :channel="v"></article-list>
      </van-tab>
      <div class="space" slot="nav-right"></div>
      <div class="hamburger" slot="nav-right">
        <i class="toutiao toutiao-gengduo" @click="popupIsShow = true"></i>
      </div>
      <!-- <template #nav-right>
      </template> -->
    </van-tabs>
    <!-- <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs> -->
    <van-popup
      v-model="popupIsShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      @closed="refreshUserChannelList"
    >
      <channel-edit
        :myChannels="userChannelList"
        :active="active"
        @addChannel="addChannel"
        @delChannel="delChannel"
        @uptActiveInd="uptActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelList } from '@/api/user.js'
import ArticleList from '../../components/articleList.vue'
import ChannelEdit from '../../components/channelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/plugins/storage.js'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      value: '',
      active: 0,
      userChannelList: [],
      popupIsShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.getUserChannelList()
  },
  mounted() {},
  methods: {
    getUserChannelList() {
      if (this.user) {
        getUserChannelList().then(({ data: { data: res } }) => {
          console.log(res.channels)
          this.userChannelList = res.channels
        })
      } else {
        this.userChannelList = getItem('my-channels', false)
          ? getItem('my-channels', false)
          : [{ id: 0, name: '推荐' }]
      }
    },
    uptActive(index) {
      this.active = index
    },
    addChannel(e) {
      console.log(e)
      this.userChannelList.push(e)
    },
    delChannel(e) {
      this.userChannelList = this.userChannelList.filter((v) => {
        return v.id !== e.id
      })
    },
    refreshUserChannelList() {}
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .van-nav-bar {
    position: fixed;
    width: 100%;
  }
  /deep/.van-nav-bar__title {
    max-width: unset !important;
  }
  .search {
    width: 555px !important;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    color: #ffffff;
    .van-icon {
      font-size: 32px;
      color: #ffffff;
    }
  }
  /deep/.van-tabs {
    margin-bottom: 100px;
    .van-tabs__wrap {
      position: fixed;
      z-index: 1;
      left: 0;
      right: 0;
      top: 90px;
      height: 82px;
    }
    .van-tabs__line {
      width: 32px;
      background-color: #3296fa;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      min-width: 200px;
      height: 82px;
    }
    .article {
      margin-top: 174px;
    }
    .space {
      width: 68px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger {
      position: fixed;
      right: 0;
      width: 68px;
      height: 82px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      opacity: 0.902;
      .toutiao {
        color: black;
        font-size: 32px;
      }
      &:before {
        content: '';
        background-image: url('~@/assets/gradient-gray-line.png');
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-size: contain;
      }
    }
  }
  // /deep/ .channel-tabs {
  //   .van-tabs__wrap {
  //     position: fixed;
  //     top: 92px;
  //     z-index: 1;
  //     left: 0;
  //     right: 0;
  //     height: 82px;
  //   }

  //   .van-tab {
  //     border-right: 1px solid #edeff3;
  //     min-width: 200px;
  //     font-size: 30px;
  //     color: #777777;
  //   }

  //   .van-tab--active {
  //     color: #333333;
  //   }

  //   .van-tabs__nav {
  //     padding-bottom: 0;
  //   }

  //   .van-tabs__line {
  //     bottom: 8px;
  //     width: 31px !important;
  //     height: 6px;
  //     background-color: #3296fa;
  //   }

  //   .placeholder {
  //     flex-shrink: 0;
  //     width: 66px;
  //     height: 82px;
  //   }

  //   .hamburger-btn {
  //     position: fixed;
  //     right: 0;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 66px;
  //     height: 82px;
  //     background-color: #fff;
  //     background-color: rgba(255, 255, 255, 0.902);
  //     i.toutiao {
  //       font-size: 33px;
  //     }
  //     &:before {
  //       content: '';
  //       position: absolute;
  //       left: 0;
  //       width: 1px;
  //       height: 58px;
  //       background-image: url(~@/assets/gradient-gray-line.png);
  //       background-size: contain;
  //     }
  //   }
  // }
}
</style>
