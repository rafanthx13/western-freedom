var notificationsMixin = {

  methods: {
    notify_success(message) {
      this.$buefy.notification.open({
        message: message,
        type: "is-success",
      });
    },
    notify_error(message) {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: message,
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
