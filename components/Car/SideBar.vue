<template>
    <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Location</h3>
            <h3
                class="text-blue-400 capitalize"
                @click.stop="updateModal('location')"
            >
                {{ route.params.city }}
            </h3>

            <UIModal
                v-if="modal.location"
                @closeModal="closeModal"
                :isModalOpen="isModalOpen"
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
            </UIModal>
        </div>

        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Make</h3>
            <h3
                class="text-blue-400 capitalize"
                @click.stop="updateModal('make')"
            >
                {{ route.params.make || "Any" }}
            </h3>
            <UIModal
                v-if="modal.make"
                @closeModal="closeModal"
                :isModalOpen="isModalOpen"
                class="flex justify-between flex-wrap w-[600px]"
            >
                <h4
                    v-for="make in makes"
                    :key="make"
                    class="w-1/3"
                    @click="onChangeMake(make)"
                >
                    {{ make }}
                </h4>
            </UIModal>
        </div>

        <div class="p-5 flex justify-between relative cursor-pointer">
            <h3>Price</h3>
            <h3
                class="text-blue-400 capitalize"
                @click.stop="updateModal('price')"
            >
                {{ priceRangeText }}
            </h3>
            <UIModal
                v-if="modal.price"
                @closeModal="closeModal"
                :isModalOpen="isModalOpen"
                ><input
                    type="number"
                    class="border p-1 rounded"
                    placeholder="Min"
                    v-model="priceRange.min"
                />
                <input
                    type="number"
                    class="border p-1 rounded"
                    placeholder="Max"
                    v-model="priceRange.max"
                />
                <button
                    class="bg-blue-400 w-full mt-2 roudned text-white p-1"
                    @click="onChangePrice"
                >
                    Apply
                </button>
            </UIModal>
        </div>
    </div>
</template>

<script setup>
const { makes } = useCars();

const route = useRoute();
const router = useRouter();

const city = ref("");

const isModalOpen = ref(false);

const myinput = ref(null);

const modal = ref({
    make: false,
    location: false,
    price: false,
});

const priceRangeText = computed(() => {
    const minPrice = route.query.minPrice;
    const maxPrice = route.query.maxPrice;

    if (!minPrice && !maxPrice) {
        return "Any";
    } else if (!minPrice && maxPrice) {
        return `<$${maxPrice}`;
    } else if (minPrice && !maxPrice) {
        return `>$${minPrice}`;
    } else {
        return `$${minPrice}-$${maxPrice}`;
    }
});

const priceRange = ref({ min: "", max: "" });

const updateModal = (key) => {
    for (const modalKey in modal.value) {
        if (key === modalKey) {
            modal.value[modalKey] = !modal.value[modalKey];
            isModalOpen.value = modal.value[modalKey];
        } else {
            modal.value[modalKey] = false;
        }
    }

    nextTick(() => {
        if (modal.value.location) {
            myinput.value.focus();
        }
    });
};

const closeModal = () => {
    for (const modalKey in modal.value) {
        modal.value[modalKey] = false;
    }
};

const onChangeMake = (make) => {
    updateModal("make");
    navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onChangePrice = () => {
    updateModal("price");
    if (priceRange.value.max && priceRange.value.min) {
        if (priceRange.value.min > priceRange.value.max) {
            return;
        }
    }
    router.push({
        query: {
            minPrice: priceRange.value.min,
            maxPrice: priceRange.value.max,
        },
    });
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