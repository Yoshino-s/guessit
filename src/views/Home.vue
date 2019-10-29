<template>
  <div id="home">
    <mu-container class="con">
      <mu-card class="card">
        <mu-form ref="form" :model="form" class="m-form">
          <input id="hiddenText" type="text" style="display:none" />
          <mu-form-item label="Number" prop="num" :help-text="`输入一个${constant.length}位数字`">
            <mu-text-field v-model="form.num" prop="num" @keyup.enter="submit"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" full-width @click="submit" class="but">提交</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-card>
      <mu-card class="card">
        <mu-card-title title="规则" sub-title="Rule"></mu-card-title>
        <mu-card-text>
          <div class="rule">
            <p>密码是一个<span class="red">没有重复数字</span>的{{constant.length}}位数。
            （例如{{sample}})
            </p>
            <p>
              你可以开始猜。每猜一个数字，程序就要根据这个数字给出几A几B。</p>
            <p>
              其中A前面的数字表示
              <span class="red">位置正确</span>
              的数的个数，而B前的数字表示
              <span class="red">数字正确而位置不对</span>
              的数的个数。
            </p>
          </div>
          <p>
            例如数字为： 0123
          </p><p>
            如果你猜： <i>0972</i>；
            <br/>
            1A1B， 0位置正确，2位置不正确数字正确
          </p><p>
            如果你猜： <i>0320</i>；
            <br/>
            2A1B， 0,2位置正确，3位置不正确数字正确
            <br/>
          </p><p>
            注意，此处第一个0位置正确了，第四位上的0就没有匹配项了，所以不算是B。
          </p>
          <p class="red">
            PS.无重复数字。
            <br />
            PPS.尝试次数超过{{constant.maxTry}}次会重置密码。。。。。
          </p>
        </mu-card-text>
      </mu-card>
    </mu-container>
    <mu-snackbar :color="color" :open.sync="open" position="top">
      <mu-icon left :value="icon"></mu-icon>
      {{message}}
    </mu-snackbar>
    <mu-dialog title="Congratulation!" width="360" :open.sync="openDialog">
      <p class="green">{{message}}</p>
      <mu-button
        slot="actions"
        flat
        color="primary"
        @click="copy"
        data-clipboard-action="copy"
        :data-clipboard-text="constant.code()"
        id="copy"
      >Copy</mu-button>
    </mu-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Clipboard from 'clipboard';
import { guess, reset } from '../guess';
import constant from '../constant';

@Component
export default class Home extends Vue {
  form = {
    num: '',
  };

  open = false;

  openDialog = false;

  color = 'error';

  icon = 'warning';

  message = '';

  constant = constant;

  sample = reset();

  submit() {
    const [r, i, strange] = guess(this.form.num);
    this.message = i;
    if (strange === 'niconiconi') {
      this.form.num = i;
    } else if (r) {
      this.openDialog = true;
    } else {
      this.color = 'error';
      this.icon = 'warning';
      this.open = true;
      setTimeout(() => {
        this.open = false;
      }, 3000);
    }
  }

  copy() {
    const cp = new Clipboard('#copy');
    cp.on('success', () => {
      this.openDialog = false;
    });
    cp.on('error', (e) => {
      this.message = `${e}`;
      this.openDialog = false;
    });
  }
}
</script>
<style lang="less" scoped>
.con {
  margin-bottom: 30px;
  margin-top: 30px;
}
.card {
  margin: 0 auto;
  margin-top: 15px;
  max-width: 360px;
  width: 100%;
  padding: 20px;
  padding-bottom: 5px;
}
.but {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
}
.green {
  color: #00ad00;
}
.red {
  color: #ef0000;
}
.rule {
  text-indent: 2em;
}
</style>
