<template>
    <el-container class="main-container">
      <div class="head">
        <div class="head-warp">
  <el-button style="margin-left: 10px;" type="primary" icon="el-icon-menu" circle></el-button>
          <div class="head-left">
            <div class="sub-menu" v-if="mastBack">
              <a @click="back()" class="sub-item sub-item-back" ><i class="el-icon-arrow-left"></i>返回</a>
            </div>
            <div class="sub-menu">
              <a style="border: 1px solid #edf2f8; width: 120px; margin-left:5px;" @click="routerGo(item.path)" class="sub-item" :class="{'active':activePath==item.path }" v-for="(item,index) in subMenu" :key="index">{{item.name}}</a>
            </div>
          </div>
          <div class="head-right">
            <p class="user-text" @click="$router.push('/main/school/schoolInfo') ">{{this.$store.state.userInfo.schoolName}}</p>
            <p class="line"></p>
            <p class="user-text user-name">
            <el-tooltip placement="bottom">
              <div slot="content">DBID: {{$store.state.userInfo.dbid}}<br/>ID: {{$store.state.userInfo.id}}</div>
              <img :src=" imgSrc " alt="" style="width: 40px; height: 40px; border-radius: 40px"> 
            </el-tooltip>
            <span>{{getUserName()}}</span>
            </p>
            <p class="line"></p>
            <p class="user-text" @click="exit">退出</p>
          </div>
        </div>
      </div>
      <div class="sub-container">
        <transition name="page">
            <!-- <keep-alive> -->
              <router-view class="sub-view"></router-view>
            <!-- </keep-alive> -->
        </transition>
      </div>
    </el-container>
</template>

<script>
//import Nav from '~/components/Nav'
import { getBaseUrl } from '@/utils'
export default {
  components: {
    //Nav
  },
  data() {
    return {
      isCollapse: false,
      mastBack:false,
      pageName: '',
      pagePath:'',//页面顶部显示
      subMenu:[],
      activePath:'',
      imgSrc: ''
      //imgSrc: this.$resolveImgUrl(this.$store.state.userInfo.filename, true)
    }
  },
  mounted(){
    this.initRouter();
  },
  methods: {
    m_getBaseUrl() {
      return getBaseUrl()
    },
    initRouter(){
      console.log('initRouter')
      let path = this.$route.path.split('/');
      let menu = path[2];
      if(!this.$store.state.menu || !this.$store.state.menu[menu]) return;
      let a = this.$store.state.menu[menu].children;
      // console.log(path,this.$store.state.menu,menu)
      var arr = JSON.parse(JSON.stringify(a))
      this.subMenu = arr
      this.pagePath = menu;
      for(let key in arr){
        // console.log(path[3],arr[key].path)
        if(arr[key].path == path[3]){
          if (path[4] !== undefined) {
            this.subMenu = JSON.parse(JSON.stringify(arr[key].children))
            arr[key].children.forEach((r) => {
              if (r.path ===path[4]) {
                this.activePath = r.path
              }
            })
          } else {
            this.activePath = arr[key].path;
          }
        }
      }
    },
    routerGo(path){
      this.activePath = path;
      if (path.indexOf('/') === 0) {
        this.$router.push({path: path});
      } else {
        this.$router.push({path:'./'+path});
      }
    },
    //获取用户名称
    getUserName(){
      if(this.$store.state.userInfo)
        return this.$store.state.userInfo.name;
    },
    exit(){
      this.$confirm('您确定要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('loginout');
        this.$router.push({path:'/login'});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  watch: {
    $route(to,from){
      this.initRouter()
      if(to.name.indexOf(this.activePath) > -1){
        this.mastBack = false;
      }else{
        this.mastBack = true;
      }
    }
  }
}
</script>

<style scoped>
.el-popover{
  border-radius: 5px;
  padding:4px;
}
.main-container{
  position: relative;
  height:100%;
  background: #EDF2F8;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
}
.height14{
  height: 14px;
  width: 100%;
  background-color: #EDF2F8;
}
.sub-container{
  width:100%;
  /*margin-top:14px;*/
  box-shadow: 0 0 5px 0 rgba(221,221,221,0.50);
  display: flex;
  flex-direction: column;
  flex:1;
  position: relative;
  
}
.sub-view{
  padding-top:12px;
  overflow-y: scroll;
}
.main-container .head{
  width:100%;
  height:56px;
  border-bottom: 1px solid #D7D7D7;
}
.main-container .head-warp{
  width:100%;
  height:56px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.main-container .head-left{
  flex:2;
  display: flex;
  align-items: center;
}.main-container .head-right{
  flex:1;
  display: flex;
  align-items: center;
}
.main-container .head-left .logo{
  width:137px;
  height:41px;
  /* margin:0 16px; */
  margin:0 24px 0 16px;
}
.main-container .head-left .head-nav-bar{
  font-size: 24px;
}
.popover-container{
  /* width:532px; */
  width: 840px;
  padding:49px 18px 15px;
  border:1px solid #E3E3E3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.popover-container .item{
  width:114px;
  min-height:100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration:none;
  color:#333;
  margin-bottom:20px;
}
.popover-container .item img{
  width:74px;
}

.popover-container .item p{
  padding:4px 12px;
  color:#333333;
  margin-top:12px;
}

.popover-container .item p.page-active{
  color:#008BE0;
  border:1px solid #99D1F3;
  border-radius:15px;
  background-color: #E5F3FB;
}
.main-container .head-right{
  justify-content: flex-end;
}
.main-container .head-right>p{
  height:30px;
  height:30px;
  line-height: 30px;
  font-size: 15px;
  color: #20243A;
}
.main-container .head-right>p.line{
  height:18px;
  width:1px;
  background-color: #B7B7B7;
}
.main-container .head-right>p.user-text{
  padding:0 15px;
}
.main-container .head-right>p.user-name{
  display: flex;
  align-items: center;
  /*color:#008BE0;*/
}
.main-container .head-right>p.user-name img{
  margin-right: 10px;
}
.main-container .head-right>p:last-child{
  cursor: pointer;
  color:#008BE0;;
}

.sub-menu{
  /*width:100%;*/
  height:40px;
  background: #FFFFFF;
  box-shadow: 0 2px 3px 0 rgba(225,225,225,0.50);
}
.sub-item{
  cursor:pointer;
  float:left;
  width:100px;
  height:40px;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  color:#20243A;;
}
.sub-item-back{
  width:80px;
}
.sub-item.active{
  background-color: #d1e7f7; 
}
</style>
<style>
  .main_idx p{
    font-size: 15px;
  }
</style>