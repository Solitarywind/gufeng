<template>
  <el-row class="page">
    <el-col :span="5">
      <router-link class="link" :to="{name:'Home'}">前往封面</router-link>
    </el-col>
    <el-col :span="5">
      <router-link  class="link" :to="{name:'MarkdownArticle'}">添加文章</router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
    name:"Page",
}
</script>

<style lang="scss">
    .page{
        width:100%;
        margin:100px 0px;
        display: flex;
        justify-content: center;
        .link{
            font-size: 20px;
        }
    }
</style>