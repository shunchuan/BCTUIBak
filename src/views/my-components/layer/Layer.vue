<template>
  <Modal
        :value="layerShow"       
        :mask-closable='false'
        title="这里是标题"
        :styles="{top:'20px',height:'600px'}"
        @on-visible-change="visibleChanged">
        <nav-bar>
            <default-form1>
            </default-form1>  
        </nav-bar>
        <div slot="footer" >
                <div v-if="footerShow">                    
                    <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large">
                        <span>取消</span>
                    </button> 
                    <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large">
                        <span>确定</span>
                    </button>
                </div>
            </div>
    </Modal>
</template>
<script>
import NavBar from "../../main-components/NavBar";
import DefaultForm1 from "../form/DefaultForm1";
export default {
  props: {
    propsLayerShow: {
      // 必须提供字段
      //   required: true
    },
    footerShow: {
      default: false // 页脚是否显示
    }
  },
  components: {
    NavBar,
    DefaultForm1
  },
  data() {
    return {};
  },
  computed: {
    layerShow() {
      return this.propsLayerShow;
    }
  },
  mounted() {
    // this.layerShow = this.propsLayerShow;
  },
  methods: {
    visibleChanged(prop) {
      this.$emit("on-visible-Changed", { prop: prop });
    }
  }
};
</script>

<style scoped>

</style>

