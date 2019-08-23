<template>
    <GridLayout columns="*" rows="*,60">
        <ListView col="0" row="0" for="drink in $store.state.searchResultNonAlcoholicDrinks" @itemTap="onItemTap">
            <v-template>
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
            return {
                searchPhrase: ""
            }
        },
        methods:{
            onItemTap(args){
                this.$showModal(Detailview, {
                    transition: {},
                    transitioniOS: {},
                    transitionAndroid: {},

                    props: {
                        id: args.item.idDrink,
                    }
                });
            },
            onSearchTextChanged() {
                this.$store.commit('searchForNonAlcoholicDrinks', this.searchPhrase)
            }
        }
    }
</script>

<style>

</style>