<template>
    <Page>
       <ActionBar title="Find a Drink" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
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
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
