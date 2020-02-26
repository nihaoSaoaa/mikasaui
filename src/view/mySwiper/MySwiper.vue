<template>
    <swiper :slideCount="banners.length">
      <template>
        <swiper-item v-for="item in banners" :key="item.index">
          <a :href="item.link">
            <img :src="item.image"  />
          </a>
        </swiper-item>
      </template>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "../../components/swiper";
export default {
  name: "MySwiper",
  data() {
    return {
      banners: [
        {link: '', image: 'https://s17.mogucdn.com/mlcdn/c45406/200218_1b57ebc6848b1c22843acea9lb234_1125x390.jpg_700x9999.v1c7E.81.webp'},
        {link: '', image: 'https://s11.mogucdn.com/mlcdn/c45406/200219_6ibhg5g39i40b2fd69kadfai6lk06_1125x390.jpg_700x9999.v1c7E.81.webp'},
        {link: '', image: 'https://s18.mogucdn.com/mlcdn/c45406/200217_26g2g4jf321b5ljg0d3jj6bfl2fg0_1125x390.jpg_700x9999.v1c7E.81.webp'}
      ]
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>