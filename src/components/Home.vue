<template>
  <div>
      <button @click="signout()">Signout</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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

