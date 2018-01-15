<template>
    <div>
        <router-link to="profile"><button>My profile</button></router-link>
        <router-link to="members"><button>Members</button></router-link>
        <button @click="signout()">Signout</button>
        <div>
            <h3>Channels : </h3>
            <ul>
                <li v-for="channel in channels">{{channel.label}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        channels: {}
      }
    },
    created () {
      api.get('/channels').then(response => {
        this.channels = response.data
      })
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

