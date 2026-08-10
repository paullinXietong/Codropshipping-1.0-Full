<template>
  <div
    id="product-item"
    class="border border-gray-200 table-container mt-4 hover:shadow-sm "
  >
    <div class="flex">
      <div class="p-4 flex-1">
        <el-button
          :icon="showitem?'el-icon-minus':'el-icon-plus'"
          size="small"
          @click="showitem=!showitem"
        ></el-button>
        {{ row.store_name }}
      </div>
      <div class="p-4 flex-2">
        <div class="flex">
          <div>
            <img
              :src="row.origin_data.images.length>0?row.origin_data.images[0].url:bgImage"
              class="w-16 h-16"
              alt=""
            >
          </div>
          <div class="flex-1 ml-2">
            <div class="title-over" :title="row.title">{{ row.title }}</div>
            <div class="title-over text-gray-400">Weight: {{row.min_weight}}{{row.max_weight==0?"":"-"+row.max_weight}}g</div>
            <div class="title-over">${{getPrice(row.origin_data.variants)}}</div>
          </div>
        </div>
      </div>
      <div class="p-4 flex-2">
        <div v-if="row.product_detail.offerId!=''" class="flex relative">
          <el-tooltip class="item" effect="dark" content="Unbind" placement="top">
            <svg t="1770438537512" @click="unbindMatchPro(row.id)" class="icon mr-1 cursor-pointer absolute -left-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8564" width="34" height="34"><path d="M339.57 697c1 0.86 1.79 1 1.16 0.46a21.38 21.38 0 0 0-2-1.18c0.27 0.27 0.56 0.52 0.84 0.72zM428.33 696.49c-0.5 0.34-1 0.75-1.45 1.13a5.06 5.06 0 0 0 0.81-0.58zM393.21 711.57c3-0.3 1.54-0.23-0.07 0h-0.28zM392.86 711.6h-0.07c-0.43 0.06-0.86 0.14-1.2 0.22 0.41-0.09 0.84-0.16 1.27-0.22zM338.73 696.32l-0.06-0.06-0.56-0.28zM317.65 668.51c0.42 1.14 1.06 1.81 0.82 1.11-0.39-0.8-0.82-1.58-1.27-2.34zM542.41 582.32a3.85 3.85 0 0 0 0.76-1.21 18.8 18.8 0 0 0-1.45 2zM552.76 564.32l-0.35 0.57a2 2 0 0 0-0.08 0.22c0.14-0.27 0.28-0.54 0.43-0.79zM429.15 696l-0.58 0.29-0.24 0.22a5.54 5.54 0 0 1 0.82-0.51zM556.72 526.64v0.94c0 0.29 0.12 0.6 0.17 0.91a15 15 0 0 1-0.17-1.85zM557 528.94l-0.09-0.45c0.05 0.3 0.09 0.59 0.11 0.88s0 0.64 0.08 1a6.14 6.14 0 0 0-0.1-1.43zM541.72 583.12l-0.08 0.09c-0.09 0.18-0.19 0.37-0.28 0.57a7.16 7.16 0 0 1 0.36-0.66zM317.2 667.28v-0.07l-0.36-0.57z" p-id="8565" fill="#bfbfbf"></path><path d="M552.33 565.11c-0.42 0.77-0.8 1.59-1.16 2.43a3.83 3.83 0 0 0 0.76-1.35c0.13-0.36 0.26-0.72 0.4-1.08zM312.69 630.75c0.05-0.3 0.11-0.6 0.16-0.89s0-0.58 0-0.9a14 14 0 0 1-0.16 1.79zM375.67 711.83l-0.38-0.08zM597.65 326.45l-1 0.71c-2.73 1.92-0.1 0.16 1-0.71zM374.05 711.57h0.42c-1.73-0.22-3.61-0.32-0.42 0zM706.72 411.9l0.55-1.14a3.69 3.69 0 0 0 0.39-1.19c0 0.16-0.11 0.32-0.17 0.48-0.18 0.5-0.49 1.2-0.77 1.85zM706.72 411.9l-0.13 0.26c0 0.16-0.06 0.31-0.09 0.48a4.3 4.3 0 0 1 0.22-0.74z" p-id="8566" fill="#bfbfbf"></path><path d="M512 65C265.13 65 65 265.13 65 512s200.13 447 447 447 447-200.13 447-447S758.87 65 512 65z m91.65 492.62c-3.82 26.66-17.91 49.76-36.69 68.54l-83.15 83.15C472.15 721 461 733 446.92 741.88c-32.36 20.59-74.27 23.52-109.41 8.68S275 704.24 267.1 666.7c-8.17-38.92 2.64-79.4 30-108.46 21.52-22.83 44.42-44.48 66.6-66.66 9.48-9.48 24.35-8.79 33.92 0s8.88 25 0 33.91l-2.53 2.51L356 567.12l-18.34 18.33c-1.41 1.41-2.83 2.82-4.23 4.24-1.16 1.16-2.3 2.33-3.41 3.54s-2.22 2.87-3.47 4.09l-0.45 0.63a92.07 92.07 0 0 0-6.27 10.27c-0.72 1.36-1.37 2.74-2 4.13-0.21 0.54-0.45 1.08-0.65 1.6a96.77 96.77 0 0 0-3.51 11.91c-0.3 1.33-0.55 2.66-0.8 4-0.06 3.35-0.31 3.57-0.36 2.8a97.31 97.31 0 0 0-0.29 10.66c0 1.6 0.13 3.19 0.25 4.79l0.12 1.25c0.88 3.74 1.38 7.56 2.44 11.28 0.51 1.77 1.08 3.53 1.69 5.27 0.15 0.43 0.31 0.87 0.48 1.3a14 14 0 0 1 1.29 2.41c1.27 2.53 2.35 5.22 3.79 7.62 1 1.63 2 3.23 3.05 4.79 0.46 0.68 4.1 6.28 1.93 2.78-2-3.29 0.24 0.21 0.87 0.94s1.28 1.46 1.93 2.18q1.48 1.64 3 3.19c1.39 1.38 2.81 2.72 4.28 4l1.3 1.12a11.4 11.4 0 0 1 2.06 1.24c2.51 1.65 4.92 3.71 7.46 5.17 1.62 0.93 3.27 1.82 4.95 2.65 0.27 0.14 1.27 0.61 2.22 1.06 0.6 0.25 1.32 0.55 1.64 0.67 0.87 0.31 1.74 0.62 2.61 0.91 1.75 0.59 3.52 1.12 5.29 1.61 3.26 0.88 6.6 1.31 9.87 2.06 0.67 0.07 1.34 0.13 2 0.18 1.82 0.13 3.64 0.2 5.47 0.23a97.37 97.37 0 0 0 10.53-0.43l0.35-0.05c0.4-0.06 0.79-0.11 1.16-0.18q2.71-0.48 5.39-1.13a95.25 95.25 0 0 0 10.57-3.2l0.61-0.25c3.89-2 1.62-0.71 0 0l-1.18 0.59c0.62-0.31 1.28-0.56 1.91-0.86q2.55-1.17 5-2.5a94.64 94.64 0 0 0 9.65-5.94c0.2-0.14 0.41-0.31 0.62-0.47-0.91 0.51-1 0 1.69-1.35 1.18-1 2.35-2 3.49-3.1 0.79-0.75 1.56-1.51 2.34-2.28 8.67-8.58 17.25-17.26 25.88-25.88q37.55-37.54 75.08-75.08c1.42-1.42 2.83-2.84 4.18-4.32q1.07-1.18 2.1-2.4c1.13-2.23 1.66-2.56 1.53-2.1 0.53-0.67 1.07-1.33 1.51-2a93.61 93.61 0 0 0 5.38-9.12c0.4-0.78 0.75-1.62 1.11-2.46-0.27 0.24-0.15-0.41 1.24-2.65l0.48-1.31a95 95 0 0 0 3-10.6c0.43-1.92 0.67-3.9 1.07-5.82 0-0.45 0.09-0.91 0.13-1.37a95.38 95.38 0 0 0 0.23-11c-0.05-1.5-0.15-3-0.27-4.49 0 0.77-0.3 0.57-0.36-2.76-0.6-3.16-1.27-6.29-2.16-9.38-0.64-2.21-1.36-4.41-2.15-6.57-0.18-0.49-0.41-1-0.61-1.51C550.3 507 548.75 504 547 501c-1.1-1.83-2.27-3.61-3.49-5.36-0.26-0.37-0.53-0.73-0.8-1.09-2-2.31-4-4.64-6.18-6.82-2-2-4.14-3.88-6.28-5.75a6.14 6.14 0 0 1-0.51-0.51c-0.48-0.31-1-0.6-1.29-0.83a99 99 0 0 0-11.28-6.77c-11.89-6.18-14.43-21.79-8.61-32.81 6.26-11.84 21.69-14.39 32.81-8.61a122 122 0 0 1 26.61 19c29.2 27.22 41.26 67.16 35.67 106.17z m143.22-118.87c-9.37 18.46-24.65 32.38-39.06 46.8l-32.92 32.91c-9.47 9.48-24.34 8.79-33.91 0s-8.88-25 0-33.91l2.66-2.66 37.82-37.82c3.36-3.37 6.75-6.72 10.1-10.1 1.38-1.4 2.73-2.82 4-4.29 0.47-0.53 2-2.44 2.46-3 0.58-0.81 1.15-1.6 1.3-1.83q1.39-2.06 2.69-4.18c1.68-2.77 3.13-5.63 4.55-8.53 0.53-2.82 1.14-3.28 1.07-2.59 0.49-1.36 1-2.73 1.39-4.11a93.74 93.74 0 0 0 2.65-10.69c0.07-0.35 0.13-0.69 0.19-1 0.13-1.38 0.32-2.77 0.41-4.15a95.23 95.23 0 0 0 0.08-10.95c-0.08-1.59-0.2-3.18-0.36-4.76-0.65-3.54-1.38-7-2.38-10.51q-0.76-2.66-1.68-5.27c-0.16-0.45-0.62-1.63-1-2.53-0.56-1.21-1.31-2.81-1.53-3.26-0.74-1.46-1.53-2.9-2.35-4.33-1.66-2.89-3.53-5.64-5.44-8.37l-1.12-1.35q-1.9-2.22-3.95-4.32a95 95 0 0 0-7-6.5l-0.24-0.2c-3.32-2.26-1.21-1 0 0l1.15 0.79c-0.59-0.4-1.15-0.86-1.73-1.28q-2.31-1.68-4.72-3.21a92.24 92.24 0 0 0-9.21-5.16l-1-0.5A49.63 49.63 0 0 1 665 316a90.23 90.23 0 0 0-9.3-2.6c-1.73-0.39-3.48-0.68-5.23-1l-0.59-0.07a95 95 0 0 0-10.26-0.4q-3.09 0-6.16 0.28l-1.48 0.15c-1 0.15-2.53 0.39-3 0.48-1.8 0.35-3.59 0.76-5.37 1.21a110 110 0 0 0-10.48 3.34l-0.09 0.05q-2.22 1-4.4 2.16a94.3 94.3 0 0 0-9.64 5.9c-0.34 0.23-0.66 0.46-1 0.7-0.58 1.08-2.86 2.32-3.78 3.15-1.59 1.42-3.11 2.92-4.63 4.43q-13.1 13.05-26.15 26.15l-72.61 72.61-2.43 2.46c-0.77 0.78-1.54 1.55-2.28 2.35-1.34 1.42-2.6 2.89-3.87 4.36l-0.2 0.23a95.52 95.52 0 0 0-6.09 9.57 90.25 90.25 0 0 0-2.28 4.36c-0.17 0.34-0.33 0.69-0.49 1-0.54 3.28-2.57 6.89-3.44 10.1s-1.41 6.25-2 9.4c0 0.37-0.07 0.75-0.1 1.12a90.66 90.66 0 0 0-0.31 5.47 95.11 95.11 0 0 0 0.25 10.27c0 0.38 0.07 0.76 0.11 1.14 0.37 1.51 0.48 3.2 0.79 4.7a93.43 93.43 0 0 0 2.46 9.33c0.56 1.76 1.23 3.47 1.85 5.2 0.1 0.24 0.2 0.48 0.31 0.7a94.37 94.37 0 0 0 5 9.28c1.12 1.81 2.29 3.59 3.53 5.33l0.33 0.45c2.05 2.33 4 4.68 6.24 6.88 9.48 9.48 8.79 24.34 0 33.92s-25 8.88-33.92 0a126.55 126.55 0 0 1-16.47-20.58C419 520.48 414 481.9 425.07 449c7.09-21.1 19.61-38.11 35.15-53.65l79.83-79.84c9.93-9.92 19.46-19.92 30.68-28.44 28-21.28 65.87-27.8 99.77-19.38 33.68 8.37 64.31 33 78.47 64.85 15.28 34.35 15.03 72.46-2.1 106.21z" p-id="8567" fill="#bfbfbf"></path><path d="M328.07 595.22c0.16-0.23 0.2-0.27 0 0zM312.69 630.75c0 0.17-0.07 0.34-0.1 0.51a6.17 6.17 0 0 0-0.1 1.4c0-0.32 0.05-0.65 0.08-1s0.07-0.59 0.12-0.91z" p-id="8568" fill="#bfbfbf"></path></svg>
          </el-tooltip>
          <div class="ml-1 relative"
            @mouseenter="imgPanel(row)"
            @mouseleave="imgPanels(row)">
            <img
              :src="row.product_detail.productImage.images.length>0?row.product_detail.productImage.images[0]:bgImage"
              class="w-16 h-16"
              alt=""
            >
            <div v-show="row.showPanel" class="absolute top-0 left-16 pl-2 z-10">
              <div class="rounded-md shadow-md bg-white" style="width: 344px;height: 394px;">
                <div class="flex justify-end p-3">
                  <button @click="toDetails(row.product_detail.offerId)"
                    class="px-4 py-2 border bg-oranges hover:bg-orange text-white rounded text-sm"
                  >Product Details</button>
                </div>
                <img :src="row.product_detail.productImage.images.length>0?row.product_detail.productImage.images[0]:bgImage"
                  class="mx-auto w-80 h-80" alt="">
              </div>
            </div>
          </div>
          <div class="flex-1 ml-2">
            <div class="title-over" :title="row.product_detail.subjectTrans">{{ row.product_detail.subjectTrans }}</div>
            <div class="title-over text-gray-400">SPU: {{row.product_detail.offerId}}</div>
            <div class="title-over text-gray-400">Weight: {{row.product_detail.weights}}g</div>
            <div class="title-over">${{row.product_detail.price}}</div>
          </div>
        </div>
      </div>
      <div class="p-4 flex-1 text-sm">{{ row.transportation_method[0].shipping_method_name }}</div>
      <div class="p-4 flex-1">
        {{row.country}}
        <div v-show="ship_fee">{{ ship_fee }}</div>
        <div>
          <i class="el-icon-s-tools hover:text-oranges text-15" @click="addprice"></i>
        </div>
      </div>
      <div class="p-4 flex-1">${{ total }}</div>
    </div>
    <div
      v-if="showitem"
      class="pb-4"
    >
      <div
        class="flex border-gray-200 pb-2"
        v-for="(item, n) in row.origin_data.variants"
        :class="{'border-b': n !== row.origin_data.variants.length - 1}"
        :key="item.id"
      >
        <div class="p-4 flex-1"></div>
        <div class="px-4 pt-4 flex-2">
          <div class="flex px-1">
            <div>
              <img
                :src="item.image?item.image.url:row.origin_data.images[0].url"
                class="w-12 h-12"
                alt=""
                loading="lazy"
              >
            </div>
            <div class="flex-1 ml-2">
              <div class="title-over" :title="item.title">{{ item.title }}</div>
              <div class="title-over text-gray-400">SKU: {{item.id}}</div>
              <div class="title-over text-gray-400">Weight: {{parseFloat(item.weight)*1000}}g</div>
              <div class="title-over">${{item.price}}</div>
            </div>
          </div>
        </div>
        <div class="p-4 flex-2">
          <div v-if="item.relevance_sku" class="flex">
            <!-- <svg t="1770438537512" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8564" width="34" height="34"><path d="M339.57 697c1 0.86 1.79 1 1.16 0.46a21.38 21.38 0 0 0-2-1.18c0.27 0.27 0.56 0.52 0.84 0.72zM428.33 696.49c-0.5 0.34-1 0.75-1.45 1.13a5.06 5.06 0 0 0 0.81-0.58zM393.21 711.57c3-0.3 1.54-0.23-0.07 0h-0.28zM392.86 711.6h-0.07c-0.43 0.06-0.86 0.14-1.2 0.22 0.41-0.09 0.84-0.16 1.27-0.22zM338.73 696.32l-0.06-0.06-0.56-0.28zM317.65 668.51c0.42 1.14 1.06 1.81 0.82 1.11-0.39-0.8-0.82-1.58-1.27-2.34zM542.41 582.32a3.85 3.85 0 0 0 0.76-1.21 18.8 18.8 0 0 0-1.45 2zM552.76 564.32l-0.35 0.57a2 2 0 0 0-0.08 0.22c0.14-0.27 0.28-0.54 0.43-0.79zM429.15 696l-0.58 0.29-0.24 0.22a5.54 5.54 0 0 1 0.82-0.51zM556.72 526.64v0.94c0 0.29 0.12 0.6 0.17 0.91a15 15 0 0 1-0.17-1.85zM557 528.94l-0.09-0.45c0.05 0.3 0.09 0.59 0.11 0.88s0 0.64 0.08 1a6.14 6.14 0 0 0-0.1-1.43zM541.72 583.12l-0.08 0.09c-0.09 0.18-0.19 0.37-0.28 0.57a7.16 7.16 0 0 1 0.36-0.66zM317.2 667.28v-0.07l-0.36-0.57z" p-id="8565" fill="#bfbfbf"></path><path d="M552.33 565.11c-0.42 0.77-0.8 1.59-1.16 2.43a3.83 3.83 0 0 0 0.76-1.35c0.13-0.36 0.26-0.72 0.4-1.08zM312.69 630.75c0.05-0.3 0.11-0.6 0.16-0.89s0-0.58 0-0.9a14 14 0 0 1-0.16 1.79zM375.67 711.83l-0.38-0.08zM597.65 326.45l-1 0.71c-2.73 1.92-0.1 0.16 1-0.71zM374.05 711.57h0.42c-1.73-0.22-3.61-0.32-0.42 0zM706.72 411.9l0.55-1.14a3.69 3.69 0 0 0 0.39-1.19c0 0.16-0.11 0.32-0.17 0.48-0.18 0.5-0.49 1.2-0.77 1.85zM706.72 411.9l-0.13 0.26c0 0.16-0.06 0.31-0.09 0.48a4.3 4.3 0 0 1 0.22-0.74z" p-id="8566" fill="#bfbfbf"></path><path d="M512 65C265.13 65 65 265.13 65 512s200.13 447 447 447 447-200.13 447-447S758.87 65 512 65z m91.65 492.62c-3.82 26.66-17.91 49.76-36.69 68.54l-83.15 83.15C472.15 721 461 733 446.92 741.88c-32.36 20.59-74.27 23.52-109.41 8.68S275 704.24 267.1 666.7c-8.17-38.92 2.64-79.4 30-108.46 21.52-22.83 44.42-44.48 66.6-66.66 9.48-9.48 24.35-8.79 33.92 0s8.88 25 0 33.91l-2.53 2.51L356 567.12l-18.34 18.33c-1.41 1.41-2.83 2.82-4.23 4.24-1.16 1.16-2.3 2.33-3.41 3.54s-2.22 2.87-3.47 4.09l-0.45 0.63a92.07 92.07 0 0 0-6.27 10.27c-0.72 1.36-1.37 2.74-2 4.13-0.21 0.54-0.45 1.08-0.65 1.6a96.77 96.77 0 0 0-3.51 11.91c-0.3 1.33-0.55 2.66-0.8 4-0.06 3.35-0.31 3.57-0.36 2.8a97.31 97.31 0 0 0-0.29 10.66c0 1.6 0.13 3.19 0.25 4.79l0.12 1.25c0.88 3.74 1.38 7.56 2.44 11.28 0.51 1.77 1.08 3.53 1.69 5.27 0.15 0.43 0.31 0.87 0.48 1.3a14 14 0 0 1 1.29 2.41c1.27 2.53 2.35 5.22 3.79 7.62 1 1.63 2 3.23 3.05 4.79 0.46 0.68 4.1 6.28 1.93 2.78-2-3.29 0.24 0.21 0.87 0.94s1.28 1.46 1.93 2.18q1.48 1.64 3 3.19c1.39 1.38 2.81 2.72 4.28 4l1.3 1.12a11.4 11.4 0 0 1 2.06 1.24c2.51 1.65 4.92 3.71 7.46 5.17 1.62 0.93 3.27 1.82 4.95 2.65 0.27 0.14 1.27 0.61 2.22 1.06 0.6 0.25 1.32 0.55 1.64 0.67 0.87 0.31 1.74 0.62 2.61 0.91 1.75 0.59 3.52 1.12 5.29 1.61 3.26 0.88 6.6 1.31 9.87 2.06 0.67 0.07 1.34 0.13 2 0.18 1.82 0.13 3.64 0.2 5.47 0.23a97.37 97.37 0 0 0 10.53-0.43l0.35-0.05c0.4-0.06 0.79-0.11 1.16-0.18q2.71-0.48 5.39-1.13a95.25 95.25 0 0 0 10.57-3.2l0.61-0.25c3.89-2 1.62-0.71 0 0l-1.18 0.59c0.62-0.31 1.28-0.56 1.91-0.86q2.55-1.17 5-2.5a94.64 94.64 0 0 0 9.65-5.94c0.2-0.14 0.41-0.31 0.62-0.47-0.91 0.51-1 0 1.69-1.35 1.18-1 2.35-2 3.49-3.1 0.79-0.75 1.56-1.51 2.34-2.28 8.67-8.58 17.25-17.26 25.88-25.88q37.55-37.54 75.08-75.08c1.42-1.42 2.83-2.84 4.18-4.32q1.07-1.18 2.1-2.4c1.13-2.23 1.66-2.56 1.53-2.1 0.53-0.67 1.07-1.33 1.51-2a93.61 93.61 0 0 0 5.38-9.12c0.4-0.78 0.75-1.62 1.11-2.46-0.27 0.24-0.15-0.41 1.24-2.65l0.48-1.31a95 95 0 0 0 3-10.6c0.43-1.92 0.67-3.9 1.07-5.82 0-0.45 0.09-0.91 0.13-1.37a95.38 95.38 0 0 0 0.23-11c-0.05-1.5-0.15-3-0.27-4.49 0 0.77-0.3 0.57-0.36-2.76-0.6-3.16-1.27-6.29-2.16-9.38-0.64-2.21-1.36-4.41-2.15-6.57-0.18-0.49-0.41-1-0.61-1.51C550.3 507 548.75 504 547 501c-1.1-1.83-2.27-3.61-3.49-5.36-0.26-0.37-0.53-0.73-0.8-1.09-2-2.31-4-4.64-6.18-6.82-2-2-4.14-3.88-6.28-5.75a6.14 6.14 0 0 1-0.51-0.51c-0.48-0.31-1-0.6-1.29-0.83a99 99 0 0 0-11.28-6.77c-11.89-6.18-14.43-21.79-8.61-32.81 6.26-11.84 21.69-14.39 32.81-8.61a122 122 0 0 1 26.61 19c29.2 27.22 41.26 67.16 35.67 106.17z m143.22-118.87c-9.37 18.46-24.65 32.38-39.06 46.8l-32.92 32.91c-9.47 9.48-24.34 8.79-33.91 0s-8.88-25 0-33.91l2.66-2.66 37.82-37.82c3.36-3.37 6.75-6.72 10.1-10.1 1.38-1.4 2.73-2.82 4-4.29 0.47-0.53 2-2.44 2.46-3 0.58-0.81 1.15-1.6 1.3-1.83q1.39-2.06 2.69-4.18c1.68-2.77 3.13-5.63 4.55-8.53 0.53-2.82 1.14-3.28 1.07-2.59 0.49-1.36 1-2.73 1.39-4.11a93.74 93.74 0 0 0 2.65-10.69c0.07-0.35 0.13-0.69 0.19-1 0.13-1.38 0.32-2.77 0.41-4.15a95.23 95.23 0 0 0 0.08-10.95c-0.08-1.59-0.2-3.18-0.36-4.76-0.65-3.54-1.38-7-2.38-10.51q-0.76-2.66-1.68-5.27c-0.16-0.45-0.62-1.63-1-2.53-0.56-1.21-1.31-2.81-1.53-3.26-0.74-1.46-1.53-2.9-2.35-4.33-1.66-2.89-3.53-5.64-5.44-8.37l-1.12-1.35q-1.9-2.22-3.95-4.32a95 95 0 0 0-7-6.5l-0.24-0.2c-3.32-2.26-1.21-1 0 0l1.15 0.79c-0.59-0.4-1.15-0.86-1.73-1.28q-2.31-1.68-4.72-3.21a92.24 92.24 0 0 0-9.21-5.16l-1-0.5A49.63 49.63 0 0 1 665 316a90.23 90.23 0 0 0-9.3-2.6c-1.73-0.39-3.48-0.68-5.23-1l-0.59-0.07a95 95 0 0 0-10.26-0.4q-3.09 0-6.16 0.28l-1.48 0.15c-1 0.15-2.53 0.39-3 0.48-1.8 0.35-3.59 0.76-5.37 1.21a110 110 0 0 0-10.48 3.34l-0.09 0.05q-2.22 1-4.4 2.16a94.3 94.3 0 0 0-9.64 5.9c-0.34 0.23-0.66 0.46-1 0.7-0.58 1.08-2.86 2.32-3.78 3.15-1.59 1.42-3.11 2.92-4.63 4.43q-13.1 13.05-26.15 26.15l-72.61 72.61-2.43 2.46c-0.77 0.78-1.54 1.55-2.28 2.35-1.34 1.42-2.6 2.89-3.87 4.36l-0.2 0.23a95.52 95.52 0 0 0-6.09 9.57 90.25 90.25 0 0 0-2.28 4.36c-0.17 0.34-0.33 0.69-0.49 1-0.54 3.28-2.57 6.89-3.44 10.1s-1.41 6.25-2 9.4c0 0.37-0.07 0.75-0.1 1.12a90.66 90.66 0 0 0-0.31 5.47 95.11 95.11 0 0 0 0.25 10.27c0 0.38 0.07 0.76 0.11 1.14 0.37 1.51 0.48 3.2 0.79 4.7a93.43 93.43 0 0 0 2.46 9.33c0.56 1.76 1.23 3.47 1.85 5.2 0.1 0.24 0.2 0.48 0.31 0.7a94.37 94.37 0 0 0 5 9.28c1.12 1.81 2.29 3.59 3.53 5.33l0.33 0.45c2.05 2.33 4 4.68 6.24 6.88 9.48 9.48 8.79 24.34 0 33.92s-25 8.88-33.92 0a126.55 126.55 0 0 1-16.47-20.58C419 520.48 414 481.9 425.07 449c7.09-21.1 19.61-38.11 35.15-53.65l79.83-79.84c9.93-9.92 19.46-19.92 30.68-28.44 28-21.28 65.87-27.8 99.77-19.38 33.68 8.37 64.31 33 78.47 64.85 15.28 34.35 15.03 72.46-2.1 106.21z" p-id="8567" fill="#bfbfbf"></path><path d="M328.07 595.22c0.16-0.23 0.2-0.27 0 0zM312.69 630.75c0 0.17-0.07 0.34-0.1 0.51a6.17 6.17 0 0 0-0.1 1.4c0-0.32 0.05-0.65 0.08-1s0.07-0.59 0.12-0.91z" p-id="8568" fill="#bfbfbf"></path></svg> -->
            <div class="ml-2">
              <img 
                :src="row.product_detail.productImage.images[0]"
                class="w-12 h-12"
                alt=""
              >
            </div>
            <div class="flex-1 ml-2">
              <div :title="item.relevance_sku.attributes"
                class="title-over">{{ item.relevance_sku.attributes }}</div>
              <div class="title-over text-gray-400">SKU: {{item.relevance_sku.sku}}</div>
              <div class="title-over text-gray-400">Weight: {{parseFloat(item.relevance_sku.weight)*1000}}g</div>
              <div class="title-over">${{item.relevance_sku.price}}</div>
            </div>
          </div>
        </div>
        <div class="p-4 flex-1 text-sm">{{ row.transportation_method[0].shipping_method_name }}</div>
        <div class="p-4 flex-1"><span v-show="item.fright&&item.fright!=0">${{item.fright}}</span></div>
        <div class="p-4 flex-1">${{getItemTotal(item)}}</div>
      </div>
    </div>

    <el-dialog
      title="Shipping Settings"
      :visible.sync="dialogVisible"
      width="40%"
      append-to-body
      border
    >
      <div class="text-right">
        <el-button type="primary" @click="addRow">Add Shipping Method</el-button>
      </div>
      <el-table :data="gridData">
        <el-table-column
          property="shipping_method_name"
          label="Shipping Method"
          min-width="150"
        >
          <template slot-scope="{row, $index}">
            <div v-if="row.status">
              <el-select v-model="gridData[$index].shipping_method" placeholder="select" @change="selectShip">
                <el-option
                  v-for="item in shiping_type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              {{row.shipping_method_name}}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          property="name"
          label="Country"
          width="200"
        >
          <template slot-scope="{row, $index}">
            All Countries
          </template>
        </el-table-column>
        
        <el-table-column
          property="date"
          label="Priority Level"
          width="150"
        >
        <template slot-scope="{row, $index}">
            {{$index + 1}} Priority
          </template>
        </el-table-column>

        <el-table-column
          property="address"
          label="Operation"
        >
          <template slot-scope="{row, $index}">
            <el-button @click="deleteShip($index)" type="text" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitShip" :loading="loading">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="unbindModal"
      width="40%"
      append-to-body
      border
    >
      <div>Sure you want to unbind?</div>
      <span slot="footer" class="dialog-footer ">
        <el-button @click="unbindModal = false">Cancel</el-button>
        <el-button type="primary" @click="submitUnbind" :loading="loading">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getTransportList, editShipping, unbindMatch } from "@/api/dropshipping";
