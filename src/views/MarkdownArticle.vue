<template>
  <div class="addArticle">
    <el-form  ref="form" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input style="width:300px" v-model="article.title" placeholder="" clearable ></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-autocomplete
          v-model="article.tag"
          placeholder="请输入内容"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
          clearable
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top"></el-switch>
      </el-form-item>
    </el-form>
    <MavEditor v-model="article.content" />
    <el-row type="flex" justify="end">
      <el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
    </el-row>
  </div>
</template>

<script>
import MavEditor from "../components/Editor/MavEditor";
export default {
  name: "MarkdownArticle",
  components: {MavEditor},
  data() {
    return {
      article: {
        title: "",
        tag: "",
        top: false,
        content: '',
      },
      restaurants: [],
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    handleSelect(item) {
      this.article.tag = item.value;
      // console.log(item);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      cb(results);
    },
    loadAll() {
      return [
        {
          value: "笔记",
        },
        {
          value: "文章",
        },
        {
          value: "游戏",
        },
      ];
    },
    submitArticle() {
      console.log(this.article);
    },
  },
};
</script>
<style lang="scss">
.addArticle {
  width: 1200px;
  margin: 100px auto;
  .subBtn {
    width: 100px;
    margin: 0 auto;
  }
}
</style>