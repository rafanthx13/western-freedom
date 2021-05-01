var notificationsMixin = {
  methods: {
    success() {
      this.$buefy.notification.open({
        message: "Something happened correctly!",
        type: "is-success",
      });
    },
    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: `Something's not good, also I'm on <b>bottom</b>`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
      notif.$on("close", () => {
        this.$buefy.notification.open("Custom notification closed!");
      });
    },
  }
}

export default notificationsMixin
