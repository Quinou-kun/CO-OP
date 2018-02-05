<template>
    <div class="vertical-menu">
        <a @click="signout()" class="btn text-left"><i class="fa fa-sign-out"></i>Sign out</a>
        <router-link to="/profile"><a class="btn text-left">My profile</a></router-link>
        <router-link to="/members"><a class="btn text-left">Members</a></router-link>
        <h4>Channels <router-link to="/new" style="display: inline-block; float: right;"><i class="fa fa-plus-square"></i></router-link></h4>
        <div v-for="channel in channels">
            <router-link :to="{'path' : `/channels/${channel._id}`}"><a class="btn text-left"># {{channel.label}}</a></router-link>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        channels: {}
      }
    },
    created () {
      this.channels = this.$store.getters['channels/getChannels']
    },
    methods: {
      signout () {
        this.$store.dispatch('auth/logout', this.user).then(response => {
          this.$router.push({name: 'Signin'})
        })
      }
    }
  }
</script>

<style>
    .vertical-menu {
        color : white;
        height : 100vh;
        background-color : #893261;
        vertical-align : top;
        width : 200px;
        display : inline-block;
        border : 1px solid black;
        padding : 3px;
    }
    .vertical-menu a {
        text-decoration: none;
        color : white;
        display: block;
    }

    .vertical-menu a:hover {
        background-color : #782150;
    }

    .btn{
        padding : 10px
    }
</style>

