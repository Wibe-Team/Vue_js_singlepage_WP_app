<template>
  <div class="blog">
    <div class="posts" v-for="post in posts">
      <h3>{{ post.title.rendered }}</h3>
      <router-link :to="{ name: 'post', params: {id: post.id} }">Подробнее</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
       message: 'http://js.project/wordpress/wp-json/wp/v2/posts?per_page=20',
       posts: '[]'
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
