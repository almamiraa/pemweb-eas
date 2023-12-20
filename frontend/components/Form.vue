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
                  type="text"
                  id="nama"
                  v-model="formData.nama"
                  class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                  placeholder="Nama Lengkap"
                />
              </div>

              <!-- email -->
              <div class="flex flex-col">
                <label class="leading-loose">email</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                  placeholder="username@gmail.com"
                />
              </div>

              <!-- sekolah -->
              <div class="flex flex-col">
                <label class="leading-loose">Asal Sekolah</label>
                <input
                  type="text"
                  id="asal_sekolah"
                  v-model="formData.sekolah"
                  class="px-4 py-3 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 text-lg"
                  placeholder="Nama Sekolah"
                />
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Tanggal Pendaftaran</label>
                <input type="date" id="tanggal_pendaftaran" v-model="formData.tanggal" required class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
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
        nama: "",
        email: "",
        sekolah: "",
        tanggal: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const apiUrl = "http://localhost:3001/api/registrasi";

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const responseData = await response.json();

        console.log("sukses:", responseData);

        // Reset form setelah pengiriman
        this.formData = {
          nama: "",
          email: "",
          sekolah: "",
          tanggal: "",
        };
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
};
</script>
