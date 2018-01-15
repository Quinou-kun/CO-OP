<template>
    <div>
        <h1>Profile</h1>
        <ul>
            <li>{{user.fullname}}</li>
            <li>{{user.email}}</li>
        </ul>
        <router-link to="/">Home</router-link>

    </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Profile',
    data () {
      return {
        user: {}
      }
    },
    created () {
      api.get('/members/' + this.user.id + '/signedin').then(response => {
        this.user = response.data
      })
    }
  }
</script>

