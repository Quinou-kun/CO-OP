<template>
    <div>
        <sidebar></sidebar>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
  import SideBar from '@/components/SideBar'
  export default {
    components: {
      'sidebar': SideBar
    }
  }
</script>

<style>
    .content{
        background-color : white;
        width : calc(100vw - 220px);
        display : inline-block;
    }
</style>
