<template>
    <div
        ref="modal"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
    >
        <slot></slot>
    </div>
</template>

<script setup>
const modal = ref(null);

const emit = defineEmits("closeModal");

const props = defineProps({ isModalOpen: Boolean });

const onClickOutsideModal = (e) => {
    const isModalElement = e.composedPath().includes(modal.value);
    if (props.isModalOpen && !isModalElement) {
        emit("closeModal");
    }
};
onMounted(() => {
    document.addEventListener("click", onClickOutsideModal);
});
onUnmounted(() => {
    document.removeEventListener("click", onClickOutsideModal);
});
</script>