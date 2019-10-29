<template>
  <div id="home">
    <mu-container class="con">
      <mu-card class="card img-card">
        <div class="img-container">
          <div :class="style(item)" v-for="item in items" :key="item.id">
            <img class="u-img" :src="item.src?item.src:'upload.png'" />
            <input
              type="file"
              @change="e=>change(item, e)"
              class="img-input"
              accept="image/jpg, image/jpeg, image/png, image/PNG"
            />
          </div>
        </div>
      </mu-card>
      <mu-card class="card">
        <mu-card-title title="规则" sub-title="Rule"></mu-card-title>
      </mu-card>
    </mu-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Clipboard from 'clipboard';
import uploadp from '../../public/upload.png';

@Component
export default class Final extends Vue {
  openDialog = false;

  items = [
    {
      id: 0,
      src: '',
    },
    {
      id: 1,
      src: '',
    },
    {
      id: 2,
      src: '',
    },
    {
      id: 3,
      src: '',
    },
    {
      id: 4,
      src: '',
    },
    {
      id: 5,
      src: '',
    },
  ];

  style(item: { id: number; src: string }) {
    const t = this;
    return `img-div ${item.src ? '' : `border border-${item.id}`}`;
  }

  change(item: { id: number; src: string }, e: Event) {
    const fr = new FileReader();
    fr.readAsDataURL(((e.target as HTMLInputElement).files as FileList)[0]);
    fr.onload = (ev) => {
      // eslint-disable-next-line no-param-reassign
      item.src = fr.result as string;
    };
    const t = this;
    console.log(item, e);
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
.img-card {
  width: 360px;
  height: 240px;
  padding: 3px;
}
.img-container {
  display: grid;
  grid-template-columns: repeat(3, 118px);
  grid-template-rows: repeat(2, 118px);
  grid-row-gap: 0;
  grid-column-gap: 0;
}

.border-0 {
  border-style: dashed;
}

.border-1 {
  border-style: dashed dashed dashed none;
}

.border-2 {
  border-style: dashed dashed dashed none;
}

.border-3 {
  border-style: none dashed dashed dashed;
}

.border-4 {
  border-style: none dashed dashed none;
}

.border-5 {
  border-style: none dashed dashed none;
}

.border {
  border-width: 3px;
  border-color: black;
}
.u-img {
  width: 100%;
  height: 100%;
  z-index: -1;
}
.img-input {
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  transform: translateY(-100%);
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
