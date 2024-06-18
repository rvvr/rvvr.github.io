<template>
  <div class="flex min-h-dvh flex-col justify-between pb-16">
    <Navbar />
    <slot />
  </div>

  <LayoutBottomNav />

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
