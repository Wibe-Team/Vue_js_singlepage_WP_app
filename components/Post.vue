<template>
  <div class="blog">
    <div class="posts" v-if="post">
      <h3>{{ post.title.rendered }}</h3>
      {{ post.content.rendered }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
       message: 'http://js.project/wordpress/wp-json/wp/v2/posts/' + this.$route.params.id,
       post: '[]'
    }
  },
   methods: {
        getPost: function() {
          this.$http.get(this.message).then(function(response){
            this.post = response.data;
          }, function(error){
              console.log(error);
          })
        }
      },
  created: function() {
    this.getPost();
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
