import Vue from 'vue';
import Vuex from 'vuex';
import AppSettings from 'tns-core-modules/application-settings'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      searchResultAlcoholicDrinks: [],
      searchResultNonAlcoholicDrinks: [],
      allAlcoholicDrinks: [],
      allNonAlcoholicDrinks :[],
      favourites : []
  },
  mutations: {
      setListWithAlcoholicDrinks(state, allDrinks){
        state.allAlcoholicDrinks = allDrinks
          this.commit('searchForAlcoholicDrinks', "")
      },

      setListWithNonAlcoholicDrinks(state, drinks){
        state.allNonAlcoholicDrinks = drinks

      },

      searchForAlcoholicDrinks(state, searchPhrase){
          if(searchPhrase === "" || searchPhrase === undefined){
             state.searchResultAlcoholicDrinks = state.allAlcoholicDrinks
          }else{
              state.searchResultAlcoholicDrinks = []
              for (let i = 0; i < state.allAlcoholicDrinks.length; i++) {
                  if(state.allAlcoholicDrinks[i].strDrink.toUpperCase().includes(searchPhrase.toUpperCase())){
                      state.searchResultAlcoholicDrinks.unshift(state.allAlcoholicDrinks[i])
                  }
              }

          }
      }



  },
  actions: {
    fetchAllAlcoholicDrinks(context) {
      console.log("alcoholic drinks are being fetched")
      fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
          .then(response => response.json())
          .then(result => {
            context.commit('setListWithAlcoholicDrinks', result.drinks)
          })
          .catch(err => console.error(err))
    },

    fetchAllNonAlcoholicDrinks(context){
      console.log("no alcoholic drinks are being fetched")
      fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
          .then(response => response.json())
          .then( result => {
            context.commit('setListWithNonAlcoholicDrinks', result.drinks)
          })
          .catch(err => console.error(err))
    }
  }
});
