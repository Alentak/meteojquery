<template>
  <div class="home">
    <header>
      <h1 class="text-8xl">Current weather</h1>
    </header>
    <main class="container-lg mt-4">
      <form
        class="flex flex-col gap-8 items-center"
        @submit.prevent="submitCity"
      >
        <h1 class="text-4xl text-center">Enter location</h1>
        <small
          >If displayed location isn't the right one, add a comma with the
          country code</small
        >
        <input
          type="text"
          class="text-center py-2"
          placeholder="Enter location"
          v-model="city"
        />
        <button
          type="submit"
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded-full
          "
        >
          See
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Home",
  components: {},
  setup() {
    const state = reactive({
      city: null,
    });
    const router = useRouter();

    const submitCity = () => {
      if (state.city)
        router.push({ name: "Current", params: { city: state.city } });
    };

    return { ...toRefs(state), submitCity };
  },
};
</script>
