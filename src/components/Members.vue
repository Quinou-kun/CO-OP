<template>
    <div>
        <h1>Members</h1>
        <ul v-for="member in members">
            <li>{{member.fullname}}</li>
            <li>{{member.email}}</li>
        </ul>
        <router-link to="/">Home</router-link>
    </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Members',
    data () {
      return {
        members: {}
      }
    },
    created () {
      api.get('/members').then(response => {
        this.members = response.data
      })
    }
  }
</script>

