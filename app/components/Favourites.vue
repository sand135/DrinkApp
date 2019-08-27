<template>
    <GridLayout>
        <ListView marginRight="-2" for="drink in $store.state.favourites" @itemTap="onItemTap">
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

            }
        },
        methods:{
            onItemTap(index){
                this.$showModal(Detailview, {
                    transition: {},
                    transitioniOS: {},
                    transitionAndroid: {},
                    fullscreen: true,
                    props: {
                        id: index.item.idDrink,
                    }
                });
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