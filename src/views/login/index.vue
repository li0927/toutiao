<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="formRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="formRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            :time="10000"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            class="send-sms-btn"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" native-type="submit">登录</van-button>
        <!-- <van-button block native-type="button" @click="onRefrehToken"
          >测试</van-button
        > -->
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user.js'
// import store from '../../store/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '19176844058',
        code: '246810'
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['setToken']),
    async onSubmit() {
      login(this.user).then((res) => {
        this.setToken(res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/')
      })
      // try {
      //   const res = await login(this.user)
      //   this.setToken(res.data.data)
      //   this.$toast.success('登录成功')
      // }
      // } catch (err) {
      //   if (err.response.status === 400) {
      //     return this.$toast.fail('手机号或验证码错误')
      //   } else {
      //     return this.$toast.fail('未知错误，请稍后重试')
      //   }
      // }
      // try {
      //   login(this.user).then((res) => {
      //     console.log(res)
      //   })
      // } catch (err) {
      //   console.log('失败', err)
      // }
    },
    async onSendSms() {
      try {
        await this.$refs.loginFormRef.validate('mobile')
        console.log('验证成功')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true
      try {
        //   这里要写await,不然会直接执行后面的代码
        await sendSms(this.user.mobile)
        this.$toast.success('success')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.fail('发送短信过于频繁')
        } else {
          this.$toast.fail('发送短信失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-sms-btn {
    background-color: #ededed;
    color: #666666;
  }
  .login-btn {
    margin: 56px 28px;
    background-color: #f5f6f7;
  }
  .toutiao {
    font-size: 37px;
  }
}
</style>
