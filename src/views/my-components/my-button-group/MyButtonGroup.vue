<template>
    <div>
        <div class="main">
            <Button :size="size" type="ghost" @click="handleShowChange" > 
                <Icon type="arrow-left-c"></Icon>
                返回
            </Button>
            <Button :size="size" type="ghost" @click="handleShowChange"> 
                <Icon type="search"></Icon>
                搜索
            </Button>
            <Button v-if="!size" :size="size" type="ghost" @click="handleShowChange"> 
                <Icon type="refresh"></Icon>
                刷新
            </Button>
            <Button v-if="!size" :size="size" type="ghost" @click="handleShowChange"> 
                <Icon type="archire"></Icon>
                下载
            </Button>
            <Button v-if="!size" :size="size" type="ghost" @click="handleShowChange"> 
                <Icon type="star"></Icon>
                收藏
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
        <div v-if="show">
            <Row class="row"  justify="center">
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
    </div>
</template>
<script>
export default {
  props: ["size"],
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      show: false
    };
  },
  methods: {
    handleSearch() {},
    handleShowChange() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.row {
  line-height: 40px;
  height: 40px;
  font-size: 10px;
}
.main {
  background-color: #f7f7f7;
  border-radius: 3px;
  height: 42px;
  line-height: 42px;
  padding-left: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
}

.txt-center {
  text-align: center;
}
</style>

