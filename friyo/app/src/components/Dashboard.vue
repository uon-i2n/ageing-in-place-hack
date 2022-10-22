<script lang="ts" setup>
import { DateTime } from "luxon";
import RecordAddNew from "./RecordAddNew.vue";
import RecordView from "./RecordView.vue";

const data = [
  {
    name: "John",
    medication: "Panadol",
    taken_at: DateTime.now(),
    next_at: DateTime.now(),
    status: "On time",
  },
  {
    name: "Lucifer",
    medication: "Panadol",
    taken_at: DateTime.now(),
    next_at: DateTime.now(),
    status: "Missed",
  },
  {
    name: "John",
    medication: "Panadol",
    taken_at: DateTime.now(),
    next_at: DateTime.now(),
    status: "Late",
  },
];
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
        <RecordAddNew />
      </nav>
      <table class="table table-striped">
        <thead>
          <tr class="bg-dark text-white">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Medication</th>
            <th scope="col">Taken at</th>
            <th scope="col">Next at</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, i) in data" :key="i">
            <td scope="col">{{ i + 1 }}</td>
            <td>{{ val.name }}</td>
            <td>{{ val.medication }}</td>
            <td>{{ val.taken_at }}</td>
            <td>{{ val.next_at }}</td>
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
            <td class="text-end">
              <RecordView :id="i" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
