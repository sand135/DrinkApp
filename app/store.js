import Vue from 'vue';
import Vuex from 'vuex';
//import AppSettings from 'tns-core-modules/application-settings'
const AppSettings = require("application-settings");


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      searchResultAlcoholicDrinks: [],
      searchResultNonAlcoholicDrinks: [],
      allAlcoholicDrinks: [],
      allNonAlcoholicDrinks :[],
      favourites : [],
      tappedDrink: {},
      alcoholicDrinksHasLoaded: false,
      nonAlcoholicDrinksHasLoaded: false

  },
  mutations: {
      addDrinkToFavourites(state){
          var drinkId = state.tappedDrink.id
          const totalAmountOfDrinks = state.allAlcoholicDrinks.length + state.allNonAlcoholicDrinks.length

          for (let i = 0; i <totalAmountOfDrinks ; i++) {
              if(state.allAlcoholicDrinks[i].idDrink === drinkId){
                  state.favourites.unshift(state.allAlcoholicDrinks[i])
                  state.tappedDrink.isFavourite = true
                  console.log("alcoholic drink added to favourites!")
                  this.commit('save')
                  return
              }else if(state.allNonAlcoholicDrinks[i].idDrink === drinkId){
                  state.favourites.unshift(state.allNonAlcoholicDrinks[i])
                  state.tappedDrink.isFavourite = true
                  console.log("non alcoholic drink added to favourites!")
                  this.commit('save')
                  return
              }
          }
      },

      removeDrinkFromFavourites(state){
          var drinkId = state.tappedDrink.id
          //removes drink from favouritelist
          for (let i = 0; i <state.favourites.length ; i++) {
              if(state.favourites[i].idDrink === drinkId){
                  state.favourites.splice(i,1)
                  state.tappedDrink.isFavourite = false
                  console.log("removed from favourites!")
                  this.commit('save')
                  return
              }
          }

      },

      loadFavourites(state){
          console.log("load method runs")
          //Checks if all drinks are loaded and then the method runs
          if(state.alcoholicDrinksHasLoaded && state.nonAlcoholicDrinksHasLoaded) {
              //Loads how many items was saved
              const numberOfItemsSavedInFavouriteList = AppSettings.getNumber('numberOfItems')
              const allDrinks = state.allAlcoholicDrinks.concat(state.allNonAlcoholicDrinks)
              //Loops thrugh all drinks that has been saved
              for (let i = 0; i < numberOfItemsSavedInFavouriteList; i++) {
                  //Fetches the id och the drink that was saved
                  var savedDrinkId = AppSettings.getString('' + i + '')
                  //For every drink that has been saved, app checks which drink it matches to and adds it to the favourites list.
                  for (let j = 0; j < allDrinks.length ; j++) {
                        if(allDrinks[j].idDrink === savedDrinkId){
                            state.favourites.unshift(allDrinks[j])
                        }
                  }
              }
          }
      },

      save(state){
          console.log("savemethod runs")
          AppSettings.clear()
          for (let i = 0; i < state.favourites.length ; i++) {
              AppSettings.setString(''+i+'', state.favourites[i].idDrink)
          }
          AppSettings.setNumber("numberOfItems", state.favourites.length)
      },

      setListWithAlcoholicDrinks(state, allDrinks){
        state.allAlcoholicDrinks = allDrinks
          this.commit('searchForAlcoholicDrinks', "")
          state.alcoholicDrinksHasLoaded = true
          this.commit('loadFavourites')
      },

      setListWithNonAlcoholicDrinks(state, drinks){
        state.allNonAlcoholicDrinks = drinks
          this.commit('searchForNonAlcoholicDrinks', "")
          state.nonAlcoholicDrinksHasLoaded = true
          this.commit('loadFavourites')
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

          let favourite = false
          //Checks if choosen drink also is one of those that are marked as favourite så like-button and star is shown in right mode in detail-list
          for (let i = 0; i < state.favourites.length ; i++) {
              if(state.favourites[i].idDrink === drinkInformation.idDrink){
                  favourite  = true
              }
          }

        //Sets all necessary information about drink
         state.tappedDrink = { id: drinkInformation.idDrink, name: drinkInformation.strDrink, instructions: drinkInformation.strInstructions, imageHttp : drinkInformation.strDrinkThumb,
         ingredientslist : dIngredientslist, isFavourite: favourite}
      }
  },


  actions: {
      fetchAllAlcoholicDrinks(context) {
          console.log("2 alcoholic drinks are being fetched")
          fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
              .then(response => response.json())
              .then(result => {
                  context.commit('setListWithAlcoholicDrinks', result.drinks)
              })
              .catch(err => console.error(err))


      },

      fetchAllNonAlcoholicDrinks(context) {
          console.log("2 non alcoholic drinks")
              fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
                  .then(response => response.json())
                  .then(result => {
                      context.commit('setListWithNonAlcoholicDrinks', result.drinks)
                  })
                  .catch(err => console.error(err))

      },

      fetchInformationAboutDrink(context, drinkId) {

          console.log('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId)
          return new Promise((resolve, reject) => {
              fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId)
                  .then(response => response.json())
                  .then(result => {
                      context.commit('setTappedDrink', result.drinks[0])
                  }).catch(err => console.error(err))
                  .then(() => {
                      resolve()
                  }, error => {
                      reject(error)
                  })
          })

      },
  }

});

