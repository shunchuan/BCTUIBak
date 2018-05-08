<template>
    <div>
        <div class="main">
            <Button :size="size"  type="ghost" @click="handleShowChange" > 
                <Icon type="arrow-left-c"></Icon>
                返回
            </Button>
            <Button :size="size"  type="ghost" @click="handleShowChange"> 
                <Icon type="search"></Icon>
                搜索
            </Button>
            <Button v-if="!vif" :size="size" type="ghost"   @click="handleShowChange"> 
                <Icon type="refresh"></Icon>
                刷新
            </Button>
            <Button v-if="!vif" :size="size" type="ghost"  @click="handleShowChange"> 
                <Icon type="archire"></Icon>
                查询
            </Button>
            <Button v-if="!vif" :size="size" type="ghost"  @click="handleSelection"> 
                <Icon type="star"></Icon>
                选择
            </Button>
            <Dropdown>
                <Button :size="size" type="ghost">
                    <Icon type="more"></Icon>
                    更多
                </Button>                            
                <DropdownMenu slot="list">
                    <DropdownItem>其他</DropdownItem>
                    <DropdownItem>其他</DropdownItem>
                    <DropdownItem disabled>其他</DropdownItem>
                    <DropdownItem>其他</DropdownItem>
                    <DropdownItem divided>其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <Row class="row" v-if="show"  justify="center">
            <Col span="6" class="txt-center">
                Name:
                <Input size='small' v-model="value1" clearable placeholder="please enter Name" style="width:60%"></Input>
            </Col>
            <Col span="6" class="txt-center">
                Show:
                <Input size='small' v-model="value2" clearable placeholder="please enter Show" style="width:60%"></Input>
            </Col>
            <Col span="6" class="txt-center">
                Weak:
                <Input size='small' v-model="value3" clearable placeholder="please enter Weak" style="width:60%"></Input>
            </Col>
            <Col span="6" class="txt-center">                            
                <Button size='small' type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  props: ["size", "vif"],
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      show: false
    };
  },
  //组件更新后
  updated: function() {
    // debugger;
    let rowHeight = 0;
    if (this.show) {
      let row = document.getElementsByClassName("row");
      if (row.length) {
        rowHeight = row[0].offsetHeight;
      }
    }
    this.$store.commit("setButtonGroupRowHeight", rowHeight);
  },
  methods: {
    handleSearch() {},
    handleShowChange() {
      this.show = !this.show;
    },
    handleSelection() {
      this.$emit("on-select");
    },
    info(nodesc) {
      this.$Notice.info({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      });
    },
    success(nodesc) {
      this.$Notice.success({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      });
    },
    warning(nodesc) {
      this.$Notice.warning({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      });
    },
    error(nodesc) {
      this.$Notice.error({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      });
    }
  }
};
</script>

<style scoped>
.row {
  /* line-height: 40px;
  height: 40px; */
  font-size: 10px;
  padding: 5px 0;
}
.main {
  /* background-color: #f7f7f7; */
  border-radius: 3px;
  height: 39px;
  line-height: 36px;
  padding-left: 5px;
  /* color: #666; */
  cursor: pointer;
  position: relative;
}

.txt-center {
  text-align: center;
}
</style>

