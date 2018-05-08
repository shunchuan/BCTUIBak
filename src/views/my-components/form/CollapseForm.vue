<template>
  <div>
        <div class="main" @click="cli">
            <Icon type="arrow-right-b"  v-if="!IsShow"></Icon>
            <Icon type="arrow-down-b"  v-if="IsShow"></Icon>
            <span>这里是标题</span>
        </div>
        <div v-show="IsShow" style="margin-top:10px;">
            <slot></slot>
        </div>
  </div>
</template>
<script>
export default {
  props: ["propsIsShow"],
  name: "collapseForm",
  components: {},
  data() {
    console.log("data");
    return {
      IsShow: false
    };
  },
  computed: {},
  created() {
    // console.log("created");
    // console.log(this.IsShow == undefined);
    // if (this.IsShow == undefined) {
    //   this.IsShow = true;
    // }
    // console.log(this.IsShow);
  },
  mounted() {
    console.log("mounted");
    console.log(this.propsIsShow == undefined);
    if (this.propsIsShow == undefined) {
      this.IsShow = true;
    } else {
      this.IsShow = this.propsIsShow;
    }
    console.log(this.IsShow);
  },
  methods: {
    cli() {
      this.IsShow = !this.IsShow;
    }
  }
};
</script>
<style scoped>
.main {
  background-color: #f7f7f7;
  border-radius: 3px;
  height: 34px;
  line-height: 34px;
  padding-left: 5px;
  color: #666;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #e9eaec;
}
.main span {
  padding-left: 5px;
}
</style>
