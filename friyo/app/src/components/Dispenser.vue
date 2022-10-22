<script lang="ts" setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import SlideUnlock from "vue-slide-unlock";

const patientId = ref(0);
const patientIdInput = ref("");
const dispense = ref(false);
const dispensed = ref(false);

const patientData = ref({});

const complete = () => {
  dispensed.value = true;
  axios.post(
    `http://localhost:8000/dashboard/patients/${patientId.value}/dispense/1`
  );
  setTimeout(() => {
    dispense.value = false;
    dispensed.value = false;
  }, 3000);
};

const login = () => {
  patientId.value = parseInt(patientIdInput.value);
  setTimeout(() => {
    dispense.value = true;
  }, 3000);

  // setInterval(() => {
  //   axios
  //     .get(`http://locahost:8000/dashboard/patients/${patientId.value}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //     });
  // }, 100);
};
</script>

<template>
  <div class="container vh-100">
    <div class="row justify-content-center h-100 align-items-center">
      <div class="col-md-12 border rounded-lg p-5">
        <div v-if="patientId == 0">
          <input
            type="text"
            class="form-control"
            placeholder="Patient ID"
            v-model="patientIdInput"
          />
          <button class="btn btn-primary mt-3 px-5" @click="login">
            Login
          </button>
        </div>
        <div v-else>
          <div v-if="dispense">
            <div v-if="dispensed" class="text-center display-1">💊</div>
            <div v-else>
              <slide-unlock
                ref="vueslideunlock"
                :auto-width="true"
                :circle="true"
                :disabled="false"
                :noanimate="false"
                text="slide to dispense"
                success-text="success"
                @completed="complete()"
              />
            </div>
          </div>
          <div v-else>
            <span class="text-">Last Taken</span>
            <p class="lead m-0">10/10/2022 10:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
