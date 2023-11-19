<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md countries-list-page">
      <q-table :filter-method="customFilter" grid grid-header flat bordered :rows="rows" :columns="columns"
        row-key="index" :filter="searchItems" hide-header :rows-per-page-options="[0]" virtual-scroll
        :pagination="pagination" :loading=tableLoading>
        <template v-slot:top="props">
          <div class="flex table-top-slot">
            <q-input class="table-search" borderless dense filled debounce="300" v-model="searchItems"
              placeholder="Search">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-select @update:model-value="filterItemsByRegion" borderless dense clearable clear-icon="close"
              v-model="regionFilter" filled :options="options" label="Region" class="table-region-filter" />
          </div>

        </template>
        <template v-slot:item="props">

          <div class="q-pa-md row items-start q-gutter-md q-mx-auto">
            <q-card @click="goTOCountry(props.row.cca3)" class="country-card">
              <img class="country-card-image" :src=props.row.flag>

              <q-card-section class="q-pb-none">
                <!-- <div class="text-h6 text-bold">{{ props.row.name.common }}</div> -->
                <div class="text-subtitle1 text-bold">{{ props.row.name }}</div>
              </q-card-section>
              <q-card-section>
                <div class="text-subtitle2">Population:
                  <span class="text-weight-light">
                    {{ props.row.population.toLocaleString() }}
                  </span>
                </div>
                <div class="text-subtitle2">Region:
                  <span class="text-weight-light">
                    {{ props.row.region }}
                  </span>
                </div>
                <div class="text-subtitle2">Capital:
                  <span class="text-weight-light">
                    {{ props.row.capital }}
                  </span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>

      </q-table>
    </div>

  </q-page>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const rows = ref([])
const tableLoading = ref(false)
const pagination = ref({
  rowsPerPage: 0
})

const regionFilter = ref(null)

const searchItems = ref('')

const columns = ref([
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'population', label: 'Population', field: 'population', sortable: true, align: 'left' },
  { name: 'region', label: 'Region', field: 'region', sortable: true, align: 'left' },
  { name: 'capital', label: 'Capital', field: 'capital', align: 'left' },
])

const options = ref([
  'Africa', 'Asia', 'Americas', 'Europe', 'Oceania'
])

const filterItemsByRegion = (newRegion) => {
  if (newRegion) {
    router.push({ name: 'countryList', query: { regionFilter: newRegion } })
  } else {
    router.push({ name: 'countryList' })
  }
}

const getAllCountries = () => {
  tableLoading.value = true

  api.get('/all')
    .then((response) => {
      rows.value = mapOnRawData(response.data)
      tableLoading.value = false

    })
}

const getRegionalCountries = (region) => {
  tableLoading.value = true
  api.get(`/region/${region}`)
    .then((response) => {
      rows.value = mapOnRawData(response.data)
      tableLoading.value = false
    })
}

const mapOnRawData = (rawData) => {
  return rawData.map((row, index) => {
    return {
      index: index,
      capital: row.capital?.[0],
      region: row.region,
      population: row.population,
      name: row.name.common,
      flag: row.flags.png,
      cca3: row.cca3,
    }
  })
}


const goTOCountry = (cca3) => {
  router.push({ name: 'countryDetail', params: { cca3: cca3 } })
}


const customFilter = (rows, terms) => {
  const filteredRows = rows.filter((row) => {
    return row.name.toLowerCase().includes(terms.toLowerCase())
  })
  return filteredRows
}

const regionFilterQueryWatcher = () => {
  watch(() => route.query, (newRegion) => {
    if (newRegion.regionFilter) {
      getRegionalCountries(newRegion.regionFilter)
    } else {
      getAllCountries()
    }
  }, { immediate: true })
}

onMounted(() => {
  getAllCountries()
  regionFilter.value = route.query.regionFilter || null
  regionFilterQueryWatcher()
})

</script>
<style scoped>
.countries-list-page {
  padding-left: 32px;
  padding-right: 32px;
}

.table-region-filter {
  width: 15em;
}

.table-search {
  width: 15em;
}

.table-top-slot {
  width: 100%;
  justify-content: space-between;
  gap: 1em;
}

.country-card {
  width: 100%;
  max-width: 250px;
  width: 250px;
  cursor: pointer;
  border: none;
  box-shadow: none;
}

.country-card-image {
  height: 167px;
  object-fit: cover;


  @media only screen and (max-width: 600px) {
    .countries-list-page {
      padding: 0
    }

    .countries-list-page {
      padding: 0;
    }
  }
}
</style>
