<template>
  <div>
    <v-app>
      <v-container>
        <TabelaComponent 
          titulo="Produtos" 
          :items="items" 
          :headers="headers" 
          @deletou="deleteItem"
          @abrir-dialog="create()" 
        />
      </v-container>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        valor: 0,
        loading: true,
        search: "",
        token: {
          id: null, 
        },
        headers: [
          {
            title: "Token",
            key: "id",
          },
          {
            title: "",
            key: "action",
            sortable: false,
          },
        ],
        items: [],
      };
    },

    async created() {
      await this.getItems();
    },

    methods: {
      async getItems() {
        this.loading = true;
        try {
          const response = await this.$api.get("/token");
          this.items = response.response;
        } catch (error) {
          console.error("Erro ao carregar itens:", error);
        } finally {
          this.loading = false;
          console.log("dados carregados");
        }
      },

      async create() {
        const response = await this.$api.post("/token/create", this.token);
        console.log("Criando item");
        await this.getItems();
        this.resetUsuario();
      },

      async edit() {
        const response = await this.$api.patch(`/token/update/${this.token.id}`, this.token);
        console.log("Editando item");
        await this.getItems();
        this.resetUsuario();
      },

      async deleteItem(item) {  
        if (confirm(`Deseja deletar o registro com Id ${item.id}`)) { 
          this.loading = true;
          try {
            const response = await this.$api.delete(`/token/delete/${item.id}`);
          } catch (error) {
            console.error("Erro ao excluir item:", error);
          }
          console.log("Deletando item");
          
          await this.getItems();
          this.loading = false;
        }
      } 
    },
  };
</script>
