<template>
  <!-- 登录dialog -->
  <el-dialog
    title="登录"
    :visible.sync="loginVisible"
    width="40%"
    :destroy-on-close="true"
    :before-close="loginClose"
    :close-on-click-modal="false"
  >
    <!-- 扫码登录 -->
    <div class="login-smdialog" v-if="loginMain == 1">
      <div class="login-box">
        <img src="@/assets/image/obj_login.png" class="login-guide" />
        <div class="login-scancode">
          <h3>扫码登录</h3>
          <span class="ewm-box">
            <img class="ewm" :src="loginQRC" alt="" />
            <el-tag
              type="success"
              @click="getQRKey"
              class="refresh-ewm"
              size="mini"
              v-if="isEwm"
              >刷新二维码</el-tag
            >
          </span>
          <span>使用<span class="wyyapp">网易云音乐APP</span>扫码登录</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="otherModes">使用其他登录模式</el-button>
      </span>
    </div>
    <!-- 其他登录 -->
    <div class="login-otherLogin" v-if="loginMain == 2">
      <div class="login-otherLogin-left">
        <img src="@/assets/image/dn.png" width="224px" height="120px" alt="" />
        <el-button
          type="primary"
          size="mini"
          style="margin-top: 20px"
          @click="loginMain = 3"
          >手机号登录</el-button
        >
        <el-button size="mini">注册</el-button>
        <span class="clause"
          ><el-checkbox v-model="clause">同意</el-checkbox><a>《隐私政策》</a
          ><a>《儿童隐私政策》</a></span
        >
      </div>
      <div class="login-otherLogin-right">
        <a
          ><i
            ><svg
              t="1650096831135"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2591"
              width="38"
              height="38"
            >
              <path
                d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                fill="#28C445"
                p-id="2592"
              ></path>
              <path
                d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                fill="#28C445"
                p-id="2593"
              ></path></svg
          ></i>
          微信登录
        </a>
        <a
          ><i
            ><svg
              t="1650096878086"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4138"
              width="38"
              height="38"
            >
              <path
                d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m210.385455 641.396364c-7.447273 9.309091-26.996364-1.861818-41.89091-32.581819-3.723636 13.963636-13.032727 36.305455-34.443636 64.232728 35.374545 8.378182 44.683636 42.821818 33.512727 61.44-8.378182 13.032727-26.996364 24.203636-59.578181 24.203636-58.647273 0-83.781818-15.825455-95.883637-26.996364-1.861818-2.792727-5.585455-3.723636-10.24-3.723636-4.654545 0-7.447273 0.930909-10.24 3.723636-11.170909 11.170909-37.236364 26.996364-95.883636 26.996364-32.581818 0-52.130909-11.170909-59.578182-24.203636-12.101818-18.618182-1.861818-53.061818 33.512727-61.44-20.48-27.927273-29.789091-50.269091-34.443636-64.232728-13.963636 30.72-34.443636 42.821818-41.890909 32.581819-5.585455-8.378182-8.378182-26.065455-7.447273-38.167273 3.723636-46.545455 34.443636-85.643636 53.061818-106.123636-2.792727-5.585455-8.378182-40.029091 14.894546-63.301819v-1.861818c0-92.16 65.163636-158.254545 148.014545-158.254545 81.92 0 148.014545 66.094545 148.014546 158.254545v1.861818c23.272727 23.272727 17.687273 57.716364 14.894545 63.301819 17.687273 20.48 49.338182 59.578182 53.061818 106.123636 0.930909 12.101818-0.930909 29.789091-7.447272 38.167273z"
                fill="#30a5dd"
                p-id="4139"
              ></path></svg
          ></i>
          QQ登录
        </a>
        <a
          ><i
            ><svg
              t="1650096901592"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5157"
              width="38"
              height="38"
            >
              <path
                d="M448.698182 482.210909c-96.814545 4.654545-175.010909 56.785455-175.010909 121.949091s78.196364 114.501818 175.010909 109.847273S623.709091 647.912727 623.709091 582.749091c-0.930909-64.232727-79.127273-105.192727-175.010909-100.538182z m65.163636 164.770909c-29.789091 39.098182-88.436364 57.716364-145.221818 26.065455-26.996364-14.894545-26.065455-43.752727-26.065455-43.752728s-11.170909-92.16 85.643637-103.330909c97.745455-12.101818 115.432727 81.92 85.643636 121.018182z"
                fill="#ea5d5c"
                p-id="5158"
              ></path>
              <path
                d="M448.698182 584.610909c-6.516364 4.654545-7.447273 13.032727-3.723637 18.618182 2.792727 5.585455 11.170909 6.516364 16.756364 1.861818 5.585455-4.654545 8.378182-13.032727 4.654546-18.618182-2.792727-5.585455-10.24-6.516364-17.687273-1.861818zM403.083636 597.643636c-18.618182 1.861818-30.72 17.687273-30.72 33.512728 0 14.894545 14.894545 26.065455 32.581819 24.203636 17.687273-1.861818 32.581818-15.825455 32.581818-31.650909s-13.963636-27.927273-34.443637-26.065455z"
                fill="#ea5d5c"
                p-id="5159"
              ></path>
              <path
                d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m197.352727 626.501818C669.323636 712.145455 538.065455 754.036364 441.250909 746.589091c-92.16-7.447273-211.316364-38.167273-223.418182-151.738182 0 0-6.516364-51.2 42.821818-117.294545 0 0 70.749091-99.607273 152.669091-128.465455 82.850909-27.927273 92.16 19.549091 92.16 48.407273-4.654545 24.203636-12.101818 38.167273 18.618182 28.858182 0 0 80.989091-38.167273 114.501818-4.654546 26.996364 26.996364 4.654545 65.163636 4.654546 65.163637s-11.170909 12.101818 12.101818 16.756363c21.410909 3.723636 94.021818 37.236364 53.992727 122.88z m-80.058182-236.450909c-8.378182 0-15.825455-7.447273-15.825454-15.825454 0-9.309091 7.447273-15.825455 15.825454-15.825455 0 0 99.607273-18.618182 87.505455 89.367273v1.861818c-0.930909 7.447273-7.447273 13.963636-15.825455 13.963636-9.309091 0-15.825455-7.447273-15.825454-15.825454 0-1.861818 15.825455-73.541818-55.854546-57.716364zM797.789091 493.381818c-2.792727 18.618182-12.101818 11.170909-22.341818 11.170909-13.032727 0-23.272727-16.756364-23.272728-29.789091 0-11.170909 4.654545-22.341818 4.654546-22.341818 0.930909-4.654545 12.101818-34.443636-7.447273-78.196363-35.374545-60.509091-106.123636-60.509091-114.501818-57.716364-8.378182 3.723636-21.410909 5.585455-21.410909 5.585454-13.032727 0-23.272727-10.24-23.272727-23.272727 0-11.170909 7.447273-19.549091 16.756363-22.341818 0 0 0 0.930909 0.930909 0.930909s1.861818 0.930909 1.861819 0.930909c10.24-1.861818 45.614545-4.654545 79.127272 3.723637 62.370909 14.894545 146.152727 83.781818 108.916364 211.316363z"
                fill="#ea5d5c"
                p-id="5160"
              ></path></svg
          ></i>
          微博登录
        </a>
        <a
          ><i
            ><svg
              t="1650096934104"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6850"
              width="38"
              height="38"
            >
              <path
                d="M1018.24 502.4c-5.12-270.72-225.92-491.52-496.64-496.64-287.36-5.12-520.96 228.48-515.84 515.84 5.12 270.72 225.92 491.52 496.64 496.64C789.76 1023.36 1023.36 789.76 1018.24 502.4zM313.43 534.718c39.25 0 103.92-26.011 122.558-48.666 7.313-7.969 2.637-10.01-28.645-12.644-41.951-3.293-56.637-16.663-64.606-58.615-7.376-35.958-5.994-99.245 1.315-113.931 8.036-13.962 30.031-17.32 37.34-5.334 2.702 4.675 4.676 29.307 5.335 55.978 1.319 73.298 5.334 76.658 102.605 73.298 43.334-1.383 90.62-2.698 106.621-3.357 42.611 0 57.297-17.979 51.962-64.606-4.675-41.951-14.027-59.271-37.34-67.962-20.612-8.696-137.904-11.329-184.53-4.02-34.642 4.675-35.298 4.675-35.298-11.985 0-19.953 7.309-25.288 39.973-31.941 35.958-7.308 153.181-5.994 183.212 1.978 56.638 14.686 65.924 24.629 82.652 94.042 9.943 41.292 9.284 59.93-2.701 88.579-13.303 32.664-38.659 40.633-119.925 39.973-65.329-0.659-66.648 0-77.973 17.319-14.03 22.591-70.664 67.24-95.956 76.59-76.59 27.265-119.265 29.967-125.919 8.628C267.463 547.366 282.084 534.718 313.43 534.718zM429.339 339.522c4.675-5.334 30.031-7.969 79.291-7.377 94.569 0.724 89.893-0.659 87.26 20.68l-1.977 17.979-83.309 0.659c-74.615 0-83.308-1.319-85.282-11.988C424.004 352.825 425.979 344.198 429.339 339.522zM470.631 727.217c-40.633 28.648-115.249 60.657-141.264 60.657-42.608 0-39.973-41.951 3.36-53.94 73.957-20.017 149.955-62.628 239.85-133.883 36.021-27.989 39.973-29.372 50.643-16.136 9.287 11.329 7.309 13.367-54.659 66.648-20.68 17.979-37.999 36.616-37.999 41.951 0 4.676-5.335 8.692-11.329 8.692S491.243 712.531 470.631 727.217zM753.155 636.732c-3.293 41.292-14.622 62.628-48.601 93.254-53.345 47.943-127.96 71.256-153.248 48.602-16.663-15.345-29.967-48.01-24.632-60.654 3.293-9.352 5.994-9.352 24.632 0.659 41.951 21.336 101.946-1.319 136.585-51.303 34.642-50.643 19.956-105.965-27.989-105.965-17.32 0-23.969-3.949-30.622-18.635-12.712-25.951-38-27.265-66.648-2.637C429.403 655.303 305.462 717.934 277.473 684.61c-17.979-21.271-4.016-31.94 69.94-53.276 25.356-7.377 67.304-29.308 113.931-60.654 66.648-43.929 73.956-50.579 71.323-65.924-2.701-12.644 0-17.979 11.985-22.655 8.627-3.36 23.313-4.675 32.664-3.293 9.287 0.659 30.627 3.357 47.946 5.335C701.853 492.834 759.149 562.116 753.155 636.732z"
                fill="#d81e06"
                p-id="6851"
              ></path></svg
          ></i>
          网易邮箱账号登录
        </a>
      </div>
      <div class="login-rbewm" @click="loginMain = 1">
        <img src="@/assets/image/rbewm.png" alt="" />
      </div>
    </div>
    <!-- 手机号登录 -->
    <div class="login-phonelogin" v-if="loginMain == 3">
      <el-form
        ref="form"
        :rules="loginrules"
        :model="form"
        :validate-on-rule-change="false"
      >
        <el-form-item prop="phone">
          <el-input
            v-model.trim="form.phone"
            placeholder="请输入手机号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha" v-if="loginAuthInput == 1">
          <div class="logininput">
            <el-input
              v-model.trim="form.captcha"
              placeholder="请输入验证码"
              size="small"
            ></el-input>
            <el-button
              type="primary"
              @click.native="sendAuth"
              class="tag-btn"
              :disabled="!disabledAuth"
              plain
              >{{ setAuthBtnName }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item prop="password" v-if="loginAuthInput == 2">
          <div class="logininput">
            <el-input
              v-model.trim="form.password"
              placeholder="请输入密码"
              size="small"
              show-password
            >
            </el-input>
            <el-button
              type="primary"
              @click.native="forgetPass"
              class="tag-btn"
              plain
              >忘记密码</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <div class="loginInputOrAuto">
            <a @click="showLoginAuthInput">{{
              loginAuthInput == 1 ? "密码登录" : "短信登录"
            }}</a>
            <el-checkbox v-model="checkAutoLogin">自动登录</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="loginfootre">
            <el-button type="primary" @click="login">登录</el-button>
            <a>免费注册</a>
            <a
              @click="
                () => {
                  (loginAuthInput = 1), (loginMain = 2);
                }
              "
              >其他登录方式</a
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import QRCode from "qrcode";
import md5 from "js-md5"
export default {
  name: "User",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
        callback();
      } else {
        return callback(new Error(this.authPhoneError));
      }
    };
    var checkCaptcha = (rule, value, callback) => {
      if (value != "" && this.authCodeResult) {
        callback();
      } else {
        return callback(new Error(this.authCaptchaError));
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value != "" && !this.authPassResult) {
        callback();
      } else {
        return callback(new Error(this.authPassError));
      }
    };
    return {
      form: {
        phone: "",
        password: "",
        captcha: "",
      },
      //   自定义错误信息
      authPhoneError: "手机号格式不正确",
      authCaptchaError: "请输入验证码",
      authPassError: "密码不能为空",
      //   用户手机号是否注册 -1未注册 1已注册
      isUserPhone: -1,
      // 验证码登录验证
      loginrules: {
        phone: [{ validator: checkPhone, trigger: ["change", "blur"] }],
        captcha: [{ validator: checkCaptcha, trigger: "change" }],
      },
      // 登录框显示隐藏
      loginVisible: false,
      // 控制登录框内容显示隐藏
      // 1-扫码登录 2-其他登录模式 3-手机号登录 4-注册
      loginMain: 0,
      // 控制验证码登录验证码输入框显示隐藏
      // 1-验证码获取验证码显示  2-登录密码输入框
      loginAuthInput: 1,
      // 同意条款
      clause: false,
      // 获取验证码禁用
      disabledAuth: true,
      //   倒计时
      timer: 60,
      disabledAuthBtnTimer: null,
      //   获取验证码按钮内容
      setAuthBtnName: "获取验证码",
      // 禁用定时器
      disabledAuthBtnTime: null,
      //登录保存返回验证码结果
      authCodeResult: true,
      // 登录校验密码结果
      authPassResult: false,
      // 是否为自动登录
      checkAutoLogin: true,
      // 保存二维码key
      loginQRKey: "",
      // 保存二维码信息生成
      loginQRUrl: "",
      // 保存登录二维码
      loginQRC: "",
      // 轮询定时器
      qrTimer: null,
      // 控制二维码刷新按钮
      isEwm: false,
      // 保存登录状态码
      loginCode: "",
    };
  },
  computed: {},
  methods: {
    // 打开登录框
    openLogin() {
      this.loginVisible = true;
      this.loginMain = 1;
      // 如何key的值为空就重新获取一下
      this.loginQRKey ? this.loginQRCode() : this.getQRKey();
    },
    // 二维码key生成
    // 打开的时候调用loginQRCode
    // 获取密钥
    async getQRKey() {
      this.isEwm = false;
      const result = await this.$API.user.reqQRKey();
      if (result.code == 200) {
        this.loginQRKey = result.data.unikey;
        this.getQRUrl();
        this.loginQRChek();
      }
    },
    // 根据二维码key生成url信息
    async getQRUrl() {
      const urlmsg = await this.$API.user.reqQRUrl(this.loginQRKey);
      if (urlmsg.code == 200) {
        this.loginQRUrl = urlmsg.data.qrurl;
        this.loginQRCode();
      }
    },
    // 根据服务器传递的信息生成二维码
    async loginQRCode(qrurl) {
      // 生成一个二维码
      let url = await QRCode.toDataURL(this.loginQRUrl);
      this.loginQRC = url;
    },
    // 轮询二维码是否已过期||扫码状态
    loginQRChek() {
      this.qrTimer = setInterval(async () => {
        if (this.loginCode == 803) {
          this.qrTimerClearTimer();
          this.$message.success("登录成功");
          this.loginVisible = false;
          // this.loginClose()

          return false;
        }
        if (this.loginCode == 800) {
          console.log(this.qrTimerClearTimer());
          this.qrTimerClearTimer();
          //  二维码过期重新生成
          this.isEwm = true;
          return false;
        }
        if (this.loginMain == 1) {
          const result = await this.$API.user.reqQRCheck(this.loginQRKey);
          this.loginCode = result.code;
          console.log(result);
        } else {
          this.qrTimerClearTimer();
        }
      }, 1000);
    },
    // 选择其他登录模式
    otherModes() {
      this.loginMain = 2;
    },
    // 发送验证码
    sendAuth() {
      this.$refs.form.validateField("phone", async (errorMessage) => {
        if (errorMessage == "") {
          const result = await this.$API.user.reqSendAuth({
            phone: this.form.phone,
            ctcode: 86,
          });
          if (result.code == 200) {
            this.$message.success("验证码已发送");
            this.getAuthBtnTimer();
          } else {
            this.$message.error(result.message);
            this.getAuthBtnTimer();
          }
        }
        return;
      });
    },
    // 登录
    login() {
      this.authCodeResult = true;
      const { form } = this;
      let data = form;
      // 没有密码执行验证码登录
      let sendData = {};
      sendData.phone = data.phone
      if (this.loginAuthInput == 1) {
        delete sendData.password
        sendData.captcha = data.captcha
      }else if(this.loginAuthInput == 2){
        delete sendData.captcha
        // md5加密
        sendData.md5_password =md5(data.password)
      }
      this.$refs.form.validate((valid) => {
        // 手机号码校验通过
        if (valid) {
          //开始登录校验
          this.loginAuth(sendData).then((resolve) => {
            console.log(resolve)
            if (resolve) {
              this.$message.success("登录成功");
              this.loginVisible = false;
            }
          });
        }
      });
    },
    // 路由跳转初始化
    _initRoute() {
      this.loginMain = 0;
      this.form = {};
      this.disabledAuthBtnClearTimer();
      this.disabledAuthBtnClearTime();
      this.qrTimerClearTimer();
    },
    // 关闭登录框前的回调
    loginClose(done) {
      this._initRoute();
      done();
    },
    // 清除定时器
    disabledAuthBtnClearTimer() {
      this.timer = 60;
      clearInterval(this.disabledAuthBtnTimer);
      this.disabledAuthBtnTimer = null;
    },
    disabledAuthBtnClearTime() {
      clearTimeout(this.disabledAuthBtnTime);
      this.disabledAuthBtnTime = null;
    },
    qrTimerClearTimer() {
      clearInterval(this.qrTimer);
      this.qrTimer = null;
    },
    // 登录校验（手机号是必须的，验证码or密码）
    async loginAuth(data) {
      try {
       await this.$store.dispatch("getUserInfo", data);
       return true
      } catch {
        this.authCodeResult = false;
        this.authCaptchaError = "验证码错误";
        this.$refs.form.validateField("captcha");
        return false;
      }
    },
    // 判断手机号码是否注册
    async isPhone() {
      const result = await this.$API.user.reqIsPhone(this.phone);
      this.isUserPhone = result.exist;
    },
    // 获取验证码按钮定时器方法
    getAuthBtnTimer() {
      // 发送成功后禁用按钮并倒计时
      this.disabledAuth = false;
      this.setAuthBtnName = this.timer + "S";
      this.disabledAuthBtnTimer = window.setInterval(() => {
        console.log("aaa");
        this.timer -= 1;
        this.setAuthBtnName = this.timer + "S";
        if (this.timer < 1) {
          this.disabledAuthBtnTimer();
          this.setAuthBtnName = "重新发送";
        }
      }, 1000);
      this.disabledAuthBtnTime = setTimeout(() => {
        this.disabledAuthBtnTime();
        clearTimeout(this.disabledAuthBtnTime);
      }, this.timer * 1000);
    },
    // 控制短信登录和密码登录输入框显示隐藏
    showLoginAuthInput() {
      this.$refs.form.clearValidate();
      if (this.loginAuthInput == 1) {
        this.loginAuthInput = 2;
      } else {
        this.loginAuthInput = 1;
      }
    },
  },
  mounted() {
    this.$bus.$on("openLogin", () => {
      this.openLogin();
    });
  },
  beforeDestroy() {
    this.$bus.$off("openLogin");
  },

  watch: {
    loginMain() {
      if (this.loginMain == 1) {
        this.loginQRChek();
      }
      if (this.loginMain == 2) {
        this.disabledAuthBtnClearTimer();
        this.disabledAuthBtnClearTime();
      }
    },
    // 当路由发生变化清除定时器
    $route: {
      deep: true,
      handler() {
        this._initRoute();
      },
    },
  },
};
</script>

