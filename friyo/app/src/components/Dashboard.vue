<script lang="ts" setup>
import { DateTime } from "luxon";
import RecordAddNew from "./RecordAddNew.vue";
import RecordView from "./RecordView.vue";

import axios from "axios";
import { ref } from "vue";

const data: any = ref([]);

const appendRecord = (val: any) => {
  data.value.push(val);
};

axios
  .get("http://localhost:8000/dashboard/patients", {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((resp) => {
    data.value = resp.data.data;
  });
</script>

<template>
  <div>
    <nav class="navbar bg-dark">
      <div class="container py-3 text-white">
        <span class="text-white h3 m-0">Friyo Dashboard</span>
        <div>Welcome, Bob</div>
      </div>
    </nav>
    <div class="container my-3">
      <nav class="navbar mb-3">
        <span class="navbar-brand">Your patients</span>
        <RecordAddNew @saved="appendRecord" />
      </nav>
      <table class="table table-striped">
        <thead>
          <tr class="bg-dark text-white">
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Medication</th>
            <th scope="col">Last Taken at</th>
            <th scope="col">Status</th>
            <th scope="col">Pill Count</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, i) in data" :key="i">
            <td scope="col">{{ i + 1 }}</td>
            <td>{{ val.id }}</td>
            <td>{{ val.name }}</td>
            <td>{{ val.medication }}</td>
            <td>{{ val.taken_at }}</td>
            <td>
              <span
                :class="{
                  'badge bg-danger': val.status === 'Missed',
                  'badge bg-success': val.status === 'On time',
                  'badge bg-warning': val.status === 'Late',
                }"
                >{{ val.status }}</span
              >
            </td>
            <td>25/50</td>
            <td class="text-end">
              <RecordView :id="i" :data="val" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
