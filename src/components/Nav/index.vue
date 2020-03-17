<template>
  <nav>
    <h1>即時口罩查詢</h1>
    <div class="search-group">
      <div class="custom-select">
        <select @change="changeCity($event)">
          <option v-for="item in cities" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="custom-select">
        <select @change="changeArea($event)">
          <option value>選擇行政區</option>
          <option v-for="item in areas" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import CityCountyData from "../../assets/CityCountyData.json";

export default {
  computed: {
    city() {
      return this.$store.getters["city"];
    },
    area() {
      return this.$store.getters["area"];
    }
  },
  data() {
    return {
      cities: [],
      areas: []
    };
  },
  mounted() {
    CityCountyData.forEach(element => {
      this.cities.push(element.CityName);
    });

    this.areas = this.filterArea();
  },
  methods: {
    filterArea(city = "臺北市") {
      let area = [];

      CityCountyData.filter(element => {
        return element.CityName === city;
      }).forEach(element => {
        element.AreaList.forEach(item => {
          area.push(item.AreaName);
        });
      });

      return area;
    },
    changeCity(event) {
      if (event.target.value === this.city) return;

      this.areas = this.filterArea(event.target.value);
      this.$store.commit("SET_CITY", event.target.value);
    },
    changeArea(event) {
      if (event.target.value === this.area) return;

      this.$store.commit("SET_AREA", event.target.value);
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  background: lightgray;
  position: sticky;
}

nav h1 {
  font-size: 25px;
  font-weight: 900;
  color: blue;
}

.search-group {
  display: flex;
}

.search-group .custom-select {
  margin: 0 15px;
}

.search-group select {
  padding: 5px 45px 5px 15px;
  border: 1px solid #aaa;
  border-radius: 10px;
  font-size: 15px;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.search-group .custom-select {
  position: relative;
}

.search-group .custom-select::after {
  content: "";
  width: 7px;
  height: 7px;
  position: absolute;
  top: 8px;
  right: 10px;
  border-left: 3px solid gray;
  border-bottom: 3px solid gray;
  transform: rotate(-45deg);
}
</style>