<template>
  <div class="country-item" v-for="country in countryList" :key="country.id">
    <div class="card_wrapper">
      <router-link :to="'/country/' + country.alpha3Code">
        <div class="country-image">
          <img :src="country.flag" loading="lazy" alt="country flag" />
        </div>
        <div class="country-title">
          <h2>
            {{ country.name }}
          </h2>
          <p>
            Population : <span>{{ formatNumber(country.population) }}</span>
          </p>
          <p>
            Region : <span>{{ country.region }}</span>
          </p>
          <p>
            Capital : <span>{{ country.capital }}</span>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import "./CountryItem.scss";
import { formatNumber } from "@/utils/index";
export default {
  name: "CountryItem",
  methods: { formatNumber },
  props: {
    countryList: {
      type: Object,
      required: true,
    },
  },
};
</script>
