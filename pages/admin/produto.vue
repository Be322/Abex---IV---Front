<template>
    <div>
      <v-app>
        <v-container>
          <TabelaComponent 
            titulo="Produtos" 
            :items="items" 
            :headers="headers" 
            @editou="editItem" 
            @deletou="deleteItem"
            @abrir-dialog="() => abrirDialog()" 
            @dialog-edit="() => ativo2 = true"
          />
          <v-dialog 
            v-model="ativo" 
            max-width="500"
            style="display: flex; justify-content: center; align-items: center; margin: 0 auto;"
          >
            <v-card height="625" width="650" theme="dark">
              <v-card-title>
                Criar
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="produto.nome"
                      placeholder="Nome do produto" 
                      item-title="nome" 
                      item-value="nome"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-textarea 
                      v-model="produto.descricaoProduto"
                      placeholder="Descricao do produto" 
                      item-title="descricaoProduto" 
                      item-value="descricaoProduto"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="produto.quantidade"
                      placeholder="Quantidade" 
                      item-title="quantidade" 
                      item-value="quantidade"
                    />
                  </v-col>

                  <v-col>
                    <v-text-field 
                      v-model="produto.valor"
                      placeholder="Valor R$" 
                      item-title="valor" 
                      item-value="valor"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="produto.idCategoria"
                      placeholder="Quantidade" 
                      item-title="idCategoria" 
                      item-value="idCategoria"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <img :src="produto.imagem" style="max-width: 100px; max-height: 100px">
                  </v-col>
                  <v-col class="justify-center align-center text-center" cols="8" sm="6" style="justify-content: center;">
                    <v-text-field v-model="produto.imagem" label="Link da imagem" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-autocomplete 
                      v-model="produto.idCategoria"
                      :items="produto" 
                      placeholder="produto"
                      item-title="label" 
                      item-value="idCategoria"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn variant="outlined" @click="create()">
                  Criar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog 
            v-model="ativo2"
            max-width="500"
          >
            <v-card 
              height="625" 
              width="650" 
              theme="dark"
            >
              <v-card-title>
                Editar
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="produto.nome"
                      placeholder="Nome do produto" 
                      item-title="nome" 
                      item-value="nome"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-textarea 
                      v-model="produto.descricaoProduto"
                      placeholder="Descricao do produto" 
                      item-title="descricaoProduto" 
                      item-value="descricaoProduto"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="produto.quantidade"
                      placeholder="Quantidade" 
                      item-title="quantidade" 
                      item-value="quantidade"
                    />
                  </v-col>

                  <v-col>
                    <v-text-field 
                      v-model="produto.valor"
                      placeholder="Valor R$" 
                      item-title="valor" 
                      item-value="valor"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <img :src="produto.imagem" style="max-width: 100px; max-height: 100px">
                  </v-col>
                  <v-col class="justify-center align-center text-center" cols="8" sm="6" style="justify-content: center;">
                    <v-text-field v-model="produto.imagem" label="Link da imagem" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-autocomplete 
                      v-model="produto.idCategoria"
                      :items="produto" 
                      placeholder="produto"
                      item-title="label" 
                      item-value="idCategoria"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn variant="outlined" @click="edit()">
                  Editar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-app>
    </div>
  </template>

  <script>
    export default {
      data: () => {
        return {
          valor: 0,
          ativo: false,
          ativo2: false,
          loading: true,
          textoUsuario: null,
          tab: null,
          search: "",
          produto: {
            id: null, 
            nome: null, 
            descricaoProduto: null, 
            valor: null,
            imagem: null, 
            idCategoria: null,
          },
          headers: [
            {
              title: "Id",
              key: "id",
            },
            {
              title: "Nome",
              key: "nome",
            },
            {
              title: "Valor",
              key: "valor",
            },
            {
              title: "",
              key: "action",
              sortable: false,
            },
          ],
          items: [],
          categoria: [],
        };
      },

      watch: {
        ativo(valor) {
          if (valor == false) {
            this.resetProduto();
          }
        },
        ativo2(valor) {
          if (valor == false) {
            this.resetProduto();
          }
        },
        resetTabela() {
          if (this.loading == false) {
            this.getItems();
          }
        }
      },

      async created() {
        await this.getItems();
        await this.getIdCategoria();
      },

      methods: {
        resetProduto() {
          this.produto = {
            id: null, 
            nome: null, 
            descricaoProduto: null, 
            valor: null,
            imagem: null, 
            idCategoria: null,
          };
          this.ativo = false;
          this.ativo2 = false;
        },

        async getItems() {
          this.loading = true;
          try {
            const response = await this.$api.get("/produto");
            this.items = response.response;
          } catch (error) {
            console.error("Erro ao carregar itens:", error);
          } finally {
            this.loading = false;
            console.log("dados carregados");
          }
        },

        async getIdCategoria() {
          this.loading = true;
          try {
            const response = await this.$api.get("/categoria");
            this.categoria = response.response;
          } catch (error) {
            console.error("Erro ao carregar itens:", error);
          } finally {
            this.loading = false;
            console.log(this.categoria);
              console.log("dados carregados");
          }
        },

        async getidCategoria() {
          this.loading = true;
          try {
            const response = await this.$api.get(`/produto`);            
            this.produto = response.response;
            this.produto = this.produto.map((item) => {
              return {
                id: item.id,
              };
            });            
          } catch (error) {
            console.error("Erro ao carregar itens:", error);
          } finally {
            console.log("produto carregados");
          }
        },

        editItem(item) {
          this.produto = {
            ...item,
          };
          this.ativo2 = true;
        },

        abrirDialog() {
          this.ativo = true;
        },

        async create() {
          const response = await this.$api.post("/produto/create", this.produto);
          console.log("Criando item");
          await this.getItems();
          this.resetProduto();
        },

        async edit() {
          const response = await this.$api.patch(`/produto/update/${this.produto.id}`, this.produto);
          console.log("Editando item");
          await this.getItems();
          this.resetProduto();
        },

        async deleteItem(item) {  
          if (confirm(`Deseja deletar o registro com Id ${item.id}`)) { 
            this.loading = true;
            try {
              const response = await this.$api.delete(`/produto/delete/${item.id}`);
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
