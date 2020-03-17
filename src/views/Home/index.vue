<template>
  <div class="items">
    <div class="item" v-for="item in data" :key="item.properties.id">
      <div class="number-group">
        <div
          class="number"
          :class="[parseInt(item.properties.mask_adult) < 200 ? 'warning': 'safe']"
        >
          <p>
            成人口罩數量
            <span>{{ item.properties.mask_adult }}</span>
          </p>
        </div>
        <div
          class="number"
          :class="[parseInt(item.properties.mask_child) < 200 ? 'warning': 'safe']"
        >
          <p>
            兒童口罩數量
            <span>{{ item.properties.mask_child }}</span>
          </p>
        </div>
      </div>
      <h2>{{ item.properties.name }}</h2>
      <div class="address">
        <i class="fa fa-map-marker" aria-hidden="true"></i>
        <a
          :href="getGoogleMapsUrl(item.properties.address)"
          target="_blank"
        >{{ item.properties.address }}</a>
      </div>
      <div class="phone">
        <i class="fa fa-phone" aria-hidden="true"></i>
        <a
          :href="`tel:+886-${item.properties.phone.replace(' ', '').replace('0','')}`"
        >{{ item.properties.phone.replace(" ", "") }}</a>
      </div>
      <div class="note">
        <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
        <span>{{ item.properties.note }}</span>
      </div>
    </div>
  </div>
</template>

<script>
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
      data: [],
      api:
        "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR2jraChKjCWKiARv_FWarazc4xMwohZvJpZfiE5MeRWgUY-Zzdd-A6RzW4"
    };
  },
  mounted() {
    this.fetch(this.city, this.area);
  },
  methods: {
    fetch(city = "", area = "") {
      this.axios
        .get(this.api)
        .then(response => {
          this.data = response.data.features.filter(item => {
            return (
              item.properties.county.includes(city) &&
              item.properties.town.includes(area)
            );
          });
        })
        .catch(error => console.log(error));
    },
    getGoogleMapsUrl(val) {
      return `https://www.google.com/maps/search/?api=1&query=${val}`;
    }
  },
  watch: {
    city(val) {
      this.fetch(val, this.area);
    },
    area(val) {
      this.fetch(this.city, val);
    }
  }
};
</script>

<style scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.item {
  width: 100%;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  margin: 15px 10px 15px;
  box-shadow: 10px 5px 30px lightgray;
}

.item .number-group {
  display: flex;
}

.item .number {
  width: 45%;
  border-radius: 10px;
  margin: 0 10px;
  padding-left: 20px;
  color: white;
  font-weight: bold;
}

.item .number p {
  font-size: 14px;
}

.item .number span {
  display: block;
  margin-top: 10px;
  font-size: 30px;
  position: relative;
}
.item .number span::after {
  content: "片";
  font-size: 14px;
  position: absolute;
  bottom: 0;
}

.item .address,
.item .phone,
.item .note {
  margin: 15px 0;
  display: flex;
}

.item .fa {
  margin-right: 10px;
}

.item .address a,
.item .phone a {
  text-decoration: none;
  color: gray;
}

.item .address a:hover,
.item .phone a:hover {
  color: blue;
}

.item .note span {
  color: gray;
}

.safe {
  background-color: green;
}

.warning {
  background-color: red;
}

@media screen and (min-width: 767px) {
  .items {
    width: 1440px;
    margin: auto;
  }
  .item {
    width: 29%;
  }
}
</style>