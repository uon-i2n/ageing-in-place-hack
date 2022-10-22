<script lang="ts" setup>
import { ref } from "vue";

const name = ref("");
const medication = ref("");
const volume = ref(25);
</script>

<template>
  <div>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#add-new-modal"
    >
      Add new
    </button>

    <div class="modal fade" id="add-new-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add new record</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label>Name</label>
                <input type="text" class="form-control" v-model="name" />
              </div>

              <div class="mb-3">
                <label>Medication</label>
                <input type="text" class="form-control" v-model="medication" />
              </div>

              <div class="mb-3">
                <label>Volume</label>
                <input type="number" class="form-control" v-model="volume" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
