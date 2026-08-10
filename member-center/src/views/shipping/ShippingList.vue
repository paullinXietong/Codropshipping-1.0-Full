<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask"></div>
    <div ref="Modal" class="modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
      <div class="text-center py-4 font-semibold">Please choose how to place your order</div>
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2 sm:col-span-1 bg-white hover:bg-gray-200 dark:bg-darkMenu rounded-md shadow-default">
          <label class="block p-6 cursor-pointer select-none">
            <div class="flex items-center justify-center relative">
              <div class="mr-2 border w-4 h-4 rounded-full flex justify-center items-center"
                :class="[orderType == 1 ? 'border-orange': 'border-gray-400']">
                <div v-show="orderType == 1" class="rounded-full bg-orange w-2.5 h-2.5"></div>
              </div>
              <input v-model="orderType" type="radio" value="1" class="mr-2 w-4 h-4 absolute opacity-0 cursor-pointer">
              <div>Quick Order</div>
            </div>
            <div class="mt-2 text-center text-xs">Fill in available data to obtain quick quotation</div>
          </label>
        </div>
        <div class="col-span-2 sm:col-span-1 bg-white hover:bg-gray-200 dark:bg-darkMenu rounded-md shadow-default">
          <label class="block p-6 cursor-pointer select-none">
            <div class="flex items-center justify-center relative">
              <div class="mr-2 border w-4 h-4 rounded-full flex justify-center items-center"
                :class="[orderType == 2 ? 'border-orange': 'border-gray-400']">
                <div v-show="orderType == 2" class="rounded-full bg-orange w-2.5 h-2.5"></div>
              </div>
              <input v-model="orderType" type="radio" value="2" class="mr-2 w-4 h-4 absolute opacity-0 cursor-pointer">
              <div>Standard Order</div>
            </div>
            <div class="mt-2 text-center text-xs">Fill in detailed data to obtain accurate quotation</div>
          </label>
        </div>
      </div>
      <div class="mt-4 flex justify-end text-13">
        <button @click="closeModal" class="mr-4 px-10 py-2 rounded bg-gray-200 hover:bg-gray-300">Back</button>
        <button @click="Orders" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Next</button>
      </div>
    </div>
    <div ref="quickModal" class="modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
      <div class="mb-4 font-semibold">Quick Order</div>
      <div class="grid grid-cols-3 gap-4 text-14">
        <div class="col-span-3">
          <div class="pb-2">
            <label class="flex">
              <div class="required">*</div>
              Add a Notes/Supplier Information</label>
          </div>
          <div class="relative">
            <textarea v-model="quickOrderForm.content" rows="5" placeholder="Notes ..." class="input resize-none"></textarea>
          </div>
        </div>
        <div class="col-span-3">
          <div class="mb-2">Upload/take photos of product/packing list</div>
          <div v-show="uploadShow" @click="upload" class="p-2 border border-inputBorder dark:border-darkMain rounded hover:bg-gray-200 flex justify-center items-center cursor-pointer">
            <input type="file"
                      style="display: none;"
                      accept="application/pdf,image/jpeg,image/png,image/jpg"
                      id="files"
                      ref="iptFileRef"
                      @change="uploadPL" />
            <svg t="1677400710440" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="25" height="25"><path d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z" fill="#7a7a7a" p-id="2780"></path></svg>
            <div>Upload Flie</div>
          </div>
          <div v-show="!uploadShow" class="flex items-center">
            <svg t="1677404290219" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3871" width="22" height="22"><path d="M511.974401 0c-282.75527 0-511.974401 229.219131-511.974401 511.974401 0 282.757318 229.219131 511.974401 511.974401 511.974401 282.757318 0 511.974401-229.217083 511.974401-511.974401C1023.948803 229.219131 794.729672 0 511.974401 0zM805.63063 379.174385 474.510162 710.296901c0 0-0.004096 0.004096-0.010239 0.010239-15.265029 15.269125-38.541433 17.652877-56.31104 7.157402-3.290971-1.945503-6.393536-4.333351-9.219635-7.157402-0.002048-0.004096-0.006144-0.006144-0.006144-0.006144l-190.642884-190.642884c-18.095223-18.095223-18.095223-47.4375 0-65.536819 18.095223-18.095223 47.4375-18.095223 65.532723 0l157.884714 157.884714 298.362298-298.362298c18.097271-18.095223 47.439548-18.095223 65.534771 0C823.725854 331.738933 823.725854 361.079162 805.63063 379.174385z" fill="#75bb43" p-id="3872" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path></svg>
            <div class="mx-2">{{ quickOrderForm.order_img_name }}</div>
            <svg t="1677404339739" @click="delPL" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6635" width="26" height="26"><path d="M691.157333 260.821333h176.938667c15.402667 0 27.904 11.904 27.904 26.538667 0 14.634667-12.501333 26.538667-27.904 26.538667h-65.066667v461.44c0 42.837333-35.413333 77.994667-79.744 77.994666H343.381333c-44.330667 0-79.744-35.157333-79.744-77.994666V313.898667H198.570667c-15.402667 0-27.904-11.904-27.904-26.538667 0-14.634667 12.501333-26.538667 27.904-26.538667h195.541333C398.933333 186.154667 464 128 542.592 128c78.677333 0 143.744 58.197333 148.565333 132.821333z m-55.978666 0c-4.778667-45.184-44.8-79.573333-92.586667-79.573333-47.701333 0-87.722667 34.389333-92.501333 79.573333h185.088z m112.042666 53.077334H319.445333v461.44c0 14.037333 10.965333 24.917333 23.893334 24.917333h379.946666c12.928 0 23.893333-10.88 23.893334-24.917333V313.898667zM412.458667 425.770667c0-14.677333 12.458667-26.538667 27.904-26.538667 15.36 0 27.861333 11.861333 27.861333 26.538667v257.536c0 14.677333-12.458667 26.538667-27.861333 26.538666-15.445333 0-27.904-11.861333-27.904-26.538666V425.813333z m185.984 0c0-14.677333 12.458667-26.538667 27.861333-26.538667 15.445333 0 27.904 11.861333 27.904 26.538667v257.536c0 14.677333-12.458667 26.538667-27.904 26.538666-15.36 0-27.861333-11.861333-27.861333-26.538666V425.813333z" fill="#7a7a7a" p-id="6636"></path></svg>
          </div>
        </div>
        <div class="col-span-3 md:col-span-1">
          <div class="pb-2">
            <label>Phone Number</label>
          </div>
          <input v-model="quickOrderForm.contact_tel" type="text" class="input h-11">
        </div>
        <div class="col-span-3 md:col-span-1">
          <div class="pb-2">
            <label>WhatsApp</label>
          </div>
          <input v-model="quickOrderForm.whatsapp" type="text" class="input h-11">
        </div>
        <div class="col-span-3 md:col-span-1">
          <div class="pb-2">
            <label>Skype/Wechat</label>
          </div>
          <input v-model="quickOrderForm.wetch" type="text" class="input h-11">
        </div>
      </div>
      <div class="py-3 text-xs text-gray-400">You can leave your contact information, our account manager will contact you in the first time</div>
      <div class="mt-4 flex justify-end text-13">
        <button @click="closeModal" class="mr-4 px-10 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
        <button @click="submitQuick" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Submit</button>
      </div>
    </div>
    <div ref="successModal" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex flex-col justify-center items-center">
        <svg t="1676519430153" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75bb43"></path></svg>
        <div>Booking Success</div>
      </div>
      <div>
        <div class="text-center pt-3 pb-6">We'll contact you within 24 hours</div>
        <div class="flex justify-center">
          <!-- <router-link to="/order/shippingOrder">
            <button class="mr-4 px-10 py-2 rounded bg-gray-200 hover:bg-gray-300">View the order</button>
          </router-link> -->
          <button @click="closeModal" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Close</button>
        </div>
      </div>
    </div>
    <div ref="indemnityModal" class="modal w-900 p-5 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-end">
        <img @click="closeModal" class="w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          src="../../assets/close.svg"
          alt="">
      </div>
      <div class="mb-7 text-center font-bold text-4xl text-orange">Statement Of Indemnity</div>
      <!-- <div class="hidden md:flex justify-center">
        <div @click="isTab = 1" :class="[isTab == 1 ? 'text-orange border-orange' : 'hover:text-orange']"
          class="px-5 pb-1 font-medium border-b cursor-pointer select-none">Delay Compensation</div>
        <div @click="isTab = 2" :class="[isTab == 2 ? 'text-orange border-orange' : 'hover:text-orange']"
          class="px-5 pb-1 font-medium border-b cursor-pointer select-none">Compensation for Loss</div>
      </div>
      <div class="block md:hidden">
        <select class="select" v-model="isTab">
          <option value="1">Delay Compensation</option>
          <option value="2">Compensation for Loss</option>
        </select>
      </div> -->
      <div class="StatementIndemnity mt-5 text-xs">
        <div v-show="isTab == 2" class="h-96 overflow-y-scroll">
          <p class="text-2xl font-medium">Delay Compensation</p>
          <p class="text-lg mb-5">compensation will be 1 yuan/natural day/kilogram</p>
          <p class="pb-1 text-sm font-medium">1.Compensation Statement</p>
          <p class="pb-3">Delay Compensation is a value-added service for cargo transportation, which compensates for losses incurred due to time delays. If the order exceeds the time limit for compensation, compensation will be 1 yuan per natural day per kilogram, and the maximum compensation will be 100% of the logistics fee, except for irreversible factors.</p>
          <p class="pb-3">1.1 When goods ordered encounter time-delayed situations, Delay Compensation provides compensation in accordance with the rules to mke up for your losses to a certain extent. If you choose to display the quotatioan details of Delayed Compensation to place an order and pay the order fee, we promise to pick up/sign for your goods within the promised compensation time limit. If we fail to pick up/sign for it beyond the promised compensation time limit, we will provide compensation according to the service standard.</p>
          <p class="pb-3">1.2 The calculation of the statute of limitations for compensation starts from the following nodes:<br/>
            a) Air freight: from the next day after payment is completed for cash settlement orders (account period order measurement data) to the day of pick-up in the destination country<br/>
            b) Express delivery: from the next day after payment is completed for cash orders (account period order measurement data) to the day of pick-up in the country of origin<br/>
            c) Sea shipping (Shanghai): from the day of sailing to the day of pick-up in the destination country
            Sea freight (sea card): from the day of sailing to the day of receipt in the destination country<br/>
            d) Railway transportation: from the day of departure to the day of pick-up in the destination country<br/>
            e) Qatar Airways: from the day of departure to the day of pick-up in the destination country</p>
          <p class="pb-3">1.3 If the promised compensation time limit is exceeded, compensation will be paid at 1 yuan/kg/natural day, and the maximum compensation will be 100% of the freight.</p>
          <p class="pb-1 text-sm font-medium">2.Service description:</p>
          <p class="pb-3">2.1 You need to initiate a lawsuit to the platform for the payment of the order within the specified time frame (within 90 natural days from the next day after payment of the platform's cash order (account period order confirmation measurement data)).</p>
          <p class="pb-3">2.2 Domestic collection fees and various surcharges (such as insurance premiums, taxes, etc.) are not within the scope of compensation for loss compensation services, and you should pay the amount of surcharges based on the actual occurrence.</p>
          <p class="pb-3">2.3 The service provider is exempt from compensating for your order in the following situations:<br/>
            a) You suspend or terminate the transportation service or change the route<br/>
            b) You caused the goods not to be picked up/signed for on time, such as incomplete information or false reports<br/>
            c) Losses or expenses arising from the natural wear and tear of the goods or the inherently defective nature of the goods<br/>
            d) Loss caused by poor packaging or container, which cannot be found from the outside, and the outer packaging is intact but the inner parts are short or damaged when it arrives<br/>
            e) If the official website of the final delivery (UPSDHL truck delivery, etc.) shows that the delivery is normal (signed for), the platform will no longer accept any claims<br/>
            f) Loss and damage caused by force majeure factors, including but not limited to earthquakes, mudslides, floods, fires, typhoons, heavy rain, snow, smog, wars, riots, strikes, terrorist incidents, accidental traffic accidents, revisions of regulations and policies, actions, decisions or orders of the government and judicial organs, violent crimes such as robbery and speeding robbery, major infectious disease outbreaks, and non-carrier controllable factors such as airlines dumping cabinets, congestion, customs inspections, overseas warehouses/FBA warehouses bursting, etc.<br/>
            g) Losses caused by poor quality or short quantity of the insured goods before the insured liability begins<br/>
            h) Losses caused by intentional acts or negligence of the owner of the insured goods.<br/>
            i) If the consignor fails to truthfully provide the declared goods information, the provided shipping information does not match the actual product, the quality of the goods itself or the brand infringement, or the delivery of the goods delivered by the customer is expressly prohibited or restricted by laws and regulations, or other similar circumstances, the recipient of the import customs clearance in the destination country may refuse to cooperate.<br/>
            j) The scope of liability and exclusions stipulated in the war risk clause and the cargo transport strike risk clause.<br/>
            k) The self-operated service provider shall not be liable for any indirect loss based on the possible income, profit, actual use, business opportunity, or commercial value of the goods.</p>
          <p class="pb-1 text-sm font-medium">3.Other statements:</p>
          <p class="pb-3">3.1 The same account, mobile phone number, payment account, authentication name, and device number are all considered to belong to the same user.</p>
          <p class="pb-3">3.2 If the user violates the terms of service (including but not limited to false transactions, fraudulent orders, malicious cash-out, cheating, credit fraud), the user will be disqualified from using this service, and the service provider has the right to cancel any relevant illegal transactions and request the refund of all compensation amounts. Such actions shall be processed in accordance with relevant rules.</p>
          <p class="pb-3">3.3 We will actively follow up on orders for "loss compensation". If you need to inquire about the processing status, please contact the customer service manager.</p>
        </div>
        <div v-show="isTab == 1" class="h-96 overflow-y-scroll">
          <p class="text-2xl font-medium">Compensation for Loss</p>
          <p class="text-lg mb-5">We will compensate the User with the declared value of the cargoes</p>
          <p class="pb-1 text-sm font-medium">1.Compensation Statement</p>
          <p class="pb-3">Compensation for loss is a value-added service for cargo transportation safety provided by the platform. In the event of lost or damaged goods, the platform will provide compensation in accordance with current rules to partially make up for your loss.</p>
          <p class="pb-3">If you choose to view the "loss compensation" quotation details, and subsequently place an order and pay the order fee, the platform promises to guarantee the safety of your goods during transportation. If the goods are lost or damaged, the platform will advance compensation according to the service provider's standards. While the platform will use a commercially reasonable level of skill and care when providing services, this compensation does not imply fault on the part of the platform.</p>
          <p class="pb-3">1.1 Compensation Standard<br/>
            If the platform is liable for any loss, damage of the cargoes, the platform must compensate the User with the declared value of the cargoes. The amount of compensation will in no event be greater than:<br/>
            a)for express shipping: USD 100 per box;<br/>
            b)for multimodal transport: USD 420 per box;<br/>
            c)for ocean freight FCL: USD 500 per container;<br/>
            d)for ocean freight LCL: USD 500 per package, which is the largest means used to prepare cargo for transportation, including but not limited to a skid, pallet, trailer, or carton.
          </p>
          <p class="pb-1 text-sm font-medium">2.Service Description:</p>
          <p class="pb-3">2.1 Domestic collection fees and various surcharges (such as insurance premiums, taxes, etc.) are not within the scope of compensation for loss compensation services, and you should pay the amount of surcharges based on the actual occurrence.</p>
          <p class="pb-3">2.2 Deductible Scope:<br/>
            The platform does not need to compensate your order if the following situations occur to you:<br/>
            a) Losses or expenses caused by natural wear and tear of the goods, essential defect characteristics;<br/>
            b) The customer packs it by himself, the loss caused by poor packaging or container, which cannot be found from the outside, and the outer packaging is intact but the inner parts are short or damaged when it arrives;<br/>
            c) The final delivery (UPS/DHL truck delivery, etc.) official website shows that the delivery is normal (signed for), and the platform will no longer accept any claims;<br/>
            d) The loss and damage caused by force majeure factors mainly include the following categories: unpredictable, uncontrollable, or unavoidable objective factors or accidents, including but not limited to earthquakes, mudslides, floods, fires, and other natural disasters; typhoon, heavy rain, snow, smog, and other bad weather; wars, riots, strikes, terrorist incidents, accidental traffic accidents, revisions of regulations and policies, actions, decisions, or orders of the government and judicial organs; violent crimes such as robbery and speeding robbery; sudden public health events include, but are not limited to, major infectious disease outbreaks, and non-carrier controllable factors include, but are not limited to, airlines dumping cabinets, congestion, customs inspection, overseas warehouse/FBA warehouse explosion, etc.;<br/>
            e) Losses caused by poor quality or short quantity of the insured goods before the insured liability begins;<br/>
            f) Losses caused by intentional acts or negligence of the owner of the insured goods;<br/>
            g) If the consignor fails to truthfully provide the declared goods information, the provided shipping information does not match the actual product, the quality of the goods itself or the brand infringement, or the delivery of the goods delivered by the customer is expressly prohibited or restricted by laws and regulations, the recipient of the import customs clearance in the destination country refuses to cooperate, etc.;<br/>
            h) The scope of liability and exclusions stipulated in the war risk clause and the cargo transport strike risk clause;<br/>
            i) The platform shall not be liable for compensation for any indirect losses based on the possible gains, profits, practical uses, business opportunities, and commercial value of the goods.</p>
          <p class="pb-3">2.3 You need to initiate a lawsuit against the platform for the compensation of the order within the specified time frame; (specified time frame: within 90 natural days from the next day of the platform platform cash settlement order payment (accounting order confirmation measurement data)).</p>
          <p class="pb-3">2.4 Customers can apply for an inspection 10 days after the order track on the platform reaches the destination country, and the inspection result is subject to the official website email of the terminal delivery channel.</p>
          <p class="pb-1 text-sm font-medium">3.Other statements:</p>
          <p class="pb-3">3.1 The same account, mobile phone number, payment account, authentication name, and device number are all considered to belong to the same user.</p>
          <p class="pb-3">3.2 If a user engages in violations (including but not limited to fraudulent transactions, fake orders, malicious cash-outs, cheating, credit fraud, etc.), the platform has the right to revoke the user's access to this service and cancel any illegal transactions. The platform may also request the refund of any compensation amounts, and will process the matter in accordance with relevant rules.</p>
          <p class="pb-3">3.3 The platform will actively follow up on "loss compensation" orders. If you need to expedite the processing, please contact the customer service manager.</p>
        </div>
        <!-- <div v-show="isTab == 3" class="h-96 overflow-y-scroll">
          <p class="text-2xl font-medium">Free China Warehouse Storage</p>
          <p class="text-lg mb-5">Free storage for 15 days</p>
          <p class="pb-1 text-sm font-medium">1.Compensation Statement</p>
          <p class="pb-3">Free China Warehouse Storage is a value-added service provided by the platform that offers customers professional warehousing services for Free China Warehouse Storage. This service provides a free experience, safety, punctuality, and peace of mind (only for FBA businesses).</p>
          <p class="pb-3">*If storage time exceeds 15 days, a storage fee of 3RMB/CBM/natural day will be charged. If the storage is less than one CBM, the fee will be charged according to the one.</p>
          <p class="pb-3">*Currently, the service is only available in the Shenzhen area.</p>
          <p class="pb-3">*If an order is cancelled, a storage fee of 5RMB/CBM/natural day will be charged starting from the 6th day after entering the warehouse. If the storage is less than one party, the fee will be charged according to one party.</p>
          <p class="pb-3">*Please note that this service is only for domestic warehousing, and it does not include order-related return fees, empty space fees, and other associated charges.</p>
        </div> -->
      </div>
    </div>
    <div ref="quickQuote" class="modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
      <div class="mb-4 font-semibold">Cargo Information
        <!-- <span class="font-normal">(Or Upload Packing List)</span> -->
      </div>
      <div class="text-sm">
        <textarea v-model="quickQuotes.content" rows="10" class="input resize-none text-13"
          placeholder="Package Data: 24kg/1CBM
