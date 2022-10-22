<script lang="ts" setup>
import axios from "axios";
import { reactive, ref } from "vue";

interface IProps {
  id: number;
  data: any;
}

const props = withDefaults(defineProps<IProps>(), {
  id: 0,
  data: {},
});

const frequency = ref(0);
const time = ref("");

const propsData = reactive(props.data);

const addSchedule = () => {
  axios
    .post(
      `http://localhost:8000/dashboard/patients/${propsData.id}/schedules`,
      {
        frequency: frequency.value,
        intakeTime: time.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((resp) => {
      console.log(resp.data.data);
      propsData.schedule = [...propsData.schedule, ...resp.data.data];
    });
};
</script>

<template>
  <div>
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      :data-bs-target="`#detail-modal-${id}`"
    >
      <BIconEye />
    </button>

    <div class="modal fade" :id="`detail-modal-${id}`" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detail</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-start">
            <div class="row">
              <div class="col-md-6">
                <small class="text-uppercase text-muted">Name</small>
                <p>{{ propsData.name }}</p>
              </div>

              <div class="col-md-6">
                <small class="text-uppercase text-muted">Date of Birth</small>
                <p>04/09/1789</p>
              </div>

              <div class="col-md-6">
                <small class="text-uppercase text-muted">Medication</small>
                <p>{{ propsData.medication }}</p>
              </div>
              <div class="col-md-6">
                <small class="text-uppercase text-muted">
                  Medication count
                </small>
                <p>25/50</p>
              </div>
              <div class="col-md-6">
                <small class="text-uppercase text-muted">Prescription</small>
                <p>2/5</p>
              </div>
            </div>

            <hr />

            <div>
              <h5>Schedule</h5>
              <div class="row align-items-end">
                <div class="col-md-4">
                  <label>Frequency</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="frequency"
                  />
                </div>
                <div class="col-md-4">
                  <label>Time</label>
                  <input type="time" class="form-control" v-model="time" />
                </div>
                <div class="col-md-4">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100"
                    @click="addSchedule"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div class="mt-3">
                <table class="table table-striped">
                  <thead>
                    <tr class="bg-dark text-white">
                      <th scope="col">#</th>
                      <th scope="col">Frequency</th>
                      <th scope="col">Time</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(schedule, i) in propsData.schedule" :key="i">
                      <td scope="col">{{ i + 1 }}</td>
                      <td>{{ schedule.frequency }} days</td>
                      <td>{{ schedule.intakeTime }}</td>
                      <td class="text-end">
                        <button type="button" class="btn text-danger">
                          <BIconTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <hr />

            <div class="">
              <h5>History</h5>
              <table class="table table-striped">
                <thead>
                  <tr class="bg-dark text-white">
                    <th scope="col">#</th>
                    <th scope="col">Medication name</th>
                    <th scope="col">Taken Date Time</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 10" :key="i">
                    <td scope="col">{{ i + 1 }}</td>
                    <td>Panadol</td>
                    <td>10/10/2022 9:45 AM</td>
                    <td>
                      <span
                        class="badge bg-warning text-white"
                        :class="{
                          'bg-success': i % 2 == 0,
                          'bg-danger': i % 3 == 0,
                        }"
                      >
                        <span v-if="i % 2 == 0">On Time</span>
                        <span v-if="i % 3 == 0">Missed</span>
                        <span v-else>Late</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
