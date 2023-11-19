<template>
  <div class="q-pa-xl q-gutter-sm">
    <q-btn @click="goBack" icon="west" label="Back" class="back-button" />

    <q-card v-if="country" class="card">
      <q-card-section horizontal class="card-body">
        <q-img class="col-5 card-image" :src=country.flags.png />
        <div class="country-detail">
          <div class="country-detail-top">
            <div>
              <p class="text-h5 text-bold">
                {{ country.name.common }}
              </p>
              <p class="text-subtitle2">
                Native Name: <span class="text-weight-light">{{ country.translations.nld.common }}</span>
              </p>
              <p class="text-subtitle2">
                Population: <span class="text-weight-light">{{ country.population.toLocaleString() }}</span>
              </p>
              <p class="text-subtitle2">
                Region: <span class="text-weight-light">{{ country.region }}</span>
              </p>
              <p class="text-subtitle2">
                Sub Region: <span class="text-weight-light">{{ country.subregion }}</span>
              </p>
              <p class="text-subtitle2">
                Capital: <span class="text-weight-light">{{ country.capital[0] }}</span>
              </p>
            </div>
            <div>
              <p class="text-subtitle2">
                Top Level Domain:Capital: <span class="text-weight-light">{{ country.tld[0] }}</span>
              </p>
              <p class="text-subtitle2">
                Currencies: <span class="text-weight-light">{{ countryCurrencies }}</span>
              </p>
              <p class="text-subtitle2">
                Languages: <span class="text-weight-light">{{ countryLanguages }}</span>
              </p>
            </div>
          </div>
          <div class="country-detail-bottom">
            <p class="text-subtitle2 q-my-auto">
              Border countries:
            </p>
            <span class="flex country-border"><q-btn @click="goToCountryBorder(item)"
                v-for="(item, index) in country.borders" :key="index" class="text-weight-light" :label="item">
              </q-btn></span>
          </div>
        </div>
      </q-card-section>

    </q-card>



  </div>
  <loading :loading="loading" />
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios'
import { useRouter, useRoute } from 'vue-router';
import Loading from 'src/components/Loading.vue';

const router = useRouter()
const route = useRoute()
const loading = ref(false)

const cca3 = route.params.cca3
const country = ref(null)
const countryCurrencies = computed(() => {
  if (country) {
    return Object.keys(country.value.currencies).map((item) => {
      return country.value.currencies[item].name
    }).join(', ')
  }
})
const countryLanguages = computed(() => {
  if (country) {
    return Object.keys(country.value.languages).map((item) => {
      return country.value.languages[item]
    }).join(', ')
  }
})
const getCountryByCCA3 = (cca3) => {
  loading.value = true
  api.get(`/alpha?codes=${cca3}`)
    .then((response) => {
      country.value = response.data[0]
      loading.value = false
    }).catch((e) => {
      if (e.response.status == 400) {
        router.push({ name: '404' })
      }
    })
}
const goToCountryBorder = (borderCCA3) => {
  router.push({ name: 'countryDetail', params: { cca3: borderCCA3 } })
}
const goBack = () => {
  router.back()
}

const watchCCA3RouteParam = () => {
  watch(
    () => route.params,
    (toParams) => {
      if (toParams.cca3)
        getCountryByCCA3(toParams.cca3)
    }
  )
}
onMounted(() => {
  getCountryByCCA3(cca3)
  watchCCA3RouteParam()
})
</script>
<style scoped>
.card {
  min-width: 100%;
  border: none;
  box-shadow: none;
  background-color: transparent;
}

.country-border {
  gap: 1em;
}

.country-detail-bottom {
  display: flex;
  gap: 1em;
}

.country-detail {
  display: flex;
  flex-direction: column;
}

.country-detail-top {
  display: flex;
  gap: 100px
}

.card-body {
  gap: 75px;
  background-color: transparent;
  border: none;
}

.back-button {
  margin-bottom: 3rem;
}

@media only screen and (max-width:800px) {

  .country-detail-top {
    flex-direction: column;
    gap: 50px;
  }

  .card-body {
    flex-direction: column;
  }

  .card-image {
    width: 100%
  }
}
</style>
