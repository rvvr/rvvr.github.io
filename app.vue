<template>
  <div class="min-h-screen flex flex-col justify-between">
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Bullfights</a>
      </div>
      <div class="flex-none gap-2">
        <div>
          <button id="connect" class="h-10"></button>
        </div>
        <div role="button" class="btn btn-ghost btn-circle avatar">
          <label v-if="avatar" for="my-drawer-4">
            <div class="p-1 w-10 h-10 rounded-full overflow-hidden cursor-pointer bg-black">
              <img alt="Tailwind CSS Navbar component" :src="avatar" />
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="hero flex-1">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
            In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
      </div>
    </div>

    <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav class="grid grid-flow-col gap-4">
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div class="grid grid-flow-col gap-4">
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              ></path></svg
          ></a>
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              ></path></svg
          ></a>
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              ></path></svg
          ></a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>

    <div class="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <div class="menu min-h-full bg-base-200 text-base-content p-4 pt-3 w-80">
          <div class="flex items-center">
            <div class="p-1 w-10 h-10 rounded-full overflow-hidden bg-black">
              <img v-if="avatar" alt="Tailwind CSS Navbar component" :src="avatar" />
            </div>
            <div class="ml-4">
              <span v-if="first_name">{{ first_name }}</span>
              <span v-if="balance !== null">
                <b>{{ balance }}</b> TON
              </span>
            </div>
          </div>

          <label
            for="my-drawer-4"
            aria-label="close sidebar"
            class="drawer-overlay absolute top-4 right-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0,0,300,150"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <g transform="scale(8.53333,8.53333)">
                  <path
                    d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"
                  ></path>
                </g>
              </g>
            </svg>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TonConnectUI } from "@tonconnect/ui";

export default {
  setup() {
    useHead({
      htmlAttrs: {
        "data-theme": "synthwave"
      }
    });
  },
  data() {
    return {
      first_name: null,
      id: null,
      balance: null,
      ip: null,
      avatar: null,
      isGuest: null,
      tonConnectUI: null
    };
  },
  methods: {
    getAvatar() {
      this.avatar = this.ip
        ? `https://robohash.org/${this.ip}.png?set=set3`
        : `https://api.crashgame247.io/users/profile-picture?id=${this.id}`;
    },
    async getIp() {
      let res = await fetch("https://checkip.amazonaws.com/");
      this.ip = await res.text();
    },
    getUser() {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user) {
        this.first_name = user.first_name;
        this.id = user.id;
      }
    },
    async getBalance(wallet) {
      console.log("🚀 ~ getBalance ~ wallet:", wallet);
      const { result } = await $fetch(
        "https://toncenter.com/api/v2/getAddressBalance?address=" + wallet.account.address
      );
      this.balance = result / 1000000000;
    }
  },
  async mounted() {
    this.getUser();
    if (!this.id) await this.getIp();
    this.getAvatar();

    this.tonConnectUI = new TonConnectUI({
      manifestUrl: "https://rvvr.github.io/tonconnect-manifest.json",
      buttonRootId: "connect"
    });
    this.tonConnectUI.uiOptions = {
      twaReturnUrl: "https://t.me/bullfights_bot"
    };

    // const restored = await this.tonConnectUI.connectionRestored;
    // this.isGuest = !restored;

    const unsubscribe = this.tonConnectUI.onStatusChange(async wallet => {
      if (wallet) {
        this.isGuest = false;
        await this.getBalance(wallet);
      } else {
        this.balance = null;
      }
    });
  }
};
</script>
