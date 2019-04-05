<template>
  <div>
    <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </div>
</template>

<script>
import stocks from '../../data/stocks-data';

import Stock from './Stock.vue';

export default {
    data() {
        return {
            stocks,
        };
    },
    components: {
        appStock: Stock,
    },
    computed: {
      stocks(){
        return this.$store.getters.stocks;
      },
    }
};
</script>
