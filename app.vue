<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <button id="connect"></button>
  </div>
</template>

<script>
import { TonConnectUI } from "@tonconnect/ui";

export default {
  mounted() {
    const tonConnectUI = new TonConnectUI({
      manifestUrl: "https://rvvr.github.io/tonconnect-manifest.json",
      buttonRootId: "connect"
    });

    tonConnectUI.uiOptions = {
      twaReturnUrl: "https://t.me/bullfights_bot"
    };
  }
};
</script>
