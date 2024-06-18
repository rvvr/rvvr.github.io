<template>
  <div class="flex min-h-dvh flex-col justify-between">
    <Navbar />
    <slot />

    <div class="btm-nav relative">
      <NuxtLink active-class="active text-neutral-content" to="/wallet/deposit">
        <button>
          <IconsWallet class="h-5 w-5" />
        </button>
      </NuxtLink>

      <NuxtLink active-class="active text-neutral-content" to="/">
        <button>
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </NuxtLink>

      <button>
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>

  <!-- <footer class="footer footer-center rounded bg-base-200 p-10 text-base-content">
    <nav class="grid grid-flow-col gap-4">
      <a class="link-hover link">About us</a>
      <a class="link-hover link">Contact</a>
      <a class="link-hover link">Jobs</a>
      <a class="link-hover link">Press kit</a>
    </nav>
    <aside>
      <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
    </aside>
  </footer> -->
</template>
