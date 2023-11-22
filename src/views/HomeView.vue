
<template>
  <div class="home">
    <!--2、为echarts准备一个具备大小、宽高的dom1-->
            
            <div id="main" style="width:100%;height:400px;">
            </div>
            <br>
            <div id="collect" style="width:100%;height:400px;">
            </div>
            <br>
            <el-button v-if="showBtn" type="primary" @click="open">查看sellNum</el-button>
              <div id="stock" style="width:100%;height:400px;visibility: hidden;"></div>
              <br>
              <div id="baozang" style="width:100%;height:400px;visibility: hidden;"></div>
              <br>
              <div id="Lastest" style="width:100%;height:400px;visibility: hidden;"></div>
              <div id="gap" style="width:100%;height:400px;visibility: hidden;"></div>
            
            
  </div>
  <!--2、为echarts准备一个具备大小、宽高的dom-->
</template>

<script>
//1、导入echarts
import * as echarts from 'echarts'
import _ from 'lodash'
export default {
    data(){
        return {
          mima:'sxh0112',
          showBtn:true,
            // sxhFanNum:sxhFanNum
            time:[],
            zzxfanNum:[],
            zzxfanNum1:[],
            zzyfanNum:[],
            zzyfanNum1:[],
            zjfanNum:[],
            zjfanNum1:[],
            zhfanNum:[],
            zhfanNum1:[],
            sxhfanNum:[],
            sxhfanNum1:[],
            zjhfanNum:[],
            zjhfanNum1:[],


            timeCollect:[],
            zzxcollectNum:[],
            zzxcollectNum1:[],
            zzycollectNum:[],
            zzycollectNum1:[],
            zjcollectNum:[],
            zjcollectNum1:[],
            zhcollectNum:[],
            zhcollectNum1:[],
            sxhcollectNum:[],
            sxhcollectNum1:[],
            zjhcollectNum:[],
            zjhcollectNum1:[],

            timeStock:[],
            zzxstockNum:[],
            zzxstockNum1:[],
            zzystockNum:[],
            zzystockNum1:[],
            zjstockNum:[],
            zjstockNum1:[],
            zhstockNum:[],
            zhstockNum1:[],
            sxhstockNum:[],
            sxhstockNum1:[],
            zjhstockNum:[],
            zjhstockNum1:[],

             //baozang
             timeBaozang:[],
            zzxbaozangNum:[],
            zzxbaozangNum1:[],
            zzybaozangNum:[],
            zzybaozangNum1:[],
            zjbaozangNum:[],
            zjbaozangNum1:[],
            zhbaozangNum:[],
            zhbaozangNum1:[],
            sxhbaozangNum:[],
            sxhbaozangNum1:[],
            zjhbaozangNum:[],
            zjhbaozangNum1:[],
        }
    },
    created(){
      this.getData()
      this.getDataCollet()
      this.getDataStock()
      this.getDataBaozang()
    },
    //此时页面上的dom已被渲染完成，可以初始化图表
    async mounted(){
      this.getChart()
      this.getChartCollect()
      this.getChartStock()
      this.getChartBaozang()
      this.getLastestDate()
      this.getGapDate()
    },
    methods:{
      open() {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value==this.mima){
            document.getElementById('stock').style.visibility = "visible"
            document.getElementById('baozang').style.visibility="visible"
            document.getElementById('Lastest').style.visibility="visible"
            document.getElementById('gap').style.visibility="visible"
            this.showBtn=false
          }else{
            this.$message({
            type: 'error',
            message: '密码错误'
          }); 
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      getData(){
        let xhr = new XMLHttpRequest()
        let okStatus = document.location.protocol === "file:" ? 0 : 200;
        let fileName=["zzxfanNum.json","zzyfanNum.json","zjfanNum.json","zhfanNum.json","sxhfanNum.json","zjhfanNum.json"]
        fileName.forEach(fileItem=>{
          xhr.open("GET", fileItem, false); // public文件夹下的绝对路径
          xhr.overrideMimeType("json/html;charset=utf-8")
          xhr.send(null)
          if(fileItem=='zzxfanNum.json')
            this.zzxfanNum=JSON.parse(xhr.responseText);
          if(fileItem=='zzyfanNum.json')
            this.zzyfanNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjfanNum.json')
            this.zjfanNum=JSON.parse(xhr.responseText);
          if(fileItem=='zhfanNum.json')
            this.zhfanNum=JSON.parse(xhr.responseText);
          if(fileItem=='sxhfanNum.json')
            this.sxhfanNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjhfanNum.json')
            this.zjhfanNum=JSON.parse(xhr.responseText);
        })
        this.zzxfanNum.forEach(item=>{
          this.time.push(item.time)
          this.zzxfanNum1.push(item.data)
        })
        this.zzyfanNum.forEach(item=>{
          this.zzyfanNum1.push(item.data)
        })
        this.zjfanNum.forEach(item=>{
          this.zjfanNum1.push(item.data)
        })
        this.zhfanNum.forEach(item=>{
          this.zhfanNum1.push(item.data)
        })
        this.sxhfanNum.forEach(item=>{
          this.sxhfanNum1.push(item.data)
        })
        this.zjhfanNum.forEach(item=>{
          this.zjhfanNum1.push(item.data)
        })
      },
      getChart(){
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: 'fanNum'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['zzx', 'zzy', 'zj', 'zh', 'sxh','zjh']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.time
          },
          yAxis: [{
            type: 'value',
            scale:true,
            axisLine: {show:true},
            axisTick: {show:true},
          }],
          series: [
            {
              name: 'zzx',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zzxfanNum1
            },
            {
              name: 'zzy',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zzyfanNum1
            },
            {
              name: 'zj',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zjfanNum1
            },
            {
              name: 'zh',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zhfanNum1
            },
            {
              name: 'sxh',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.sxhfanNum1
            }, {
              name: 'zjh',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zjhfanNum1
            }
          ]
        };

        option && myChart.setOption(option);
      },

      //获取收藏

      getDataCollet(){
        let xhr = new XMLHttpRequest()
        let okStatus = document.location.protocol === "file:" ? 0 : 200;
        let fileName=["zzxcollectNum.json","zzycollectNum.json","zjcollectNum.json","zhcollectNum.json","sxhcollectNum.json","zjhcollectNum.json"]
        fileName.forEach(fileItem=>{
          xhr.open("GET", fileItem, false); // public文件夹下的绝对路径
          xhr.overrideMimeType("json/html;charset=utf-8")
          xhr.send(null)
          if(fileItem=='zzxcollectNum.json')
            this.zzxcollectNum=JSON.parse(xhr.responseText);
          if(fileItem=='zzycollectNum.json')
            this.zzycollectNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjcollectNum.json')
            this.zjcollectNum=JSON.parse(xhr.responseText);
          if(fileItem=='zhcollectNum.json')
            this.zhcollectNum=JSON.parse(xhr.responseText);
          if(fileItem=='sxhcollectNum.json')
            this.sxhcollectNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjhcollectNum.json')
            this.zjhcollectNum=JSON.parse(xhr.responseText);
        })
        this.zzxcollectNum.forEach(item=>{
          this.timeCollect.push(item.time)
          this.zzxcollectNum1.push(item.collectNum)
        })
        this.zzycollectNum.forEach(item=>{
          this.zzycollectNum1.push(item.collectNum)
        })
        this.zjcollectNum.forEach(item=>{
          this.zjcollectNum1.push(item.collectNum)
        })
        this.zhcollectNum.forEach(item=>{
          this.zhcollectNum1.push(item.collectNum)
        })
        this.sxhcollectNum.forEach(item=>{
          this.sxhcollectNum1.push(item.collectNum)
        })
        this.zjhcollectNum.forEach(item=>{
          this.zjhcollectNum1.push(item.collectNum)
        })
      },
      getChartCollect(){
        var chartDom = document.getElementById('collect');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: 'collectNum'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['zzx', 'zzy', 'zj', 'zh', 'sxh','zjh']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.timeCollect
          },
          yAxis: [{
            type: 'value',
            scale:true,
            axisLine: {show:true},
            axisTick: {show:true},
          }],
          series: [
            {
              name: 'zzx',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zzxcollectNum1
            },
            {
              name: 'zzy',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zzycollectNum1
            },
            {
              name: 'zj',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zjcollectNum1
            },
            {
              name: 'zh',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zhcollectNum1
            },
            {
              name: 'sxh',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.sxhcollectNum1
            }, {
              name: 'zjh',
              type: 'line',
              itemStyle : { normal: {label : {show: true}}}, //重点
              data: this.zjhcollectNum1
            }
          ]
        };

        option && myChart.setOption(option);
      },
      //stock
      getDataStock(){
        let xhr = new XMLHttpRequest()
        let okStatus = document.location.protocol === "file:" ? 0 : 200;
        let fileName=["zzxstockNum.json","zzystockNum.json","zjstockNum.json","zhstockNum.json","sxhstockNum.json","zjhstockNum.json"]
        fileName.forEach(fileItem=>{
          xhr.open("GET", fileItem, false); // public文件夹下的绝对路径
          xhr.overrideMimeType("json/html;charset=utf-8")
          xhr.send(null)
          if(fileItem=='zzxstockNum.json')
            this.zzxstockNum=JSON.parse(xhr.responseText);
          if(fileItem=='zzystockNum.json')
            this.zzystockNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjstockNum.json')
            this.zjstockNum=JSON.parse(xhr.responseText);
          if(fileItem=='zhstockNum.json')
            this.zhstockNum=JSON.parse(xhr.responseText);
          if(fileItem=='sxhstockNum.json')
            this.sxhstockNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjhstockNum.json')
            this.zjhstockNum=JSON.parse(xhr.responseText);
        })
        this.zzxstockNum.forEach(item=>{
          this.timeStock.push(item.time)
          let sellNum=100000-item.data
          this.zzxstockNum1.push(sellNum)
        })
        this.zzystockNum.forEach(item=>{
          let sellNum=100000-item.data
          this.zzystockNum1.push(sellNum)
        })
        this.sxhstockNum.forEach(item=>{
          let sellNum=100000-item.data
          this.sxhstockNum1.push(sellNum)
        })
        this.zjhstockNum.forEach(item=>{
          let sellNum=100000-item.data
          this.zjhstockNum1.push(sellNum)
        })
        this.zjstockNum.forEach(item=>{
          let sellNum=100000-item.data
          this.zjstockNum1.push(sellNum)
        })
        this.zhstockNum.forEach(item=>{
          let sellNum=100000-item.data
          this.zhstockNum1.push(sellNum)
        })
        
        
      },
      getChartStock(){
        var chartDom = document.getElementById('stock');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: 'sellNum'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['zzx', 'zzy', 'zj', 'zh', 'sxh','zjh']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: this.timeStock
          }],
          yAxis: [{
            type: 'value',
            scale:true,
            axisLine: {show:true},
            axisTick: {show:true},
          }],
          series: [
            {
              name: 'zzx',
              type: 'line',
              data: this.zzxstockNum1
            },
            {
              name: 'zzy',
              type: 'line',
              data: this.zzystockNum1
            },
            {
              name: 'zj',
              type: 'line',
              data: this.zjstockNum1
            },
            {
              name: 'zh',
              type: 'line',
              data: this.zhstockNum1
            },
            {
              name: 'sxh',
              type: 'line',
              data: this.sxhstockNum1
            }, {
              name: 'zjh',
              type: 'line',
              data: this.zjhstockNum1
            }
          ]
        };

        option && myChart.setOption(option);
      },

      //baozang
      getDataBaozang(){
        let xhr = new XMLHttpRequest()
        let okStatus = document.location.protocol === "file:" ? 0 : 200;
        let fileName=["zzxbaozangNum.json","zzybaozangNum.json","zjbaozangNum.json","zhbaozangNum.json","sxhbaozangNum.json","zjhbaozangNum.json"]
        fileName.forEach(fileItem=>{
          xhr.open("GET", fileItem, false); // public文件夹下的绝对路径
          xhr.overrideMimeType("json/html;charset=utf-8")
          xhr.send(null)
          if(fileItem=='zzxbaozangNum.json')
            this.zzxbaozangNum=JSON.parse(xhr.responseText);
          if(fileItem=='zzybaozangNum.json')
            this.zzybaozangNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjbaozangNum.json')
            this.zjbaozangNum=JSON.parse(xhr.responseText);
          if(fileItem=='zhbaozangNum.json')
            this.zhbaozangNum=JSON.parse(xhr.responseText);
          if(fileItem=='sxhbaozangNum.json')
            this.sxhbaozangNum=JSON.parse(xhr.responseText);
          if(fileItem=='zjhbaozangNum.json')
            this.zjhbaozangNum=JSON.parse(xhr.responseText);
        })
        this.zzxbaozangNum.forEach(item=>{
          this.timeBaozang.push(item.time)
          let sellNum=1000000-item.data
          this.zzxbaozangNum1.push(sellNum)
        })
        this.zzybaozangNum.forEach(item=>{
          let sellNum=1000000-item.data
          this.zzybaozangNum1.push(sellNum)
        })
        this.sxhbaozangNum.forEach(item=>{
          let sellNum=1000000-item.data
          this.sxhbaozangNum1.push(sellNum)
        })
        this.zjhbaozangNum.forEach(item=>{
          let sellNum=1000000-item.data
          this.zjhbaozangNum1.push(sellNum)
        })
        this.zjbaozangNum.forEach(item=>{
          let sellNum=1000000-item.data
          this.zjbaozangNum1.push(sellNum)
        })
        this.zhbaozangNum.forEach(item=>{
          let sellNum=1000000-item.data
          this.zhbaozangNum1.push(sellNum)
        })  
      },
      getChartBaozang(){
        var chartDom1 = document.getElementById('baozang');
        var myChart1 = echarts.init(chartDom1);
        var option;

        option = {
          title: {
            text: 'sellNum_baozang'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['zzx', 'zzy', 'zj', 'zh', 'sxh','zjh']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.timeBaozang
          },
          yAxis: {
            type: 'value',
            scale:true
          },
          series: [
            {
              name: 'zzx',
              type: 'line',
              data: this.zzxbaozangNum1
            },
            {
              name: 'zzy',
              type: 'line',
              data: this.zzybaozangNum1
            },
            {
              name: 'zj',
              type: 'line',
              data: this.zjbaozangNum1
            },
            {
              name: 'zh',
              type: 'line',
              data: this.zhbaozangNum1
            },
            {
              name: 'sxh',
              type: 'line',
              data: this.sxhbaozangNum1
            }, {
              name: 'zjh',
              type: 'line',
              data: this.zjhbaozangNum1
            }
          ]
        };

        option && myChart1.setOption(option);
      },

      //获取最新数据
      getLastestDate(){
        var app = {};
        var chartDom = document.getElementById('Lastest');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
          title: {
            text: 'latestData'
          },
          legend: {},
          tooltip: {},
          dataset: {
            // dimensions: ['product', 'colletNum', 'fanNum', 'sellNum','sellNum_baozang'],
            source: [
              ['product', 'colletNum', 'fanNum', 'sellNum','sellNum_baozang'],
              [ 'zzx', this.zzxcollectNum1[this.zzxcollectNum1.length-1],this.zzxfanNum1[this.zzxfanNum1.length-1], this.zzxstockNum1[this.zzxstockNum1.length-1], this.zzxbaozangNum1[this.zzxbaozangNum1.length-1] ],
              [ 'zzy', this.zzycollectNum1[this.zzycollectNum1.length-1],this.zzyfanNum1[this.zzyfanNum1.length-1], this.zzystockNum1[this.zzystockNum1.length-1], this.zzybaozangNum1[this.zzybaozangNum1.length-1] ],
              [ 'zj', this.zjcollectNum1[this.zjcollectNum1.length-1], this.zjfanNum1[this.zjfanNum1.length-1], this.zjstockNum1[this.zjstockNum1.length-1], this.zjbaozangNum1[this.zjbaozangNum1.length-1] ],
              [ 'zh', this.zhcollectNum1[this.zhcollectNum1.length-1], this.zhfanNum1[this.zhfanNum1.length-1], this.zhstockNum1[this.zhstockNum1.length-1], this.zhbaozangNum1[this.zhbaozangNum1.length-1] ],
              [ 'sxh', this.sxhcollectNum1[this.sxhcollectNum1.length-1],this.sxhfanNum1[this.sxhfanNum1.length-1],  this.sxhstockNum1[this.sxhstockNum1.length-1], this.sxhbaozangNum1[this.sxhbaozangNum1.length-1] ],
              [ 'zjh', this.zjhcollectNum1[this.zjhcollectNum1.length-1], this.zjhfanNum1[this.zjhfanNum1.length-1], this.zjhstockNum1[this.zjhstockNum1.length-1], this.zjhbaozangNum1[this.zjhbaozangNum1.length-1] ],


              // { product: 'zzx', colletNum: this.zzxcollectNum1[this.zzxcollectNum1.length-1], fanNum: this.zzxfanNum1[this.zzxfanNum1.length-1], sellNum: this.zzxstockNum1[this.zzxstockNum1.length-1],sellNum_baozang: this.zzxbaozangNum1[this.zzxbaozangNum1.length-1] },
              // { product: 'zzy', colletNum: this.zzycollectNum1[this.zzycollectNum1.length-1], fanNum: this.zzyfanNum1[this.zzyfanNum1.length-1], sellNum: this.zzystockNum1[this.zzystockNum1.length-1],sellNum_baozang: this.zzybaozangNum1[this.zzybaozangNum1.length-1] },
              // { product: 'zj', colletNum: this.zjcollectNum1[this.zjcollectNum1.length-1], fanNum: this.zjfanNum1[this.zjfanNum1.length-1], sellNum: this.zjstockNum1[this.zjstockNum1.length-1],sellNum_baozang: this.zjbaozangNum1[this.zjbaozangNum1.length-1] },
              // { product: 'zh', colletNum: this.zhcollectNum1[this.zhcollectNum1.length-1], fanNum: this.zhfanNum1[this.zhfanNum1.length-1], sellNum: this.zhstockNum1[this.zhstockNum1.length-1],sellNum_baozang: this.zhbaozangNum1[this.zhbaozangNum1.length-1] },
              // { product: 'sxh', colletNum: this.sxhcollectNum1[this.sxhcollectNum1.length-1], fanNum: this.sxhfanNum1[this.sxhfanNum1.length-1], sellNum: this.sxhstockNum1[this.sxhstockNum1.length-1],sellNum_baozang: this.sxhbaozangNum1[this.sxhbaozangNum1.length-1] },
              // { product: 'zjh', colletNum: this.zjhcollectNum1[this.zjhcollectNum1.length-1], fanNum: this.zjhfanNum1[this.zjhfanNum1.length-1], sellNum: this.zjhstockNum1[this.zjhstockNum1.length-1],sellNum_baozang: this.zjhbaozangNum1[this.zjhbaozangNum1.length-1] },
            ]
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: [{ type: 'category', gridIndex: 0 },
                  { type: 'category', gridIndex: 1 }],
          yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
          grid: [{ bottom: '55%' }, { top: '55%' }],
          series: [
            // These series are in the first grid.
            { type: 'bar', seriesLayoutBy: 'row',itemStyle : { normal: {label : {show: true}}}, },
            { type: 'bar', seriesLayoutBy: 'row' ,itemStyle : { normal: {label : {show: true}}},},
            { type: 'bar', seriesLayoutBy: 'row' ,itemStyle : { normal: {label : {show: true}}},},
            { type: 'bar', seriesLayoutBy: 'row',itemStyle : { normal: {label : {show: true}}}, },
            { type: 'bar', seriesLayoutBy: 'row',itemStyle : { normal: {label : {show: true}}}, },
            { type: 'bar', seriesLayoutBy: 'row',itemStyle : { normal: {label : {show: true}}}, },
            // These series are in the second grid.
            { type: 'bar', xAxisIndex: 1, yAxisIndex: 1,itemStyle : { normal: {label : {show: true}}}, },
            { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 ,itemStyle : { normal: {label : {show: true}}},},
            { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 ,itemStyle : { normal: {label : {show: true}}},},
            { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 ,itemStyle : { normal: {label : {show: true}}},}
          ]
        };

        option && myChart.setOption(option);

      },

      //获取差距
      //获取最新数据
      getGapDate(){
        var app = {};
        var chartDom = document.getElementById('gap');
        var myChart = echarts.init(chartDom);
        var option;
        var sellNum_sxh=this.sxhstockNum1[this.sxhstockNum1.length-1]
        var fanNum_sxh=this.sxhfanNum1[this.sxhfanNum1.length-1]
        var sellNum_baozang_sxh=this.sxhbaozangNum1[this.sxhbaozangNum1.length-1]
        var collectNum_sxh=this.sxhcollectNum1[this.sxhcollectNum1.length-1]
        option = {
          title: {
            text: '最新差距'
          },
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', 'sellNum','fanNum', 'sellNum_baozang','colletNum'],
              ['zzx', this.zzxstockNum1[this.zzxstockNum1.length-1]-sellNum_sxh,this.zzxfanNum1[this.zzxfanNum1.length-1]-fanNum_sxh, this.zzxbaozangNum1[this.zzxbaozangNum1.length-1]-sellNum_baozang_sxh,this.zzxcollectNum1[this.zzxcollectNum1.length-1]-collectNum_sxh],
              ['zzy', this.zzystockNum1[this.zzystockNum1.length-1]-sellNum_sxh,this.zzyfanNum1[this.zzyfanNum1.length-1]-fanNum_sxh, this.zzybaozangNum1[this.zzybaozangNum1.length-1]-sellNum_baozang_sxh,this.zzycollectNum1[this.zzycollectNum1.length-1]-collectNum_sxh],
              ['zj', this.zjstockNum1[this.zjstockNum1.length-1]-sellNum_sxh,this.zjfanNum1[this.zjfanNum1.length-1]-fanNum_sxh, this.zjbaozangNum1[this.zjbaozangNum1.length-1]-sellNum_baozang_sxh,this.zjcollectNum1[this.zjcollectNum1.length-1]-collectNum_sxh],
              ['zh', this.zhstockNum1[this.zhstockNum1.length-1]-sellNum_sxh,this.zhfanNum1[this.zhfanNum1.length-1]-fanNum_sxh, this.zhbaozangNum1[this.zhbaozangNum1.length-1]-sellNum_baozang_sxh,this.zhcollectNum1[this.zhcollectNum1.length-1]-collectNum_sxh]
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar',itemStyle : { normal: {label : {show: true}}} }, { type: 'bar',itemStyle : { normal: {label : {show: true}}} }, { type: 'bar',itemStyle : { normal: {label : {show: true}}} },{ type: 'bar',itemStyle : { normal: {label : {show: true}}} }]
        };

        option && myChart.setOption(option);

        

      }
    }
}
</script>