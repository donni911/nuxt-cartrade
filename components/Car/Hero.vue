<template>
    <div
        class="relative h-[calc(100vh-5rem)] w-100 bg-no-repeat bg-cover bg-bottom bg-[url('https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg')]"
    >
        <div
            class="z-10 absolute w-full h-full flex justify-center md:items-center px-4 pt-10"
        >
            <div class="text-center md:w-1/2">
                <h1 class="lg:text-8xl sm:text-6xl text-4xl mb-10 text-white">
                    Find your car
                </h1>
                <CarSearchBar />
            </div>
        </div>
        <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
    </div>
</template>
