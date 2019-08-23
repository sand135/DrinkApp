<template>
    <GridLayout columns="*" rows="*,60">
        <ListView col="0" row="0" marginRight="-2" for="drink in $store.state.searchResultAlcoholicDrinks" @itemTap="onItemTap">
            <v-template >
                <GridLayout columns="*,3*" rows="*">
                    <Image col="0" row ="0" height="130" :src="drink.strDrinkThumb" stretch= aspectFit />
                    <Label col="1" row="0" :text="drink.strDrink" textWrap="true"/>
                </GridLayout>
            </v-template>
            <v-template if="$odd">
                <GridLayout columns="*,3*" rows="*" backgroundColor="#fff8dc">
                    <Image col="0" row ="0" height="130" :src="drink.strDrinkThumb" stretch= aspectFit />
                    <Label col="1" row="0" :text="drink.strDrink" textWrap="true"/>
                </GridLayout>
            </v-template>
        </ListView>
        <SearchBar col ="0" row="1" hint="Search" v-model="searchPhrase" @textChange="onSearchTextChanged"/>
    </GridLayout>
</template>

<script>
    import Detailview from './Detail.vue'
    export default{
        components:{
            Detailview
        },
        data(){
            return{
                searchPhrase: "",
                searchresult: [],
            }
        },
        methods:{
            onItemTap(args){
                this.$showModal(Detailview, {
                    transition: {},
                    transitioniOS: {},
                    transitionAndroid: {},
                    fullscreen: true,
                    props: {
                        id: args.item.idDrink,
                    }
                });
            },
            onSearchTextChanged(){
                console.log("searchtext changed", this.searchPhrase )
               this.$store.commit('searchForAlcoholicDrinks', this.searchPhrase)

            },
        }
    }
</script>

<style>
list-view{
    font-family: "Chalkboard SE";
    font-size: 20;
    text-align: left;
}
    image{
        margin-right: 20;
    }
</style>