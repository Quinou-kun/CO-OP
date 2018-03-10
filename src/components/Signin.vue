<template>
    <div class="signin-body">
        <div class="card" v-if="!this.registered">
            <h3 class="card-header text-center">
                <i class="fa fa-user"></i>
                Signin
            </h3>
            <div class="card-body">
                <form @submit.prevent="signin()">
                    <div class="form-group">
                        <label for="email">
                            <i class="fa fa-envelope"></i>
                            Email
                        </label>
                        <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" id="email" placeholder="ex: john.doe@gmail.com" v-model="user.email" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="email">
                            <i class="fa fa-key"></i>
                            Password
                        </label>
                        <input type="password" id="password" placeholder="*********" v-model="user.password" class="form-control" minlength="6" required/>
                    </div>
                    <div class="text-center">
                        <input type="submit" value="Go !" class="btn btn-outline-success">
                        <a @click="setRegister()" class="btn btn-outline-secondary">I want to join</a>
                    </div>
                </form>
            </div>
        </div>
        <div class="card" v-else>
            <h3 class="card-header text-center">
                <i class="fa fa-user-plus"></i>
                Register
            </h3>
            <div class="card-body">
                <form @submit.prevent="register()">
                    <div class="form-group">
                        <label for="email">
                            <i class="fa fa-user"></i>
                            First name and/or last name
                        </label>
                        <input type="text" placeholder="ex: John Doe" v-model="newuser.fullname" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="email">
                            <i class="fa fa-envelope"></i>
                            Email
                        </label>
                        <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" placeholder="ex: john.doe@gmail.com" v-model="newuser.email" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="email">
                            <i class="fa fa-key"></i>
                            Password
                        </label>
                        <input type="password" placeholder="*********" v-model="newuser.password" class="form-control" minlength="6" required/>
                    </div>
                    <div class="text-center">
                        <input type="submit" value="Create" class="btn btn-outline-info">
                        <a @click="setRegister()" class="btn btn-outline-secondary">I already have an account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        registered: false,
        user: {email: '', password: ''},
        newuser: {fullname: '', email: '', password: ''}
      }
    },
    methods: {
      signin () {
        this.$store.dispatch('auth/login', this.user).then(response => {
          this.$store.dispatch('channels/initChannels')
          this.$store.dispatch('members/initMember')
          this.$router.push({name: 'Start'})
        })
      },
      register () {
        this.registered = !this.registered
        api.post('/members', this.newuser).then(response => {
          this.user.email = this.newuser.email
        })
      },
      setRegister () {
        this.registered = !this.registered
      }
    }
  }
</script>

<style>
    .signin-body{
        padding : 10% 20%;
        min-width : 100vw;
        min-height : 100vh;
        background-color : #893261;
    }
    .card{
        border-radius: 15px;
    }
</style>
