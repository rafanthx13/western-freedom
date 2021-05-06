<template>
  <div class="container">
    <div class="columns column my-5 mx-5">
      <h2>Listar Tags</h2>
      <b-button class="is-primary" @click="modalCreateTag()">Adicionar Tag</b-button>
    </div>

    <div class="box mx-5 my-5">
      <b-table :data="tags" :striped="true">

         <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Name" centered v-slot="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="type_tag" label="Tipo de Tag" centered v-slot="props">
          <span :class="class_type(props.row.type_tag)"> {{ props.row.type_tag }} </span>
        </b-table-column>

        <b-table-column field="id" label="Editar" width="40" centered v-slot="props">
          <b-button class="is-warning edit-button" @click="handleEdit(props.row)">
            <b-icon pack="mdi" icon="account-edit"> </b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="id" label="Delete" width="40" centered v-slot="props">
          <b-button class="is-danger delete-button" @click="handleDelete(props.row)">
            <b-icon pack="mdi" icon="delete"> </b-icon>
          </b-button>
        </b-table-column>

      </b-table>
    </div>
  </div>
</template>

<script>

import Tag from "../../api/Tag";
import DeleteTagModal from '../../components/modals/DeleteTagModal'
import EditTagModal from '../../components/modals/EditTagModal'
import CreateTagModal from '../../components/modals/CreateTagModal'
import notificationMixin from './../../mixins/notifications'

export default {

  mixins: [notificationMixin],

   data() {
    return {
      type_tag: this.$route.params.type_tag,
      tags: [],
      columns: [
        { field: "id", label: "ID", width: 40 },
        { field: "name", label: "Nome", centered: true },
      ],
    };
  },

  created() {
    Tag.getAll()
      .then((result) => {
        this.tags = result.data;
      })
      .catch(() => {
        this.notify_error("Erro ao buscar Tags");
      });
  },

  methods: {

    modalCreateTag() {
      this.$buefy.modal.open({
        component: CreateTagModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        events: {
          'isCreated': (new_row) => {
            if(new_row){
              this.tags.push(new_row)
              this.notify_success("Tag adicionada com sucesso")
            } else {
              console.log('foi deletado')
              this.notify_error('Erro ao criar Tag')
            }
          }
        }
      })
    },

    handleDelete(row) {
      this.$buefy.modal.open({
        component: DeleteTagModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        props: {row, 'type_tag': this.type_tag},
        events: {
          'isDeleted': idDeleted => {
            if(idDeleted){
              this.tags = this.tags.filter( (el) => {
                  return el.id != idDeleted
              })
              this.notify_success("Tag deletada com sucesso")
            } else {
              this.notify_error('Erro ao deletar a tag')
            }
          }
        }
      })
    },

    class_type(value) {
      if (value == 'person') {
          return 'tag is-success'
      } else if (value == 'news') {
          return 'tag is-warning'
      }
    },

    handleEdit(row) {
      this.$buefy.modal.open({
        component: EditTagModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        props: {row, 'type_tag': this.type_tag},
        events: {
          'isEdited': (new_row) => {
              this.tags = this.tags.map(obj => this.tags.find(o => o.id === obj.id) || new_row);
              this.notify_success("Tag editada com sucesso")
            }
          }
        });
    },

  },

};
</script>

<style scoped>
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
