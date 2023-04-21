<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="id">Id</label>
        <input
          type="text"
          class="form-control"
          id="id"
          required
          v-model="drum.id"
          name="id"
        />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="drum.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          class="form-control"
          id="price"
          required
          v-model="drum.price"
          name="price"
        />
      </div>
      <div class="form-group">
        <label for="size">Size</label>
        <input type="text" class="form-control" id="size" v-model="drum.size" />
      </div>
      <div class="form-group">
        <label for="wood_type">Material</label>
        <input
          type="text"
          class="form-control"
          id="wood_type"
          v-model="drum.wood_type"
        />
      </div>
      <div class="form-group">
        <label for="color">Color</label>
        <input
          type="text"
          class="form-control"
          id="color"
          v-model="drum.color"
        />
      </div>
      <div class="form-group">
        <label for="brand">Brand</label>
        <input
          type="text"
          class="form-control"
          id="brand"
          v-model="drum.brand"
        />
      </div>
      <div class="form-group">
        <label for="drum_type">Drum Category</label>
        <input
          type="text"
          class="form-control"
          id="drum_type"
          v-model="drum.drum_type"
        />
      </div>

      <button @click="saveDrum" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDrum">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DrumDataService from '@/services/DrumDataService';
import Drum from '@/types/Drum';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
  name: 'add-drum',
  data() {
    return {
      drum: {
        id: '',
        name: '',
        price: 0,
        size: '',
        wood_type: '',
        color: '',
        drum_type: '',
        brand: ''
      } as Drum,
      submitted: false
    };
  },
  methods: {
    saveDrum() {
      let data = {
        id: this.drum.id,
        name: this.drum.name,
        price: this.drum.price,
        size: this.drum.size,
        wood_type: this.drum.wood_type,
        color: this.drum.color,
        drum_type: this.drum.drum_type,
        brand: this.drum.brand
      };

      DrumDataService.create(data)
        .then((response: ResponseData) => {
          this.drum.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newDrum() {
      this.submitted = false;
      this.drum = {} as Drum;
    }
  }
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
