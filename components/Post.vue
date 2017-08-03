<template>
<div class="container container-post">
  <div class="row">
    <div class="col-md-12">
      <div class="blog">
        <div class="posts" v-if="post">
          <h3>{{ post.title.rendered }}</h3>
          {{ post.content.rendered }}
        </div>
      </div>
    </div>
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
<style lang="scss">
  .blog {
    background-color: white;
  }
</style>
