<template>
    <div>
                        <Table 
                        stripe
                        :columns="columns" 
                        :data="dtdata"
                        size="small" 
                        :height="height"
                        
                        ref="ref"
                        @on-row-dblclick="btnRowDblClick">
                    </Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page 
                            show-sizer 
                            show-elevator
                            :total="total" 
                            :page-size-opts="pagesizeopts" 
                            :page-size="pagesize" 
                            :current="current" 
                            @on-change="changePage"
                            @on-page-size-change="changePageSize"></Page>
                        </div>
                    </div>    
    </div>  
</template>
<script scoped>
import { buttonGroupRowHeight } from "../../../store/modules/app";
export default {
  props: [
    "propsTitle", //table 标题
    "datatable", //table数据
    "propsColumns", //table表头数据
    "tableid", //table控件ID
    "propsPageSizeOpts", //分页大小数据
    "searchArgumentObjs", //搜索查询的数据
    "selection"
  ],
  data() {
    return {
      current: 1,
      pagesize: 10,
      initPageSizeOpts: [ 10,30, 50],
      dataCopy: [],
      // columns: [],
      screenHeight: 0
      // height: 400
    };
  },
  actions: {
    buttonGroupRowHeight
  },
  created() {
    this.dataCopy = this.datatable;
    this.screenHeight = window.innerHeight;
    // this.height =
    //   window.innerHeight - 64 - 48 - 42 - 5 - 32 - 25 - 18 - this.rowHeight;
  },
  computed: {
    ref() {
      return this.tableid || "table1";
    },
    dtdata() {
      return this.mockTableData();
    },
    total() {
      return this.dataCopy.length;
    },
    title() {
      return this.propsTitle || "&nbsp;这里时标题这里时标题这里时标题";
    },
    pagesizeopts() {
      return this.propsPageSizeOpts || this.initPageSizeOpts;
    },
    height() {
      this.rowHeight = this.$store.state.app.buttonGroupRowHeight;
      return (
        this.screenHeight - 64 - 48 - 42 - 5 - 32 - 25 - 18 - this.rowHeight
      );
    },
    columns() {
      let initColumns = this.propsColumns.slice(0);
      if (this.selection) {
        let selectionCol = {
          type: "selection",
          width: 60,
          align: "center"
        };
        initColumns.unshift(selectionCol);
      }
      return initColumns;
    }
    // ,
    // rowHeight(){
    //   return this.$store.state.app.buttonGroupRowHeight;
    // }
  },
  beforUpdated() {},
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };
    // this.columns = this.propsColumns;
    // if (this.selection) {
    //   let selectionCol = {
    //     type: "selection",
    //     width: 60,
    //     align: "center"
    //   };
    //   this.columns.unshift(selectionCol);
    // }
  },
  methods: {
    mockTableData() {
      let data = [];
      let startCurrent = (this.current - 1) * this.pagesize;
      let endCurrent = this.current * this.pagesize;
      for (let i = startCurrent; i < endCurrent; i++) {
        if (this.dataCopy[i]) data.push(this.dataCopy[i]);
        else break;
      }
      return data;
    },
    changePageSize(size) {
      this.current = 1;
      this.pagesize = size;
    },
    changePage(current) {
      this.current = current;
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      //data 会重新请求
      //   this.data = this.mockTableData();
    },
    handleSearch() {
      this.current = 1;
      let searchList = [];
      if (this.value1) {
        searchList.push({ name: this.value1 });
      }
      if (this.value2) {
        searchList.push({ show: this.value2 });
      }
      if (this.value3) {
        searchList.push({ weak: this.value3 });
      }
      if (searchList && searchList.length) {
        this.dataCopy = this.search(this.datatable, searchList);
        // this.dataCopy = this.search(this.datatable, { name: this.value1 });
      } else {
        this.dataCopy = this.datatable;
      }
    },
    search(data, argumentObj) {
      let res = data;
      let dataClone = data;
      argumentObj.forEach(function(obj) {
        for (let argu in obj) {
          if (obj[argu]) {
            res = dataClone.filter(d => {
              //notice 注意大小写和数据转换为字符串查找
              return d[argu].toString().indexOf(obj[argu].toString()) > -1;
            });
            dataClone = res;
          }
        }
      });

      //   for (let argu in argumentObj) {
      //     if (argumentObj[argu].length > 0) {
      //       res = dataClone.filter(d => {
      //         return d[argu].indexOf(argumentObj[argu]) > -1;
      //       });
      //       dataClone = res;
      //     }
      //   }
      return res;
    },
    btnRowDblClick(index) {
      index = (this.current - 1) * this.pagesize + index;
      this.$emit("on-table-row-dblclick", { index: this.index });
    }
  },
  watch: {
    screenHeight(val) {
      if (!this.timer) {
        this.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          console.log(that.screenHeight);
          // that.init()
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>
<style scoped>
.ivu-collapse-content {
  padding: 0;
}
.ivu-collapse-content > .ivu-collapse-content-box {
  padding-top: 16px;
  padding-bottom: 16px;
}

.ivu-collapse {
  padding-top: 1px solid #dddee1;
}
</style>
