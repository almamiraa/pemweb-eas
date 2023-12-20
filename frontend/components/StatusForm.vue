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

          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <form @submit.prevent="checkStatus">
                <div class="mb-4">
                  <label class="leading-loose"></label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                    placeholder="username@gmail.com"
                  />
                </div>
                <button type="submit" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Check</button>
              </form>

              <div v-if="status !== null" class="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h3 class="leading-relaxed">Status Pendaftaran:</h3>
                <p class="mt-1 text-base">{{ status }}</p>
              </div>
            </div>
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
              console.error("User not found.");
              this.status = "User not found.";
            }
          } else {
            console.error("Error fetching data.");
            this.status = "Error fetching data.";
          }
        } else {
          console.error("Failed to fetch status. Status code:", response.status);
          this.status = "Error fetching status. Please try again.";
        }
      } catch (error) {
        console.error("Error:", error);
        this.status = "An unexpected error occurred. Please try again.";
      }
    },
  },
};
</script>
