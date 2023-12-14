import payload from "payload";

/** @type {import('payload/types').CollectionConfig} */
const Regis = {
  slug: "Regis",

  admin: {
    useAsTitle: "Nama",
  },

  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },

  fields: [
    {
      name: "Nama",
      label: "Nama",
      type: "text",
      required: true,
    },
    {
      name: "Email",
      label: "Email",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "Sekolah",
      label: "Sekolah",
      type: "text",
      required: true,
    },
    {
      name: "Status",
      label: "Status",
      type: "select",
      options: ["Waiting", "Rejected", "Accepted"],
      defaultValue: "Waiting", // Set the default value to "Waiting"
      required: true,
    },
    {
      name: "Tanggal",
      label: "Tanggal",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyy",
        },
      },
      required: true,
    },
  ],
};

export default Regis;
