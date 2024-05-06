<template>
  <div class="pt-8 w-screen flex justify-center items-center flex-col">
    <div v-if="user">
      <img
        :src="`https://api.crashgame247.io/users/profile-picture?id=${id}`"
        class="mt-10 w-20 h-20 inline-block shadow-xl rounded-full"
      />

      <div class="mt-5 mb-10 text-xl font-bold text-center">{{ first_name }}</div>
    </div>

    <button id="connect"></button>
  </div>
</template>

<script>
import { TonConnectUI } from "@tonconnect/ui";

export default {
  data() {
    return {
      username: "",
      first_name: "",
      id: "",
      user: null
    };
  },
  async mounted() {
    const tonConnectUI = new TonConnectUI({
      manifestUrl: "https://rvvr.github.io/tonconnect-manifest.json",
      buttonRootId: "connect"
    });

    tonConnectUI.uiOptions = {
      twaReturnUrl: "https://t.me/bullfights_bot"
    };

    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
      this.user = user;
      this.username = user.username;
      this.first_name = user.first_name;
      this.id = user.id;
    }
  }
};
</script>
