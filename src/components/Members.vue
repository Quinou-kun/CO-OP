<template>
    <div class="members-container text-center">
        <h1 class="mt-2">Members</h1>
        <div class="member" v-for="member in members">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" :src="'https://robohash.org/' + member._id" alt="Card image cap">
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">{{member.fullname}}</li>
                        <li class="list-group-item">{{member.email}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Members',
    computed: {
      ...mapGetters({
        members: 'members/getMembers'
      })
    },
    created () {
    }
  }
</script>

<style>
    .members-container{
        max-height : 100vh;
        overflow-y : auto;
    }
    .member{
        display: inline-block;
    }

</style>