export default {
  props: {
    row: {
      type: Object,
    },
    shiping_type:{
      type: Array,
      default: () => []
    },
    rate:{
      type: Number,
    }
  },
  data() {
    return {
      showitem: false,
      bgImage: require("@/assets/action/default1.png"),
      min_price: 0,
      max_price: 0,
      min_shipping_cost: 0,
      max_shipping_cost: 0,
      total: "",
      ship_fee: "",
      variants: [],
      gridData: [],
      dialogVisible: false,
      loading: false,
      unbindId: 0,
      unbindModal: false,
    };
  },
  methods: {
    getItemTotal(item){
      let total = parseFloat(item.price) + parseFloat(item.fright?item.fright:0);
      
      return total.toFixed(2)
    },
    selectShip(label){
      // console.log(label);
      this.gridData[this.gridData.length-1].shipping_method_name = this.shiping_type.find(item=>item.id==label).name
    },
    submitShip(){
      this.loading = true;
      this.gridData[this.gridData.length-1].status = false;

      editShipping({
        id: this.row.id,
        warehouse_source: 1,
        transportation_method: this.gridData
      }).then(res=>{
        this.loading = false;
        
        this.row.transportation_method = JSON.parse(JSON.stringify(this.gridData))
        if(res.code==0){
          this.$message.success('Saved Successfully!')
          this.dialogVisible = false;
        }else{
          this.$message.error('Saved Fail')
        }
        
      })
    },
    addRow(){
      if(!this.gridData[this.gridData.length-1].status){
        this.gridData.push({
          shipping_method_name: "",
          shipping_method:'',
          country:["ALL"],
          priority: this.gridData.length + 1,
          status: true
        })
      }
    },
    deleteShip(row){
      this.gridData.splice(row, 1);
    },
    handleClose(done) {
      
    },
    getAttri(ari) {
      if (!ari) return "";
      return ari.map((item) => item.option).join("-");
    },
    getImage(id) {
      if (id) {
        const res = this.row.origin_data.images.find(
          (item) => item.id == id
        )?.url;
        return res;
      } else {
        return this.bgImage;
      }
    },
    addprice() {
      this.dialogVisible = true;
      this.gridData = JSON.parse(JSON.stringify(this.row.transportation_method))
    },
    getPrice(arr) {
      if (!arr || arr.length === 0) return "";
      const prices = arr.map((item) => parseFloat(item.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      let mintotal =
        parseFloat(minPrice) + parseFloat(this.row.min_shipping_cost);
      mintotal = parseFloat(mintotal.toFixed(2));

      let maxtotal =
        parseFloat(maxPrice) + parseFloat(this.row.max_shipping_cost);
      maxtotal = parseFloat(maxtotal.toFixed(2));

        // console.log(mintotal, maxtotal);

      if (this.row.min_shipping_cost != 0) {
        this.ship_fee =
          "$" + (this.row.min_shipping_cost == this.row.max_shipping_cost ? this.row.min_shipping_cost : `${this.row.min_shipping_cost}-${this.row.max_shipping_cost}`);
      }

      this.variants = this.row?.origin_data.variants;

      this.total = mintotal == maxtotal ? maxtotal : `${mintotal}-${maxtotal}`;
      return minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`;
    },
    divide(num1) {
      const result = (num1 * 100) / (this.rate * 100)
      if (Math.round(result * 100) / 100 > 0) return Math.round(result * 100) / 100
      return 0.01
    },
    toDetails(id){
      window.open(`/productDetail?id=${id}&source=1`, '_blank')
    },
    unbindMatchPro(id){
      this.unbindId = id
      this.unbindModal = true
    },
    submitUnbind(){
      this.loading = true
      unbindMatch({
        id: this.unbindId,
      }).then((res)=>{
        if(res.code == 0){
          this.$emit('getList')
        }
        this.loading = false
      })
    },
    imgPanel(item){
      item.showPanel = true
      this.$forceUpdate()
    },
    imgPanels(item){
      item.showPanel = false
      this.$forceUpdate()
    },
  },
};
</script>
<style>
#product-item .el-button--small,
.el-button--small.is-round {
  padding: 4px;
}
</style>
<style scoped>
.title-over {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  font-size: 14px;
  -webkit-box-orient: vertical;
}
.flex-2 {
  flex: 2;
}
</style>