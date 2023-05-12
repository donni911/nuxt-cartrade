<template>
    <header
        class="sticky top-0 z-50 h-20 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
    >
        <NuxtLink to="/" class="text-3xl font-mono">cartrader</NuxtLink>

        <div v-if="user" class="flex">
            <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
            <p class="cursor-pointer" @click="logout">Logout</p>
        </div>
        <div v-else>
            <NuxtLink to="/login">Login</NuxtLink>
        </div>
    </header>
</template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
    const { error } = await supabase.auth.signOut();
    try {
        await $fetch("/api/_supabase/session", {
            method: "POST",
            body: { event: "SIGNED_OUT", session: null },
        });
    } catch (error) {
        console.log(error);
    }

    user.value = null;
    navigateTo("/");
};
</script>