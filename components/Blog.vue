
<template>
<div class="show" v-if="show">
<div class="container container-blog">
  <div class="row">
    <div class="col-md-12">
      <div class="blog">
        <button v-on:click="show = false">
          Закрыть
        </button>
        <ul class="cats" v-for="cat in msg">
          <li>{{cat.name}}</li>
        </ul>
        <div class="posts" v-for="post in posts">
          <div class="col-md-4">
            <h3>{{ post.title.rendered }}</h3>
            <div class="post1">{{ post.excerpt.rendered }}</div>
            <router-link :to="{ name: 'post', params: {id: post.id} }">Подробнее</router-link>
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
       posts: '[]',
       show: true
    }
  },
   methods: {
        getAllPosts: function() {
          this.$http.get(this.message).then(function(response){
            this.posts = response.data;
          }, function(error){
              console.log(error);
          })
        }
      },
  created: function() {
    this.getAllPosts();
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
