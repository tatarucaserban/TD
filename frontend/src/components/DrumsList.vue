<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by drum category"
          v-model="drum_type"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="drum_type"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Drums List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(drum, index) in drums"
          :key="index"
          @click="setActiveDrum(drum, index)"
        >
          {{ drum.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDrums">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentDrum.id">
        <h4>Drum</h4>
        <div>
          <label><strong>Id:</strong></label> {{ currentDrum.id }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentDrum.name }}
        </div>
        <div>
          <label><strong>Price:</strong></label>
          {{ currentDrum.price }}
        </div>
        <div>
          <label><strong>Size:</strong></label>
          {{ currentDrum.size }}
        </div>
        <div>
          <label><strong>Material:</strong></label>
          {{ currentDrum.wood_type }}
        </div>
        <div>
          <label><strong>Color:</strong></label>
          {{ currentDrum.color }}
        </div>
        <div>
          <label><strong>Type:</strong></label>
          {{ currentDrum.drum_type }}
        </div>
        <div>
          <label><strong>Brand:</strong></label>
          {{ currentDrum.brand }}
        </div>

        <router-link
          :to="'/drums/' + currentDrum.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Drum...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DrumDataService from '@/services/DrumDataService';
import Drum from '@/types/Drum';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
  name: 'drums-list',
  data() {
    return {
      drums: [] as Drum[],
      currentDrum: {} as Drum,
      currentIndex: -1,
      id: '',
      drum_type: ''
    };
  },
  methods: {
    retrieveDrums() {
      DrumDataService.getAll()
        .then((response: ResponseData) => {
          this.drums = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDrums();
      this.currentDrum = {} as Drum;
      this.currentIndex = -1;
    },

    setActiveDrum(drum: Drum, index = -1) {
      this.currentDrum = drum;
      this.currentIndex = index;
    },

    removeAllDrums() {
      DrumDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchType() {
      DrumDataService.findByType(this.drum_type)
        .then((response: ResponseData) => {
          this.drums = response.data;
          this.setActiveDrum({} as Drum);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveDrums();
  }
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
