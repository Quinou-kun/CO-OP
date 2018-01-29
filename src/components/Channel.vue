<template>
    <div>
        <div id="channel-header">
            <h4 id="channel_label"># {{channel.label}}</h4>
            <h6 id="channel_topic">{{channel.topic}}</h6>
            <button @click="displayForm(true)" class="btn btn-outline-success">Edit</button>
            <button @click="deleteChannel()" class="btn btn-outline-danger">Delete</button>
        </div>

        <div id="channel-header form">
            <form>
            <input type="text" class="form-control" v-model="channel.label"/>
            <input type="text" class="form-control" v-model="channel.topic"/>
            <button @click="updateChannel()" class="btn btn-outline-success">Save Changes</button>
            </form>
        </div>
        <posts :posts="posts"></posts>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PostsVue from '@/components/Posts'
  export default {
    data () {
      return {
        channel: null
      }
    },
    created () {
      this.channel = this.c(this.$route.params.id)[0]
      this.$store.dispatch('channel/getPostsChannel', this.channel._id)
    },
    components: {
      'posts': PostsVue
    },
    computed: {
      ...mapGetters({
        posts: 'channel/getPostsChannel',
        c: 'channels/getChannel'
      })
    },
    methods: {
      displayForm (bool) {
        if (bool) {
          document.getElementById('channel-header').style.display = 'none'
          document.getElementById('channel-header form').style.display = 'block'
        } else {
          document.getElementById('channel-header').style.display = 'block'
          document.getElementById('channel-header form').style.display = 'none'
        }
      },
      updateChannel () {
        this.$store.dispatch('channels/updateChannel', this.channel)
        this.displayForm(false)
      },
      deleteChannel () {
        this.$store.dispatch('channels/deleteChannel', this.channel)
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.channel = this.c(to.params.id)[0]
      this.$store.dispatch('channel/getPostsChannel', this.channel._id)
      next()
    }
  }
</script>

<style>
    #channel-header{
        width : calc(100vw - 200px);
        padding : 1%;
        position : fixed;
        background-color : white;
        border-bottom : 1px solid #893261;
    }
</style>

