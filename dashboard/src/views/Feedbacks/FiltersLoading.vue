<template>
  <content-loader
    class="flex flex-col items-center rounded"
    width="100%"
    height="150px"
  >
    <content-loader
        class="mt-3 rounded"
        width="90%"
        heigth="50px"
        duraation-animation="2.0s"
    />

    <content-loader
      class="mt-3 rounded"
      width="80%"
      height="50px"
      animation-duration="2.3s"
    />

    <content-loader
      class="mt-3 rounded"
      width="70%"
      height="50px"
      animation-duration="2.7s"
    />
  </content-loader>
</template>

<script>
import ContentLoader from '@/components/ContentLoader'
export default {
  components: { ContentLoader }
}
</script>

<style></style>
