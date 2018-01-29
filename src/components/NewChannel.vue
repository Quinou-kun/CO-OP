<template>
    <div>
        <h1>New Channel</h1>
        <form @submit.prevent="newChannel()">
            <div>
                <label for="label">Channel's label</label>
                <input id="label" type="text" v-model="newchannel.label">
            </div>
            <div>
                <label for="topic">Channel's topic</label>
                <input id="topic" type="text" v-model="newchannel.topic">
            </div>
            <div>
                <input type="submit" value="Add !"/>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        newchannel: {label: '', topic: ''}
      }
    },
    methods: {
      newChannel () {
        this.$store.dispatch('channels/newChannel', this.newchannel).then(response => {
          this.$router.push({path: '/channels/'})
        })
      }
    }
  }
</script>

<style>
    .channel-header{
        width : calc(100vw - 200px);
        padding : 1%;
        position : fixed;
        background-color : white;
        border-bottom : 1px solid #893261;
    }
</style>

