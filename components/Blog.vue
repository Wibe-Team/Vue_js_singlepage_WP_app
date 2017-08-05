
<template>
<div class="show" v-if="show">
<div class="container container-blog">
  <div class="row">
    <div class="col-md-12">
      <div class="blog">
        <button v-on:click="show = false">
          Закрыть
        </button>
        <div class="row">
          <div class="col-md-2">
            <div class="filter">
              <h4>Мгновенный поиск:</h4>
              <input type="text" class="form-control" name="" v-model="search">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <div class="cat-filter">
              <h4>Рубрики:</h4>
              <div class="radio-wrap">
                <input type="radio" value="" v-model="catProp">
                <label>Все рубрики</label>
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
        
          <div class="col-md-12 page-number">
            <h4 class="current-page">Страница {{currentPage}} из {{allPages}}</h4>
          </div>
          <div class="col-md-6 right">
            <button class="btn btn-default" v-on:click="getAllPosts(prev_page)" :disabled="!prev_page">Предыдущая</button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-default" v-on:click="getAllPosts(next_page)" :disabled="!next_page">Следующая</button>
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
       //message: 'http://js.project/wordpress/wp-json/wp/v2/posts?per_page=6&page=' + this.currentPage,
       posts: [],
       show: true,
       search: '',
       catProp: '',
       allPages: '',
       prev_page: '',
        next_page: '',
       currentPage: ''
    }
  },
   methods: {
        getAllPosts: function(pageNumber) {
          this.currentPage = pageNumber;
          let message = 'http://js.project/wordpress/wp-json/wp/v2/posts?per_page=6&page=' + pageNumber;
          this.$http.get(message).then((response)=>{
            this.posts = response.data;
            this.makePagination(response);
          }, (error)=>{
              console.log(error);
          })
        },

        makePagination: function(data){
            this.allPages = data.headers.get('X-WP-TotalPages');

            //Setup prev page
            if(this.currentPage > 1){
                this.prev_page = this.currentPage - 1;
            } else {
                this.prev_page = null;
            }

            // Setup next page
            if(this.currentPage == this.allPages){
                this.next_page = null;
            } else {
                this.next_page = this.currentPage + 1;
            }
            

        }
      },

    
  created: function() {
    this.getAllPosts(1);
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
    .page-number {
        text-align: center;
        margin-top: 30px;
    }
    .col-md-6 {
      margin-bottom: 40px;
      margin-top: 20px;
    }
    .right {
      .btn {
        float: right;
      }
    }
  }
</style>
