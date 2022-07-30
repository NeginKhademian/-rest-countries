<template>
  <div class="search_wrapper">
    <div class="form-group">
      <input
        type="text"
        :placeholder="placeholder"
        :value="searchValue"
        @input="$emit('filterCountry', $event.target.value)"
      />
    </div>
    <div class="filter" @click="isClickHandler" tabindex="1" @blur="blurSome">
      <div class="filter-select">Filter by {{ selectedRegion }}</div>
      <i class="filter-icon icon-chevron-down" />
      <ul class="filter-options" v-show="state.isClick">
        <li
          v-for="region in state.regionList"
          :key="region"
          @click="filterByRegion(region)"
        >
          {{ region }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./FilterCoutries.scss";
import { setUrlQueryParams, getUrlQueryParams } from "@/utils";
import { reactive, ref, onMounted } from "vue";

export default {
  name: "FilterCountries",
  props: {
    regionList: Array,
    searchValue: String,
    placeholder: {
      type: String,
      default: "search for a country",
    },
  },
  emits: ["filtByRegion"],
  setup(props, { emit }) {
    const params = ref(getUrlQueryParams());
    const state = reactive({
      regionList: props.regionList,
      isClick: false,
    });
    const selectedRegion = ref("All Region");
    const filterByRegion = (region) => {
      setUrlQueryParams({ ...params.value, selectedRegion: region });
      selectedRegion.value = region;
      emit("filtByRegion", region);
    };
    const isClickHandler = (e) => {
      e.target.focus();
      state.isClick = !state.isClick;
    };

    const blurSome = () => {
      state.isClick = false;
    };
    onMounted(() => {
      params.value.selectedRegion &&
        filterByRegion(params.value.selectedRegion);
    });
    return {
      state,
      isClickHandler,
      blurSome,
      filterByRegion,
      selectedRegion,
    };
  },
};
</script>