Supplier Contact Number/address: 12345678901
Ship to :  ABE2 705 Boulder Drive Breinigsville PA 123456"></textarea>
        <!-- <div v-show="upload1Show" @click="uploads" class="p-3 border border-inputBorder dark:border-darkMain rounded hover:bg-gray-200 flex justify-center items-center cursor-pointer">
          <input type="file"
            style="display: none;"
            accept="application/pdf,image/jpeg,image/png,image/jpg"
            id="files"
            ref="quoteFile"
            @change="uploadPLs" />
          <svg t="1677400710440" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="25" height="25"><path d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z" fill="#7a7a7a" p-id="2780"></path></svg>
          <div>Upload PL</div>
        </div>
        <div v-show="!upload1Show" class="flex items-center">
          <svg t="1677404290219" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3871" width="22" height="22"><path d="M511.974401 0c-282.75527 0-511.974401 229.219131-511.974401 511.974401 0 282.757318 229.219131 511.974401 511.974401 511.974401 282.757318 0 511.974401-229.217083 511.974401-511.974401C1023.948803 229.219131 794.729672 0 511.974401 0zM805.63063 379.174385 474.510162 710.296901c0 0-0.004096 0.004096-0.010239 0.010239-15.265029 15.269125-38.541433 17.652877-56.31104 7.157402-3.290971-1.945503-6.393536-4.333351-9.219635-7.157402-0.002048-0.004096-0.006144-0.006144-0.006144-0.006144l-190.642884-190.642884c-18.095223-18.095223-18.095223-47.4375 0-65.536819 18.095223-18.095223 47.4375-18.095223 65.532723 0l157.884714 157.884714 298.362298-298.362298c18.097271-18.095223 47.439548-18.095223 65.534771 0C823.725854 331.738933 823.725854 361.079162 805.63063 379.174385z" fill="#75bb43" p-id="3872" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path></svg>
          <div class="mx-2">{{ quickQuotes.order_img_name }}</div>
          <svg t="1677404339739" @click="delPLs" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6635" width="26" height="26"><path d="M691.157333 260.821333h176.938667c15.402667 0 27.904 11.904 27.904 26.538667 0 14.634667-12.501333 26.538667-27.904 26.538667h-65.066667v461.44c0 42.837333-35.413333 77.994667-79.744 77.994666H343.381333c-44.330667 0-79.744-35.157333-79.744-77.994666V313.898667H198.570667c-15.402667 0-27.904-11.904-27.904-26.538667 0-14.634667 12.501333-26.538667 27.904-26.538667h195.541333C398.933333 186.154667 464 128 542.592 128c78.677333 0 143.744 58.197333 148.565333 132.821333z m-55.978666 0c-4.778667-45.184-44.8-79.573333-92.586667-79.573333-47.701333 0-87.722667 34.389333-92.501333 79.573333h185.088z m112.042666 53.077334H319.445333v461.44c0 14.037333 10.965333 24.917333 23.893334 24.917333h379.946666c12.928 0 23.893333-10.88 23.893334-24.917333V313.898667zM412.458667 425.770667c0-14.677333 12.458667-26.538667 27.904-26.538667 15.36 0 27.861333 11.861333 27.861333 26.538667v257.536c0 14.677333-12.458667 26.538667-27.861333 26.538666-15.445333 0-27.904-11.861333-27.904-26.538666V425.813333z m185.984 0c0-14.677333 12.458667-26.538667 27.861333-26.538667 15.445333 0 27.904 11.861333 27.904 26.538667v257.536c0 14.677333-12.458667 26.538667-27.904 26.538666-15.36 0-27.861333-11.861333-27.861333-26.538666V425.813333z" fill="#7a7a7a" p-id="6636"></path></svg>
        </div> -->
      </div>
      <div class="mt-4 flex justify-end text-13">
        <button @click="closeModal" class="mr-4 px-10 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
        <button @click="submitQuickQuote" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Submit</button>
      </div>
    </div>
    <div ref="quoteSuccess" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex flex-col justify-center items-center">
        <svg t="1676519430153" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75bb43"></path></svg>
        <div>Quote Success</div>
      </div>
      <div>
        <div class="text-center pt-3 pb-6">We'll contact you within 24 hours</div>
        <div class="flex justify-center">
          <!-- <router-link to="/order/shippingOrder">
            <button class="mr-4 px-10 py-2 rounded bg-gray-200 hover:bg-gray-300">View the order</button>
          </router-link> -->
          <button @click="sendQuote" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Close</button>
        </div>
      </div>
    </div>
    <div ref="nologinModal" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-1.5 top-1.5 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="flex flex-col justify-center items-center">
        <img src="../../assets/logintoview.png" class="w-28" alt="">
        <div class="py-5">Login to view data</div>
        <button @click="tologin" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Sign in</button>
      </div>
    </div>
    <div ref="pcModal" class="p-7 modal w-96 opacity-20 bg-white dark:bg-darkMenu" style="width: 400px;">
      <div>
        <span class="font-semibold">Select your type of goods</span>
        <span>(Product Category)</span>
      </div>
      <div class="mt-4 text-sm">
        <button :class="[form.product_two == 1 ? 'border-orange text-orange' : 'border-gray-500']"
          class="w-full p-2 rounded border hover:bg-gray-200" @click="selectGood('1')">General cargo</button>
        <button :class="[form.product_two == 2 ? 'border-orange text-orange' : 'border-gray-500']"
          class="mt-3 w-full p-2 rounded border hover:bg-gray-200" @click="selectGood('2')">Special cargo</button>
        <div class="mt-4 flex justify-end items-center">
          <div @click="selectGood('0')" class="cursor-pointer hover:underline">Clear all</div>
          <button @click="confirmGood"
            class="ml-6 rounded-md py-2 px-5 bg-orange hover:bg-orange1 text-white">Confirm</button>
        </div>
      </div>
    </div>
    <hover-tips ref="tooltip"
      :target="target"
      :maxWidth="240">
      <div v-if="content">{{ content }}</div>
    </hover-tips>

    <div class="h-full overflow-auto">
      <!-- <div class="breadcrumb max-w-1600">Quote List</div> -->
      <!-- <div class="w-full">
        <img v-show="!result && !showLoad" class="w-full min-h-110px object-cover" src="../../assets/dtdtop.png" alt="">
        <div v-show="result || showLoad" class="h-6"></div>
      </div> -->
      <div class="main1 relative z-10 max-w-1600 bg-transparent dark:bg-transparent shadow-none px-2 pb-2 sm:px-5 sm:pb-5 text-sm">

        <!-- <swiper v-show="!result && !showLoad" class="mb-6 hidden lg:block rounded-md" ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(i,n) in bannerList" :key="n">
            <img :src="i.img" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper> -->
        

        <div class=" ">
          <div class="flex">
            <!-- <button class="w-56 p-4 rounded-tl-md shadow-default" @click="standard = true"
              :class="[ standard ? 'bg-black text-white' : 'bg-white hover:bg-gray-200']">Standard Order</button> -->
            <!-- <button class="w-56 p-4 rounded-tr-md shadow-default" @click="quickNumber"
              :class="[ !standard ? 'bg-black text-white' : 'bg-white hover:bg-gray-200']">Quick Order</button> -->
          </div>
          <div v-show="standard" class="p-5 rounded-md shadow-default bg-white dark:bg-darkMenu">
            <div class="flex items-center flex-col md:flex-row">
              <div class="w-full grid grid-cols-3 rounded-md border border-gray-300 dark:border-darkLine">
                <div ref="OriginSelect" class="bookingSearch border-r-0 md:border-r rounded-t-md md:rounded-tr-none md:rounded-l-md border-b md:border-b-0">
                  <div class="relative">
                    <div ref="fromSearch" class="py-2.5 px-5 absolute top-0 left-0 w-full h-full hidden">
                      <input ref="from" @input="originCity" @focus="originCity" @blur="originCity1" 
                        v-model="shippingFrom" class="py-2.5 w-full h-full text-sm focus:outline-none bg-transparent" type="text"
                        autocomplete="new-password">
                      <div v-show="fromShow && shippingFrom != ''" class="searchPort">
                        <div v-for="(f,nf) in fromList" :key="nf" @click="selectFrom(f)"
                          class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                          <div><span v-html="f.valueBright"></span></div>
                        </div>
                      </div>
                    </div>
                    <div ref="originPanel" @click="openOrigin" class="py-2.5 px-5">
                      <div class="mb-1.5 font-semibold flex items-center">
                        <div ref="orginTitle">Origin</div>
                        <svg t="1677049940234" class="ml-2 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5647" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="5648"></path></svg>
                      </div>
                      <!-- <div v-show="!OriginSuccess" class="text-gray-400 text-xs">Where are you shipping from?</div> -->
                      <div class="text-gray-400 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{{ form.shipping_from_en }}</div>
                    </div>
                  </div>
                  <div v-show="OriginShow && shippingFrom == ''" class="absolute bottom-0 left-0 z-10 w-full sm:w-600">
                    <div class="top-1 left-0 searchItem w-full">
                      <div class="font-semibold text-base">Recommended city</div>
                      <div class="mt-3 grid grid-cols-4 gap-0">
                        <div v-for="(i,n) in reCity" @click="selectFrom(i)"
                          class="py-3 px-1.5 col-span-1 cursor-pointer hover:bg-gray-100 rounded">{{i.pinyin}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref="DestinationSelect" class="bookingSearch border-r-0 md:border-r border-b md:border-b-0">
                  <div class="relative">
                    <div ref="toSearch" class="py-2.5 px-5 absolute top-0 left-0 w-full h-full hidden">
                      <input ref="toCountrys" @input="seCountry" @focus="seCountry"
                        v-model="shippingTo" class="py-2.5 w-full h-full text-sm focus:outline-none bg-transparent" type="text"
                        autocomplete="new-password">
                      <select-country
                        ref="selectCountry"
                        :selectList="destinationList"
                        :selectChecked="destinationItem"
                        :selectOpen="destinationShow"
                        @increment="selectDestination"
                        v-show="destinationShow"
                      ></select-country>
                    </div>
                    <div ref="destinationPanel" @click="openDestination" class="py-2.5 px-5">
                      <div class="mb-1.5 font-semibold flex items-center">
                        <div ref="destinationTitle">Destination</div>
                        <svg v-show="DestinationSuccess" t="1677049940234" class="ml-2 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5647" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="5648"></path></svg>
                      </div>
                      <div v-show="!DestinationSuccess" class="text-gray-400 text-xs">Please enter country</div>
                      <div v-show="DestinationSuccess" class="text-gray-400 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis"
                      >{{ destinationItem.en_nickname }}</div>
                    </div>
                  </div>
                </div>
                <div ref="LoadSelect" class="bookingSearch rounded-b md:rounded-r-md md:rounded-bl-none">
                  <div class="py-2.5 px-5" @click="LoadShow = !LoadShow">
                    <div class="mb-1.5 font-semibold flex items-center">
                      <div ref="loadTitle">Package Data</div>
                      <svg v-show="LoadSuccess" t="1677049940234" class="ml-2 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5647" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="5648"></path></svg>
                    </div>
                    <div v-show="!LoadSuccess" class="text-gray-400 text-xs">Enter weight and volume</div>
                    <div v-show="LoadSuccess" class="text-gray-400 text-xs"
                    >Total: 
                    <span v-show="totalVolumn > 0">{{ totalVolumn }} {{ volumnUnit[form1.size_unit - 1] }} | </span>
                    {{ totalWeight }} {{ weightUnit[form1.weight_unit - 1] }}
                    <span v-show="totalBoxes > 0"> | {{ totalBoxes }} boxes</span></div>
                  </div>
                  <div v-show="LoadShow" class="absolute bottom-0 left-0 md:left-auto md:-right-24 2xl:left-0 z-10 w-full sm:w-600">
                    <div class="top-1 left-0 searchItem w-full">
                      <div class="mb-4 flex flex-col sm:flex-row">
                        <div class="mr-4 mb-1.5 sm:mb-0 flex-shrink-0 font-semibold">Cargo calculation method</div>
                        <div class="w-full flex flex-wrap">
                          <label class="mr-4 flex items-center cursor-pointer select-none relative">
                            <div class="mr-1 border w-4 h-4 rounded-full flex justify-center items-center"
                              :class="[calculationMethod == 1 ? 'border-orange': 'border-gray-400']">
                              <div v-show="calculationMethod == 1" class="rounded-full bg-orange w-2.5 h-2.5"></div>
                            </div>
                            <input @change="loadSuccess" class="mr-1 absolute opacity-0 cursor-pointer" type="radio" value="1" v-model="calculationMethod">
                            <div>Calculate by Total Shipment</div>
                          </label>
                          <!-- <label class="flex items-center cursor-pointer select-none relative">
                            <div class="mr-1 border w-4 h-4 rounded-full flex justify-center items-center"
                              :class="[calculationMethod == 2 ? 'border-orange': 'border-gray-400']">
                              <div v-show="calculationMethod == 2" class="rounded-full bg-orange w-2.5 h-2.5"></div>
                            </div>
                            <input @change="loadSuccess" class="mr-1 absolute opacity-0 cursor-pointer" type="radio" value="2" v-model="calculationMethod">
                            <div>Calculate by Boxes</div>
                          </label> -->
                        </div>
                      </div>
                      <div class="mb-3 p-1.5 rounded bg-main text-xs">The final price is subject to the actual measurement size.</div>
                      <div v-if="calculationMethod == 1">
                        <div class="mb-5 grid grid-cols-3 gap-3">
                          <div class="col-span-3 sm:col-span-1">
                            <div class="pb-1">
                              <label class="text-13 flex">
                                <div class="required">*</div>
                                Total Weight</label>
                            </div>
                            <div class="relative">
                              <input @input="loadSuccess" v-model="form1.weight" type="number" class="input pr-12 h-42px" min="0"
                                v-validate="'required|totalWeight'" name="totalWeight">
                              <div class="inputTips -bottom-3.5">{{errors.first("totalWeight")}}</div>
                              <select v-model="form1.weight_unit" @change="chooseLoadUnit1"
                                class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                <option value="1">KG</option>
                                <option value="2">LB</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-span-3 sm:col-span-1">
                            <div class="pb-1">
                              <label class="text-13 flex">
                                <!-- <div class="required">*</div> -->
                                Total Volume</label>
                            </div>
                            <div class="relative">
                              <input @input="loadSuccess" v-model="form1.size" type="number" class="input pr-14 h-42px" min="0">
                                <!-- v-validate="'required|totalVolume'" name="totalVolume"> -->
                              <!-- <div class="inputTips -bottom-3.5">{{errors.first("totalVolume")}}</div> -->
                              <select v-model="form1.size_unit" @change="chooseLoadUnit"
                                class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                <option value="1">CBM</option>
                                <option value="2">CBF</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-span-3 sm:col-span-1">
                            <div class="pb-1">
                              <label class="text-13 flex">Of Boxes</label>
                            </div>
                            <input @input="loadSuccess" v-model="form1.num" class="input h-42px" type="number" min="1">
                          </div>
                        </div>
                      </div>
                      <div v-if="calculationMethod == 2">
                        <div v-for="(item,ns) in unitBox" :key="ns" class="flex items-end relative mb-4">
                          <div class="mb-2 grid grid-cols-4 gap-3">
                            <div class="col-span-1">
                              <div class="pb-1">
                                <label class="text-13 flex">
                                  <div class="required">*</div>
                                  Weight (per box)</label>
                              </div>
                              <div class="relative">
                                <input @input="loadSuccess" v-model="item.weight" type="number" class="input pr-12 h-42px" min="0">
                                <select v-model="form1.weight_unit" @change="chooseLoadUnit1"
                                  class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                  <option value="1">KG</option>
                                  <option value="2">LB</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-span-2">
                              <div class="pb-1">
                                <label class="text-13 flex">
                                  <div class="required">*</div>
                                  Dimensions (L x W x H per box)</label>
                              </div>
                              <div class="relative overflow-hidden flex border border-inputBorder dark:border-darkMain rounded">
                                <input @input="loadSuccess" v-model="item.long" type="number" placeholder="L" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 border-r focus:border-inputBorder dark:border-darkLine dark:focus:border-darkLine focus:ring-0" min="0">
                                <input @input="loadSuccess" v-model="item.width" type="number" placeholder="W" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 border-r focus:border-inputBorder dark:border-darkLine dark:focus:border-darkLine focus:ring-0" min="0">
                                <input @input="loadSuccess" v-model="item.height" type="number" placeholder="H" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 focus:ring-0" min="0">
                                <select name="volume" v-model="form1.size_unit" @change="chooseLoadUnit"
                                  class="bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                  <option value="1">CM</option>
                                  <option value="2">IN</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-span-1">
                              <div class="pb-1">
                                <label class="text-13 flex">
                                  <div class="required">*</div>
                                  Of Boxes</label>
                              </div>
                              <input @input="loadSuccess" v-model="item.num" class="input h-42px" type="number" min="1">
                            </div>
                          </div>
                          <div class="mb-4 flex">
                            <svg @click="delLoad(ns)" t="1677056269738" class="icon mx-2.5 cursor-pointer" viewBox="0 0 1033 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7668" width="18" height="18"><path d="M0 151.220727h1033.939684v80.017582H0z" p-id="7669" fill="#7a7a7a"></path><path d="M701.804205 228.837782H332.135479a40.008791 40.008791 0 0 1-40.008791-40.008791v-148.782692a40.008791 40.008791 0 0 1 40.008791-40.008791h369.668726a40.008791 40.008791 0 0 1 40.008791 40.008791v148.782692a40.008791 40.008791 0 0 1-40.008791 40.008791z m-329.659935-80.017582h289.651144v-68.76511H372.14427z" p-id="7670" fill="#7a7a7a"></path><path d="M813.616273 1023.987497H232.813655a40.008791 40.008791 0 0 1-39.896266-37.133159l-56.262362-780.846573a40.008791 40.008791 0 0 1 39.896266-42.884422h680.824595a40.008791 40.008791 0 0 1 39.946278 42.246782l-43.759616 780.809065a40.008791 40.008791 0 0 1-39.946277 37.808307z m-543.569437-80.017582H775.795463l39.271129-700.853996H219.548241z" p-id="7671" fill="#7a7a7a"></path><path d="M400.275451 991.655393a40.008791 40.008791 0 0 1-40.008791-40.008791V356.328295a40.008791 40.008791 0 0 1 80.017582 0v595.318307a40.008791 40.008791 0 0 1-40.008791 40.008791zM644.491612 991.655393a40.008791 40.008791 0 0 1-40.008791-40.008791V356.328295a40.008791 40.008791 0 0 1 80.017582 0v595.318307a40.008791 40.008791 0 0 1-40.008791 40.008791z" p-id="7672" fill="#7a7a7a"></path></svg>
                            <svg @click="copyLoad(ns)" t="1677056177686" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3964" width="20" height="20"><path d="M853.333333 224h-53.333333V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667H170.666667C130.133333 96 96 130.133333 96 170.666667v554.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h53.333333V853.333333c0 40.533333 34.133333 74.666667 74.666667 74.666667h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V298.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667zM160 725.333333V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h554.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m704 128c0 6.4-4.266667 10.666667-10.666667 10.666667H298.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333H725.333333c40.533333 0 74.666667-34.133333 74.666667-74.666667V288H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666z" fill="#7a7a7a" p-id="3965"></path><path d="M576 416h-96V320c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H320c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V576c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H576c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#7a7a7a" p-id="3966"></path></svg>
                          </div>
                          <div v-show="!item.right" class="inputTips -bottom-2">Enter a positive value for all fields</div>
                        </div>
                        <div class="mt-3 mb-5 flex">
                          <div @click="addLoad" class="text-switch cursor-pointer hover:underline">Add a load</div>
                          <div class="ml-2 text-13 text-gray-400">(If more than one size goods, please add.)</div>
                        </div>
                      </div>
                      <div class="pt-5 flex justify-end items-center border-t border-gray-300 dark:border-darkLine">
                        <div @click="clearLoad" class="mr-8 cursor-pointer hover:underline">Clear all</div>
                        <button @click="confirmLoad" class="confirmBtn">Confirm</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div ref="GoodsSelect" class="max-w-700 bookingSearch border-none rounded-b sm:rounded-bl-none md:rounded-r-md">
                  <div class="py-2.5 px-5" @click="GoodsShows">
                    <div class="mb-1.5 font-semibold flex items-center">
                      <div ref="goodsTitle">Product Category</div>
                      <svg v-show="GoodsSuccess" t="1677049940234" class="ml-2 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5647" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="5648"></path></svg>
                    </div>
                    <div v-show="!GoodsSuccess" class="text-gray-400 text-xs">Select product category</div>
                    <div v-show="GoodsSuccess" class="text-gray-400 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis"
                    >{{ GoodsList }}</div>
                  </div>
                  <div v-show="GoodsShow" class="absolute bottom-0 right-0 z-10 w-full sm:w-600 md:w-700">
                    <div class="top-1 right-0 searchItem w-full">
                      <div class="mb-3">Select your type of goods (Multiple options)</div>
                      <div class="mb-5 relative">
                        <div class="mb-3 grid grid-cols-15 gap-1">
                          <div v-for="(i,n) in GoodsType" :key="n" @click="chooseGoods(n)"
                            class="p-2 col-span-5 sm:col-span-3 text-13 leading-4 border rounded flex justify-center items-center text-center cursor-pointer
                            hover:border-orange hover:text-orange relative" :class="selectGoods == n ? 'border-orange text-orange' : ''">
                            <div>{{ i.e_name }}</div>
                            <div v-show="i.check.length > 0"
                              class="absolute -top-2 right-1 w-3.5 h-3.5 leading-3 text-xs 
                              text-white bg-orange rounded-full flex justify-center items-center">{{ i.check.length }}</div>
                          </div>
                        </div>
                        <div class="border-t pt-3">
                          <div v-show="selectGoods == nv" class="grid grid-cols-6 gap-3 text-13" v-for="(iv,nv) in GoodsType" :key="nv">
                            <div class="flex" :class="[iv.child.length == 1 ? 'col-span-6' : 'col-span-3 sm:col-span-2']" 
                              v-for="(ic,nc) in iv.child" :key="nc">
                              <label class="flex items-center cursor-pointer select-none">
                                <input class="mr-1.5" type="checkbox" :value="ic" v-model="iv.check" @change="checkGoods">
                                <div>{{ ic.e_name }}</div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div v-show="!GoodsSuccess" class="inputTips -bottom-5">Select at least one type of goods</div>
                      </div>
                      <div class="pt-5 flex justify-end items-center border-t border-gray-300 dark:border-darkLine">
                        <div @click="clearGoods" class="mr-8 cursor-pointer hover:underline">Clear all</div>
                        <button @click="confirmGoods" class="confirmBtn">Confirm</button>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <button @click="Search(form,'1')"
                class="flex-shrink-0 mt-5 md:mt-0 md:ml-10 w-60 md:w-40 h-12 p-1 bg-orange hover:bg-orange1 text-white rounded-md">Get Price</button>
            </div>
            <div v-show="!result && !showLoad" class="">
              <div v-show="history.length>0" class="mt-6">
                <div class="flex justify-between items-center">
                  <div class="text-base">History</div>
                  <div @click="DelHistory" class="text-base cursor-pointer hover:underline">clear all</div>
                </div>
                <div class="mt-3 grid grid-cols-12 gap-4">
                  <div v-for="(hi,hn) in history" :key="hn"
                    class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md hover:shadow-xxx bg-gray-200 cursor-pointer relative">
                    <div class="py-2 px-3" @click="Search(hi,'2')">
                      <div class=" break-words">{{ hi.shipping_from_en }} - {{ hi.shipping_to_en }}</div>
                      <div class="flex text-xs text-gray-400 overflow-hidden">
                        <div class="whitespace-nowrap">{{ hi.weight }}{{ weightUnit[hi.weight_unit - 1] }}</div>
                        <div class="whitespace-nowrap ml-1 pl-1 border-l border-gray-400">{{ hi.total }} boxes</div>
                        <div class="whitespace-nowrap ml-1 pl-1 border-l border-gray-400">{{ hi.volume }}{{ sizeUnit[hi.volume_unit - 1] }}</div>
                        <!-- <div class="whitespace-nowrap ml-1 pl-1 border-l border-gray-400">{{ hi.volume }}{{ sizeUnit[hi.volume_unit - 1] }}</div> -->
                      </div>
                    </div>
                    <svg @click="delAHistory(hi.id)" t="1672301620631" class="icon absolute -top-2 -right-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6172" width="20" height="20"><path d="M512 512m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z" fill="#7a7a7a" p-id="6173" data-spm-anchor-id="a313x.7781069.0.i11" class="selected"></path><path d="M330.965333 270.634667a42.666667 42.666667 0 0 0-60.330666 60.330666L451.669333 512l-181.034666 181.034667a42.666667 42.666667 0 1 0 60.330666 60.330666L512 572.330667l180.992 181.034666a42.666667 42.666667 0 0 0 60.373333-60.330666L572.330667 512l181.034666-181.034667a42.666667 42.666667 0 0 0-60.373333-60.330666L512 451.669333 330.965333 270.634667z" fill="#ffffff" p-id="6174" data-spm-anchor-id="a313x.7781069.0.i12" class="selected"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!standard" class="p-5 rounded-b-md rounded-tr-md shadow-default bg-white dark:bg-darkMenu">
            <div class="mb-3.5 font-semibold">Input Cargo Information <span class="text-red-500">(Will get our exclusive quote)</span></div>
              <div class="flex items-center">
              <textarea v-model="quickQuotes.content" rows="6" class="input resize-none text-13"
            placeholder="Package Data: 24kg/1CBM
Supplier Contact Number/address: 12345678901
Ship to :  ABE2 705 Boulder Drive Breinigsville PA 123456"></textarea>
              <button @click="submitQuickQuote" class="flex-shrink-0 ml-8 w-40 h-12 p-1 rounded bg-orange hover:bg-orange1 text-white">Submit</button>
            </div>
          </div>
        </div>

        <!-- <div class="flex justify-center items-end pt-3 md:pt-0">
          <button @click="Search(form,'1')"
          class="w-60 md:w-40 h-12 p-1 bg-orange hover:bg-orange1 text-white rounded-md">Get Price</button>
          <button @click="toCustomRFQ"
          class="ml-5 w-60 md:w-40 h-12 p-1 bg-gray-300 hover:bg-gray-400 dark:text-gray-600 rounded-md">Quick Text Quote</button>
        </div> -->

        <!-- <div v-show="!result && !showLoad && token==''" class="pb-32"> -->
        <div v-show="!result && !showLoad" class="pb-32">
          <div class="mt-6">
            <div class="mb-2 font-medium text-lg">Recommended Price</div>
            <div class="grid grid-cols-12 gap-3.5">
              <div v-for="(i,n) in recommendDTD" :index="n"
                class="p-3 col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md shadow-default bg-white dark:bg-darkMenu relative">
                <div v-show="i.delivery_type == 1" class="absolute -right-1.5 top-0 flex flex-col items-end">
                  <div class="bg-recommend text-white py-1 px-2 text-xs">Compensate for delay</div>
                  <div class="triangle"></div>
                </div>
                <div class="relative">
                  <div class="mt-1 flex items-center">
                    <img class="w-8 h-8 mr-2" :src="i.product_img" alt="">
                    <div class="font-medium">{{i.product_name_e}}</div>
                  </div>
                  <div class="mt-1.5 flex items-center">
                    <img class="w-3 h-3 mr-1" src="../../assets/dtdtime.svg" alt="">
                    <div class="text-xs">{{i.aging_start}}-{{i.aging_end}} Business Days</div>
                  </div>
                  <div class="flex items-end">
                    <div class="flex items-center w-full">
                      <img class="w-3 h-3 flex-shrink-0 mr-1" src="../../assets/dtdprice.svg" alt="">
                      <div class="w-full flex flex-wrap items-end">
                        <div>
                          <span class="text-recommend font-semibold">USD {{i.super_freight}}</span>
                          <span class="px-1 text-xs">({{i.weight}}kg)</span>
                        </div>
                        <span class="text-xs text-gray-400 line-through">USD {{i.freight}}</span>
                      </div>
                    </div>
                    <div @click="tobookingchat(i,'quick')"
                      class="w-28 flex-shrink-0 h-9 px-1 flex justify-center items-center cursor-pointer rounded hover:bg-gray-100 bg-white dark:bg-gray-500 border border-orange">
                      <img class="w-6" src="../../assets/chatnow.png" alt="">
                      <div class="text-oranges font-semibold">Chat now</div>
                    </div>
                    <!-- <button @click="bookingOrder(i,'quick')"
                      class="flex-shrink-0 w-20 p-1 text-13 bg-white hover:bg-gray-200 border border-orange text-orange rounded-md">Booking</button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 hidden">
            <div class="mb-2 font-medium text-lg">Port to Port Price</div>
            <div class="grid grid-cols-6 gap-7">
              <div v-for="(i,n) in recommendPTP" :index="n" @click="searchSale(i)"
                class="p-6 col-span-6 md:col-span-3 xl:col-span-2 rounded-md shadow-sm bg-white dark:bg-darkMenu hover:shadow-xxx cursor-pointer">
                <div class="flex flex-col sm:flex-row">
                  <div class="flex flex-col items-center flex-shrink-0 w-16">
                    <img :src="i.img" class="w-12 h-12 rounded-full mb-1" alt="">
                    <div class="text-xs">{{i.company}}</div>
                  </div>
                  <div class="mt-3 sm:mt-0 w-full flex justify-around items-center">
                    <div class="font-semibold">{{i.start_port}}</div>
                    <div class="text-xs relative ml-2.5">
                      <img src="../../assets/arrive.svg" class="w-16" alt="">
                      <div class="absolute -top-3.5 left-2.5">{{i.air_day}} days</div>
                    </div>
                    <div class="font-semibold">{{i.end_port}}</div>
                  </div>
                </div>
                <div class="mt-6 flex justify-between text-xs text-center">
                  <div>
                    <div class="mb-1">20'GP</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.gp20 != '0.00'">${{i.gp20}}</div>
                      <div v-if="i.gp20 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_gp20 != '0.00'">${{i.super_gp20}}</div>
                      <div v-if="i.super_gp20 == '0.00'">N/A</div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1">40'GP</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.gp40 != '0.00'">${{i.gp40}}</div>
                      <div v-if="i.gp40 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_gp40 != '0.00'">${{i.super_gp40}}</div>
                      <div v-if="i.super_gp40 == '0.00'">N/A</div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1">40'HQ</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.hq40 != '0.00'">${{i.hq40}}</div>
                      <div v-if="i.hq40 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_hq40 != '0.00'">${{i.super_hq40}}</div>
                      <div v-if="i.super_hq40 == '0.00'">N/A</div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1">45'HQ</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.hq45 != '0.00'">${{i.hq45}}</div>
                      <div v-if="i.hq45 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_hq45 != '0.00'">${{i.super_hq45}}</div>
                      <div v-if="i.super_hq45 == '0.00'">N/A</div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 flex justify-between items-center text-xs">
                  <div>
                    <span>Expiration date: </span>
                    <span class="text-gray-400">{{i.expiration_date}}</span>
                  </div>
                  <div class="px-2 py-0.5 border border-gray-300 text-gray-400 rounded-md">{{transshipmentList[i.type-1]}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="result" class="mt-5 mb-32">
        <!-- <div class="mt-10"> -->
          
          <div class="mb-5 hidden flex-wrap p-3 bg-white dark:bg-darkMenu shadow-default rounded-md">
            <div class="selectLabel">
              <select name="" class="select mx-2 text-14 sm:text-base" v-model="sortby" @change="sortStatus">
                <option class="hidden" value="null">Sort By</option>
                <option value="1">Cheapest</option>
                <option value="2">Quickest</option>
              </select>
            </div>
            <div class="selectLabel">
              <select name="" class="select mx-2 text-14 sm:text-base" v-model="sortMethod" @change="methodStatus">
                <option class="hidden" value="null">Shipping Method</option>
                <option value="0">All</option>
                <option value="1">Sea DDP</option>
                <option value="2">Air DDP</option>
                <option value="3">Parcel</option>
                <option value="4">Express</option>
                <option value="5">European Railway DDP</option>
              </select>
            </div>
            <div class="flex flex-wrap my-1 mx-2">
              <label class="sortItem">
                <div class="Checkbox"
                  :class="[sort1 ? 'bg-orange border-none':'']">
                  <svg v-show="sort1" t="1677573225110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12292" width="12" height="12"><path d="M1004.50304 266.82624l-587.072 594.16064-17.1904 16.19328-17.1904-16.19328L19.49696 493.03808l118.53696-119.9872 262.17856 265.37984 485.7536-491.6096L1004.50304 266.82624 1004.50304 266.82624zM1004.50304 266.82624" fill="#ffffff" p-id="12293"></path></svg>
                </div>
                <input type="checkbox" class="mr-1.5 absolute cursor-pointer opacity-0" value="1" v-model="sort1" @change="searchCondition('1')">
                <div>Pick up Service</div>
              </label>
              <label class="sortItem">
                <div class="Checkbox"
                  :class="[sort2 ? 'bg-orange border-none':'']">
                  <svg v-show="sort2" t="1677573225110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12292" width="12" height="12"><path d="M1004.50304 266.82624l-587.072 594.16064-17.1904 16.19328-17.1904-16.19328L19.49696 493.03808l118.53696-119.9872 262.17856 265.37984 485.7536-491.6096L1004.50304 266.82624 1004.50304 266.82624zM1004.50304 266.82624" fill="#ffffff" p-id="12293"></path></svg>
                </div>
                <input type="checkbox" class="mr-1.5 absolute cursor-pointer opacity-0" @change="searchCondition('2')">
                <div>Product Category</div>
              </label>
              <label class="sortItem">
                <div class="Checkbox"
                  :class="[sort3 ? 'bg-orange border-none':'']">
                  <svg v-show="sort3" t="1677573225110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12292" width="12" height="12"><path d="M1004.50304 266.82624l-587.072 594.16064-17.1904 16.19328-17.1904-16.19328L19.49696 493.03808l118.53696-119.9872 262.17856 265.37984 485.7536-491.6096L1004.50304 266.82624 1004.50304 266.82624zM1004.50304 266.82624" fill="#ffffff" p-id="12293"></path></svg>
                </div>
                <input type="checkbox" class="mr-1.5 absolute cursor-pointer opacity-0" value="1" v-model="sort3" @change="searchCondition('3')">
                <div>Non - FBA address</div>
              </label>
            </div>
          </div>
          <div v-show="shippingList.length==0 && !showLoad"
            class="mb-4 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
            <div class="flex flex-col items-center">
              <img src="../../assets/noShipCost.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
              <div class="mt-5 text-base text-center font-semibold">No results</div>
            </div>
          </div>
          <div v-show="shippingList.length>0 && !showLoad">
            <div class="hidden p-4 lg:flex mb-4 bg-white dark:bg-darkMenu shadow-default rounded-md">
              <div class="w-1/2 flex ">
                <div class="flex-shrink-0 w-20">Carrier</div>
                <div class="w-full flex">
                  <div class="w-3/4">Shipping Method</div>
                  <div>Shipping Time</div>
                </div>
              </div>
              <div class="w-1/3 flex justify-end">
                <!-- <div>Unit Price</div> -->
                <div class="w-64 text-center">Estimated Costs</div>
              </div>
            </div>
            <div v-for="(i,n) in shippingList" :index="n"
              class="mb-4 bg-gray-200 shadow-default rounded-md hover:shadow-xxx">
              <div class="px-4 py-6 flex flex-col lg:flex-row bg-white dark:bg-darkMenu shadow-default rounded-md">
                <div class="w-full lg:w-1/2 flex flex-col lg:flex-row">
                  <div class="w-full lg:w-3/4 flex">
                    <img class="mr-4 w-16 h-16 rounded-full" :src="i.product_img" alt="">
                    <div>
                      <div class="flex flex-col lg:flex-row lg:items-center">
                        <div class="mr-7 font-semibold text-xl">{{i.product_name_e}}</div>
                        
                      </div>
                      <div class="mt-4 flex flex-wrap text-xs">
                        <div v-if="i.tax!='0'" class="mr-2 mb-1 py-0.5 px-3 rounded text-dtdTax1 bg-dtdTax">Included Tax</div>
                        <div v-if="i.product_label[0] != ''" class="mr-2 mb-1 py-0.5 px-3 rounded text-dtdLabel1 bg-dtdLabel">{{i.product_label[0]}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 lg:mt-0 w-full lg:w-1/4">
                    <div class="text-lg font-semibold">{{i.aging_start}}-{{i.aging_end}} Business days</div>
                    <div class="mt-1 lg:mt-2 text-lg">(Door to Door)</div>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 flex flex-col lg:flex-row">
                  <div class="w-full lg:w-2/3">
                    <div class="mt-2 lg:mt-0 flex flex-col lg:flex-row justify-end items-start">
                      <!-- <div class="text-base">${{i.add_unit_price}}/kg</div> -->
                      <div class="flex flex-col">
                        <div class="flex text-gray-500 line-through text-xs">
                          <div>current price</div>
                          <div class="ml-4">USD {{i.freight}}</div>
                        </div>
                        <div class="mt-2 lg:mt-0 text-orange flex items-center">
                          <div>Discounted price</div>
                          <div class="ml-3 text-xl font-semibold ">USD {{i.super_freight}}</div>
                          <img src="../../assets/help.svg"
                            class="w-5 h-5 ml-1.5 mt-0.5 cursor-pointer"
                            @mouseenter="onShowTip($event)"
                            @mouseleave="onHideTip"
                            alt="">
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-start lg:justify-end">
                      <!-- @mouseenter="i.itemin = true" @mouseleave="i.itemin = false" -->
                      <div 
                        class="hidden mt-2.5 relative text-xs text-center py-1.5 px-3 rounded-md" style="background-color: #ffe7d5;">
                        <span v-if="i.transport_type == 4">Door to door freight included, duty not included.</span>
                        <span v-if="i.transport_type != 4">Door to door freight and duty included.</span>
                        <!-- <svg :ref="'pd'+n" t="1689646603930" @click="pulldownitem(i,n)" class="cursor-pointer absolute top-1.5 right-2 icon" style="transition: transform 0.5s;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2399" width="18" height="18"><path d="M930.666 323.731c0 14.331-5.512 27.677-15.529 37.657l-365.99 365.34c-1.306 1.336-2.417 2.379-3.607 3.234l-2.723 2.16c-10.703 10.653-23.296 15.887-36.627 15.887-13.571 0-26.26-5.351-35.729-15.053l-363.953-367.853c-9.813-9.951-15.222-23.238-15.222-37.401 0-13.849 5.25-26.931 14.769-36.832 9.549-9.841 22.867-15.506 36.518-15.506 13.484 0 26.259 5.365 35.969 15.134l328.283 331.846 336.964-336.081c9.666-9.607 22.296-14.915 35.619-14.915 13.958 0 27.055 5.673 36.876 15.937 9.271 9.768 14.381 22.734 14.381 36.444z" fill="#999999" p-id="2400"></path></svg> -->
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 lg:mt-0 w-full lg:w-1/3 flex justify-start lg:justify-end items-center">
                    <div class="flex flex-row lg:flex-col">
                      <div @click="tobookingchat(i)"
                        class="mb-0 lg:mb-2 mr-2 lg:mr-0 h-9 px-3 flex justify-center items-center cursor-pointer rounded hover:bg-gray-100 bg-white dark:bg-gray-500 border border-orange">
                        <img class="w-6" src="../../assets/chatnow.png" alt="">
                        <div class="text-oranges font-semibold">Chat now</div>
                      </div>
                      <button @click="bookingOrder(i,'base')"
                        class="h-9 py-2 px-3 rounded w-44 bg-orange hover:bg-orange1 text-white">Booking Now</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div v-show="i.itemin || i.itemopen" class="p-4 flex flex-wrap">
                <div class="w-full lg:w-1/3 flex">
                  <div class="mr-5 text-gray-500">Pickup Fee</div>
                  <div v-if="i.take_fee != 0">${{ i.take_unit_price }}/kg</div>
                  <div v-if="i.take_fee == 0">N/A</div>
                </div>
                <div class="w-full lg:w-1/3 flex">
                  <div class="mr-5 text-gray-500">Product Surcharge</div>
                  <div v-if="form.take != 0">${{ i.product_unit_price }}/kg</div>
                  <div v-if="form.take == 0">N/A</div>
                </div>
                <div class="w-full lg:w-1/3 flex">
                  <div class="mr-5 text-gray-500">Delivery surcharge</div>
                  <div v-if="i.not_fba_address_unit_price != 0">${{ i.not_fba_address_unit_price }}/kg</div>
                  <div v-if="i.not_fba_address_unit_price == 0">N/A</div>
                </div>
              </div> -->
            </div>
            <img v-show="token == ''" src="../../assets/dtdList.png" class="w-full" alt="">
          </div>

          <div class="">
            <!-- <div v-show="result && !showLoad" class="w-full mt-4 xl:mt-0 pb-28">
              <shipping-item :shippingList="sortShippingList" :pickup="ispickup" :wunit="form.weight_unit"
                :from="forms.shipping_from_en" :to="forms.shipping_to_en" :to_zipcode="forms.shipping_to_zipcode"
                :number="form.total" :weight="form.weight" :toType="form.shipping_to_type"
                :long="form.long" :width="form.with" :height="form.height"
                @booking="openModal" :leftMenu="leftMenuOpen" @indemnity="indemnityOpen"></shipping-item>
            </div> -->
            <div v-show="result && showLoad" class="w-full mt-4 xl:mt-0">
            <!-- <div class="w-full mt-4 xl:mt-0 "> -->
              <!-- n -->
              <div class="loading">
                <div class="p-7 border-b border-gray-300"></div>
                <div class="h-36 p-6 flex">
                  <div class="w-24 h-24 rounded-full bg-gray-300"></div>
                  <div class="pl-8">
                    <div class="w-28 h-5 rounded-md bg-gray-300"></div>
                    <div class="mt-3 w-44 h-5 rounded-md bg-gray-300"></div>
                    <div class="mt-3 w-20 h-5 rounded-md bg-gray-300"></div>
                  </div>
                </div>
                <div class="p-7 border-t border-gray-300"></div>
              </div>
              <div class="loading">
                <div class="p-7 border-b border-gray-300"></div>
                <div class="h-36 p-6 flex">
                  <div class="w-24 h-24 rounded-full bg-gray-300"></div>
                  <div class="pl-8">
                    <div class="w-28 h-5 rounded-md bg-gray-300"></div>
                    <div class="mt-3 w-44 h-5 rounded-md bg-gray-300"></div>
                    <div class="mt-3 w-20 h-5 rounded-md bg-gray-300"></div>
                  </div>
                </div>
                <div class="p-7 border-t border-gray-300"></div>
              </div>
              <div class="loading">
                <div class="p-7 border-b border-gray-300"></div>
                <div class="h-36 p-6 flex">
                  <div class="w-24 h-24 rounded-full bg-gray-300"></div>
                  <div class="pl-8">
                    <div class="w-28 h-5 rounded-md bg-gray-300"></div>
                    <div class="mt-3 w-44 h-5 rounded-md bg-gray-300"></div>
                    <div class="mt-3 w-20 h-5 rounded-md bg-gray-300"></div>
                  </div>
                </div>
                <div class="p-7 border-t border-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!result && showLoad" class="mt-28 md:mt-48 flex justify-center">
          <img src="../../assets/loading.svg" class="w-20 h-20 animate-spin" alt="">
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
  // import SelectSearch from '@/components/SelectSearch'
  // import SelectCountry from '@/components/SelectCountry'
  import SelectCity from '@/components/Order/Forwarding/OrderSelectCity'
  import SelectCountry from '@/components/Order/Forwarding/OSCountry'
  // import SelectCountry from '@/components/Order/Forwarding/OrderSelectCountry'
  import ShippingItem from '@/components/Shipping/ShippingItem'
  import {
    shipFromTo,
    getCost,
    getHistory,
    delHistory,
    getRecommend,
    getQuickNumber
  } from '@/api/shippingCost'
  import {
    ImgUpload,
    quickOrder,
    getStart,
    getEnd,
    feedback,
  } from '@/api/order'
  import HoverTips from '@/components/Dashboard/HoverTips'
  export default {
    components: {
      SelectCity,
      SelectCountry,
      ShippingItem,
      HoverTips
    },
    props: ['leftMenu','search_form'],
    watch: {
      leftMenu: function (val) {
        this.leftMenuOpen = val
      },
      search_form: function (val) {
        let form = JSON.parse(val)
        this.gptSearch(form)
      },
    },
    data() {
      return {
        contryList: ['US', 'UK'],
        originList: [],
        originItem: { name: "北京市", e_name: "Beijing" },
        originShow: false,
        destinationList: [],
        destinationItem: { zh_cn_nickname: '美国', code_two: 'US', en_nickname: 'United States' },
        // destinationItem: {},
        destinationShow: false,
        email: '',
        sortShippingList: [],
        shippingList: [
          // {
          //   product_img: '',
          //   product_name_e: '',
          //   product_label: [],
          //   freight: '',
          //   aging_start: '',
          //   aging_end: '',
          //   tax: ''
          // },
        ],
        shippingListss: [],
        shippingListSort: [],
        // form:{
        //   shipping_from: '北京市',
        //   shipping_from_en: 'Beijing',
        //   shipping_to: '美国',
        //   shipping_to_en: 'United States',
        //   weight: null,
        //   weight_unit: 1,
        //   total: null,
        //   long: null,
        //   with: null,
        //   height: null,
        //   size_unit: 1,
        //   take: 0,
        // },
        form: {
          // delivery_type: 1,
          shipping_from: '100000',
          shipping_from_en: 'China',
          take: 1,
          // shipping_to_type: 1,
          // fba_code: '',
          shipping_to: '美国',
          shipping_to_en: 'United States',
          shipping_to_zipcode: '',
          insurance: 0,
          load_type: 1,
          volume: '',
          volume_unit: 1,
          weight: 2,
          weight_unit: 1,
          total: '',
          product_one: 0,
          product_two: 0,
          manage_id: '152',
          not_fba_address: 0,
        },
        result: false,
        history: [
          // {
          //   created_data: "",
          //   customer_id: "",
          //   height: "",
          //   id: "",
          //   long: "",
          //   shipping_from: "",
          //   shipping_to: "",
          //   size_unit: "",
          //   total: "",
          //   weight: "",
          //   weight_unit: "",
          //   with: ""
          // }
        ],
        weightUnit: ['KG','LB'],
        sizeUnit: ['CM','IN'],
        volumnUnit: ['CBM','CBF'],
        ispickup: false,
        customer_manage: {
          email: "ben.he@co-logistics.com",
          englishname: "Ben",
          whatsapp: "+1-917-639-5399",
          image_url: '',
          id: "152",
          // phone: null,
          // username: "admin"
        },
        OriginShow: false,
        DestinationShow: false,
        LoadShow: false,
        GoodsShow: false,
        calculationMethod: 1,
        locationType1: ['Factory/Warehouse','Business address','Residential address'],
        shipping_to_type: 1,
        destinationType1: ['Amazon FBA Warehouse','Business address','Residential address'],
        buyinsurance: false,
        OriginSuccess: true,
        DestinationSuccess: true,
        LoadSuccess: true,
        GoodsSuccess: false,
        form1: {
          size: null,
          size_unit: 1,
          weight: 2,
          weight_unit: 1,
          num: null,
        },
        unitBox: [
          {
            long: null,
            width: null,
            height: null,
            weight: null,
            num: null,
            right: true,
          }
        ],
        totalVolumn: 0,
        totalWeight: 2,
        totalBoxes: 0,
        GoodsList: '',
        selectGoods: 0,
        GoodsType: [
          {
            e_name: 'General products',
            check: [],
            child: [
              {
                e_name: 'Plastic & Silicone products'
              },
              {
                e_name: 'Paper products (Excl grid)'
              },
              {
                e_name: 'Lamps'
              },
              {
                e_name: 'General products'
              },
            ]
          }
        ],
        FBAList: [],
        FBASearchList: [],
        FBAShow: false,
        sortBy: 1,
        shippingMethod: [],
        customsDuties: [],
        orderType: 1,
        uploadShow: true,
        quickOrderForm: {
          contact_tel: '',
          whatsapp: '',
          wetch: '',
          content: '',
          order_img_url: '',
          order_img_name: '',
        },
        upload1Show: true,
        quickQuotes: {
          content: '',
          order_img_url: '',
          order_img_name: '',
        },
        freight_good: {},
        forms: {},
        sort_sm1: false,
        sort_sm2: false,
        sort_sm3: false,
        sort_sm4: false,
        sort_sm5: false,
        sort_cd1: false,
        sort_cd0: false,
        fromShow: false,
        fromList: [],
        shippingFrom: '',
        fbaCode: '',
        showLoad: false,
        destinationCity: '',
        endShow: false,
        endList: [],
        leftMenuOpen: this.leftMenu,
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            // clickable: true,
          },
          autoplay:{
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          loop: true,
          loopAdditionalSlides: 2,
          speed: 1500,
          // effect: 'fade',
        },
        bannerList: [
          {img:require("../../assets/DDPBanner1.webp")},
          {img:require("../../assets/DDPBanner2.webp")},
          {img:require("../../assets/DDPBanner3.webp")},
        ],
        tabChoose: 1,
        isTab: 1,
        contents: '',
        typeFirst: true,
        standard: true,
        reCity: [],
        shippingTo: '',
        sort1: true,
        sort2: false,
        sort3: false,
        target: '',
        content: '',
        token: '',
        recommendDTD: [],
        recommendPTP: [],
        transshipmentList: ['Transit','Direct'],
        sortby: null,
        sortMethod: null,
        shipping_toSearch: '',
        shipping_to_enSearch: '',
      }
    },
    computed: {
      // swiper() {
      //   return this.$refs.mySwiper.swiper
      // }
    },
    created() {
      // this.countryQuest()
      this.$emit('menu', 'shippingCost')
      shipFromTo().then((res)=>{
        // console.log(res.data)
        // this.originList = res.data.startCity
        this.destinationList = res.data.endCountry
        // let tree = res.data.productData.reverse()
        // tree.forEach((item,index)=>{
        //   item.check = []
        // })
        // this.GoodsType = tree
        this.FBAList = res.data.fbaData
        this.nologin()
      })
      this.email = JSON.parse(localStorage.getItem('userInfo')).email
      if(this.$store.state.user.token){
        getHistory().then((reh)=>{
          this.history = reh.data.slice(0,4)
        })
        this.token = this.$store.state.user.token
      }
      // else{
        getRecommend({
          is_packet: 1,
        }).then((req)=>{
          this.recommendDTD = req.data.doorData
          this.recommendPTP = req.data.specialData
        })
      // }
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
      let acc = JSON.parse(localStorage.getItem('customer_manage'))
      if(acc.id){
        this.customer_manage = acc
        this.form.manage_id = acc.id
      }
      getStart().then((res)=>{
        this.reCity = res.data
      })

      let ist = JSON.parse(localStorage.getItem("tobooking"))
      if(ist){
        // this.freight_good = ist
        localStorage.removeItem("tobooking")
        this.tobookingchat(ist,'quick')
        // this.orderType = 2
        // this.Orders('quick')
      }
      // this.swiper.slideTo(0, 3000, false)
      // this.quickQuotes.content = 'eg.' + '\n' + 'Wool Drying Balls - NaturalWhite'
      //   + '\n' + 'Ship From: B701,Bantian International Centre,Huanchengnan road,Longang district,Shenzhen,China'
      //   + '\n' + 'Contact Person:- Ms.Poppy.'
      //   + '\n' + 'ContactNumber:-12345678977'
      //   + '\n' + 'Email :12222@pop.com '
      //   + '\n' + 'Ship to :ABE2 705 Boulder Drive Breinigsville PA 18031'
      //   + '\n' + 'Amazon reference ID: 861234YT'
      if(this.$route.params.searchForm){
        let form = JSON.parse(this.$route.params.searchForm)
        this.gptSearch(form)
      }
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      // forData(tree){
      //   tree.forEach((item,index)=>{
      //     item.slots = {
      //       check: []
      //     }
      //     if(item.child){
      //       this.forData(item.child)
      //     }
      //   })
      // },
      gptSearch(form){
        this.form = form
        for(let cn = 0; cn < this.destinationList.length; cn++){
          if(this.form.shipping_to_en == this.destinationList[cn].en_nickname){
            this.destinationItem = this.destinationList[cn]
          }
        }
        this.shippingFrom = this.form.shipping_from_en

        this.form1.size = this.form.volume
        this.form1.size_unit = this.form.volume_unit
        this.form1.weight = this.form.weight
        this.form1.weight_unit = this.form.weight_unit
        this.form1.num = this.form.total
        this.totalBoxes = Number(this.form1.num).toFixed(0)
        this.totalVolumn = Number(this.form1.size).toFixed(2)
        this.totalWeight = Number(this.form1.weight).toFixed(2)

        getCost(form).then((res)=>{
          res.data.forEach(v=>{
            v['itemin']=false
            v['itemopen']=false
          })
          this.shippingList = res.data
          this.shippingListss = res.data
          this.sortPrice()
          this.sortby = null
          this.sortMethod = null
          this.shipping_toSearch = form.shipping_to
          this.shipping_to_enSearch = form.shipping_to_en
          setTimeout(()=>{
            this.result = true
            this.showLoad = false
          },10)
        })
      },
      even(e){
        if(!this.$refs.OriginSelect.contains(e.target)){
          this.OriginShow = false
          this.shippingFrom = ''
          this.$refs.fromSearch.style = 'display:none;'
          this.$refs.originPanel.style = 'opacity:1;'
        }
        // if (!this.$refs.originSelect.contains(e.target)) {
        //   this.originShow = false
        // }
        if(!this.$refs.DestinationSelect.contains(e.target)){
          // this.DestinationShow = false
          this.shippingTo = ''
          this.$refs.destinationPanel.style = 'opacity:1;'
          this.$refs.toSearch.style = 'display:none;'
          this.destinationShow = false
        }
        // if (!this.$refs.destinationSelect.contains(e.target)) {
        //   this.destinationShow = false
        // }
        if(!this.$refs.LoadSelect.contains(e.target)){
          this.LoadShow = false
        }
        // if(!this.$refs.GoodsSelect.contains(e.target)){
        //   this.GoodsShow = false
        // }
        // if (!this.$refs.from.contains(e.target)) {
        //   this.fromShow = false
        // }
        // if(this.form.shipping_to_type == 1){
        //   if (!this.$refs.fbacode.contains(e.target)) {
        //     this.FBAShow = false
        //   }
        // }
        // if (!this.$refs.endcity.contains(e.target)) {
        //   this.endShow = false
        // }
      },
      countryQuest(){
        this.contryList = JSON.parse(localStorage.getItem("Countries"))
        // console.log(this.contryList)
      },
      // selectOrigin(data, show){
      //   this.originItem = data
      //   this.originShow = show
      //   this.form.shipping_from = data.name
      //   this.form.shipping_from_en = data.e_name
      // },
      selectDestination(data, show) {
        // console.log(data);
        this.shippingTo = ''
        this.$refs.destinationPanel.style = 'opacity:1;'
        this.$refs.toSearch.style = 'display:none;'
        this.destinationItem = data
        this.destinationShow = false
        this.form.shipping_to = data.zh_cn_nickname
        this.form.shipping_to_en = data.en_nickname
        this.destinationCity = ''
        this.form.shipping_to_zipcode = ''
        this.DestinationSuccess = true
        this.$refs.destinationTitle.style = 'color:#191b23;'
        // getEnd({
        //   country_two: this.destinationItem.code_two,
        //   n_search: this.destinationCity
        // }).then((res)=>{
        //   // this.endShow = true
        //   this.endList = res.data
        //   for (const i in this.endList) {
        //     this.endList[i].valueBright = this.endList[i].area_merger_name_en
        //   }
        // })
      },
      Search(e,n){
        if(n != 1){
          // console.log(e)
          if(n == 2){
            this.form = JSON.parse(JSON.stringify(e))
          }else{
            this.form = e
          }

          if(this.form.take == 1){
            this.sort1 = true
          }else{
            this.sort1 = false
          }

          if(this.form.product_one == 1){
            this.sort2 = true
          }else{
            this.sort2 = false
          }

          if(this.form.not_fba_address == 1){
            this.sort3 = true
          }else{
            this.sort3 = false
          }

          if(this.form.take == '1'){
            this.ispickup = true
          }else{
            this.ispickup = false
          }
          this.OriginSuccess = true

          if(this.form.insurance == '1'){
            this.buyinsurance = true
          }else{
            this.buyinsurance = false
          }
          // if(this.form.shipping_to_type == 1){
          //   for (let fn = 0; fn < this.FBAList.length; fn++) {
          //     if(this.FBAList[fn].fba_code === this.form.fba_code){
          //       this.selectDeparture(this.FBAList[fn])
          //     }
          //   }
          // }else{
          //   for(let cn = 0; cn < this.destinationList.length; cn++){
          //     if(this.form.shipping_to_en == this.destinationList[cn].en_nickname){
          //       this.destinationItem = this.destinationList[cn]
          //     }
          //   }
            
          // }
          for(let cn = 0; cn < this.destinationList.length; cn++){
            if(this.form.shipping_to_en == this.destinationList[cn].en_nickname){
              this.destinationItem = this.destinationList[cn]
            }
          }
          this.destinationCity = this.form.shipping_to_zipcode
          this.shippingFrom = this.form.shipping_from_en
          this.fbaCode = this.form.fba_code
          this.DestinationSuccess = true

          //Load
          this.calculationMethod = this.form.load_type
          if(this.form.load_type == '1'){
            this.form1.size = this.form.volume
            this.form1.size_unit = this.form.volume_unit
            this.form1.weight = this.form.weight
            this.form1.weight_unit = this.form.weight_unit
            this.form1.num = this.form.total
          }else{
            this.form1.size_unit = this.form.volume_unit
            this.form1.weight_unit = this.form.weight_unit
            this.unitBox = []
            let vo = this.form.volume.split('-')
            let we = this.form.weight.split(',')
            let to = this.form.total.split(',')
            for(let bn=0;bn<vo.length;bn++){
              let boxsize = ''
              let box = {
                long: null,
                width: null,
                height: null,
                weight: null,
                num: null,
              }
              boxsize = vo[bn].split(',')
              box.long = boxsize[0]
              box.width = boxsize[1]
              box.height = boxsize[2]
              box.weight = we[bn]
              box.num = to[bn]
              this.unitBox.push(box)
            }
          }
          this.loadSuccess()

          //Goods
          // this.GoodsList = ''
          // let a = []
          // let pid = this.form.product_one.split(',')
          // let sid = this.form.product_two.split(',')
          // for(let i=0;i<this.GoodsType.length;i++){
          //   this.GoodsType[i].check = []
          //   for(let pn=0;pn<pid.length;pn++){
          //     if(this.GoodsType[i].id == pid[pn]){
          //       for(let gn=0;gn<this.GoodsType[i].child.length;gn++){
          //         for(let sn=0;sn<sid.length;sn++){
          //           if(this.GoodsType[i].child[gn].id == sid[sn]){
          //             this.GoodsType[i].check.push(this.GoodsType[i].child[gn])
          //             a.push(this.GoodsType[i].child[gn].e_name)
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
          // this.GoodsList = a.join(', ')
          // this.GoodsSuccess = true
        }
        
        if(this.DestinationSuccess && this.LoadSuccess){
          // this.$refs.orginTitle.style = 'color:#191b23;'
          this.$refs.destinationTitle.style = 'color:#191b23;'
          this.$refs.loadTitle.style = 'color:#191b23;'
          // this.$refs.goodsTitle.style = 'color:#191b23;'

          // if(this.$store.state.user.token){
            if(n==3){
              this.form = e
            }
            this.showLoad = true
            this.form.is_packet = 1
            getCost(this.form).then((res)=>{
              // console.log(res)
              // res.data.forEach(item=>{
              //   Object.assign(item,{show:false})
              // })
              res.data.forEach(v=>{
                v['itemin']=false
                v['itemopen']=false
              })
              this.shippingList = res.data
              this.shippingListss = res.data
              this.sortPrice()
              this.sortby = null
              this.sortMethod = null
              // console.log(this.form);
              this.shipping_toSearch = this.form.shipping_to
              this.shipping_to_enSearch = this.form.shipping_to_en
              // this.sortBy = 1
              // this.shippingMethod = []
              // this.customsDuties = []
              // this.chooseSortBy()

              // let fromen = []
              // fromen = this.form.shipping_from_en.split(',')
              // let youbian = fromen[fromen.length-1]
              // this.forms.shipping_from_en = 'China,' + youbian
              // this.forms.shipping_to_en = JSON.parse(JSON.stringify(this.form.shipping_to_en))
              // this.forms.shipping_to_zipcode = JSON.parse(JSON.stringify(this.form.shipping_to_zipcode))
              setTimeout(()=>{
                this.result = true
                this.showLoad = false
              },10)
            })
          // }else if(n==1){
          //   localStorage.setItem("dtd", JSON.stringify(this.form))
          //   localStorage.setItem("islogin", '1')
          //   this.$refs.mask.style = 'display:block;'
          //   this.$refs.nologinModal.style = 'display:block;'
          //   setTimeout(()=> {
          //     this.$refs.mask.style = 'display:block;opacity:1;'
          //     this.$refs.nologinModal.style =
          //       'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          //   },1)
          // }
        }
        
        // if(!this.OriginSuccess){
        //   this.$refs.orginTitle.style = 'color:#ef4444;'
        // }
        if(!this.DestinationSuccess){
          this.$refs.destinationTitle.style = 'color:#ef4444;'
          this.openDestination()
        }
        if(!this.LoadSuccess){
          this.$refs.loadTitle.style = 'color:#ef4444;'
          if(!this.DestinationSuccess){
            this.openDestination()
          }else{
            this.LoadShow = true
          }
        }
        // if(!this.GoodsSuccess){
        //   this.$refs.goodsTitle.style = 'color:#ef4444;'
        // }

        
      },
      DelHistory(){
        delHistory().then((res)=>{
          if(res.code == 0){
            this.history = []
          }
        })
      },
      delAHistory(e){
        delHistory({id: e}).then((res)=>{
          if(res.code == 0){
            getHistory().then((reh)=>{
              this.history = reh.data.slice(0,4)
            })
          }
        })
      },
      pickUp(){
        if(this.ispickup){
          this.form.take = 1
        } else {
          this.form.take = 0
        }
      },
      buyInsurance(){
        if(this.buyinsurance){
          this.form.insurance = 1
        } else {
          this.form.insurance = 0
        }
      },
      toCustomRFQ(){
        // this.$router.push({
        //   name: 'quoteRequest',
        // })
        // let routeData = this.$router.resolve({ path: '/main/quoteRequest' })
        // window.open(routeData.href, '_blank')
        this.$refs.mask.style = 'display:block;'
        this.$refs.quickQuote.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.quickQuote.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      },
      chooseUnit(){
        this.form.size_unit = this.form.weight_unit
      },
      chooseUnit1(){
        this.form.weight_unit = this.form.size_unit
      },
      chooseLoadUnit(){
        this.form1.weight_unit = this.form1.size_unit
        this.form.volume_unit = this.form1.size_unit
        this.form.weight_unit = this.form1.size_unit
        this.loadSuccess()
      },
      chooseLoadUnit1(){
        this.form1.size_unit = this.form1.weight_unit
        this.form.volume_unit = this.form1.weight_unit
        this.form.weight_unit = this.form1.weight_unit
        this.loadSuccess()
      },
      addLoad(){
        let a = {
          long: null,
          width: null,
          height: null,
          weight: null,
          num: null,
          right: false
        }
        this.unitBox.push(a)
        this.loadSuccess()
      },
      delLoad(e){
        if(this.unitBox.length > 1){
          this.unitBox.splice(e, 1)
          this.loadSuccess()
        }
      },
      copyLoad(e){
        let a = JSON.parse(JSON.stringify(this.unitBox[e]))
        this.unitBox.splice(e, 0, a)
        this.loadSuccess()
      },
      chooseGoods(e){
        this.selectGoods = e
      },
      checkGoods(){
        let a = []
        let pid = []
        let sid = []
        for(let n=0;n<this.GoodsType.length;n++){
          for(let m=0;m<this.GoodsType[n].check.length;m++){
            a = a.concat(this.GoodsType[n].check[m].e_name)
            sid = sid.concat(this.GoodsType[n].check[m].id)
          }
          
          if(this.GoodsType[n].check.length>0){
            pid.push(this.GoodsType[n].id)
          }
        }
        this.GoodsList = a.join(', ')
        if(this.GoodsList.length > 0){
          this.$refs.goodsTitle.style = 'color:#191b23;'
          this.GoodsSuccess = true
        }else{
          this.GoodsSuccess = false
        }
        this.form.product_one = pid.join(',')
        this.form.product_two = sid.join(',')
      },
      clearOrigin(){
        this.form.delivery_type = 1
        this.form.shipping_from = ''
        this.shippingFrom = ''
        this.form.shipping_from_en = ''
        this.ispickup = false
        this.form.take = 0
        this.OriginSuccess = false
      },
      confirmOrigin(){
        this.$validator.validate('City')
        if(this.OriginSuccess){
          this.OriginShow = false
          if(!this.DestinationSuccess){
            this.DestinationShow = true
          }else if(!this.LoadSuccess){
            this.LoadShow = true
          }else if(!this.GoodsSuccess){
            this.GoodsShow = true
            if(this.typeFirst){
              this.chooseType()
            }
          }
        }
      },
      originSuccess(){
        if(this.form.shipping_from != ''){
          this.$refs.orginTitle.style = 'color:#191b23;'
          this.OriginSuccess = true
        }else{
          this.OriginSuccess = false
        }
      },
      clearDestination(){
        this.form.shipping_to_type = 1
        this.fbaCode = ''
        this.form.fba_code = ''
        this.destinationItem = {}
        this.form.shipping_to_en = ''
        this.form.shipping_to = ''
        this.form.shipping_to_zipcode = ''
        this.destinationCity = ''
        this.buyinsurance = false
        this.form.insurance = 0
        this.DestinationSuccess = false
      },
      confirmDestination(){
        // if(this.form.shipping_to_type == 1){
        //   this.$validator.validate('FBACode')
        // }
        this.$validator.validate('toCountry')
        this.$validator.validate('toCity')
        if(this.DestinationSuccess){
          this.DestinationShow = false
          if(!this.OriginSuccess){
            this.OriginShow = true
          }else if(!this.LoadSuccess){
            this.LoadShow = true
          }else if(!this.GoodsSuccess){
            this.GoodsShow = true
            if(this.typeFirst){
              this.chooseType()
            }
          }
        }
      },
      selectDeparture(e){
        for(let n=0;n<this.destinationList.length;n++){
          if(e.country == this.destinationList[n].zh_cn_nickname){
            this.destinationItem = this.destinationList[n]
            this.form.shipping_to = this.destinationList[n].zh_cn_nickname
            this.form.shipping_to_en = this.destinationList[n].en_nickname
            this.form.fba_code = e.fba_code
            this.fbaCode = this.form.fba_code
            this.form.shipping_to_zipcode = e.zipcode
            this.destinationCity = e.zipcode
            this.FBAShow = false
            this.destinationSuccess()
            break;
          }
        }
      },
      fbaEnter(){
        // this.DestinationSuccess = false
        if(this.fbaCode != ''){
          this.FBAShow = true
          let str = this.fbaCode.toUpperCase()
          let a = []
          for (let n = 0; n < this.FBAList.length; n++) {
            if (
              this.FBAList[n].fba_code.toUpperCase().indexOf(str) != -1
            ) {
              a.push(this.FBAList[n])
            }
          }
          this.FBASearchList = a
        }else{
          this.FBAShow = false
        }
        // this.destinationSuccess()
      },
      fbaEnter1(){
        // this.fbaCode = ''
        // this.fbaCode = this.form.fba_code
        this.form.fba_code = this.fbaCode
      },
      changeDestinationType(){
        // if(this.form.shipping_to_type == 1){
        this.fbaCode = ''
        this.form.fba_code = ''
        // this.destinationCity = ''
        // this.form.shipping_to_zipcode = ''
        this.DestinationSuccess = false
        // }
        this.destinationSuccess()
      },
      destinationSuccess(){
        // if(this.form.shipping_to_type == 1){
        //   if(this.form.fba_code != ''){
        //     this.DestinationSuccess = true
        //   }else{
        //     this.DestinationSuccess = false
        //   }
        // }else 
        if(this.form.shipping_to_zipcode != ''){
          this.DestinationSuccess = true
          this.$refs.destinationTitle.style = 'color:#191b23;'
        }else{
          this.DestinationSuccess = false
        }
        // if(this.form.shipping_to_type == 1){
        //   if(this.form.fba_code != '' && this.form.shipping_to_zipcode != ''){
        //     this.DestinationSuccess = true
        //     this.$refs.destinationTitle.style = 'color:#191b23;'
        //   }else{
        //     this.DestinationSuccess = false
        //   }
        // }else{
        //   if(this.form.shipping_to_zipcode != ''){
        //     this.DestinationSuccess = true
        //     this.$refs.destinationTitle.style = 'color:#191b23;'
        //   }else{
        //     this.DestinationSuccess = false
        //   }
        // }
      },
      clearLoad(){
        if(this.calculationMethod == 2){
          this.unitBox = [{
            long: null,
            width: null,
            height: null,
            weight: null,
            num: null,
            right: true,
          }]
        }else{
          this.form1.size = null
          this.form1.weight = null
          this.form1.num = null
        }
        this.LoadSuccess = false
      },
      loadSuccess(e){
        this.form.load_type = this.calculationMethod
        if(this.calculationMethod == 1){
          this.form.volume = this.form1.size
          this.form.weight = this.form1.weight
          this.form.total = this.form1.num
          // if(this.form1.size>0 && this.form1.weight>0){
          if(this.form1.weight>0){
            this.totalBoxes = Number(this.form1.num).toFixed(0)
            this.totalVolumn = Number(this.form1.size).toFixed(2)
            this.totalWeight = Number(this.form1.weight).toFixed(2)
            this.LoadSuccess = true
            this.$refs.loadTitle.style = 'color:#191b23;'
          }else{
            this.LoadSuccess = false
          }
        }else{
          let volumn = 0
          let Weight = 0
          let num = 0
          let formVolume = []
          let formWeight = []
          let formNum = []
          for(let n=0;n<this.unitBox.length;n++){
            formVolume.push(`${this.unitBox[n].long},${this.unitBox[n].width},${this.unitBox[n].height}`)
            formWeight.push(this.unitBox[n].weight)
            formNum.push(this.unitBox[n].num)
            if(this.unitBox[n].long>0 && this.unitBox[n].width>0 && this.unitBox[n].height>0 &&
            this.unitBox[n].weight>0 && this.unitBox[n].num>0){
              this.unitBox[n].right = true
              if(this.form1.size_unit == 1){
                volumn += Number(this.unitBox[n].long * this.unitBox[n].width * this.unitBox[n].height/1000000) * Number(this.unitBox[n].num)
              }else{
                volumn += Number(this.unitBox[n].long * this.unitBox[n].width * this.unitBox[n].height/1728) * Number(this.unitBox[n].num)
              }
              Weight += Number(this.unitBox[n].weight) * Number(this.unitBox[n].num)
              // if(this.unitBox[n].num>0){
                num += Number(this.unitBox[n].num)
              // }
              this.LoadSuccess = true
              this.$refs.loadTitle.style = 'color:#191b23;'
            }else{
              this.LoadSuccess = false
              this.unitBox[n].right = false
            }
          }
          this.form.volume = formVolume.join('-')
          this.form.weight = formWeight.join(',')
          this.form.total = formNum.join(',')
          this.totalVolumn = Number(volumn).toFixed(2)
          this.totalWeight = Number(Weight).toFixed(2)
          this.totalBoxes = Number(num).toFixed(0)
        }
      },
      // changeLoadSuccess(){
      //   console.log(this.calculationMethod)
      //   if(this.calculationMethod == 2){
      //     if(this.form1.size>0 && this.form1.weight>0){
      //       this.totalVolumn = Number(this.form1.size).toFixed(2)
      //       this.totalWeight = Number(this.form1.weight).toFixed(2)
      //       if(this.form1.num>0){
      //         this.totalBoxes = Number(this.form1.num).toFixed(0)
      //       }
      //       this.LoadSuccess = true
      //     }else{
      //       this.LoadSuccess = false
      //     }
      //   }else{
      //     let volumn = 0
      //     let Weight = 0
      //     let num = 0
      //     for(let n=0;n<this.unitBox.length;n++){
      //       if(this.unitBox[n].long>0 && this.unitBox[n].width>0 && this.unitBox[n].height>0 &&
      //       this.unitBox[n].weight>0 && this.unitBox[n].num>0){
      //         if(this.form1.size_unit == 1){
      //           volumn += Number(this.unitBox[n].long * this.unitBox[n].width * this.unitBox[n].height/1000000) * Number(this.unitBox[n].num)
      //         }else{
      //           volumn += Number(this.unitBox[n].long * this.unitBox[n].width * this.unitBox[n].height/1728) * Number(this.unitBox[n].num)
      //         }
      //         Weight += Number(this.unitBox[n].weight) * Number(this.unitBox[n].num)
      //         // if(this.unitBox[n].num>0){
      //           num += Number(this.unitBox[n].num)
      //         // }
      //         this.LoadSuccess = true
      //       }else{
      //         this.LoadSuccess = false
      //       }
      //     }
      //     this.totalVolumn = Number(volumn).toFixed(2)
      //     this.totalWeight = Number(Weight).toFixed(2)
      //     this.totalBoxes = Number(num).toFixed(0)
      //   }
      // },
      confirmLoad(){
        if(this.calculationMethod == 1){
          // this.$validator.validate('totalVolume')
          this.$validator.validate('totalWeight')
        }else{
          this.loadSuccess()
        }
        if(this.LoadSuccess){
          this.LoadShow = false
          if(!this.OriginSuccess){
            this.OriginShow = true
          }else if(!this.DestinationSuccess){
            this.DestinationShow = true
          }else if(!this.GoodsSuccess){
            this.GoodsShow = true
            if(this.typeFirst){
              this.chooseType()
            }
          }
        }
      },
      clearGoods(){
        for(let n=0;n<this.GoodsType.length;n++){
          this.GoodsType[n].check = []
        }
        this.GoodsList = ''
        this.GoodsSuccess = false
      },
      confirmGoods(){
        if(this.GoodsSuccess){
          this.GoodsShow = false
          if(!this.OriginSuccess){
            this.OriginShow = true
          }else if(!this.DestinationSuccess){
            this.DestinationShow = true
          }else if(!this.LoadSuccess){
            this.LoadShow = true
          }
        }
      },
      chooseSortBy(){
        if(this.sortBy == 1){
          this.shippingList.sort((a,b)=>{
            return a.freight - b.freight
          })
        }else{
          this.shippingList.sort((a,b)=>{
            return a.aging_start - b.aging_start
          })
        }
        // this.sortShippingList = this.shippingList
        this.sortShippingList = JSON.parse(JSON.stringify(this.shippingList))
        this.chooseShippingMethod()
      },
      chooseShippingMethod(){
        let sortsm1 = false
        let sortsm2 = false
        let sortsm3 = false
        let sortsm4 = false
        let sortsm5 = false
        let sortcd1 = false
        let sortcd0 = false
        let list = []
        let Lists = JSON.parse(JSON.stringify(this.shippingList))
        for(let cn = 0;cn<this.customsDuties.length;cn++){
          if(this.customsDuties[cn] == 1){
            sortcd1 = true
          }else{
            sortcd0 = true
          }
        }
        if(this.shippingMethod.length == 0){
          if(this.customsDuties.length == 1){
            let list1 = []
            for(let j=0;j<Lists.length;j++){
              for(let i=0;i<this.customsDuties.length;i++){
                if(this.customsDuties[i] == Lists[j].tax){
                  list1.push(Lists[j])
                }
              }
            }
            this.sortShippingList = list1
          }else{
            this.sortShippingList = Lists
          }
        }else{
          for(let n=0;n<Lists.length;n++){
            for(let m=0;m<this.shippingMethod.length;m++){
              if(this.shippingMethod[m] == 1){
                sortsm1 = true
              }else if(this.shippingMethod[m] == 2){
                sortsm2 = true
              }else if(this.shippingMethod[m] == 3){
                sortsm3 = true
              }else if(this.shippingMethod[m] == 4){
                sortsm4 = true
              }else if(this.shippingMethod[m] == 5){
                sortsm5 = true
              }
              if(Lists[n].transport_type == this.shippingMethod[m]){
                list.push(Lists[n])
              }
            }
          }
          if(this.customsDuties.length == 1){
            let list1 = []
            for(let j=0;j<list.length;j++){
              for(let i=0;i<this.customsDuties.length;i++){
                if(this.customsDuties[i] == list[j].tax){
                  list1.push(list[j])
                }
              }
            }
            this.sortShippingList = list1
          }else{
            this.sortShippingList = list
          }
        }
        this.sort_sm1 = sortsm1
        this.sort_sm2 = sortsm2
        this.sort_sm3 = sortsm3
        this.sort_sm4 = sortsm4
        this.sort_sm5 = sortsm5
        this.sort_cd1 = sortcd1
        this.sort_cd0 = sortcd0
      },
      openModal(e) {
        this.freight_good = e
        this.$refs.mask.style = 'display:block;'
        this.$refs.Modal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.Modal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      indemnityOpen(num){
        this.isTab = num
        this.$refs.mask.style = 'display:block;'
        this.$refs.indemnityModal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.indemnityModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.Modal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.quickModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.successModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.indemnityModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.quickQuote.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.quoteSuccess.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.nologinModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.pcModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      Orders(type){
        if(this.orderType == 1){
          this.$refs.Modal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.quickModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        }else{
          let iso2 = ''
          for(let n=0;n<this.destinationList.length;n++){
            if(this.shipping_to_enSearch == this.destinationList[n].en_nickname){
              if(this.destinationList[n].code_two == 'USA'){
                iso2 = 'US'
              }else{
                iso2 = this.destinationList[n].code_two
              }
              break;
            }
          }
          let a = {
            tax: this.freight_good.tax,
            freight: this.freight_good.freight,
            aging_start: this.freight_good.aging_start,
            aging_end: this.freight_good.aging_end,
            unit_price: this.freight_good.unit_price,
            add_price: this.freight_good.add_price,
            opera_price: this.freight_good.opera_price,
            product: this.freight_good.product_name_e,
            transport_type: this.freight_good.transport_type,
            freight_good: this.freight_good.id,
            take_fee: this.freight_good.take_fee,
            product_info: this.form,
            not_fba_address_fee: this.freight_good.not_fba_address_fee,
            product_fee: this.freight_good.product_fee,
            iso: iso2
          }
          if(type == 'quick'){
            a.weight = this.freight_good.weight
            a.iso = this.freight_good.code_two
          }
          localStorage.setItem("orderRouter", JSON.stringify(a))
          this.$router.push({
            name: 'reqOrder',
          })
        }
      },
      submitQuick(){
        // console.log(this.freight_good)
        if(this.quickOrderForm.order_img_url != '' || this.quickOrderForm.content != ''){
          let QuickOrder = {
            transport_type: this.freight_good.transport_type,
            aging_start: this.freight_good.aging_start,
            aging_end: this.freight_good.aging_end,
            tax: this.freight_good.tax,
            freight_good: this.freight_good.id,
            product_info: this.form,
            contact_tel: this.quickOrderForm.contact_tel,
            whatsapp: this.quickOrderForm.whatsapp,
            wetch: this.quickOrderForm.wetch,
            content: this.quickOrderForm.content,
            order_img_url: this.quickOrderForm.order_img_url,
            order_img_name: this.quickOrderForm.order_img_name,
          }
          quickOrder(QuickOrder).then((res)=>{
            if(res.code == 0){
              this.$refs.quickModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
              this.$refs.mask.style = 'display:block;'
              this.$refs.successModal.style = 'display:block;'
              setTimeout(()=> {
                this.$refs.mask.style = 'display:block;opacity:1;'
                this.$refs.successModal.style =
                  'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
              },1)
            }
          })
        }
      },
      upload() {
        this.$refs.iptFileRef.click()
      },
      uploadPL(e){
        const files = e.target.files[0]
        let data = new FormData()
        data.append('file', files)
        ImgUpload(data).then((res)=>{
          if( res.code == 0 ){
            this.quickOrderForm.order_img_url = res.data.file
            this.quickOrderForm.order_img_name = res.data.name
            this.uploadShow = false
          }
        })
      },
      delPL(){
        this.$refs.iptFileRef.value = ''
        this.quickOrderForm.order_img_url = ''
        this.quickOrderForm.order_img_name= ''
        this.uploadShow = true
      },
      submitQuickQuote(){
        if(this.$store.state.user.token){
          this.contents = this.quickQuotes.content
          feedback({
            type: 2,
            content: this.quickQuotes.content,
            reply_email: this.email,
            manage_id: this.form.manage_id,
          }).then((res)=>{
            if(res.code == 0){
              this.$refs.quickQuote.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
              this.quickQuotes.content = ''
              this.$refs.mask.style = 'display:block;'
              this.$refs.quoteSuccess.style = 'display:block;'
              setTimeout(()=> {
                this.$refs.mask.style = 'display:block;opacity:1;'
                this.$refs.quoteSuccess.style =
                  'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
              },1)
            }
          })
        }else{
          this.$refs.quickQuote.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.mask.style = 'display:block;'
          this.$refs.nologinModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.nologinModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      uploads() {
        this.$refs.quoteFile.click()
      },
      uploadPLs(e){
        const files = e.target.files[0]
        let data = new FormData()
        data.append('file', files)
        ImgUpload(data).then((res)=>{
          if( res.code == 0 ){
            this.quickQuotes.order_img_url = res.data.file
            this.quickQuotes.order_img_name = res.data.name
            this.upload1Show = false
          }
        })
      },
      delPLs(){
        this.$refs.quoteFile.value = ''
        this.quickQuotes.order_img_url = ''
        this.quickQuotes.order_img_name= ''
        this.upload1Show = true
      },
      clearSort(){
        this.sortBy = 1
        this.shippingMethod = []
        this.customsDuties = []
        this.sort_sm1 = false
        this.sort_sm2 = false
        this.sort_sm3 = false
        this.sort_sm4 = false
        this.sort_sm5 = false
        this.sort_cd1 = false
        this.sort_cd0 = false
        this.shippingList.sort((a,b)=>{
          return a.freight - b.freight
        })
        this.sortShippingList = JSON.parse(JSON.stringify(this.shippingList))
      },
      originCity(){
        if(this.shippingFrom!=''){
          this.$refs.originPanel.style = 'opacity:0;'
          getStart({n_search: this.shippingFrom}).then((res)=>{
            this.fromList = res.data
            // this.fromList.forEach(e=>{
            //   e.area_merger_name_en = e.area_merger_name_en.replace(this.shippingFrom, `<font color='#409eff'>${this.shippingFrom}</font>`)
            // })
            const replaceReg = new RegExp(this.shippingFrom, 'ig')
            const upperCase = /^[A-Z]+$/
            for (const i in this.fromList) {
              if (replaceReg.test(this.fromList[i].area_merger_name_en)) {
                this.fromList[i].area_merger_name_en.match(replaceReg).map(item => {
                  if (upperCase.test(item)) {
                    this.fromList[i].valueBright = this.fromList[i].area_merger_name_en.replace(replaceReg, `<span style="color:#e66a10">${this.shippingFrom.toUpperCase()}</span>`)
                  } else {
                    this.fromList[i].valueBright = this.fromList[i].area_merger_name_en.replace(replaceReg, `<span style="color:#e66a10">${this.shippingFrom}</span>`)
                  }
                })
              } else {
                this.fromList[i].valueBright = this.fromList[i].area_merger_name_en
              }
            }
            this.fromShow = true
            // this.originSuccess()
          })
        }else{
          this.$refs.originPanel.style = 'opacity:0.4;'
        }
      },
      originCity1(){
        // this.shippingFrom = ''
        // this.shippingFrom = this.form.shipping_from_en
      },
      selectFrom(e){
        this.form.shipping_from_en = e.area_merger_name_en
        this.form.shipping_from = e.id
        // this.originSuccess()
        this.shippingFrom = ''
        this.OriginShow = false
        this.$refs.fromSearch.style = 'display:none;'
        this.$refs.originPanel.style = 'opacity:1;'
      },
      endCity(){
        if(this.destinationCity.length>0){
        // this.destinationSuccess()
        // this.form.shipping_to_zipcode
          getEnd({
            country_two: this.destinationItem.code_two,
            n_search: this.destinationCity
          }).then((res)=>{
            this.endShow = true
            this.endList = res.data
            const replaceReg = new RegExp(this.destinationCity, 'ig')
            const upperCase = /^[A-Z]+$/
            for (const i in this.endList) {
              if (replaceReg.test(this.endList[i].area_merger_name_en)) {
                this.endList[i].area_merger_name_en.match(replaceReg).map(item => {
                  if (upperCase.test(item)) {
                    this.endList[i].valueBright = this.endList[i].area_merger_name_en.replace(replaceReg, `<span style="color:#e66a10">${this.destinationCity.toUpperCase()}</span>`)
                  } else {
                    this.endList[i].valueBright = this.endList[i].area_merger_name_en.replace(replaceReg, `<span style="color:#e66a10">${this.destinationCity}</span>`)
                  }
                })
              } else {
                this.endList[i].valueBright = this.endList[i].area_merger_name_en
              }
            }
            // this.endList = res.data.slice(0,10)
          })
        }else{
          this.endShow = true
        }
      },
      endCity1(){
        this.destinationCity = ''
        this.destinationCity = this.form.shipping_to_zipcode
      },
      selectEnd(e){
        this.endShow = false
        this.destinationCity = e.area_merger_name_en
        this.form.shipping_to_zipcode = e.area_merger_name_en
        this.destinationSuccess()
      },
      sendQuote(){
        this.$emit('getMessage',this.contents)
        this.closeModal()
      },
      openChat(){
        this.$emit('openChat')
      },
      nologin(){
        if(localStorage.getItem("islogin")){
          let booking = JSON.parse(localStorage.getItem("dtd"))
          this.Search(booking,3)
          localStorage.removeItem("dtd")
          localStorage.removeItem("islogin")
        }
      },
      tologin(){
        this.$router.push('/login')
      },
      GoodsShows(){
        this.GoodsShow = !this.GoodsShow
        if(this.typeFirst){
          this.chooseType()
        }
      },
      chooseType(){
        // this.GoodsType[0].check[0] = this.GoodsType[0].child[0]
        // this.form.product_one = this.GoodsType[0].id
        // this.form.product_two = this.GoodsType[0].child[0].id
        // this.GoodsList = this.GoodsType[0].child[0].e_name
        // this.GoodsSuccess = true
        // this.typeFirst = false
      },
      openOrigin(){
        this.OriginShow = true
        this.$refs.originPanel.style = 'opacity:0.4;'
        this.$refs.fromSearch.style = 'display:block;'
        this.$refs.from.focus()
      },
      openDestination(){
        this.destinationShow = true
        this.$refs.destinationPanel.style = 'opacity:0.4;'
        this.$refs.toSearch.style = 'display:block;'
        this.$refs.toCountrys.focus()
      },
      seCountry(){
        this.$refs.selectCountry.Search(this.shippingTo)
        if(this.shippingTo != ''){
          this.$refs.destinationPanel.style = 'opacity:0;'
        }
      },
      onShowTip(e) {
        this.target = e.target
        this.$refs.tooltip.show(e.target, this.leftMenuOpen)
        this.content = `This price is estimated price and subject to actual price.`
      },
      onHideTip() {
        this.$refs.tooltip.onHide()
      },
      pulldownitem(item,index){
        item.itemopen = !item.itemopen
        
        if(this.$refs['pd'+index][0].style.transform == 'rotate(180deg)'){
          this.$refs['pd'+index][0].style = 'transform: rotate(0deg);'
        }else{
          this.$refs['pd'+index][0].style = 'transform: rotate(180deg);'
        }
      },
      sortStatus(){
        // console.log(this.sortby);
        if(this.sortby == 1){
          let arr = this.shippingList
          arr.sort((a,b)=>{
            return a.freight - b.freight
          })
          let a = arr.filter(num => num.freight > 0).concat(arr.filter(num => num.freight == 0))
          this.shippingList = a
        }
        if(this.sortby == 2){
          let arr = this.shippingList
          arr.sort((a,b)=>{
            return a.aging_end - b.aging_end
          })
          let a = arr.filter(num => num.aging_end > 0).concat(arr.filter(num => num.aging_end == 0))
          this.shippingList = a
        }
      },
      methodStatus(){
        // console.log(this.sortMethod);
        if(this.sortMethod == 0 || this.sortMethod == null){
          this.shippingList = JSON.parse(JSON.stringify(this.shippingListSort))
        }else{
          let alist = []
          for(let i = 0; i < this.shippingListSort.length;i++){
            if(this.sortMethod == this.shippingListSort[i].transport_type){
              alist.push(this.shippingListSort[i])
            }
          }
          this.shippingList = alist
        }
        this.sortStatus()
      },
      searchCondition(n){
        if(n=='1'){
          if(this.sort1){
            this.form.take = 1
          }else{
            this.form.take = 0
          }
          this.sortPrice()
          // this.showLoad = true
          // getCost(this.form).then((res)=>{
          //   res.data.forEach(v=>{
          //     v['itemin']=false
          //     v['itemopen']=false
          //   })
          //   this.shippingList = res.data
          //   this.shippingListss = res.data
          //   this.sortby = null
          //   this.sortMethod = null
          //   setTimeout(()=>{
          //     this.result = true
          //     this.showLoad = false
          //   },10)
          // })
        }
        if(n=='2'){
          this.$refs.mask.style = 'display:block;'
          this.$refs.pcModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.pcModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
        if(n=='3'){
          if(this.sort3){
            this.form.not_fba_address = 1
          }else{
            this.form.not_fba_address = 0
          }
          this.sortPrice()
          // this.showLoad = true
          // getCost(this.form).then((res)=>{
          //   res.data.forEach(v=>{
          //     v['itemin']=false
          //     v['itemopen']=false
          //   })
          //   this.shippingList = res.data
          //   this.shippingListss = res.data
          //   this.sortby = null
          //   this.sortMethod = null
          //   setTimeout(()=>{
          //     this.result = true
          //     this.showLoad = false
          //   },10)
          // })
        }
      },
      sortPrice(){
        this.shippingListSort = JSON.parse(JSON.stringify(this.shippingListss))
        // console.log();
        for(let i=0;i<this.shippingListss.length;i++){
          let a = JSON.parse(JSON.stringify(this.shippingListss[i].freight))
          let b = JSON.parse(JSON.stringify(this.shippingListss[i].super_freight))
          if(this.form.take == 1){
            a = (Number(a) + Number(this.shippingListss[i].take_fee)).toFixed(2)
            b = (Number(b) + Number(this.shippingListss[i].take_fee)).toFixed(2)
          }
          if(this.form.product_two == 2){
            a = (Number(a) + Number(this.shippingListss[i].product_fee)).toFixed(2)
            b = (Number(b) + Number(this.shippingListss[i].product_fee)).toFixed(2)
          }
          if(this.form.not_fba_address == 1){
            a = (Number(a) + Number(this.shippingListss[i].not_fba_address_fee)).toFixed(2)
            b = (Number(b) + Number(this.shippingListss[i].not_fba_address_fee)).toFixed(2)
          }
          this.shippingListSort[i].freight = a
          this.shippingListSort[i].super_freight = b
        }
        this.methodStatus()
      },
      selectGood(n){
        if(n=='1'){
          this.form.product_two = 1
          this.form.product_one = 1
          this.sort2 = true
        }else if(n=='2'){
          this.form.product_two = 2
          this.form.product_one = 1
          this.sort2 = true
        }else{
          this.form.product_two = 0
          this.form.product_one = 0
          this.sort2 = false
        }
      },
      confirmGood(){
        // this.showLoad = true
        // getCost(this.form).then((res)=>{
        //   res.data.forEach(v=>{
        //     v['itemin']=false
        //     v['itemopen']=false
        //   })
        //   this.shippingList = res.data
        //   this.shippingListss = res.data
        //   this.sortby = null
        //   this.sortMethod = null
        //   setTimeout(()=>{
        //     this.result = true
        //     this.showLoad = false
        //   },10)
        // })
        this.sortPrice()
        this.closeModal()
      },
      bookingOrder(e,type){
        if(this.$store.state.user.token){
          this.freight_good = e
          this.orderType = 2
          this.Orders(type)
        }else{
          this.$refs.mask.style = 'display:block;'
          this.$refs.nologinModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.nologinModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      tobookingchat(item,type){
        // console.log(item,this.form);
        if(this.$store.state.user.token){
          let forms = JSON.parse(JSON.stringify(this.form))
          if(type == 'quick'){
            item.total = 'N'
            for(let n=0;n<this.destinationList.length;n++){
              if(item.code_two == this.destinationList[n].code_two){
                forms.shipping_to = this.destinationList[n].zh_cn_nickname
                forms.shipping_to_en = this.destinationList[n].en_nickname
                break;
              }
            }
          }else{
            forms.shipping_to = this.shipping_toSearch
            forms.shipping_to_en = this.shipping_to_enSearch
          }
          // console.log(this.form);
          localStorage.setItem("BookItem",JSON.stringify(item))
          localStorage.setItem("SearchForm",JSON.stringify(forms))
          this.$emit('bookingchat')
        }else{
          this.$refs.mask.style = 'display:block;'
          this.$refs.nologinModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.nologinModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      searchSale(item){
        getQuickNumber({
          type: 2,
        }).then(res=>{
          this.$router.push({
            name:'FCL',
            params: item,
          })
        })
      },
      quickNumber(){
        if(this.standard){
          this.standard = false
          getQuickNumber({
            type: 1,
          }).then(res=>{
            
          })
        }
      },
    }
  }
  </script>

<style lang="postcss" scoped>
.Select{
  @apply h-10 w-full bg-white hover:bg-selectOpen dark:bg-darkMain dark:border-darkMain border border-inputBorder rounded px-3 py-2 text-base cursor-pointer relative;
}

.selectOpen{
  @apply bg-selectOpen !important;
}

input{
  @apply text-sm !important;
}

.modeltext{
  @apply ml-5 list-disc text-sm md:text-lg;
}

.modeltext>li{
  @apply pb-3;
}

.switch {
  @apply appearance-none w-16 h-8 relative rounded-2xl cursor-pointer bg-gray-200;
}

.switch:before {
  @apply absolute w-7 h-7 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
  content: "";
}

.switch:after {
  @apply inline-block whitespace-nowrap text-white font-bold;
  text-indent: 12px;
  word-spacing: 4px;
  font: 14px/30px monospace;
}

.switch:checked {
  @apply bg-switch;
}

.switch:checked:before {
  left: 34px;
}

.switch:checked:after {
  @apply text-black;
}

.bookingSearch{
  @apply col-span-3 md:col-span-1 border-gray-300 dark:border-darkLine hover:bg-gray-200 cursor-pointer relative;
}

.searchItem{
  @apply absolute p-5 bg-white dark:bg-darkMenu shadow-md rounded cursor-default;
}

.confirmBtn{
  @apply py-1.5 px-4 text-white bg-orange hover:bg-orange1 rounded;
}

.searchPort{
  @apply absolute z-10 p-0 w-full max-h-52 h-auto top-16 left-0 text-sm rounded bg-white shadow-md overflow-auto;
}

.searchPort::-webkit-scrollbar {
  width: 6px;
}

.searchPort::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.searchPort::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.Checkbox {
  @apply flex justify-center items-center border border-gray-400 rounded mr-1.5 w-4 h-4;
}

.sortItem {
  @apply my-1 mr-2 py-1 px-3 rounded hover:bg-gray-100 flex items-center cursor-pointer select-none relative;
}

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.loading{
  @apply mb-4 rounded bg-gray-200 relative;
  animation: loading 5s infinite;
}

@keyframes loading{
  0% {
    opacity: 1;
  }
  50% {
    opacity: .6;
  }
  100% {
    opacity: 1;
  }
}

.swiper-container{
  z-index: 0;
}

.StatementIndemnity>div::-webkit-scrollbar {
  width: 6px;
}

.StatementIndemnity>div::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.StatementIndemnity>div::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.triangle{
  position: relative;
  z-index: -10;
  width: 0px;
  height: 0px;
  border-top: 6px solid #a30e04;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.selectLabel {
  @apply w-1/2 lg:w-13% flex justify-center my-1;
}
</style>
