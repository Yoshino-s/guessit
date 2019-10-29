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
          <p>
            通常由两个人玩，一方出数字，一方猜。
            出数字的人要想好一个没有重复数字的{{constant.length}}个数，不能让猜的人知道。
            猜的人就可以开始猜。每猜一个数字，出数者就要根据这个数字给出几A几B，
            其中A前面的数字表示位置正确的数的个数，
            而B前的数字表示数字正确而位置不对的数的个数。
          </p>
          <p>
            除了上面的规则外，如果有出现重复的数字，则重复的数字每个也只能算一次，
            且以最优的结果为准。例如，如正确答案为5543，猜的人猜5255，
            则在这里不能认为猜测的第一个5对正确答案第二个，
            根据最优结果为准的原理和每个数字只能有一次的规则，两个比较后应该为1A1B，
            第一个5位子正确，记为1A；猜测数字中的第三个5或第四个5和答案的第二个5匹配，
            只能记为1B。当然，如果有猜5267中的第一个5不能与答案中的第二个5匹配，
            因此只能记作1A0B。
          </p>
          <p>From 百度百科</p>
          <p style="color: red;">
            PS.此处有重复。
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
        :data-clipboard-text="constant.code"
        id="copy"
      >Copy</mu-button>
    </mu-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Clipboard from 'clipboard';
import guess from '../guess';
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
</style>
