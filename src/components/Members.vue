<template>
    <div>
        <h1>Members</h1>
        <ul v-for="member in members">
            <li>{{member.fullname}}</li>
            <li>{{member.email}}</li>
        </ul>
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

