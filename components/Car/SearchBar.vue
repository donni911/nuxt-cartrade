<template>
    <div
        class="w-full text-2xl flex flex-col md:flex-row justify-between overflow-hidden drop-shadow-2xl mx-auto gap-4"
    >
        <input
            type="text"
            class="py-3 px-5 w-full text-xl lg:text-2xl rounded-md focus:outline-none"
            :class="cityError ? 'border-red-500 border-2' : ''"
            placeholder="Search by city..."
            v-model="city"
            @keyup.enter="handleSearch"
        />
        <button
            class="bg-sky-500 px-10 py-2 text-white rounded-md"
            @click="handleSearch"
        >
            Search
        </button>
    </div>
</template>

<script setup>
const city = ref("");
const cityError = ref(false);

const handleSearch = () => {
    if (!city.value) {
        cityError.value = true;
    } else {
        cityError.value = false;
        navigateTo(`/city/${city.value}/car`);
    }
};
</script>