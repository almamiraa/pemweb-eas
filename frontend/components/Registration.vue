<template>
  <div class="min-h-screen bg-blue-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-auto shadow rounded-3xl sm:p-10 max-w-2xl">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="h-14 w-14 bg-purple-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono"></div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Form Registrasi</h2>
              <p class="text-sm text-gray-500 font-normal leading-relaxed">Silahkan isi form di bawah ini</p>
            </div>
          </div>
          <!-- nama -->
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="flex flex-col">
                <label class="leading-loose">Nama</label>
                <input
                  v-model="formData.Nama"
                  type="text"
                  class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                  placeholder="Nama Lengkap"
                />
              </div>

              <!-- email -->
              <div class="flex flex-col">
                <label class="leading-loose">Email</label>
                <input
                  v-model="formData.Email"
                  type="text"
                  class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                  placeholder="username@gmail.com"
                />
              </div>

              <!-- sekolah -->
              <div class="flex flex-col">
                <label class="leading-loose">Asal Sekolah</label>
                <input
                  v-model="formData.Sekolah"
                  type="text"
                  class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                  placeholder="Nama Sekolah"
                />
              </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
              <button @click="submitForm" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Submit</button>
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
      formData: {
        Nama: "",
        Email: "",
        Sekolah: "",
      },
      backendData: {}, // To store data retrieved from the backend
    };
  },
  mounted() {
    this.fetchDataFromBackend();
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch("http://localhost:3001/api/regis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          console.log("Data successfully sent to backend!");
          // Reset form or perform other actions as needed
          this.formData = {
            Nama: "",
            Email: "",
            Sekolah: "",
          };

          // Optionally, fetch updated data from the backend
          this.fetchDataFromBackend();
        } else {
          console.error("Failed to send data to backend.");
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    },
    async fetchDataFromBackend() {
      try {
        const response = await fetch("http://localhost:3001/api/regis");
        const data = await response.json();

        // Assuming there is only one document in the response
        this.backendData = data.docs[0];
        console.log("Data retrieved from backend:", this.backendData);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    },
  },
};
</script>
