<script lang="ts" setup>
import { ref } from "vue";
import SlideUnlock from "vue-slide-unlock";

const patientId = 1;
const dispense = ref(false);
const dispensed = ref(false);

const complete = () => {
  dispensed.value = true;
};
</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6 border rounded-lg p-5">
        <div v-if="dispense">
          <div v-if="dispensed" class="text-center display-1">💊</div>
          <div v-else>
            <slide-unlock
              ref="vueslideunlock"
              :auto-width="true"
              :circle="true"
              :disabled="false"
              :noanimate="false"
              :width="400"
              :height="60"
              text="slide to dispense"
              success-text="success"
              @completed="complete()"
            />
          </div>
        </div>
        <div v-else>
          <span class="text-">Last Taken</span>
          <p class="lead m-0">10/10/2022</p>
        </div>
      </div>
    </div>
  </div>
</template>
