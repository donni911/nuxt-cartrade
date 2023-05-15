<template>
    <div
        class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
    >
        <img
            :src="favourite ? heartFilled : heartOutline"
            class="absolute w-7 right-5 top-2 z-20"
            alt=""
            @click="emit('favourite', car.id)"
        />
        <div class="flex h-full">
            <NuxtImg
                :src="car.image"
                :alt="car.name"
                class="w-[300px] h-full"
            />
            <div class="p-4 flex flex-col">
                <div>
                    <h1
                        class="text-2xl text-blue-700"
                        @click="navigateTo(`/car/${car.name}-${car.id}`)"
                    >
                        {{ car.name }}
                    </h1>
                    <p class="text-gray-700">
                        {{ car.description }}
                    </p>
                </div>
                <h1 class="mt-auto text-xl">${{ car.price }}</h1>
            </div>
        </div>
    </div>
</template>


<script setup>
import heartFilled from "@/assets/heartFilled.png";
import heartOutline from "@/assets/heartOutline.png";

const props = defineProps({ car: Object, favourite: Boolean });

const emit = defineEmits("favourite");
</script> 