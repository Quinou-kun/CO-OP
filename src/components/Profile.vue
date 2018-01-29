<template>
    <div>
        <h1>Your Profile</h1>
        <ul>
            <li>{{user.fullname}}</li>
            <li>{{user.email}}</li>
        </ul>
        <button @click="deleteAccount()">Delete my account</button>
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
    },
    methods: {
      deleteAccount () {
        this.$store.dispatch('auth/delete', this.user._id).then(response => {
          this.$router.push({name: 'Signin'})
        })
      }
    }
  }
</script>

