<template>
  <div class="container">
    <h2>{{ type_tag }}</h2>
    <div class="box mx-5 my-5">
      <b-table :data="tags" :striped="true">
         <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Name" v-slot="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="id" label="Edit" width="40" centered v-slot="props">
          <b-button class="is-warning edit-button" @click="handleEdit(props.row)">
            <b-icon pack="fas" icon="user-edit"> </b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="id" label="Delete" width="40" centered v-slot="props">
          <b-button class="is-danger delete-button" @click="handleDelete(props.row)">
            <b-icon pack="fas" icon="trash"> </b-icon>
          </b-button>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import TagToNews from "../../api/TagToNews";
import TagToPerson from "../../api/TagToPerson";
import DeleteTagModal from '../../components/modals/DeleteTagModal'
import EditTagModal from '../../components/modals/EditTagModal'

export default {

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
    if (this.type_tag == "person") {
      TagToPerson.getAll()
        .then((result) => {
          this.tags = result.data;
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      TagToNews.getAll()
        .then((result) => {
          this.tags = result.data;
        })
        .catch(() => {
          console.log("error");
        });
    }
  },



  methods: {

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
            }
          }
        }
      })
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
