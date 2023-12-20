<template>
  <div class="min-h-screen bg-blue-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-auto shadow rounded-3xl sm:p-10 max-w-2xl">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Cek Status Pendaftaran</h2>
            </div>
          </div>
          <form @submit.prevent="checkStatus">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-600"></label>
              <input type="email" id="email" v-model="email" required class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Check</button>
          </form>

          <div v-if="status !== null" class="mt-4">
            <h3 class="text-lg font-semibold">Status Pendaftaran:</h3>
            <p class="mt-2">{{ status }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      status: null,
    };
  },
  methods: {
    async checkStatus() {
      try {
        const apiUrl = `http://localhost:3001/api/registrasi?email=${this.email}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);

          if (responseData.docs && responseData.docs.length > 0) {
            const userDocument = responseData.docs.find((doc) => doc.email === this.email);

            if (userDocument) {
              this.status = userDocument.status;
            } else {
              console.error("Error.");
            }
          } else {
            console.error("Error.");
          }
        } else {
          console.error("Failed to fetch status. Status code:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
