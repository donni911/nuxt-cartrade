<template>
    <div class="w-full">
        <CarCard
            v-for="car in cars"
            :key="car.id"
            :car="car"
            @favourite="handleFavourite"
            :favourite="car.id in favourite"
        />
    </div>
</template>

<script setup>
const props = defineProps({ cars: Array });

const favourite = useLocalStorage("favourite", {});

const handleFavourite = (id) => {
    if (id in favourite.value) {
        delete favourite.value[id];
    } else {
        favourite.value = {
            ...favourite.value,
            [id]: true,
        };
    }
};
</script>