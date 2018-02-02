<template>
    <div class="content-profile">
        <h1 class="text-center mt-2">Your Profile</h1>
        <div class="card mx-auto" style="width: 18rem;">
            <img class="card-img-top" :src="'https://robohash.org/' + user._id" alt="Card image cap">
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">{{user.fullname}}</li>
                    <li class="list-group-item">{{user.email}}</li>
                </ul>
            </div>
            <button class="btn btn-danger" @click="deleteAccount()">Delete my account</button>
        </div>
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

<style>
    .content-profile{
        min-height : 100vh;
    }

    .card{
        margin-top : 100px;
    }

</style>

