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
      favourites : [],
      tappedDrink: {}

  },
  mutations: {
      setListWithAlcoholicDrinks(state, allDrinks){
        state.allAlcoholicDrinks = allDrinks
          this.commit('searchForAlcoholicDrinks', "")
      },

      setListWithNonAlcoholicDrinks(state, drinks){
        state.allNonAlcoholicDrinks = drinks
          this.commit('searchForNonAlcoholicDrinks', "")

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
      },
      searchForNonAlcoholicDrinks(state, searchPhrase){
          if(searchPhrase === "" || searchPhrase === undefined){
              state.searchResultNonAlcoholicDrinks = state.allNonAlcoholicDrinks
          }else{
              state.searchResultNonAlcoholicDrinks = []
              for (let i = 0; i < state.allNonAlcoholicDrinks.length; i++) {
                  if(state.allNonAlcoholicDrinks[i].strDrink.toUpperCase().includes(searchPhrase.toUpperCase())){
                      state.searchResultNonAlcoholicDrinks.unshift(state.allNonAlcoholicDrinks[i])
                  }
              }

          }
      },
      setTappedDrink(state, drinkInformation){
          const dIngredientslist= [{measure: drinkInformation.strMeasure1, name: drinkInformation.strIngredient1},
              {measure: drinkInformation.strMeasure2, name: drinkInformation.strIngredient2},
              {measure: drinkInformation.strMeasure3, name: drinkInformation.strIngredient3},
              {measure: drinkInformation.strMeasure4, name: drinkInformation.strIngredient4},
              {measure: drinkInformation.strMeasure5, name: drinkInformation.strIngredient5},
              {measure: drinkInformation.strMeasure6, name: drinkInformation.strIngredient6},
              {measure: drinkInformation.strMeasure7, name: drinkInformation.strIngredient7},
              {measure: drinkInformation.strMeasure8, name: drinkInformation.strIngredient8},
              {measure: drinkInformation.strMeasure9, name: drinkInformation.strIngredient9},
              {measure: drinkInformation.strMeasure10, name: drinkInformation.strIngredient10},
              {measure: drinkInformation.strMeasure11, name: drinkInformation.strIngredient11},
              {measure: drinkInformation.strMeasure12, name: drinkInformation.strIngredient12},
              {measure: drinkInformation.strMeasure13, name: drinkInformation.strIngredient13},
              {measure: drinkInformation.strMeasure14, name: drinkInformation.strIngredient14},
              {measure: drinkInformation.strMeasure15, name: drinkInformation.strIngredient15}]

         state.tappedDrink = { name: drinkInformation.strDrink, instructions: drinkInformation.strInstructions, imageHttp : drinkInformation.strDrinkThumb,
         ingredientslist : dIngredientslist}

         //jksafnkals

         console.log("method in store done! ")
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
    },
    fetchInformationAboutDrink(context, drinkId){

        console.log('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+drinkId)
        return new Promise(  (resolve, reject) => {
            fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+drinkId)
                .then(response=> response.json())
                .then(result => {

                    context.commit('setTappedDrink', result.drinks[0])

                }).catch(err => console.error(err))
                .then(()=>{
                    resolve()
                }, error =>{
                    reject(error)
                })
        })

    },
  }
});
