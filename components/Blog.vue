
<template>
<div class="show" v-if="show">
<div class="container container-blog">
  <div class="row">
    <div class="col-md-12">
      <div class="blog">
        <button v-on:click="show = false">
          Закрыть
        </button>
        <div class="filter">
          <h5>Поиск по названию</h5>
          <input type="text" name="" v-model="search">
        </div>
        <div class="row">
          <div class="col-md-2">
            <div class="cat-filter">
              <h4>Фильтр по категориям</h4>
              <div class="radio-wrap">
                <input type="radio" value="" v-model="catProp">
                <label>Все категории</label>
              </div>
              <div class="radio-wrap" v-for="cat in msg">
                <input type="radio" :value="cat.id" :id="cat" :name="cat"  v-model="catProp" >
                <label>{{ cat.name }}</label>
              </div>
            </div>
          </div>
        <!-- <ul class="cats" v-for="cat in msg">
          <li>{{cat.name}}</li>
        </ul> -->
        <div class="col-md-10">
          <div class="posts" v-for="post in searchByName">
            <div class="col-md-4">
              <h3>{{ post.title.rendered }}</h3>
              {{post.categories}}
              <div class="post1">{{ post.excerpt.rendered }}</div>
              <router-link :to="{ name: 'post', params: {id: post.id} }">Подробнее</router-link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>

export default {
  props: ['msg'],
  data () {
    return {
       message: 'http://js.project/wordpress/wp-json/wp/v2/posts?per_page=20',
       posts: [],
       show: true,
       search: '',
       catProp: ''
    }
  },
   methods: {
        getAllPosts: function() {
          this.$http.get(this.message).then((response)=>{
            this.posts = response.data;
          }, (error)=>{
              console.log(error);
          })
        }
      },

    
  created: function() {
    this.getAllPosts();
  },

  computed: {
    searchByName: function() {
      return this.posts.filter((post) => {
        if(post.categories == this.catProp) {
        return post.title.rendered.toLowerCase().match(this.search.toLowerCase());
        } else if (this.catProp == 0) {
          return post.title.rendered.toLowerCase().match(this.search.toLowerCase());
        }
      });
    }
  }
}
</script>

<style lang="scss">
  .blog {
    background-color: white;
    ul {
      display: inline-block;
      li {
        text-decoration: none;
        list-style: none;
      }
    }
  }
</style>
