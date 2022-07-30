<template>
  <div>
    <template v-if="fetching">
      <ABSekeletonVue />
    </template>
    <template v-else>
      <router-link class="button" :to="router.options.history.state.back">
        <i class="icon-arrow-left2" /> back
      </router-link>
      <div class="card" v-if="state?.country">
        <div class="card_img">
          <img
            :src="state.country?.flags.svg"
            loading="lazy"
            alt="country flag"
          />
        </div>
        <div class="card_item">
          <h2 class="card_item__title">{{ state.country?.name.common }}</h2>
          <span class="d-flex">
            <span>
              <p>
                Native Name:
                <span>{{
                  Object.values(state.country?.name.nativeName)[0].official
                }}</span>
              </p>
              <p>
                Population:
                <span>{{ formatNumber(state.country?.population) }}</span>
              </p>
              <p>
                Region:
                <span>{{ state.country?.region }}</span>
              </p>
              <p>
                Sub Region:
                <span>{{ state.country?.subregion }}</span>
              </p>
              <p>
                Capital:
                <span>{{ state.country?.capital[0] }}</span>
              </p>
            </span>
            <span>
              <p>
                Currencies:
                <span>{{
                  Object.values(state.country?.currencies)[0].name
                }}</span>
              </p>
              <p>
                Languages:
                <span
                  :key="idx * 6"
                  v-for="(lang, idx) in Object.values(state.country?.languages)"
                  >{{ lang }}</span
                >
              </p>
            </span>
          </span>

          <div class="border">
            <h3>Border Countries</h3>
            <div class="border_list">
              <div class="border_tag">
                <router-link
                  v-for="country in state.border"
                  :key="country"
                  class="button"
                  :to="`/country/${country}`"
                >
                  {{ country }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import "./country.scss";
import {
  defineAsyncComponent,
  computed,
  reactive,
  ref,
  watchEffect,
} from "vue";
import { formatNumber } from "@/utils/index";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
export default {
  props: {
    country: {
      type: Object,
    },
    isDetail: Boolean,
  },
  components: {
    ABSekeletonVue: defineAsyncComponent(() =>
      import("@/components/ui/ABSekeleton.vue")
    ),
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const fetching = ref(false);
    const state = reactive({
      country: props.country,
      border: computed(() => state?.country?.borders?.slice(0, 3)),
    });
    watchEffect(() => {
      const alpha3Code = route.params.name;
      if (alpha3Code) {
        fetching.value = true;
        const url = `https://restcountries.com/v3.1/alpha/${alpha3Code}`;
        axios
          .get(url)
          .then(({ data }) => {
            state.country = data[0];
            fetching.value = false;
          })
          .catch(() => (fetching.value = false));
      }
    });
    return {
      state,
      formatNumber,
      fetching,
      router,
    };
  },
};
</script>
