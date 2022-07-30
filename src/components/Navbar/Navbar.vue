<template>
  <div class="navbar">
    <span class="navbar__wrapper">
      <h2>
        <router-link class="navbar__text_wrapper" to="/">
          Where in the World ?
        </router-link>
      </h2>
      <span class="navbar__text_wrapper" @click="$emit('onclick')">
        <i class="icon-moon-o" /> Dark mode
      </span>
    </span>
    <div class="container navbar__content_wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import "./Navbar.scss";
export default {
  name: "Navbar ",
};
</script>
