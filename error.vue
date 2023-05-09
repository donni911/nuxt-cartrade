<template>
    <div class="flex h-screen justify-center items-center flex-col">
        <h1 class="text-9xl">{{ error.statusCode }}</h1>
        <p class="mt-7 text-4xl">{{ error.statusMessage }}</p>
        <button
            class="rouded mt-7 text-2xl bg-blue-400 px-7 py-4 text-white"
            @click="handleButton"
        >
            Go Back
        </button>
    </div>
</template>

<script setup>
const router = useRouter();
const error = useError();

const handleButton = () => {
    router.back();
};
</script>