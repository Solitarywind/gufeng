<template>
  <div class="home-container" ref="container" @wheel="handleWheel">
        <ul class="carousel-container" :style="{ marginTop}"
        @transitionend="handleTransitionEnd"
        >
           <li v-for="(item) in banners" :key="item.id">
              <CarouselItem :carousel="item" />
           </li>
        </ul>
     <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
        <Icon type="arrowUp" />
     </div>
      <div v-show="index < banners.length - 1"
        @click="switchTo(index + 1)"
        class="icon icon-down"
      >
          <Icon type="arrowDown" />
      </div>
      <ul class="indicator">
          <li :class="{active: i === index}"
          v-for="(item,i) in banners"
              :key="item.id" @click="switchTo(i)"
          ></li>
      </ul>
  </div>
</template>

<script>
  import CarouselItem from "../components/CarouselItem";
  import Icon from "../components/Icon";
  import { getBanners } from "../api";

  export default {
    name:"Home",
    components: {Icon, CarouselItem},
    data(){
        return {
           switching:false,//是否在切换中
           banners:[],
            index:0,
            containerHeight:0
        }
      },
      computed:{
         marginTop(){
             return -this.index * this.containerHeight + 'px'
         }
      },
      async created(){
         let banner = await getBanners();
         this.banners = banner;
      },
      mounted() {
          this.containerHeight = this.$refs.container.clientHeight;
          window.addEventListener('resize',this.handleResize)
      },
      destroyed() {
          window.removeEventListener('resize',this.handleResize)
      },
      methods:{
         switchTo(i){
            this.index = i
         },
         handleTransitionEnd(){
            this.switching = false
         },
          handleResize(){
              this.containerHeight = this.$refs.container.clientHeight;
          },
         handleWheel(e){
            if(this.switching){
              return;
            }
            if(e.deltaY < -5 && this.index > 0){
                this.switching = true;
                this.index --;
            }else if(e.delaY > 5 && this.index < this.banners.length - 1){
              this.switching = true;
              this.index ++;
            }
         },

      }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/css/mixin.scss";
    @import "../assets/css/var.scss";
    .home-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        ul{
            margin:0;
            list-style: none;
            padding: 0;
        }
    }
    .carousel-container{
        width: 100%;
        height: 100%;
        transition: 500ms;
        li{
            width: 100%;
            height: 100%;
        }
    }
    .icon {
        @include self-center();
         font-size: 30px;
         $gap:25px;
         color:$gray;
        transform: translateX(-50%);
        &.icon-up{
            top:$gap;
            animation:jump-up 2s infinite;
        }
        &.icon-down{
            top:auto;
            bottom: $gap;
            animation: jumpDown 2s infinite;
        }
        $jump:5px;
        @keyframes jump-up {
            0%{
                transform: translate(-50%,$jump);
            }
            50%{
                transform: translate(-50%,-$jump);
            }
            100%{
                transform: translate(-50%,$jump);
            }
        }
        @keyframes jumpDown {
            0%{
                transform: translate(-50%,-$jump);
            }
            50%{
                transform: translate(-50%,$jump);
            }
            100%{
                transform: translate(-50%,-$jump);
            }
        }

    }
    .indicator{
        @include self-center();
        transform: translateY(-50%);
        left: auto;
        right: 20px;
        li{
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: $words;
            cursor: pointer;
            margin-bottom: 10px;
            border:1px solid #fff;
            box-sizing: border-box;
            &.active{
                background: #ffffff;
            }
        }
    }
</style>