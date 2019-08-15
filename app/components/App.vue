<template>
    <Page>
       <ActionBar title="Find a Drink" android:flat="true"/>
        <TabView>
            <TabViewItem title="Alcoholic">
               <AlcoholicDrinks/>
            </TabViewItem>
            <TabViewItem title="Non Alcoholic">
                <NonAlcoholics/>
            </TabViewItem>
            <TabViewItem title="Favourites">
                <Favourites/>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script >
  import AlcoholicDrinks from './Alcoholics.vue'
  import NonAlcoholics from './NonAlcoholics.vue'
  import Favourites from './Favourites.vue'
  export default {
    components :{
       AlcoholicDrinks,
       NonAlcoholics,
       Favourites
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #faebd7;
        color: #333333;
    }
    TabView{
       background-color: #faebd7;
       font-size: 14;
       font-family: "Chalkboard SE";
    }
    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
