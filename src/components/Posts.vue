<template>
    <div>
        <div id="posts-container" >
            <div v-for="(post, index) in posts.posts" class="post-message">
                <div id="post-if" v-if="index > 0">
                    <p v-if="index > 0">
                        <b>{{compareDate(posts.posts[index-1], post)}}</b>
                    </p>
                    <p v-else>
                        <b>{{firstDate(posts.posts[0])}}
                        </b>
                    </p>
                </div>
                <div id="post-else" v-else><b>{{firstDate(posts.posts[0])}}</b></div>
                <div v-for="member in members">
                    <div v-if="member._id === post.member_id">
                        <img class="post-gravatar" :src="'https://robohash.org/' + member._id">
                        <div style="display:inline-block;">
                            <p style="display: inline-block;"><b>{{member.fullname}}</b></p>
                            <p style="display: inline-block; font-size : 0.9em;color : grey">{{getHours(post.created_at, post.updated_at)}}</p>
                        </div>
                    </div>
                </div>
                <div :id='"post_message" + post._id'>
                    <p style="display : inline-block;padding-left : 60px;" v-model="post.message">{{post.message}}</p>
                    <button style="display : inline-block; float:right; margin-right : 5px"  v-if="user._id === post.member_id" class="btn btn-danger" @click="deletePosts({post, idChannel})"><i class="fa fa-trash-o"></i></button>
                    <button style="display : inline-block; float:right;margin-right : 5px" v-if="user._id === post.member_id" class="btn btn-info" @click="displayForm(post._id, true)"><i class="fa fa-pencil-square-o"></i></button>
                </div>
                <div :id='"post_form" + post._id'  style="display : none;">
                    <form>
                        <input class="form-control" type="text" id="post-message-input" v-model="post.message">
                        <button class="btn btn-success" @click="updatePosts({post, idChannel})">Save changes</button>
                    </form>
                </div>
                <hr>
            </div>
        </div>
        <form id="post-form" v-on:submit.prevent="addPosts({message, idChannel})">
            <input type="text" v-model="message" class="form-control send-form" id="send-form">
            <button class="btn btn-success" type="submit"><i class="fa fa-paper-plane"></i></button>
        </form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['posts'],
    data () {
      return {
        idChannel: this.posts.idChannel,
        message: ''
      }
    },
    computed: {
      ...mapGetters({
        members: 'members/getMembers',
        user: 'auth/getConnectedUser'
      })
    },
    created () {
      setTimeout(() => {
        let element = document.getElementById('posts-container')
        element.scrollTop = element.scrollHeight
      }, 700)
    },
    methods: {
      firstDate (post) {
        let date = new Date(post.created_at)
        if (date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
          return 'Today'
        } else {
          return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
        }
      },
      compareDate (firstPost, secondPost) {
        let fp = new Date(firstPost.created_at)
        let sp = new Date(secondPost.created_at)
        if (fp.getDate() !== sp.getDate() || fp.getMonth() !== sp.getMonth() || fp.getFullYear() !== sp.getFullYear()) {
          if (sp.getDate() === new Date().getDate() && sp.getMonth() === new Date().getMonth() && sp.getFullYear() === new Date().getFullYear()) {
            return 'Today'
          } else {
            return sp.getMonth() + 1 + '/' + sp.getDate() + '/' + sp.getFullYear()
          }
        }
      },
      setScrollToBottom () {
        setTimeout(() => {
          let element = document.getElementById('posts-container')
          element.scrollTop = element.scrollHeight
        }, 700)
      },
      addPosts (credentials) {
        this.$store.dispatch('channel/addPosts', credentials).then((response) => {
          this.setScrollToBottom()
          this.message = ''
        })
      },
      deletePosts (credentials) {
        this.$store.dispatch('channel/deletePosts', credentials)
      },
      updatePosts (credentials) {
        this.$store.dispatch('channel/updatePosts', credentials)
        document.getElementById('post-message-input').style.display = 'none'
        this.displayForm(credentials.post._id, false)
      },
      getHours (create, update) {
        let cre = new Date(create)
        let upd = new Date(update)
        if (cre >= upd) {
          if (cre.getMinutes() < 10) {
            return cre.getHours() + ':0' + cre.getMinutes()
          } else {
            return cre.getHours() + ':' + cre.getMinutes()
          }
        } else {
          if (upd.getMinutes() < 10) {
            return 'updated at ' + upd.getHours() + ':0' + upd.getMinutes()
          } else {
            return 'updated at ' + upd.getHours() + ':' + upd.getMinutes()
          }
        }
      },
      displayForm (id, bool) {
        if (bool) {
          document.getElementById('post_message' + id).style.display = 'none'
          document.getElementById('post_form' + id).style.display = 'block'
        } else {
          document.getElementById('post_message' + id).style.display = 'block'
          document.getElementById('post_form' + id).style.display = 'none'
        }
      }
    }
  }
</script>

<style>
    .send-form {
        margin-left : 2%;
        width : calc(90vw - 200px);
        display : inline-block;
    }
    #posts-container{
        padding-left : 2%;
        max-height : 75vh;
        overflow-y : auto;
    }

    #post-form{
        position: fixed;
        width : 100%;
        bottom:15px;
    }
    #post-message-input{
        margin-top : 10px;
        width : calc(80vw - 200px);
        display : inline-block;
    }
    #post-if, #post-else{
        width : 100%;
        text-align : center;
    }
    .post-gravatar{
        display: inline-block;
        width:60px;
        vertical-align: middle;
        border:1px solid gainsboro
    }
</style>

