// export const productsData = [
//   {
//     id: 1,
//     name: "Zuqo Men's Half Shoe 1",
//     price: 1500,
//     productVariants: [
//       {
//         id: 1,
//         sku: "000001",
//         color: "Black",
//         images: [
//           "https://zuqo.shop/cdn/shop/files/Untitled_design_5892ef80-c5ac-4cf0-9408-29777e079781.png?v=1772969048&width=324",
//           "https://zuqo.shop/cdn/shop/files/Untitled_design_9_c586fe91-b8a7-40e3-83a9-5a39b8d30472.png?v=1786300710&width=1946",
//           "https://zuqo.shop/cdn/shop/files/Untitled_design_8_56e88b71-b230-4d97-b236-205534d6d77c.png?v=1786300711&width=324",
//         ],
//         videos: [
//           "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/fb9588c5-0699-4117-9f35-a8bd67a29185/default.jobtemplate.mp4.480.mp4",
//         ],
//         sizes: {
//           39: 1,
//           40: 1,
//           41: 1,
//           42: 5,
//           43: 6,
//           44: 7,
//           45: 11,
//         },
//       },
//       {
//         id: 2,
//         sku: "000002",
//         color: "White",
//         images: [
//           "https://m.media-amazon.com/images/I/81TnPk42c5L._AC_SY550_.jpg",
//           "https://m.media-amazon.com/images/I/71C1TUBF+WL._AC_SY550_.jpg",
//           "https://m.media-amazon.com/images/I/71cx9VYbYAL._AC_SY550_.jpg",
//         ],
//         videos: [
//           "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/fb9588c5-0699-4117-9f35-a8bd67a29185/default.jobtemplate.mp4.480.mp4",
//         ],
//         sizes: {
//           39: 10,
//           40: 0,
//           41: 0,
//           42: 0,
//           43: 2,
//           44: 3,
//           45: 0,
//         },
//       },
//     ],
//     description: `
// <b> Zuqo Half Shoe – Black Canvas </b>
// <p>
// গরমের দিনে sneaker-এর smart বিকল্প — Zuqo Half Shoe তৈরি canvas fabric upper দিয়ে, যা breathable ও lightweight। EVA sole দেয় soft, cushioned step, যা সারাদিনের হাঁটাচলায় আরামদায়ক রাখে পা।
// Quick slip-on style, কোনো lace ঝামেলা নেই — বাসা থেকে বাইরের কাজ, সবখানেই easy, everyday comfort।</p>`,
//   },
// ];

