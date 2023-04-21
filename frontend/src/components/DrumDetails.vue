<template>
  <div v-if="currentDrum.id" class="edit-form">
    <h4>Drum</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentDrum.name"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="text"
          class="form-control"
          id="price"
          v-model="currentDrum.price"
        />
      </div>
      <div class="form-group">
        <label for="size">Size</label>
        <input
          type="text"
          class="form-control"
          id="size"
          v-model="currentDrum.size"
        />
      </div>
      <div class="form-group">
        <label for="wood_type">Material</label>
        <input
          type="text"
          class="form-control"
          id="wood_type"
          v-model="currentDrum.wood_type"
        />
      </div>
      <div class="form-group">
        <label for="color">Color</label>
        <input
          type="text"
          class="form-control"
          id="color"
          v-model="currentDrum.color"
        />
      </div>
      <div class="form-group">
        <label for="brand">Brand</label>
        <input
          type="text"
          class="form-control"
          id="brand"
          v-model="currentDrum.brand"
        />
      </div>
      <div class="form-group">
        <label for="drum_type">Drum Category</label>
        <input
          type="text"
          class="form-control"
          id="drum_type"
          v-model="currentDrum.drum_type"
        />
      </div>

      <!--<button
      class="badge badge-primary mr-2"
      v-if="currentDrum.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>-->

      <button class="badge badge-danger mr-2" @click="deleteDrum">
        Delete
      </button>

      <button type="submit" class="badge badge-success" @click="updateDrum">
        Update
      </button>
      <p>{{ message }}</p>
    </form>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Drum...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DrumDataService from '@/services/DrumDataService';
import Drum from '@/types/Drum';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
  name: 'tutorial',
  data() {
    return {
      currentDrum: {} as Drum,
      message: ''
    };
  },
  methods: {
    getDrum(id: any) {
      DrumDataService.get(id)
        .then((response: ResponseData) => {
          this.currentDrum = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    /* updatePublished(status: boolean) {
      let data = {
        id: this.currentDrum.id,
        title: this.currentDrum.title,
        description: this.currentDrum.description,
        published: status,
      };

      DrumDataService.update(this.currentDrum.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentDrum.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },*/

    updateDrum() {
      DrumDataService.update(this.currentDrum.id, this.currentDrum)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteDrum() {
      DrumDataService.delete(this.currentDrum.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: 'drums' });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getDrum(this.$route.params.id);
  }
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
