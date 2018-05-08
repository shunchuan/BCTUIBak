
<style lang="less">
@import "./enterprise.less";
</style>
<template>
<div>
<!-- 左侧容器 -->
<div class="leftpanel">
          <Tree :data="datatree" :render="renderContent" @on-toggle-expand="handelToggle"  @on-select-change="handelSelect" ></Tree>              

</div>
<div class="rightpanel">
     <my-button-group 
                      :size="size"
                      @on-select="btnSelection">
                    </my-button-group> 
                    <colloapse-table 
                        :propsTitle='title' 
                        :datatable='datatable'
                        :propsColumns='columns8'
                        :propsPageSizeOpts='pagesizeopts'
                        :searchArgumentObjs='value1' 
                        :selection='tableSelection'
                        @on-table-row-dblclick="btnTableRowDblClick"
                    >
                    </colloapse-table>
</div>
</div>
</template>
<script>
import NavBar from "../main-components/NavBar.vue";
import ColloapseTable from "../main-components/table/CollapseTable";
import MyButtonGroup from "../my-components/my-button-group/MyButtonGroup";
import Layer from "../my-components/layer/Layer";
import api from "../../libs/axios/api";
export default {
  components: {
    NavBar,
    ColloapseTable,
    MyButtonGroup,
    Layer
  },
  data() {
    return {
      tableSelection: true,
      layerShow: false,
      size: "default",
      value1: "",
      value2: "",
      value3: "",
      current: 10,
      pagesize: 5,
      pagesizeopts: [10,30,50],
      datatree: [
      ],
      columns8: [
        {
          title: "名称",
          key: "name",
          width: 100,
          sortable: true
        },
        {
          title: "大小",
          key: "size",
          width: 150,
          sortable: true,
            filters: [
            {
              label: "大于4000",
              value: 1
            },
            {
              label: "小于4000",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.show > 4000;
            } else if (value === 2) {
              return row.show < 4000;
            }
          }
        },
        {
          title: "创建人",
          key: "create",
          width: 150,
          sortable: true
        },
        {
          title: "修改人",
          key: "modify",
          width: 150,
          sortable: true
        },
        {
          title: "修改时间",
          key: "modiefydata",
          width: 150,
          sortable: true
        },
        {
          title: "版本",
          key: "version",
          width: 150,
          sortable: true
        }
        
      ],
      buttonProps: {
        type: "primary",
        size: "small"
      },
      datatable: [
        {
          name: "Name1",
          size: 0,
          create: 7302,
          weak: 5627,
          signin: 1563,
          click: 4254,
          active: 1438,
          day7: 274,
          day30: 285,
        },
        {
          name: "Name2",
          fav: 0,
          show: 4720,
          weak: 4086,
          signin: 3792,
          click: 8690,
          active: 8470,
          day7: 8172,
          day30: 5197,
        },
        {
          name: "Name3",
          fav: 0,
          show: 7181,
          weak: 8007,
          signin: 8477,
          click: 1879,
          active: 16,
          day7: 2249,
          day30: 3450,
        },
        {
          name: "Name4",
          fav: 0,
          show: 9911,
          weak: 8976,
          signin: 8807,
          click: 8050,
          active: 7668,
          day7: 1547,
          day30: 2357,
        },
        {
          name: "Name5",
          fav: 0,
          show: 934,
          weak: 1394,
          signin: 6463,
          click: 5278,
          active: 9256,
          day7: 209,
          day30: 3563,
        },
        {
          name: "Name6",
          fav: 0,
          show: 6856,
          weak: 1608,
          signin: 457,
          click: 4949,
          active: 2909,
          day7: 4525,
          day30: 6171,
        },
        {
          name: "Name7",
          fav: 0,
          show: 5107,
          weak: 6407,
          signin: 4166,
          click: 7970,
          active: 1002,
          day7: 8701,
          day30: 9040,
        },
        {
          name: "Name8",
          fav: 0,
          show: 862,
          weak: 6520,
          signin: 6696,
          click: 3209,
          active: 6801,
          day7: 6364,
          day30: 6850,
        },
        {
          name: "Name9",
          fav: 0,
          show: 567,
          weak: 5859,
          signin: 128,
          click: 6593,
          active: 1971,
          day7: 7596,
          day30: 3546,
        },
        {
          name: "Name10",
          fav: 0,
          show: 3651,
          weak: 1819,
          signin: 4595,
          click: 7499,
          active: 7405,
          day7: 8710,
          day30: 5518,
        }
      ],
      dataCopy: []
    };
  },
  created() {
    this.getTreeData();
    this.dataCopy = this.datatable;
  },
  computed: {
    total() {
      return this.dataCopy.length;
    },
    dtdata() {
      return this.mockTableData();
    },
    title() {
      return (
        this.value1 + this.value2 + this.value3 ||
        "这里时标题这里时标题这里时标题"
      );
    }
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h(
            "router-link",
            {
              props: {
                to: data.title
              },
              style: {
                color: "#495060"
              }
            },
            [
              h("span", [
                h("Icon", {
                  props: {
                    type: "ios-folder-outline"
                  },
                  style: {
                    marginRight: "8px"
                  }
                }),
                h("span", data.title)
              ]),
              h("span", {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              })
            ]
          )
        ]
      );
    },
    async getTreeData() {
      let url = "../src/libs/json/treedata.json";
      let res = await api.getTreeDataApi(url);
      console.log(res); // 成功回调
      this.datatree =  res.data        
    },
    handelSelect(obj) {
      debugger;
    },
    handelToggle(obj) {},
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
    btnQuery() {},
    btnSelection() {
      debugger;
      this.tableSelection = !this.tableSelection;
    },
    btnTableRowDblClick(props) {
      this.layerShow = true;
      console.log("this.layerShow :" + this.layerShow);
    },
    handelVisibleChanged(props) {
      debugger;
      if (this.layerShow != props.prop)
        // 必须加这一条的判断，否则会造成死循环
        this.layerShow = props.prop;
    }
  }
};
</script>