<style lang="less" scoped>
// 扫码登录
.login-smdialog {
  .login-box {
    display: flex;
    align-items: center;
    justify-content: center;
    img.login-guide {
      width: 125px;
      height: 220px;
      margin: 0 10px;
    }
    .login-scancode {
      margin: 0 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      h3 {
        font-weight: 400;
        color: #3d3d3d;
        margin-top: -10px;
      }
      img.ewm {
        width: 120px;
        margin-top: 15px;
        height: 120px;
      }
      span {
        margin-top: 10px;
        .wyyapp {
          color: #2373c2;
          cursor: pointer;
        }
      }
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .ewm-box {
    position: relative;
    .refresh-ewm {
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 120px;
        z-index: -1;
        height: 120px;
        background: #fcfcfc;
        opacity: 0.9;
        transform: translate(-27%, -50%);
      }
    }
  }
}
// 其他登录模式
.login-otherLogin {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login-otherLogin-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 250px;
    border-right: 1px dotted #ccc;
    padding-right: 10px;
    img {
      width: 224px;
      height: 120px;
    }
    button {
      display: block;
      width: 100%;
      margin: 8px 0;
    }
    .clause {
      position: relative;
      top: 20px;
      left: -20px;
      font-size: 12px;
      a {
        color: #63b0ff;
      }
    }
  }
  .login-otherLogin-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    a {
      display: flex;
      align-items: center;
      margin: 5px 0;
      i {
        margin-right: 10px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .login-rbewm {
    position: absolute;
    width: 52px;
    height: 52px;
    right: 0;
    bottom: 0;
  }
}
// 手机号登录
.login-phonelogin {
  padding: 30px 120px;
  .logininput {
    display: flex;
    .tag-btn {
      margin-left: 10px;
      margin-top: 4px;
      cursor: pointer;
      padding: 0;
      font-size: 12px;
      min-width: 70px;
      max-height: 32px;
    }
  }
}
// 短信登录、密码登录、自动登录
// 登录界面底部
.loginInputOrAuto,
.loginfootre {
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="less" scoped>
/deep/.el-dialog {
  min-width: 550px;
}
/deep/.el-form-item {
  margin-bottom: 17px;
}
</style>