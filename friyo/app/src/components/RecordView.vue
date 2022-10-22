<script lang="ts" setup>
interface IProps {
  id: number;
  //data: any;
}

withDefaults(defineProps<IProps>(), {
  id: 0,
  //data: {},
});
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
                <p>John</p>
              </div>

              <div class="col-md-6">
                <small class="text-uppercase text-muted">Date of Birth</small>
                <p>11/11/1111</p>
              </div>

              <div class="col-md-6">
                <small class="text-uppercase text-muted">Medication</small>
                <p>Panadol</p>
              </div>
              <div class="col-md-6">
                <small class="text-uppercase text-muted"
                  >Medication count</small
                >
                <p>10/25</p>
              </div>
              <div class="col-md-6">
                <small class="text-uppercase text-muted">Prescription</small>
                <p>2/5</p>
              </div>
              <div class="col-md-6">
                <small class="text-uppercase text-muted">Name</small>
                <p>John</p>
              </div>
            </div>

            <hr />

            <div>
              <h5>Schedule</h5>
              <div class="row align-items-end">
                <div class="col-md-4">
                  <label>Frequency</label>
                  <input type="number" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label>Time</label>
                  <input type="time" class="form-control" />
                </div>
                <div class="col-md-4">
                  <button type="button" class="btn btn-outline-primary w-100">
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
                    <tr v-for="i in 10" :key="i">
                      <td scope="col">{{ i + 1 }}</td>
                      <td>1 day</td>
                      <td>10:00 AM</td>
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
                    <th scope="col">Scheduled Date Time</th>
                    <th scope="col">Taken Date Time</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 10" :key="i">
                    <td scope="col">{{ i + 1 }}</td>
                    <td>10/10/2022 10:00 AM</td>
                    <td>10/10/2022 10:00 AM</td>
                    <td>
                      <span class="badge bg-success text-white">On time</span>
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
