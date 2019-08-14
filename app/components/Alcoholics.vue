<template>
    <GridLayout columns="*" rows="*,60">
        <ListView col="0" row="0" v-for="drink in $store.state.searchResultAlcoholicDrinks" @itemTap="onItemTap">
            <v-template>
                <!-- Shows the list item label in the default color and style. -->
                <Label :text="drink.strDrink" textWrap="true"/>
            </v-template>
        </ListView>
        <SearchBar col ="0" row="1" hint="Search" v-model="searchPhrase" @textChange="onSearchTextChanged"/>
    </GridLayout>
</template>

<script>
    export default{
        data(){
            return{
                searchPhrase: "",
                searchresult: []
            }
        },
        methods:{
            onItemTap(){
                console.log("item tapped")
            },
            onSearchTextChanged(){
                console.log("searchtext changed", this.searchPhrase )
               this.$store.commit('searchForAlcoholicDrinks', this.searchPhrase)

            },
        }
    }
</script>

<style>

</style>