<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Exchange</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="font-oswald card-title mt-8">Trading Made Easy</div>
    <p class="mt-4 text-left opacity-50">
      We offer a diverse selection of trading pairs, including popular cryptocurrencies like Bitcoin,
      Ethereum, and Litecoin, as well as newer, emerging tokens. The exchange also supports a range of fiat
      currencies, making it easy for users to deposit and withdraw funds.
    </p>

    <div class="text-center">
      <div class="mb-4 mt-10">
        <a :href="useRuntimeConfig().public.exchangeLink" class="btn btn-accent" target="_blank">
          Go to Exchange
        </a>
      </div>
    </div>
  </div>
</template>
