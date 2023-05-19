<template>
<div class="col-md-6">
              <h3>Drums</h3>
              <table class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Size</th>
                          <th>Wood Type</th>
                          <th>Color</th>
                          <th>Drum Type</th>
                          <th>Brand</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="drum in drums" :key="drum.id">
                          <td>{{ drum.id }}</td>
                          <td>{{ drum.name }}</td>
                          <td>{{ drum.price }}</td>
                          <td>{{ drum.size }}</td>
                          <td>{{ drum.wood_type }}</td>
                          <td>{{ drum.color }}</td>
                          <td>{{ drum.drum_type }}</td>
                          <td>{{ drum.brand }}</td>
                      </tr>
                  </tbody>
              </table>
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
              }
              },
              mounted() {
                this.retrieveDrums();
              }
              });
              </script>