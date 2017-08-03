<template>
   <div>
      <cat :msg="cats"></cat> 
   </div> 
</template>

<script>

import Blog from './Blog.vue'

export default {
  data () {
    return {
       message: 'http://js.project/wordpress/wp-json/wp/v2/categories',
       cats: '[]'
    }
  },
  components: {
    'cat' : Blog
  },
   methods: {
        getCategories: function() {
          this.$http.get(this.message).then(function(response){
            this.cats = response.data;
          }, function(error){
              console.log(error);
          })
        }
      },

  created: function() {
    this.getCategories();
  }
}
</script>
