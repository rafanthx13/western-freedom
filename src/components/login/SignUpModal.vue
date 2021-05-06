<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Cadastre-se</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input
              type="email"
              v-model="user.email"
              placeholder="Digite seu email"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Senha">
            <b-input
              type="password"
              v-model="user.password"
              placeholder="Digite sua senha"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Confirmation Password">
            <b-input
              type="password"
              v-model="user.confirmation_password"
              placeholder="Confirmar Senha"
              required
            >
            </b-input>
          </b-field>
          <!-- <b-checkbox>Remember me</b-checkbox> -->
        </section>
        <footer class="modal-card-foot">
          <b-button label="Fechar" @click="$emit('close')" />
          <b-button label="Entrar" type="is-primary" />
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      user: {
        email: "",
        password: "",
        confirmation_password: ''
      },
    };
  },

};
</script>
<style lang="scss" scoped>
</style>
