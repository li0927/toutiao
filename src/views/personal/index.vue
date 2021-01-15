<template>
  <div class="my-container">
    <div class="header not_login" v-if="!user">
      <div class="login_btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile_img" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <div class="header userinfor" v-if="user">
      <div class="user">
        <div class="avatar">
          <van-image round class="img" src="UserPersonalInfor.photo" />
          <span class="uname">{{ UserPersonalInfor.name }}</span>
        </div>
        <div class="eidtInfor">
          <van-button type="default" round>编辑资料</van-button>
        </div>
      </div>
      <ul class="function">
        <li>
          <span class="count">{{ UserPersonalInfor.art_count }}</span>
          <span class="item">头条</span>
        </li>
        <li>
          <span class="count">{{ UserPersonalInfor.follow_count }}</span>
          <span class="item">关注</span>
        </li>
        <li>
          <span class="count">{{ UserPersonalInfor.fans_count }}</span>
          <span class="item">粉丝</span>
        </li>
        <li>
          <span class="count">{{ UserPersonalInfor.like_count }}</span>
          <span class="item">获赞</span>
        </li>
      </ul>
    </div>
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item>
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>收藏</template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template #text>历史</template>
      </van-grid-item>
    </van-grid>
    <!-- <div class="msg">
      <div class="chat">
        <span>消息通知</span>
        <i class="toutiao toutiao-jiantou"></i>
      </div>
      <div class="chat">
        <span>小智同学</span>
        <i class="toutiao toutiao-jiantou"></i>
      </div>
    </div>
    <div class="logout">
      <a href="">退出登录</a>
    </div> -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      title="退出登录"
      center
      class="logout"
      v-if="user"
      clickable
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserPersonalInfor } from '@/api/user.js'
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data() {
    return {
      UserPersonalInfor: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    if (this.user) {
      this.loadUserPersonalInfor()
    }
  },
  mounted() {},
  methods: {
    loadUserPersonalInfor() {
      getUserPersonalInfor().then(({ data: { data: res } }) => {
        console.log(res)
        this.UserPersonalInfor = res
      })
    },
    onLogout() {
      this.$dialog
        .confirm({
          title: '确定要退出吗？'
        })
        .then(() => {
          this.$store.commit('setToken', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background-image: url('~@/assets/banner.png');
    background-size: contain;
  }
  .not_login {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    .login_btn {
      color: #fff;
      display: flex;
      font-size: 28px;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;
      .mobile_img {
        width: 133px;
        margin-bottom: 15px;
      }
    }
  }
  .user {
    height: 231px;
    padding: 75px 30px 25px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #fff;
      .img {
        width: 131px;
        height: 131px;
        border: 3px solid #fff;
        margin-right: 25px;
      }
    }
    .eidtInfor .van-button {
      height: 33px;
      font-size: 20px;
    }
  }
  .function {
    height: 130px;
    padding: 32px;
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      .count {
        font-size: 30px;
        padding-bottom: 15px;
      }
      .item {
        font-size: 20px;
      }
    }
  }
  .grid-nav {
    font-size: 25px;
    margin-bottom: 10px;
    .toutiao {
      font-size: 45px;
      margin-bottom: 15px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
  }
  .msg {
    margin: 10px 0;
    .chat {
      box-sizing: border-box;
      padding: 38px 30px;
      height: 100px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      span {
        font-size: 30px;
      }
      .toutiao {
        color: #9f9f9f;
        font-size: 20px;
      }
    }
  }
  .logout {
    text-align: center;
    color: #d86262;
    margin-top: 10px;
  }
}
</style>
