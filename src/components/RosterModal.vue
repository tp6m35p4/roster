<template>
  <div
    class="modal fade"
    tabindex="-1"
    ref="modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div
      class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Duty</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-1">
          <div class="col">
            <roster-duty-card-item
              v-for="(duty, index) in roster.duties"
              :isToday="false"
              :duty="duty"
              :meta="roster.meta"
              :key="index"
            >
              <template #missions>
                <div class="row row-cols-1 row-cols-md-2 g-2">
                  <div
                    class="g-col-6 g-col-md-4"
                    v-for="mission in getMissionsInDuty(duty)"
                    :key="mission.id"
                  >
                    <roster-card-item :mission="mission"></roster-card-item>
                  </div>
                </div>
              </template>
            </roster-duty-card-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from "vue";
import RosterDutyCardItem from "./RosterDutyCardItem.vue";
import RosterCardItem from "./RosterCardItem.vue";
import { getMissionsInDuty } from "../utils/roster";
import Modal from "bootstrap/js/dist/modal";
const modal = useTemplateRef("modal");
const myModal = ref(null);
const props = defineProps({
  roster: {
    type: Object,
    default: () => ({}),
  },
});
defineExpose({
  showModal,
  hideModal,
});
onMounted(() => {
  myModal.value = new Modal(modal.value);
});

function showModal() {
  myModal.value.show();
}
function hideModal() {
  myModal.value.hide();
}
</script>

<style lang="scss" scoped></style>
