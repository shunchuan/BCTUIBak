<template>
    <div style="border-top:1px solid #dddee1; margin-top:5px">
        <!-- <Collapse>
            <Panel>
                {{title}}
                <div slot="content"> -->
                        <Table 
                        stripe
                        :columns="columns" 
                        :data="dtdata"
                        size="small" 
                        :height="400"
                        ref="ref">
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
                <!-- </div>
            </Panel>
        </Collapse>  -->
    </div>  
</template>
<script scoped>
export default {
  props: [
    "propsTitle",
    "datatable",
    "columns",
    "tableid",
    "propsPageSizeOpts",
    "searchArgumentObjs"
  ],
  data() {
    return {
      current: 1,
      pagesize: 10,
      initPageSizeOpts: [1, 2, 5, 10, 20, 30, 40],
      dataCopy: [],
      height:400
    };
  },
  created() {
    this.dataCopy = this.datatable;
    this.height= window.innerHeight-64-48-42-5-32;
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
    }
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
    }
  }
};
</script>
<style scoped>
.ivu-collapse-content {
  padding:0;
}
.ivu-collapse-content>.ivu-collapse-content-box {
    padding-top: 16px;
    padding-bottom: 16px;
}

.ivu-collapse{
  padding-top: 1px solid #dddee1;
}

</style>
