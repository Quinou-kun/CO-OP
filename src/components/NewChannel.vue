<template>
    <div class="text-center">
        <h1 class="text-center mt-2">New Channel</h1>



        <div class="card mx-auto mt-5" style="width: 18rem;">
            <div class="card-body">
                <form @submit.prevent="newChannel()">
                    <div>
                        <label for="label">Channel's label</label>
                        <input id="label" type="text" class="form-control" v-model="newchannel.label">
                    </div>
                    <div class="mt-4">
                        <label for="topic">Channel's topic</label>
                        <input id="topic" type="text" class="form-control" v-model="newchannel.topic">
                    </div>
                </form>
            </div>
            <button class="btn btn-success" @click="newChannel()">Add !</button>
        </div>
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

