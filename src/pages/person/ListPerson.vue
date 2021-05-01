<template>
  <div class="container">
    <h2>List Person</h2>
    <div class="box mx-5 my-5">
      <!-- Ou gera tudo altomatico, ou, se houver alguma customizada, tem que customizar tudo -->
      <b-table :data="persons" :striped="true">
        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Name" v-slot="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="position" label="Position" v-slot="props">
          {{ props.row.position }}
        </b-table-column>

        <b-table-column
          field="id"
          label="Edit"
          width="40"
          centered
          v-slot="props"
        >

          <b-button class="is-warning edit-button" @click="handleEdit(props.row)">
            <b-icon pack="fas" icon="user-edit"> </b-icon>
          </b-button>

        </b-table-column>

        <b-table-column field="id" label="Delete" width="40" centered v-slot="props">
          <b-button class="is-danger delete-button" @click="handleDelete(props.row)">
            <b-icon pack="fas" icon="trash"> </b-icon>
          </b-button>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">No records</div>
        </template>
      </b-table>
    </div>

    <!-- <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal>
        <template #default="props">
            <DeletePersonModal v-bind="props.row" @close="props.close"/>
        </template>
    </b-modal> -->
  </div>
</template>

<script>
import Person from "../../api/Person";
import DeletePersonModal from "./../../components/modals/DeletePersonModal";

export default {
  created() {
    Person.getAll()
      .then((result) => {
        this.persons = result.data;
      })
      .catch(() => {
        console.log("error");
      });
  },

  data() {
    return {
      persons: [],
      isComponentModalActive: false,
    };
  },

  methods: {

    handleEdit(row){
       this.$router.push({
        name: "EditPerson",
        params: { model: row }
      });

    },

    handleDelete(row) {
      this.$buefy.modal.open({
        component: DeletePersonModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        props: row,
        events: {
          'isDeleted': idDeleted => {
            if(idDeleted){
              this.persons = this.persons.filter( (el) => {
                  return el.id != idDeleted
              })
            }
          }
        }
      });

    },
  },
};
</script>

<style  scoped>

.edit-button:hover {
  color: white;
}

.delete-button {
  color: #4f451b;
}

.delete-button:hover {
  color: white;
}
</style>
