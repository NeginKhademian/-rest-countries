<template>
  <div class="home">
    <ABSekeletonVue v-if="fetching" />
    <div v-else>
      <span>
        <SearchBox />
        <FilterCountries
          @filtByRegion="(region) => (selectedRegion = region)"
          :regionList="regionList"
          @filterCountry="
            (updatedValue) => {
              searchValue = updatedValue;
              setUrlQueryParams({ ...params, searchValue });
            }
          "
          :searchValue="searchValue"
        />
      </span>
      <div class="country">
        <CountryItem :countryList="filterCountry" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setUrlQueryParams, getUrlQueryParams } from "@/utils";

import { defineAsyncComponent, ref, computed } from "@vue/runtime-core";
const components = {
  CountryItem: defineAsyncComponent(() =>
    import("@/components/CountryItem/CountryItem")
  ),
  ABSekeletonVue: defineAsyncComponent(() =>
    import("@/components/ui/ABSekeleton.vue")
  ),
  FilterCountries: defineAsyncComponent(() =>
    import("@/components/FilterCountries/FilterCountries.vue")
  ),
};
export default {
  name: "Home",
  components,
  setup() {
    const params = ref(getUrlQueryParams());
    const searchValue = ref(params.value.searchValue || "");
    const countryList = ref([]);
    const fetching = ref(false);
    const selectedRegion = ref(null);

    const apiQuery = () => {
      fetching.value = true;
      axios
        .get("https://restcountries.com/v2/all")
        .then(({ data }) => {
          countryList.value = data;
          fetching.value = false;
        })
        .catch((err) => {
          fetching.value = false;
          console.error(err);
        });
    };
    const filterCountry = computed(() =>
      (countryList.value || []).filter((item) => {
        if (searchValue.value || selectedRegion.value) {
          const searchTerm = searchValue.value
            ? item.name.toLowerCase().includes(searchValue.value.toLowerCase())
            : true;
          const hasSelectedRegion =
            selectedRegion.value && selectedRegion.value !== "All Regions"
              ? item.region
                  .toLowerCase()
                  .includes(selectedRegion.value.toLowerCase())
              : true;
          return searchTerm && hasSelectedRegion;
        } else {
          return true;
        }
      })
    );
    const regionList = computed(() => {
      return [
        "All Regions",
        ...new Set(countryList.value.map((country) => country.region)),
      ];
    });
    return {
      searchValue,
      countryList,
      fetching,
      selectedRegion,
      filterCountry,
      regionList,
      apiQuery,
      setUrlQueryParams,
      params,
    };
  },

  mounted() {
    this.apiQuery();
  },
};
</script>
<style scoped>
.home {
  padding-top: 30px;
}
.country {
  display: flex;
  flex-wrap: wrap;
  flex-wrap: wrap;
  padding-top: 40px;
}
</style>
