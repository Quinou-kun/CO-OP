<template>
    <div>
        <div class="posts-container" >
            <div v-for="post in posts.posts" class="post-message">
                <div v-for="member in members">
                    <p v-if="member._id === post.member_id">{{member.fullname}} {{getHours(post.created_at, post.updated_at)}}</p>
                </div>
                <div  :id='"post_message" + post._id'>
                    <p v-model="post.message">{{post.message}}</p>
                    <button v-if="user._id === post.member_id" class="btn btn-danger" @click="deletePosts({post, idChannel})"><i class="fa fa-trash-o"></i></button>
                    <button v-if="user._id === post.member_id" class="btn btn-info" @click="displayForm(post._id, true)"><i class="fa fa-pencil-square-o"></i></button>
                </div>
                <div :id='"post_form" + post._id'  style="display : none;">
                    <form>
                        <input v-model="post.message">
                        <button class="btn btn-success" @click="updatePosts({post, idChannel})"><i class="fa fa-pencil-square-o"></i></button>
                    </form>
                </div>
                <hr>
            </div>
        </div>
        <form v-on:submit.prevent="addPosts({message, idChannel})">
            <input type="text" v-model="message" class="form-control send-form">
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
    methods: {
      getName (id) {
        return this.getMemberName(id)
      },
      addPosts (credentials) {
        this.$store.dispatch('channel/addPosts', credentials)
      },
      deletePosts (credentials) {
        this.$store.dispatch('channel/deletePosts', credentials)
      },
      updatePosts (credentials) {
        this.$store.dispatch('channel/updatePosts', credentials)
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
        width : calc(80vw - 200px);
        display : inline-block;
    }
    .posts-container{
        padding-left : 2%;
        max-height : 95vh;
        overflow-y : auto;
    }
</style>

