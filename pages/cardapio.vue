<template>
  <v-app>
    <div class="degrade">
      <v-card style="background-color:  #fb911f;">
        <v-tabs v-model="tab" align-tabs="center" color="red" class="custom-tabs-height">
          <a href="./">
            <v-tab
            :value="1" class="text-none custom-tab" style="color: darkred; font-weight: bolder; font-size: larger; margin-right: 70px;">Início</v-tab>
          </a>  
    
          <a href="./cardapio">
            <v-tab
            :value="2" class="text-none custom-tab" style="color: darkred; font-weight: bold; font-size: large; margin-right: 70px;">Cardápio</v-tab>
          </a>
    
          <a href="./comanda">
            <v-tab
            :value="3" class="text-none custom-tab" style="color: darkred; font-weight: bold; font-size: large; margin-right: 70px;">Comanda</v-tab>
          </a>
          
          <a href="http://localhost:3000/login">
            <v-icon class="signOut" style="margin-right: 50px;">
              mdi-account
            </v-icon>
          </a>
        </v-tabs>
      </v-card>

      <v-row>
        <v-col 
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          md="3"
        >
          <v-card
            class="mx-auto mt-10"
            max-width="325"
            elevation="15"
            style="border-radius: 10px;"
          >
            <v-img
              height="225px"
              :src="item.imagem"
              cover
            />
    
            <v-card-title>
              {{ item.nome }}
            </v-card-title>
    
            <v-card-subtitle>
              {{ item.descricaoProduto }}
            </v-card-subtitle>
    
            <v-card-actions>
              <v-btn
                color="orange-lighten-2"
                text="Requisitar"
                @click="openDialog(items.id)"
              />
    
              <v-spacer/>
    
              <v-card-text>
                R$ {{ item.valor }}
              </v-card-text>
            </v-card-actions>
          </v-card>

          <v-dialog v-model="ativo" max-width="500">
            <v-card height="550" width="500" theme="dark">
              <v-card-title>
                aa {{ produtos.id }}
              </v-card-title>
              
              <!-- <v-card-text>
                <v-row>
                  <v-col>
                    
                    <v-text-field 
                      v-model="servico.nome"
                      placeholder="Tipo de Serviço" 
                      item-title="data" 
                      item-value="data"
                    />
                  </v-col>
                </v-row>
              </v-card-text> -->

              <v-card-actions>
                <v-btn variant="outlined" class="text-none" @click="persist()">
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

    </div>
  </v-app>
</template>
  
<script>
  export default {
    data: () => ({
      tab: 2,
      show: false,
      items: [],
      ativo: false,
      loading: false,
      produtos: {
        id: null,
      },
    }),

    async created() {
      await this.getItems();
    },

    methods: {
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

      openDialog() {
        this.ativo = true;
      },
    },
  }
</script>

<style>
  .custom-tabs-height {
    height: 70px !important;
    display: flex;
    align-items: center;
  }

  .custom-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .signOut {
    color: darkred;
  }

  .degrade {
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(182, 52, 25, 1) 0%, rgba(255, 190, 0, 1) 100%);
    background-repeat: no-repeat;
    height: 100vh;
    min-height: auto;
  }

  
</style>