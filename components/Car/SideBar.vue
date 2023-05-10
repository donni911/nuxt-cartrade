<template>
    <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Location</h3>
            <h3
                class="text-blue-400 capitalize"
                @click="updateModal('location')"
            >
                {{ route.params.city }}
            </h3>
            <div
                v-if="modal.location"
                class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
            >
                <input
                    ref="myinput"
                    type="text"
                    class="border p-1 rounded"
                    v-model="city"
                    @keyup.enter="onChangeLocation"
                />
                <button
                    class="bg-blue-400 w-full mt-2 rounded text-white p-1"
                    @click="onChangeLocation"
                >
                    Apply
                </button>
            </div>
        </div>

        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Make</h3>
            <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
                {{ route.params.make || "Any" }}
            </h3>
            <div
                v-if="modal.make"
                class="absolute border shadow left-56 p-5 top-5 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
            >
                <h4
                    v-for="make in makes"
                    :key="make"
                    class="w-1/3"
                    @click="onChangeMake(make)"
                >
                    {{ make }}
                </h4>
            </div>
        </div>

        <div class="p-5 flex justify-between relative cursor-pointer">
            <h3>Price</h3>
            <h3 class="text-blue-400 capitalize"></h3>
        </div>
    </div>
</template>

<script setup>
const { makes } = useCars();

const route = useRoute();

const city = ref("");

const myinput = ref(null);

const modal = ref({
    make: false,
    location: false,
    price: false,
});

const updateModal = (key) => {
    modal.value[key] = !modal.value[key];

    nextTick(() => {
        if (modal.value.location) {
            myinput.value.focus();
        }
    });
};

const onChangeMake = (make) => {
    updateModal("make");
    navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onChangeLocation = () => {
    if (!city.value) {
        return;
    }

    if (!isNaN(+city.value)) {
        throw createError({
            statusCode: 404,
            message: "Invalid city format",
        });
    }

    updateModal("location");

    navigateTo(`/city/${city.value}/car/${route.params.make}`);
};
</script>