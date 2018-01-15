<template>
    <div>
        <h1>Signin</h1>
        <form @submit.prevent="signin()">
            <div>
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="email" v-model="user.email"/>
            </div>
            <div>
                <label for="email">Password</label>
                <input type="password" id="password" placeholder="password" v-model="user.password"/>
            </div>
            <input type="submit" value="Go !">
        </form>
    </div>
</template>

<script>
  import api from '../api'
  export default {
    name: 'Signin',
    data () {
      return {
        user: {email: '', password: ''}
      }
    },
    methods: {
      signin () {
        api.post('/members/signin', this.user).then((response) => {
          console.log(response.data)
        })
      }
    }
  }
</script>