export const productsDummyData = [
  {
    id: 1,
    name: "Zuqo Men's Half Shoe 1",
    price: 1500,
    productVariants: [
      {
        id: 1,
        sku: "000001",
        color: "Black",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
        ],
        videos: ["https://cdn.example.com/videos/product-001.mp4"],
        sizes: {
          39: 1,
          40: 1,
          41: 1,
          42: 5,
          43: 6,
          44: 7,
          45: 11,
        },
      },
      {
        id: 2,
        sku: "000002",
        color: "White",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        ],
        videos: ["https://cdn.example.com/videos/product-002.mp4"],
        sizes: {
          39: 10,
          40: 4,
          41: 3,
          42: 8,
          43: 2,
          44: 3,
          45: 5,
        },
      },
    ],
    description: `
      <b>Zuqo Half Shoe – Black Canvas</b>
      <p>গরমের দিনে sneaker-এর smart বিকল্প — breathable canvas upper এবং lightweight EVA sole দিয়ে তৈরি।</p>
    `,
  },

  {
    id: 2,
    name: "Zuqo Men's Casual Loafer 2",
    price: 1650,
    productVariants: [
      {
        id: 3,
        sku: "000003",
        color: "Brown",
        images: [
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f",
          "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
        ],
        videos: ["https://cdn.example.com/videos/product-003.mp4"],
        sizes: {
          39: 3,
          40: 5,
          41: 7,
          42: 4,
          43: 8,
          44: 6,
          45: 2,
        },
      },
      {
        id: 4,
        sku: "000004",
        color: "Tan",
        images: [
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509",
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
        ],
        videos: ["https://cdn.example.com/videos/product-004.mp4"],
        sizes: {
          39: 2,
          40: 6,
          41: 4,
          42: 9,
          43: 5,
          44: 3,
          45: 1,
        },
      },
    ],
    description: `
      <b>Zuqo Casual Loafer – Brown</b>
      <p>Classic casual loafer with a comfortable sole and elegant finish. Perfect for office and everyday wear.</p>
    `,
  },

  {
    id: 3,
    name: "Zuqo Men's Premium Sneaker 3",
    price: 2200,
    productVariants: [
      {
        id: 5,
        sku: "000005",
        color: "Navy Blue",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
          "https://images.unsplash.com/photo-1554568218-0f1715e72254",
        ],
        videos: ["https://cdn.example.com/videos/product-005.mp4"],
        sizes: {
          39: 5,
          40: 8,
          41: 12,
          42: 10,
          43: 6,
          44: 4,
          45: 3,
        },
      },
      {
        id: 6,
        sku: "000006",
        color: "Grey",
        images: [
          "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        ],
        videos: ["https://cdn.example.com/videos/product-006.mp4"],
        sizes: {
          39: 4,
          40: 7,
          41: 9,
          42: 11,
          43: 5,
          44: 2,
          45: 1,
        },
      },
    ],
    description: `
      <b>Zuqo Premium Sneaker – Navy Blue</b>
      <p>A modern everyday sneaker designed with a lightweight upper and cushioned sole for comfortable walking.</p>
    `,
  },

  {
    id: 4,
    name: "Zuqo Men's Street Sneaker 4",
    price: 1950,
    productVariants: [
      {
        id: 7,
        sku: "000007",
        color: "Red",
        images: [
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        ],
        videos: ["https://cdn.example.com/videos/product-007.mp4"],
        sizes: {
          39: 2,
          40: 4,
          41: 8,
          42: 6,
          43: 4,
          44: 3,
          45: 2,
        },
      },
      {
        id: 8,
        sku: "000008",
        color: "Black",
        images: [
          "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
          "https://images.unsplash.com/photo-1554137931-4f8b3c6f5c2f",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        ],
        videos: ["https://cdn.example.com/videos/product-008.mp4"],
        sizes: {
          39: 6,
          40: 9,
          41: 5,
          42: 7,
          43: 8,
          44: 4,
          45: 3,
        },
      },
    ],
    description: `
      <b>Zuqo Street Sneaker – Red</b>
      <p>Bold streetwear sneaker with a sporty silhouette, soft inner lining and flexible rubber outsole.</p>
    `,
  },

  {
    id: 5,
    name: "Zuqo Men's Comfort Sandal 5",
    price: 1100,
    productVariants: [
      {
        id: 9,
        sku: "000009",
        color: "Black",
        images: [
          "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
          "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
          "https://images.unsplash.com/photo-1553627371-9d2d9f3c5c52",
        ],
        videos: ["https://cdn.example.com/videos/product-009.mp4"],
        sizes: {
          39: 8,
          40: 12,
          41: 15,
          42: 10,
          43: 8,
          44: 5,
          45: 4,
        },
      },
    ],
    description: `
      <b>Zuqo Comfort Sandal – Black</b>
      <p>Lightweight everyday sandal with a soft footbed and durable outsole for comfortable outdoor use.</p>
    `,
  },

  {
    id: 6,
    name: "Zuqo Men's Formal Derby 6",
    price: 2400,
    productVariants: [
      {
        id: 10,
        sku: "000010",
        color: "Dark Brown",
        images: [
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
        ],
        videos: ["https://cdn.example.com/videos/product-010.mp4"],
        sizes: {
          39: 1,
          40: 3,
          41: 5,
          42: 7,
          43: 5,
          44: 4,
          45: 2,
        },
      },
      {
        id: 11,
        sku: "000011",
        color: "Black",
        images: [
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
        ],
        videos: ["https://cdn.example.com/videos/product-011.mp4"],
        sizes: {
          39: 2,
          40: 4,
          41: 6,
          42: 8,
          43: 7,
          44: 3,
          45: 1,
        },
      },
    ],
    description: `
      <b>Zuqo Formal Derby – Dark Brown</b>
      <p>A sophisticated derby shoe designed for office meetings, formal events and smart occasions.</p>
    `,
  },

  {
    id: 7,
    name: "Zuqo Men's Canvas Sneaker 7",
    price: 1750,
    productVariants: [
      {
        id: 12,
        sku: "000012",
        color: "Olive",
        images: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
          "https://images.unsplash.com/photo-1554137931-4f8b3c6f5c2f",
          "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
        ],
        videos: ["https://cdn.example.com/videos/product-012.mp4"],
        sizes: {
          39: 4,
          40: 6,
          41: 10,
          42: 8,
          43: 6,
          44: 5,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Canvas Sneaker – Olive</b>
      <p>Breathable canvas sneaker with a clean casual design suitable for daily city wear.</p>
    `,
  },

  {
    id: 8,
    name: "Zuqo Men's Running Shoe 8",
    price: 2600,
    productVariants: [
      {
        id: 13,
        sku: "000013",
        color: "Blue",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        ],
        videos: ["https://cdn.example.com/videos/product-013.mp4"],
        sizes: {
          39: 3,
          40: 5,
          41: 9,
          42: 12,
          43: 10,
          44: 6,
          45: 4,
        },
      },
      {
        id: 14,
        sku: "000014",
        color: "Orange",
        images: [
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
        ],
        videos: ["https://cdn.example.com/videos/product-014.mp4"],
        sizes: {
          39: 2,
          40: 4,
          41: 6,
          42: 9,
          43: 7,
          44: 5,
          45: 3,
        },
      },
    ],
    description: `
      <b>Zuqo Running Shoe – Blue</b>
      <p>Sport-inspired running shoe with responsive cushioning and breathable construction for active days.</p>
    `,
  },

  {
    id: 9,
    name: "Zuqo Men's Slip-On 9",
    price: 1450,
    productVariants: [
      {
        id: 15,
        sku: "000015",
        color: "Beige",
        images: [
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509",
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
        ],
        videos: ["https://cdn.example.com/videos/product-015.mp4"],
        sizes: {
          39: 5,
          40: 8,
          41: 6,
          42: 10,
          43: 5,
          44: 3,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Slip-On – Beige</b>
      <p>Simple slip-on footwear designed for quick everyday use with a soft and flexible construction.</p>
    `,
  },

  {
    id: 10,
    name: "Zuqo Men's Outdoor Shoe 10",
    price: 2800,
    productVariants: [
      {
        id: 16,
        sku: "000016",
        color: "Charcoal",
        images: [
          "https://images.unsplash.com/photo-1554137931-4f8b3c6f5c2f",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        ],
        videos: ["https://cdn.example.com/videos/product-016.mp4"],
        sizes: {
          39: 2,
          40: 5,
          41: 8,
          42: 11,
          43: 9,
          44: 6,
          45: 4,
        },
      },
    ],
    description: `
      <b>Zuqo Outdoor Shoe – Charcoal</b>
      <p>Durable outdoor footwear with enhanced grip and supportive cushioning for long walks and travel.</p>
    `,
  },

  {
    id: 11,
    name: "Zuqo Men's Classic Loafer 11",
    price: 1850,
    productVariants: [
      {
        id: 17,
        sku: "000017",
        color: "Wine",
        images: [
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
        ],
        videos: ["https://cdn.example.com/videos/product-017.mp4"],
        sizes: {
          39: 1,
          40: 3,
          41: 6,
          42: 8,
          43: 7,
          44: 4,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Classic Loafer – Wine</b>
      <p>Elegant loafer with a timeless silhouette and comfortable construction for smart casual outfits.</p>
    `,
  },

  {
    id: 12,
    name: "Zuqo Men's Mesh Sneaker 12",
    price: 2100,
    productVariants: [
      {
        id: 18,
        sku: "000018",
        color: "Light Grey",
        images: [
          "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
          "https://images.unsplash.com/photo-1554137931-4f8b3c6f5c2f",
        ],
        videos: ["https://cdn.example.com/videos/product-018.mp4"],
        sizes: {
          39: 6,
          40: 9,
          41: 11,
          42: 7,
          43: 6,
          44: 4,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Mesh Sneaker – Light Grey</b>
      <p>Airy mesh upper provides excellent breathability while the cushioned sole keeps every step comfortable.</p>
    `,
  },

  {
    id: 13,
    name: "Zuqo Men's Daily Sneaker 13",
    price: 1600,
    productVariants: [
      {
        id: 19,
        sku: "000019",
        color: "Green",
        images: [
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        ],
        videos: ["https://cdn.example.com/videos/product-019.mp4"],
        sizes: {
          39: 3,
          40: 5,
          41: 8,
          42: 9,
          43: 6,
          44: 3,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Daily Sneaker – Green</b>
      <p>A versatile everyday sneaker featuring a lightweight build and comfortable sole for daily activities.</p>
    `,
  },

  {
    id: 14,
    name: "Zuqo Men's Sport Sandal 14",
    price: 1250,
    productVariants: [
      {
        id: 20,
        sku: "000020",
        color: "Grey",
        images: [
          "https://images.unsplash.com/photo-1603487742131-4160ec999306",
          "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
          "https://images.unsplash.com/photo-1553627371-9d2d9f3c5c52",
        ],
        videos: ["https://cdn.example.com/videos/product-020.mp4"],
        sizes: {
          39: 7,
          40: 10,
          41: 13,
          42: 11,
          43: 8,
          44: 5,
          45: 3,
        },
      },
    ],
    description: `
      <b>Zuqo Sport Sandal – Grey</b>
      <p>Sporty open sandal designed for outdoor comfort with a secure fit and durable sole.</p>
    `,
  },

  {
    id: 15,
    name: "Zuqo Men's Premium Loafer 15",
    price: 2300,
    productVariants: [
      {
        id: 21,
        sku: "000021",
        color: "Coffee",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        ],
        videos: ["https://cdn.example.com/videos/product-021.mp4"],
        sizes: {
          39: 2,
          40: 4,
          41: 7,
          42: 8,
          43: 5,
          44: 4,
          45: 1,
        },
      },
    ],
    description: `
      <b>Zuqo Premium Loafer – Coffee</b>
      <p>Premium-looking loafer with a polished finish, comfortable footbed and refined everyday styling.</p>
    `,
  },

  {
    id: 16,
    name: "Zuqo Men's Urban Sneaker 16",
    price: 2050,
    productVariants: [
      {
        id: 22,
        sku: "000022",
        color: "Cream",
        images: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
          "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
        ],
        videos: ["https://cdn.example.com/videos/product-022.mp4"],
        sizes: {
          39: 4,
          40: 6,
          41: 9,
          42: 10,
          43: 8,
          44: 5,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Urban Sneaker – Cream</b>
      <p>Minimal urban sneaker with a clean profile that pairs easily with jeans, chinos and casual outfits.</p>
    `,
  },

  {
    id: 17,
    name: "Zuqo Men's Walking Shoe 17",
    price: 2150,
    productVariants: [
      {
        id: 23,
        sku: "000023",
        color: "Steel Blue",
        images: [
          "https://images.unsplash.com/photo-1554137931-4f8b3c6f5c2f",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        ],
        videos: ["https://cdn.example.com/videos/product-023.mp4"],
        sizes: {
          39: 5,
          40: 7,
          41: 10,
          42: 12,
          43: 9,
          44: 6,
          45: 3,
        },
      },
    ],
    description: `
      <b>Zuqo Walking Shoe – Steel Blue</b>
      <p>Comfort-focused walking shoe with a supportive sole and breathable upper for extended daily walking.</p>
    `,
  },

  {
    id: 18,
    name: "Zuqo Men's Classic Canvas 18",
    price: 1550,
    productVariants: [
      {
        id: 24,
        sku: "000024",
        color: "Mustard",
        images: [
          "https://images.unsplash.com/photo-1552346154-21d32810aba3",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        ],
        videos: ["https://cdn.example.com/videos/product-024.mp4"],
        sizes: {
          39: 2,
          40: 5,
          41: 7,
          42: 9,
          43: 6,
          44: 4,
          45: 2,
        },
      },
    ],
    description: `
      <b>Zuqo Classic Canvas – Mustard</b>
      <p>Casual canvas footwear with a distinctive mustard tone, lightweight construction and flexible outsole.</p>
    `,
  },

  {
    id: 19,
    name: "Zuqo Men's Executive Shoe 19",
    price: 2700,
    productVariants: [
      {
        id: 25,
        sku: "000025",
        color: "Black",
        images: [
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        ],
        videos: ["https://cdn.example.com/videos/product-025.mp4"],
        sizes: {
          39: 1,
          40: 3,
          41: 5,
          42: 9,
          43: 7,
          44: 5,
          45: 2,
        },
      },
      {
        id: 26,
        sku: "000026",
        color: "Dark Tan",
        images: [
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        ],
        videos: ["https://cdn.example.com/videos/product-026.mp4"],
        sizes: {
          39: 2,
          40: 4,
          41: 6,
          42: 8,
          43: 6,
          44: 3,
          45: 1,
        },
      },
    ],
    description: `
      <b>Zuqo Executive Shoe – Black</b>
      <p>Elegant formal footwear designed for professional environments, meetings and special occasions.</p>
    `,
  },

  {
    id: 20,
    name: "Zuqo Men's Lightweight Sneaker 20",
    price: 1900,
    productVariants: [
      {
        id: 27,
        sku: "000027",
        color: "Purple",
        images: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
          "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        ],
        videos: ["https://cdn.example.com/videos/product-027.mp4"],
        sizes: {
          39: 3,
          40: 6,
          41: 9,
          42: 11,
          43: 8,
          44: 5,
          45: 3,
        },
      },
    ],
    description: `
      <b>Zuqo Lightweight Sneaker – Purple</b>
      <p>Lightweight everyday sneaker with a soft upper, cushioned sole and modern silhouette for casual styling.</p>
    `,
  },
];
